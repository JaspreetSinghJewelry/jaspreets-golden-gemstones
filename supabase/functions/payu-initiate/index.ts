
import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'https://esm.sh/@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    console.log('PayU initiate function called - Method:', req.method)

    // Validate request method
    if (req.method !== 'POST') {
      console.error('Invalid request method:', req.method)
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Method not allowed',
        details: 'Only POST requests are supported'
      }), {
        status: 405,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // Parse request body
    let requestBody;
    try {
      const bodyText = await req.text()
      console.log('Raw request body received, length:', bodyText.length)
      
      if (!bodyText || bodyText.trim() === '') {
        console.error('Empty request body received')
        return new Response(JSON.stringify({ 
          success: false,
          error: 'Empty request body',
          details: 'Request body cannot be empty. Please ensure order data is provided.'
        }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }
      
      requestBody = JSON.parse(bodyText)
      console.log('Request body parsed successfully')
      
    } catch (parseError) {
      console.error('Error parsing request body:', parseError)
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Request parsing failed',
        details: parseError.message || 'Unable to parse request body'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    const orderData = requestBody.orderData || requestBody;

    if (!orderData) {
      console.error('Missing orderData in request body')
      return new Response(JSON.stringify({ 
        success: false,
        error: 'Missing orderData',
        details: 'Request must contain orderData field with payment information'
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

    // Your PayU credentials
    const merchantKey = "LSzl2Y";
    const salt = "0TnuJebAqBoK2GKZnMwxBrc39wtcTiFz";

    console.log('PayU credentials verified')

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    
    if (!supabaseUrl || !supabaseAnonKey) {
      console.error('Supabase configuration missing')
      return new Response(JSON.stringify({ 
        success: false,
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
        success: false,
        error: 'Invalid order data',
        details: 'Missing required fields: orderId, amount, or customerData'
      }), {
        status: 400,
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    console.log('Processing order:', { orderId, amount, customerEmail: customerData.email })

    // Process customer data
    const processedCustomerData = {
      firstName: String(customerData.firstName || 'Customer').trim(),
      lastName: String(customerData.lastName || '').trim(),
      email: String(customerData.email || 'customer@example.com').trim(),
      phone: String(customerData.phone || '9999999999').replace(/\D/g, '').slice(-10) || '9999999999',
      address: String(customerData.address || '').trim(),
      city: String(customerData.city || '').trim(),
      state: String(customerData.state || '').trim(),
      pincode: String(customerData.pincode || '').replace(/\D/g, '').slice(-6) || '123456'
    }

    console.log('Processed customer data:', processedCustomerData)

    // Generate transaction ID
    const txnid = `PLS-${Date.now()}-${Math.floor(Math.random() * 1000)}`;

    // PayU payment parameters
    const payuData = {
      key: merchantKey,
      txnid: txnid,
      amount: String(amount),
      productinfo: `diamond bracelet - Order ${orderId}`,
      firstname: processedCustomerData.firstName,
      email: processedCustomerData.email,
      phone: processedCustomerData.phone,
      surl: 'https://jaspreetsinghjewelry.com/order-success',
      furl: 'https://jaspreetsinghjewelry.com/payment-failure',
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

    // Generate hash with correct PayU format
    // Format: key|txnid|amount|productinfo|firstname|email|udf1|udf2|udf3|udf4|udf5||||||salt
    const hashString = `${payuData.key}|${payuData.txnid}|${payuData.amount}|${payuData.productinfo}|${payuData.firstname}|${payuData.email}|${payuData.udf1}|${payuData.udf2}|${payuData.udf3}|${payuData.udf4}|${payuData.udf5}||||||${salt}`
    
    console.log('Hash string for calculation:', hashString)

    // Create hash using Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(hashString)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    console.log('Hash generated successfully:', hash.substring(0, 20) + '...')

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
      success: false,
      error: 'Payment initialization failed',
      details: error.message || 'An unexpected error occurred during payment initialization',
      timestamp: new Date().toISOString()
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
