import { NextResponse } from "next/server";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST() {
    await connectDB();

    const user = await User.create({
        name: "Test User",
        email: "test@example.com",
        avatar: "",
    });

    return NextResponse.json({
        success: true,
        user,
    });
}