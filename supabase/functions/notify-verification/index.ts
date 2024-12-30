import { serve } from "https://deno.land/std@0.168.0/http/server.ts"

const RESEND_API_KEY = Deno.env.get('RESEND_API_KEY')

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    const { storeName, contactEmail } = await req.json()

    const emailContent = {
      from: 'Veryfy <notifications@veryfy.com>',
      to: [contactEmail],
      subject: 'Verification Request Received - Veryfy',
      html: `
        <h2>Thank you for submitting your verification request</h2>
        <p>Dear ${storeName},</p>
        <p>We have received your verification request and will review your company profile within the next 48 hours.</p>
        <p>Our team will carefully examine the provided documentation to ensure everything is in order.</p>
        <p>You will receive another email once the verification process is complete.</p>
        <p>Best regards,<br>The Veryfy Team</p>
      `
    }

    const res = await fetch('https://api.resend.com/emails', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${RESEND_API_KEY}`
      },
      body: JSON.stringify(emailContent)
    })

    const data = await res.json()
    
    return new Response(JSON.stringify(data), {
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      status: 200
    })
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' }, status: 500 }
    )
  }
})