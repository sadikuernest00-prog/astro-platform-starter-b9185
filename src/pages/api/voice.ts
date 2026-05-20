
export async function POST({ request }) {

  try {

    const body = await request.json();

    const response = await fetch(
      "https://api.elevenlabs.io/v1/text-to-speech/EXAVITQu4vr4xnSDxMaL",
      {
        method: "POST",

        headers: {
          "xi-api-key": import.meta.env.ELEVENLABS_API_KEY,
          "Content-Type": "application/json"
        },

        body: JSON.stringify({

          text: body.text,

          model_id: "eleven_multilingual_v2",

          voice_settings: {
            stability: 0.45,
            similarity_boost: 0.9,
            style: 0.6,
            use_speaker_boost: true
          }

        })
      }
    );

    const audio = await response.arrayBuffer();

    return new Response(audio, {
      headers: {
        "Content-Type": "audio/mpeg"
      }
    });

  } catch (error) {

    return new Response("Voice Error", {
      status: 500
    });

  }

}
