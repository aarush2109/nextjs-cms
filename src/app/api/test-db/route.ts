import { NextResponse } from "next/server";
import connectDB from "@/lib/db";

export async function GET() {
    try {
        await connectDB();
        return NextResponse.json({
            status: "Database connected",
            time: new Date().toISOString(),
        });
    } catch (error) {
        console.error("Database connection failed:", error);
        return NextResponse.json(
            { error: "Internal Server Error", message: "Database connection failed" },
            { status: 500 }
        );
    }
}
