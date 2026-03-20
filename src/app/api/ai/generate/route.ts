import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import { generateContent } from "@/lib/gemini";

const MAX_INPUT_LENGTH = 100000;

export async function POST(req: Request) {
    try {
        const session = await getServerSession(authOptions);
        if (!session || !session.user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const body = await req.json();
        const { type, input, tone = "professional" } = body;

        if (!type || !input) {
            return NextResponse.json({ success: false, error: "Missing type or input" }, { status: 400 });
        }

        if (input.length > MAX_INPUT_LENGTH) {
            return NextResponse.json({ success: false, error: "Input exceeds maximum allowed length" }, { status: 400 });
        }

        let prompt = "";

        // Customize the prompt based on the requested generation 'type'
        switch (type) {
            case "blog":
                prompt = `Write a detailed blog post on: "${input}". Include an engaging introduction, structured headings, and a concluding summary. Use a ${tone} tone. Format the output in clean, semantic HTML suitable for a rich text editor (e.g., using <h1>, <h2>, <p>, <ul>), but DO NOT include <!DOCTYPE>, <html>, or <body> tags.`;
                break;
            case "title":
                prompt = `Generate a single, catchy, engaging blog title for the following topic/content: "${input}". Provide just the title text itself without any quotes, bullet points, or numbering. Use a ${tone} tone.`;
                break;
            case "summary":
                prompt = `Write a short, engaging summary (2-3 sentences max) for the following blog content: "${input}". Do not use any formatting, just plain text.`;
                break;
            case "improve":
                prompt = `Improve the following content and make it more ${tone} and engaging: "${input}". Output the improved result as clean, semantic HTML suitable for a rich text editor.`;
                break;
            default:
                return NextResponse.json({ success: false, error: "Invalid generation type" }, { status: 400 });
        }

        const resultText = await generateContent(prompt);

        return NextResponse.json({ success: true, data: resultText }, { status: 200 });

    } catch (error: any) {
        console.error("AI GENERATE Error:", error);
        return NextResponse.json({ success: false, error: "Failed to generate AI content" }, { status: 500 });
    }
}
