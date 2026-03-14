import { NextResponse } from "next/server";

export async function GET() {
    // Placeholder for fetching posts
    return NextResponse.json({ posts: [] }, { status: 200 });
}

export async function POST(request: Request) {
    // Placeholder for creating a new post
    try {
        const body = await request.json();
        return NextResponse.json({ message: "Post created", data: body }, { status: 201 });
    } catch (error) {
        return NextResponse.json({ error: "Invalid request payload" }, { status: 400 });
    }
}
