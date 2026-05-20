
export const prerender = false;

export async function POST({ request }) {

  try {

    const { text } = await request.json();

    const apiKey = import.meta.env.ELEVENLABS_API_KEY;

    if (!apiKey) {

      return new Response(
        JSON.stringify({
          error: "No API key found"
        }),
        {
          status: 500
        }
      );

    }

    const elevenResponse = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/pNInz6obpgDQGcFmaJgB",
      {
        method: "POST",

        headers: {
          "xi-api-key": apiKey,
          "Content-Type": "application/json",
          "Accept": "audio/mpeg"
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

    if (!elevenResponse.ok) {

      const errorText =
      await elevenResponse.text();

      console.log(errorText);

      return new Response(errorText, {
        status: 500
      });

    }

    const audioData =
    await elevenResponse.arrayBuffer();

    return new Response(audioData, {

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
