import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User"; // ✅ Required for populate
import { slugify } from "@/utils/slugify";
import mongoose from "mongoose";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";

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

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await context.params;

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

        // Authorization check
        if (post.author.toString() !== user._id.toString()) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to edit this post." }, { status: 403 });
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

        const session = await getServerSession(authOptions);
        if (!session || !session.user?.email) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const user = await User.findOne({ email: session.user.email });
        if (!user) {
            return NextResponse.json({ success: false, error: "Unauthorized" }, { status: 401 });
        }

        const { id } = await context.params;

        if (!id || !mongoose.Types.ObjectId.isValid(id)) {
            return NextResponse.json(
                { success: false, error: "Invalid ID format" },
                { status: 400 }
            );
        }

        const post = await Post.findById(id);

        if (!post) {
            return NextResponse.json(
                { success: false, error: "Post not found" },
                { status: 404 }
            );
        }

        // Authorization check
        if (post.author.toString() !== user._id.toString()) {
            return NextResponse.json({ success: false, error: "Forbidden: You do not have permission to delete this post." }, { status: 403 });
        }

        await Post.findByIdAndDelete(id);

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