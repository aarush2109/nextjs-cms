import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";
import { slugify } from "@/utils/slugify";

export async function GET(req: Request) {
    try {
        await connectDB();
        
        const { searchParams } = new URL(req.url);
        const page = parseInt(searchParams.get("page") || "1");
        const statusParam = searchParams.get("status");
        const limit = 10;
        const skip = (page - 1) * limit;

        const query = statusParam === "all" ? {} : { status: "published" };

        const posts = await Post.find(query)
            .sort({ createdAt: -1 })
            .skip(skip)
            .limit(limit)
            .populate("author", "name email avatar");

        return NextResponse.json({
            success: true,
            data: posts
        }, { status: 200 });

    } catch (error: any) {
        console.error("GET /api/posts Error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}

export async function POST(req: Request) {
    try {
        await connectDB();
        
        const body = await req.json();
        const { title, content, excerpt, coverImage, tags, status, author } = body;

        // Validation
        if (!title || title.trim() === "") {
            return NextResponse.json({ success: false, error: "Title is required and cannot be empty" }, { status: 400 });
        }
        if (!content || content.trim() === "") {
            return NextResponse.json({ success: false, error: "Content is required and cannot be empty" }, { status: 400 });
        }

        // Generate Slug
        const slug = slugify(title);

        // Check if slug already exists
        const existingPost = await Post.findOne({ slug });
        if (existingPost) {
            return NextResponse.json({ success: false, error: "A post with a similar title already exists." }, { status: 400 });
        }

        const session = await getServerSession(authOptions);
        
        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const authorId = user._id;

        // Create the post
        const newPost = await Post.create({
            title,
            slug,
            content,
            excerpt,
            coverImage,
            tags: tags || [],
            status: status || "draft",
            author: authorId,
        });

        return NextResponse.json({
            success: true,
            data: newPost
        }, { status: 200 });

    } catch (error: any) {
        console.error("POST /api/posts Error:", error);
        return NextResponse.json({ success: false, error: "Server error" }, { status: 500 });
    }
}
