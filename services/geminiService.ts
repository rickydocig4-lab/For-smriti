
import { GoogleGenAI, Type } from "@google/genai";

export async function generateLoveNote(mood: string): Promise<string> {
  const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });
  
  try {
    const response = await ai.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `Generate a short, heartfelt, and deeply romantic love note for someone named Smriti. The mood should be ${mood}. Keep it under 50 words and make it feel like a warm hug. Include a few cute emojis.`,
      config: {
        temperature: 0.9,
      },
    });

    return response.text?.trim() || "I love you more than words can say, Smriti. 🤍";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Every moment with you is a gift I'll cherish forever. 🤍";
  }
}
