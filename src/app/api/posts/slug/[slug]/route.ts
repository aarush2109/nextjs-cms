import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";

export async function GET(
    req: Request,
    context: { params: Promise<{ slug: string }> }
) {
    try {
        await connectDB();

        const { slug } = await context.params;

        if (!slug) {
            return NextResponse.json({ success: false, error: "Slug is required" }, { status: 400 });
        }

        const post = await Post.findOne({ slug }).populate("author", "name email avatar");

        if (!post) {
            return NextResponse.json({ success: false, error: "Post not found" }, { status: 404 });
        }

        return NextResponse.json({ success: true, data: post }, { status: 200 });

    } catch (error: any) {
        console.error("GET /api/posts/slug/[slug] Error:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
