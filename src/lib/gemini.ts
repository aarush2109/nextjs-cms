import { GoogleGenAI } from "@google/genai";

export async function generateContent(prompt: string): Promise<string> {
    const ai = new GoogleGenAI({
        apiKey: process.env.GEMINI_API_KEY!,
    });

    const response = await ai.models.generateContent({
        model: "gemini-2.5-flash", // ✅ works here
        contents: prompt,
    });

    return response.text ?? "";
}