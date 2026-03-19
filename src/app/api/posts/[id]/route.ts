import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User"; // ✅ Required for populate
import { slugify } from "@/utils/slugify";
import mongoose from "mongoose";

// =====================
// GET SINGLE POST
// =====================
export async function GET(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await context.params; // ✅ Next.js 15 fix

        console.log("GET ID:", id);

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const post = await Post.findById(id).populate(
            "author",
            "name email avatar"
        );

        if (!post) {
            return NextResponse.json(
                { success: false, error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: post },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("GET ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}

// =====================
// UPDATE POST
// =====================
export async function PUT(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await context.params;

        console.log("PUT ID:", id);

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const body = await req.json();
        const { title, content, excerpt, coverImage, tags, status } = body;

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { success: false, error: "Post not found" },
                { status: 404 }
            );
        }

        // Update fields
        if (title !== undefined) {
            post.title = title;
            post.slug = slugify(title);
        }

        if (content !== undefined) post.content = content;
        if (excerpt !== undefined) post.excerpt = excerpt;
        if (coverImage !== undefined) post.coverImage = coverImage;
        if (tags !== undefined) post.tags = tags;
        if (status !== undefined) post.status = status;

        await post.save();

        return NextResponse.json(
            { success: true, data: post },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("PUT ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}

// =====================
// DELETE POST
// =====================
export async function DELETE(
    req: Request,
    context: { params: Promise<{ id: string }> }
) {
    try {
        await connectDB();

        const { id } = await context.params;

        console.log("DELETE ID:", id);

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const deletedPost = await Post.findByIdAndDelete(id);

        if (!deletedPost) {
            return NextResponse.json(
                { success: false, error: "Post not found" },
                { status: 404 }
            );
        }

        return NextResponse.json(
            { success: true, data: {} },
            { status: 200 }
        );
    } catch (error: any) {
        console.error("DELETE ERROR:", error);
        return NextResponse.json(
            { success: false, error: "Server error" },
            { status: 500 }
        );
    }
}