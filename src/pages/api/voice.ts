export const prerender = false;

export async function POST({ request }) {

  try {

    const { text } = await request.json();

    const apiKey = import.meta.env.ELEVENLABS_API_KEY;

    if (!apiKey) {

      return new Response(
        JSON.stringify({
          error: "Missing API key"
        }),
        {
          status: 500
        }
      );

    }

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB",
      {
        method: "POST",

        headers: {
          "Accept": "audio/mpeg",
          "Content-Type": "application/json",
          "xi-api-key": apiKey
        },

        body: JSON.stringify({
          text,

          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.5,
            similarity_boost: 0.8
          }
        })
      }
    );

    if (!response.ok) {

      const err = await response.text();

      console.log(err);

      return new Response(err, {
        status: 500
      });

    }

    const audio = await response.arrayBuffer();

    return new Response(audio, {

      headers: {
        "Content-Type": "audio/mpeg"
      }

    });

  } catch (error) {

    console.log(error);

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
