import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

// Rate limiting map to prevent duplicate requests
const requestTracker = new Map<string, number>();

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('PayU initiate function called - Method:', req.method)
    console.log('Request headers:', Object.fromEntries(req.headers.entries()))

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

    // Parse request body with error handling
    let orderData;
    try {
      const body = await req.text()
      console.log('Raw request body:', body)
      
      if (!body) {
        throw new Error('Empty request body')
      }
      
      const parsedBody = JSON.parse(body)
      orderData = parsedBody.orderData
      
      if (!orderData) {
        throw new Error('Missing orderData in request body')
      }
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return new Response(JSON.stringify({ 
        error: 'Invalid request body',
        details: 'Request body must be valid JSON with orderData field'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('PayU payment initiation request:', orderData)

    // Get PayU credentials from secrets
    const merchantKey = Deno.env.get('PAYU_MERCHANT_KEY')
    const salt = Deno.env.get('PAYU_SALT')

    if (!merchantKey || !salt) {
      console.error('PayU credentials not found')
      return new Response(JSON.stringify({ 
        error: 'Payment gateway not configured',
        details: 'PayU credentials are missing'
      }), {
        status: 500,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('PayU credentials found:', { merchantKey: merchantKey.substring(0, 3) + '***', salt: salt.substring(0, 3) + '***' })

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing')
      return new Response(JSON.stringify({ 
        error: 'Database configuration error',
        details: 'Supabase credentials missing'
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
      cartItems,
      subTotal,
      taxes
    } = orderData

    // Validate required data
    if (!orderId || !amount || !customerData) {
      console.error('Missing required order data:', { orderId, amount, customerData: !!customerData })
      return new Response(JSON.stringify({ 
        error: 'Invalid order data',
        details: 'Missing required fields: orderId, amount, or customerData'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Check for duplicate request (rate limiting) - more lenient timing
    const requestKey = `${orderId}_${customerData.email || 'no-email'}`
    const now = Date.now()
    const lastRequest = requestTracker.get(requestKey)
    
    if (lastRequest && (now - lastRequest) < 5000) { // 5 second cooldown instead of 10
      console.log('Duplicate request detected for:', requestKey, 'Time since last:', now - lastRequest)
      return new Response(JSON.stringify({ 
        error: 'Too many requests',
        details: 'Please wait before making another payment request'
      }), {
        status: 429,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }
    
    requestTracker.set(requestKey, now)

    // Clean up old entries (keep only last 50 entries)
    if (requestTracker.size > 50) {
      const entries = Array.from(requestTracker.entries())
      const sortedEntries = entries.sort((a, b) => b[1] - a[1])
      requestTracker.clear()
      sortedEntries.slice(0, 25).forEach(([key, value]) => {
        requestTracker.set(key, value)
      })
    }

    console.log('Processing order:', { orderId, amount, customerEmail: customerData.email })

    // Process and validate customer data with more robust defaults
    const processedCustomerData = {
      firstName: (customerData.firstName || 'Test').trim(),
      lastName: (customerData.lastName || 'User').trim(),
      email: customerData.email || 'test@example.com',
      phone: customerData.phone || '9999999999',
      address: (customerData.address || 'Test Address').trim(),
      city: (customerData.city || 'Test City').trim(),
      state: (customerData.state || 'Test State').trim(),
      pincode: (customerData.pincode || '123456').trim()
    }

    // Validate email format - more permissive
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(processedCustomerData.email)) {
      console.log('Invalid email format, using default test email')
      processedCustomerData.email = 'test@example.com'
    }

    // Validate phone number
    if (processedCustomerData.phone.length < 10) {
      console.log('Invalid phone number, using default')
      processedCustomerData.phone = '9999999999'
    }

    console.log('Processed customer data:', processedCustomerData)

    // PayU payment parameters
    const payuData = {
      key: merchantKey,
      txnid: orderId,
      amount: amount.toString(),
      productinfo: `Order ${orderId} - ${cartItems?.length || 0} items`,
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
      surl: payuData.surl,
      furl: payuData.furl
    })

    // Generate hash for security
    const hashString = `${payuData.key}|${payuData.txnid}|${payuData.amount}|${payuData.productinfo}|${payuData.firstname}|${payuData.email}|||||||||||${salt}`
    console.log('Hash string created for:', payuData.txnid)

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
          cart_items: cartItems || [],
          sub_total: subTotal || amount,
          taxes: taxes || 0,
          total_amount: amount,
          payment_method: 'payu',
          payment_status: 'pending',
          created_at: new Date().toISOString(),
          updated_at: new Date().toISOString()
        })

      if (orderError) {
        console.error('Error saving order:', orderError)
        // Don't fail the payment if database save fails, just log it
        console.log('Continuing payment process despite database error')
      } else {
        console.log('Order saved to database:', orderId)
      }
    } catch (dbError) {
      console.error('Database error:', dbError)
      // Continue with payment even if database fails
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
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('PayU initiation error:', error)
    return new Response(JSON.stringify({ 
      error: error.message || 'Payment initialization failed',
      details: 'PayU payment initiation failed',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
