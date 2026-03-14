import { NextResponse } from "next/server";
import { generateContent } from "@/lib/gemini";

export async function POST(request: Request) {
    try {
        const { prompt, tone } = await request.json();

        if (!prompt) {
            return NextResponse.json({ error: "Prompt is required" }, { status: 400 });
        }

        const content = await generateContent(prompt, tone || "professional");
        return NextResponse.json({ content }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to generate content" }, { status: 500 });
    }
}
