import { GoogleGenerativeAI } from "@google/generative-ai";

const BIBLE_STUDY_PROMPT = `You are a helpful Bible study assistant. Answer questions about the Bible, theology, and Christian faith with accuracy and respect. 

User question: `;

export async function callGeminiAPI(userMessage: string): Promise<string> {
  if (!userMessage.trim()) {
    throw new Error("Empty message provided");
  }

  const genAI = new GoogleGenerativeAI(
    process.env.EXPO_PUBLIC_GEMINI_API_KEY || ""
  );

  if (!process.env.EXPO_PUBLIC_GEMINI_API_KEY) {
    throw new Error("GEMINI_API_KEY not found in environment variables!");
  }

  const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });
  const prompt = BIBLE_STUDY_PROMPT + userMessage;

  const result = await model.generateContent(prompt);
  const response = await result.response;
  return response.text();
}

