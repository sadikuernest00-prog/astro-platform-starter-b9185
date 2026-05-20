export async function POST({ request }) {

  try {

    const body = await request.json();

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB",
      {
        method: "POST",

        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": import.meta.env.ELEVENLABS_API_KEY
        },

        body: JSON.stringify({
          text: body.text,

          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.75
          }
        })
      }
    );

    if (!response.ok) {

      const errorText = await response.text();

      return new Response(errorText, {
        status: 500
      });

    }

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {

      headers: {
        "Content-Type": "audio/mpeg"
      }

    });

  } catch (err) {

    return new Response(
      JSON.stringify({
        error: "Voice failed"
      }),
      {
        status: 500
      }
    );

  }

}
