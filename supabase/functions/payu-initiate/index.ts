
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
    const { orderData } = await req.json()
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

    console.log('Processing order:', { orderId, amount, customerEmail: customerData.email })

    // PayU payment parameters
    const payuData = {
      key: merchantKey,
      txnid: orderId,
      amount: amount.toString(),
      productinfo: `Order ${orderId} - ${cartItems.length} items`,
      firstname: customerData.firstName,
      lastname: customerData.lastName || '',
      email: customerData.email,
      phone: customerData.phone,
      surl: `${supabaseUrl}/functions/v1/payu-verify`,
      furl: `${supabaseUrl}/functions/v1/payu-verify`,
      udf1: orderId,
      udf2: customerData.address || '',
      udf3: customerData.city || '',
      udf4: customerData.state || '',
      udf5: customerData.pincode || ''
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

    // Save order to database with pending status
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
        created_at: new Date().toISOString()
      })

    if (orderError) {
      console.error('Error saving order:', orderError)
      throw new Error(`Database error: ${orderError.message}`)
    }

    console.log('Order saved to database:', orderId)

    // Return PayU form data with correct URL - using secure.payu.in for test environment
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
