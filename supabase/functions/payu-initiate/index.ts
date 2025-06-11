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
    const { orderData } = await req.json()
    
    // Validate request body
    if (!orderData) {
      throw new Error('Missing order data')
    }

    console.log('PayU payment initiation request:', orderData)

    // Get PayU credentials from secrets
    const merchantKey = Deno.env.get('PAYU_MERCHANT_KEY')
    const salt = Deno.env.get('PAYU_SALT')

    if (!merchantKey || !salt) {
      console.error('PayU credentials not found')
      throw new Error('PayU credentials not configured')
    }

    console.log('PayU credentials found:', { merchantKey: merchantKey.substring(0, 3) + '***', salt: salt.substring(0, 3) + '***' })

    // Create Supabase client
    const supabaseUrl = Deno.env.get('SUPABASE_URL')!
    const supabaseAnonKey = Deno.env.get('SUPABASE_ANON_KEY')!
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Extract data from orderData
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
      throw new Error('Missing required order data')
    }

    // Check for duplicate request (rate limiting)
    const requestKey = `${orderId}_${customerData.email}`
    const now = Date.now()
    const lastRequest = requestTracker.get(requestKey)
    
    if (lastRequest && (now - lastRequest) < 5000) { // 5 second cooldown
      console.log('Duplicate request detected for:', requestKey)
      throw new Error('Please wait before making another payment request')
    }
    
    requestTracker.set(requestKey, now)

    // Clean up old entries (keep only last 100 entries)
    if (requestTracker.size > 100) {
      const entries = Array.from(requestTracker.entries())
      const sortedEntries = entries.sort((a, b) => b[1] - a[1])
      requestTracker.clear()
      sortedEntries.slice(0, 50).forEach(([key, value]) => {
        requestTracker.set(key, value)
      })
    }

    console.log('Processing order:', { orderId, amount, customerEmail: customerData.email })

    // Validate email format
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(customerData.email)) {
      throw new Error('Invalid email address')
    }

    // Validate phone number (basic validation)
    if (!customerData.phone || customerData.phone.length < 10) {
      throw new Error('Invalid phone number')
    }

    // PayU payment parameters
    const payuData = {
      key: merchantKey,
      txnid: orderId,
      amount: amount.toString(),
      productinfo: `Order ${orderId} - ${cartItems.length} items`,
      firstname: customerData.firstName.trim(),
      lastname: customerData.lastName?.trim() || '',
      email: customerData.email.trim(),
      phone: customerData.phone.trim(),
      surl: `${supabaseUrl}/functions/v1/payu-verify`,
      furl: `${supabaseUrl}/functions/v1/payu-verify`,
      udf1: orderId,
      udf2: customerData.address?.trim() || '',
      udf3: customerData.city?.trim() || '',
      udf4: customerData.state?.trim() || '',
      udf5: customerData.pincode?.trim() || ''
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

    // Check if order already exists
    const { data: existingOrder, error: checkError } = await supabase
      .from('orders')
      .select('order_id, payment_status')
      .eq('order_id', orderId)
      .single()

    if (checkError && checkError.code !== 'PGRST116') { // PGRST116 = no rows found
      console.error('Error checking existing order:', checkError)
      throw new Error(`Database error: ${checkError.message}`)
    }

    if (existingOrder) {
      console.log('Order already exists:', orderId, 'Status:', existingOrder.payment_status)
      if (existingOrder.payment_status === 'completed') {
        throw new Error('Order has already been paid')
      }
      if (existingOrder.payment_status === 'pending') {
        console.log('Order is pending, proceeding with payment')
      }
    }

    // Save or update order to database with pending status
    const { error: orderError } = await supabase
      .from('orders')
      .upsert({
        order_id: orderId,
        customer_data: customerData,
        cart_items: cartItems,
        sub_total: subTotal,
        taxes: taxes,
        total_amount: amount,
        payment_method: 'payu',
        payment_status: 'pending',
        created_at: new Date().toISOString(),
        updated_at: new Date().toISOString()
      })

    if (orderError) {
      console.error('Error saving order:', orderError)
      throw new Error(`Database error: ${orderError.message}`)
    }

    console.log('Order saved to database:', orderId)

    // Return PayU form data with correct URL
    const response = {
      payuUrl: 'https://secure.payu.in/_payment',
      formData: {
        ...payuData,
        hash: hash
      }
    }

    console.log('PayU response prepared for order:', orderId)

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('PayU initiation error:', error)
    return new Response(JSON.stringify({ 
      error: error.message,
      details: 'PayU payment initiation failed'
    }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
