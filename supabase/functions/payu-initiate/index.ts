
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting map - more lenient
const requestTracker = new Map<string, number>();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('PayU initiate function called - Method:', req.method)
    console.log('Content-Type:', req.headers.get('content-type'))

    // Validate request method
    if (req.method !== 'POST') {
      console.error('Invalid request method:', req.method)
      return new Response(JSON.stringify({ 
        error: 'Method not allowed',
        details: 'Only POST requests are supported'
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse request body with better error handling
    let orderData;
    try {
      const body = await req.text()
      console.log('Raw request body length:', body.length)
      console.log('Raw request body preview:', body.substring(0, 200))
      
      if (!body || body.trim() === '') {
        console.error('Empty request body received')
        return new Response(JSON.stringify({ 
          error: 'Empty request body',
          details: 'Request body cannot be empty. Please ensure order data is provided.'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      let parsedBody;
      try {
        parsedBody = JSON.parse(body)
      } catch (jsonError) {
        console.error('JSON parse error:', jsonError)
        return new Response(JSON.stringify({ 
          error: 'Invalid JSON format',
          details: 'Request body must be valid JSON'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      orderData = parsedBody.orderData
      
      if (!orderData) {
        console.error('Missing orderData in request body. Body keys:', Object.keys(parsedBody))
        return new Response(JSON.stringify({ 
          error: 'Missing orderData',
          details: 'Request must contain orderData field with payment information'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return new Response(JSON.stringify({ 
        error: 'Request parsing failed',
        details: parseError.message || 'Unable to parse request body'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('PayU payment initiation request received:', { 
      orderId: orderData.orderId, 
      amount: orderData.amount,
      hasCustomerData: !!orderData.customerData
    })

    // Get PayU credentials from secrets
    const merchantKey = Deno.env.get('PAYU_MERCHANT_KEY')
    const salt = Deno.env.get('PAYU_SALT')

    if (!merchantKey || !salt) {
      console.error('PayU credentials not found')
      return new Response(JSON.stringify({ 
        error: 'Payment gateway not configured',
        details: 'PayU credentials are missing. Please contact support.'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('PayU credentials verified')

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing')
      return new Response(JSON.stringify({ 
        error: 'Database configuration error',
        details: 'Database credentials missing'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Extract and validate data from orderData
    const {
      orderId,
      amount,
      customerData,
      cartItems = [],
      subTotal,
      taxes
    } = orderData

    // Validate required data
    if (!orderId || !amount || !customerData) {
      console.error('Missing required order data:', { 
        hasOrderId: !!orderId, 
        hasAmount: !!amount, 
        hasCustomerData: !!customerData 
      })
      return new Response(JSON.stringify({ 
        error: 'Invalid order data',
        details: 'Missing required fields: orderId, amount, or customerData'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // More lenient rate limiting - 3 second cooldown
    const requestKey = `${orderId}_${customerData.email || 'no-email'}`
    const now = Date.now()
    const lastRequest = requestTracker.get(requestKey)
    
    if (lastRequest && (now - lastRequest) < 3000) {
      console.log('Rate limit hit for:', requestKey, 'Time since last:', now - lastRequest)
      return new Response(JSON.stringify({ 
        error: 'Too many requests',
        details: 'Please wait a moment before trying again'
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    requestTracker.set(requestKey, now)

    // Clean up old entries
    if (requestTracker.size > 100) {
      const entries = Array.from(requestTracker.entries())
      const sortedEntries = entries.sort((a, b) => b[1] - a[1])
      requestTracker.clear()
      sortedEntries.slice(0, 50).forEach(([key, value]) => {
        requestTracker.set(key, value)
      })
    }

    console.log('Processing order:', { orderId, amount, customerEmail: customerData.email })

    // Process and validate customer data with better defaults
    const processedCustomerData = {
      firstName: String(customerData.firstName || 'Test').trim() || 'Test',
      lastName: String(customerData.lastName || 'User').trim() || 'User',
      email: String(customerData.email || 'test@example.com').trim() || 'test@example.com',
      phone: String(customerData.phone || '9999999999').replace(/\D/g, '').slice(-10) || '9999999999',
      address: String(customerData.address || 'Test Address').trim() || 'Test Address',
      city: String(customerData.city || 'Test City').trim() || 'Test City',
      state: String(customerData.state || 'Test State').trim() || 'Test State',
      pincode: String(customerData.pincode || '123456').replace(/\D/g, '').slice(-6) || '123456'
    }

    // Validate email format - use default if invalid
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(processedCustomerData.email)) {
      console.log('Invalid email format, using default')
      processedCustomerData.email = 'test@example.com'
    }

    // Ensure phone number is valid
    if (processedCustomerData.phone.length < 10) {
      processedCustomerData.phone = '9999999999'
    }

    // Ensure pincode is valid
    if (processedCustomerData.pincode.length < 6) {
      processedCustomerData.pincode = '123456'
    }

    console.log('Processed customer data:', processedCustomerData)

    // PayU payment parameters
    const payuData = {
      key: merchantKey,
      txnid: orderId,
      amount: String(amount),
      productinfo: `Order ${orderId} - ${cartItems.length} items`,
      firstname: processedCustomerData.firstName,
      lastname: processedCustomerData.lastName,
      email: processedCustomerData.email,
      phone: processedCustomerData.phone,
      surl: `${supabaseUrl}/functions/v1/payu-verify`,
      furl: `${supabaseUrl}/functions/v1/payu-verify`,
      udf1: orderId,
      udf2: processedCustomerData.address,
      udf3: processedCustomerData.city,
      udf4: processedCustomerData.state,
      udf5: processedCustomerData.pincode
    }

    console.log('PayU data prepared:', { 
      txnid: payuData.txnid, 
      amount: payuData.amount, 
      email: payuData.email,
      productinfo: payuData.productinfo
    })

    // Generate hash for security
    const hashString = `${payuData.key}|${payuData.txnid}|${payuData.amount}|${payuData.productinfo}|${payuData.firstname}|${payuData.email}|||||||||||${salt}`
    console.log('Hash string prepared for transaction:', payuData.txnid)

    // Create hash using Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(hashString)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    console.log('Hash generated successfully for order:', orderId)

    // Try to save order to database
    try {
      const { error: orderError } = await supabase
        .from('orders')
        .upsert({
          order_id: orderId,
          customer_data: processedCustomerData,
          cart_items: cartItems,
          sub_total: subTotal || amount,
          taxes: taxes || 0,
          total_amount: amount,
          payment_method: 'payu',
          payment_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (orderError) {
        console.error('Error saving order to database:', orderError)
        // Continue with payment even if database save fails
      } else {
        console.log('Order saved to database successfully:', orderId)
      }
    } catch (dbError) {
      console.error('Database operation error:', dbError)
      // Continue with payment
    }

    // Return PayU form data
    const response = {
      success: true,
      payuUrl: 'https://test.payu.in/_payment',
      formData: {
        ...payuData,
        hash: hash
      }
    }

    console.log('PayU response prepared successfully for order:', orderId)

    return new Response(JSON.stringify(response), {
      status: 200,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('PayU initiation error:', error)
    return new Response(JSON.stringify({ 
      error: 'Payment initialization failed',
      details: error.message || 'An unexpected error occurred during payment initialization',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
