export async function transcribeAudio(audioUri: string): Promise<string> {
  // Read file and convert to blob
  const response = await fetch(audioUri);
  const blob = await response.blob();

  // Get Deepgram API key from environment variables
  const DEEPGRAM_API_KEY = process.env.EXPO_PUBLIC_DEEPGRAM_API_KEY || "";

  if (!DEEPGRAM_API_KEY) {
    throw new Error(
      "Please set EXPO_PUBLIC_DEEPGRAM_API_KEY in your .env file or app.config.js!"
    );
  }

  // Send audio to Deepgram for transcription
  const formData = new FormData();
  formData.append("audio", blob, "recording.m4a");

  const transcriptResponse = await fetch(
    "https://api.deepgram.com/v1/listen?model=nova-2&punctuate=true&language=en",
    {
      method: "POST",
      headers: {
        Authorization: `Token ${DEEPGRAM_API_KEY}`,
      },
      body: formData,
    }
  );

  if (!transcriptResponse.ok) {
    throw new Error("Deepgram API request failed");
  }

  const transcriptData = await transcriptResponse.json();

  // Extract transcript from Deepgram response
  const transcribedText =
    transcriptData.results?.channels?.[0]?.alternatives?.[0]?.transcript || "";

  if (!transcribedText) {
    throw new Error("No transcript received from Deepgram");
  }

  return transcribedText;
}

