export async function POST({ request }) {
  const body = await request.json();

  const response = await fetch(
    "https://api.elevenlabs.io/v1/text-to-speech/21m00Tcm4TlvDq8ikWAM",
    {
      method: "POST",
      headers: {
        "xi-api-key": import.meta.env.ELEVENLABS_API_KEY,
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        text: body.text,
        model_id: "eleven_multilingual_v2",
      }),
    }
  );

  const audio = await response.arrayBuffer();

  return new Response(audio, {
    headers: {
      "Content-Type": "audio/mpeg",
    },
  });
}
