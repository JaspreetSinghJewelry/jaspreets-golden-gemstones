
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
      throw new Error('PayU credentials not configured')
    }

    // Create Supabase client
    const supabaseUrl = 'https://bxscivdpwersyohpaamn.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc'
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

    // PayU payment parameters - using test URL for now
    const payuData = {
      key: merchantKey,
      txnid: orderId,
      amount: amount.toString(),
      productinfo: `Order ${orderId} - ${cartItems.length} items`,
      firstname: customerData.firstName,
      lastname: customerData.lastName,
      email: customerData.email,
      phone: customerData.phone,
      surl: 'https://bxscivdpwersyohpaamn.supabase.co/functions/v1/payu-verify',
      furl: 'https://bxscivdpwersyohpaamn.supabase.co/functions/v1/payu-verify',
      udf1: orderId,
      udf2: customerData.address,
      udf3: customerData.city,
      udf4: customerData.state,
      udf5: customerData.pincode
    }

    // Generate hash
    const hashString = `${payuData.key}|${payuData.txnid}|${payuData.amount}|${payuData.productinfo}|${payuData.firstname}|${payuData.email}|||||||||||${salt}`
    console.log('Hash string:', hashString)

    // Create hash using Web Crypto API
    const encoder = new TextEncoder()
    const data = encoder.encode(hashString)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const hash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    console.log('Generated hash:', hash)

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
      throw orderError
    }

    // Return PayU form data - using test environment
    const response = {
      payuUrl: 'https://test.payu.in/_payment',
      formData: {
        ...payuData,
        hash: hash
      }
    }

    console.log('PayU response:', response)

    return new Response(JSON.stringify(response), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    console.error('PayU initiation error:', error)
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})
