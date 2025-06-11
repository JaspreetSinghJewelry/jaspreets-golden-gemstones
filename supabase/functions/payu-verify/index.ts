
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
    const formData = await req.formData()
    console.log('PayU verification request received')

    // Get PayU credentials from secrets
    const merchantKey = Deno.env.get('PAYU_MERCHANT_KEY')
    const salt = Deno.env.get('PAYU_SALT')

    if (!merchantKey || !salt) {
      throw new Error('PayU credentials not configured')
    }

    // Extract PayU response parameters
    const status = formData.get('status')
    const txnid = formData.get('txnid')
    const amount = formData.get('amount')
    const productinfo = formData.get('productinfo')
    const firstname = formData.get('firstname')
    const email = formData.get('email')
    const hash = formData.get('hash')
    const payuMoneyId = formData.get('payuMoneyId')

    console.log('PayU response data:', {
      status,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      payuMoneyId
    })

    // Verify hash for security
    const reverseHashString = `${salt}|${status}|||||||||||${email}|${firstname}|${productinfo}|${amount}|${txnid}|${merchantKey}`
    
    const encoder = new TextEncoder()
    const data = encoder.encode(reverseHashString)
    const hashBuffer = await crypto.subtle.digest('SHA-512', data)
    const hashArray = Array.from(new Uint8Array(hashBuffer))
    const calculatedHash = hashArray.map(b => b.toString(16).padStart(2, '0')).join('')

    console.log('Calculated hash:', calculatedHash)
    console.log('Received hash:', hash)

    // Create Supabase client
    const supabaseUrl = 'https://bxscivdpwersyohpaamn.supabase.co'
    const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImJ4c2NpdmRwd2Vyc3lvaHBhYW1uIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDg4NTg1NjYsImV4cCI6MjA2NDQzNDU2Nn0.dILqWbppsSDLTnQgUBCQbYgWdJp0enh6YckSuPu4nnc'
    const supabase = createClient(supabaseUrl, supabaseAnonKey)

    // Determine payment status
    let paymentStatus = 'failed'
    if (status === 'success' && calculatedHash === hash) {
      paymentStatus = 'completed'
    } else if (status === 'failure') {
      paymentStatus = 'failed'
    } else if (status === 'pending') {
      paymentStatus = 'pending'
    }

    console.log('Final payment status:', paymentStatus)

    // Update order in database
    const { error: updateError } = await supabase
      .from('orders')
      .update({
        payment_status: paymentStatus,
        stripe_session_id: payuMoneyId,
        updated_at: new Date().toISOString()
      })
      .eq('order_id', txnid)

    if (updateError) {
      console.error('Error updating order:', updateError)
      throw updateError
    }

    // Redirect based on payment status
    const redirectUrl = paymentStatus === 'completed' 
      ? `https://jaspreets-golden-gemstones.lovable.app/order-success?orderId=${txnid}&amount=${amount}&status=${status}`
      : `https://jaspreets-golden-gemstones.lovable.app/payment-failure?orderId=${txnid}&amount=${amount}&status=${status}`

    console.log('Redirecting to:', redirectUrl)

    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': redirectUrl
      }
    })

  } catch (error) {
    console.error('PayU verification error:', error)
    
    // Redirect to failure page on error
    return new Response(null, {
      status: 302,
      headers: {
        ...corsHeaders,
        'Location': 'https://jaspreets-golden-gemstones.lovable.app/payment-failure?error=verification_failed'
      }
    })
  }
})
