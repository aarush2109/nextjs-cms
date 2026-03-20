import { NextResponse } from "next/server";
import { getServerSession } from "next-auth";
import { authOptions } from "@/app/api/auth/[...nextauth]/route";
import connectDB from "@/lib/db";
import Post from "@/models/Post";
import User from "@/models/User";

export async function GET(req: Request) {
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

        const posts = await Post.find({ author: user._id })
            .sort({ createdAt: -1 })
            .populate("author", "name email avatar");

        return NextResponse.json({ success: true, data: posts }, { status: 200 });

    } catch (error: any) {
        console.error("GET /api/posts/my Error:", error);
        return NextResponse.json({ success: false, error: "Server Error" }, { status: 500 });
    }
}
