import { serve } from "https://deno.land/std@0.168.0/http/server.ts";

const GOOGLE_TRANSLATE_API_KEY = Deno.env.get('GOOGLE_TRANSLATE_API_KEY');

serve(async (req) => {
  try {
    const { text } = await req.json();
    
    const response = await fetch(
      `https://translation.googleapis.com/language/translate/v2/detect?key=${GOOGLE_TRANSLATE_API_KEY}`,
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          q: text
        }),
      }
    );

    const data = await response.json();
    const detectedLanguage = data?.data?.detections?.[0]?.[0]?.language;

    return new Response(
      JSON.stringify({ text: detectedLanguage }),
      { headers: { "Content-Type": "application/json" } }
    );
  } catch (error) {
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 400, headers: { "Content-Type": "application/json" } }
    );
  }
});