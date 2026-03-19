import { NextResponse } from "next/server";
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

        // Determine Author: if not provided, fetch the first user as a fallback
        let authorId = author;
        if (!authorId) {
             const defaultUser = await User.findOne();
             if (defaultUser) {
                 authorId = defaultUser._id;
             } else {
                 return NextResponse.json({ success: false, error: "No user found in the database. Please create a user first." }, { status: 400 });
             }
        }

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
