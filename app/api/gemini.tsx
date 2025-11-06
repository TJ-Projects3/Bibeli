import { GoogleGenerativeAI } from "@google/generative-ai";

export async function GET() {
  // In production, use Supabase Edge Functions instead!
  const genAI = new GoogleGenerativeAI(
    process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""
  );

  try {
    // Get the Gemini Pro model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Generate content
    const prompt = "Write a haiku about code.";
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const outputText = response.text();

    return Response.json({ 
      output_text: outputText
    });
  } catch (error) {
    console.error("Gemini API error:", error);
    return Response.json({ 
      error: "Failed to get response from Gemini",
      details: error instanceof Error ? error.message : "Unknown error"
    }, { status: 500 });
  }
}