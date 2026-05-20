export async function POST({ request }) {

  try {

    const { text } = await request.json();

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB",
      {
        method: "POST",

        headers: {
          "Content-Type": "application/json",
          "xi-api-key": import.meta.env.ELEVENLABS_API_KEY
        },

        body: JSON.stringify({
          text: text,

          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8
          }
        })
      }
    );

    const audioBuffer = await response.arrayBuffer();

    return new Response(audioBuffer, {
      headers: {
        "Content-Type": "audio/mpeg"
      }
    });

  } catch (error) {

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
