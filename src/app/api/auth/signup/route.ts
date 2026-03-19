import { NextResponse } from "next/server";
import bcrypt from "bcryptjs";
import connectDB from "@/lib/db";
import User from "@/models/User";

export async function POST(req: Request) {
    try {
        await connectDB();
        const { name, email, password } = await req.json();

        // Validate required fields
        if (!name || !email || !password) {
            return NextResponse.json(
                { success: false, error: "Please provide all required fields." },
                { status: 400 }
            );
        }

        // Check if user already exists
        const existingUser = await User.findOne({ email });
        if (existingUser) {
            return NextResponse.json(
                { success: false, error: "A user with this email already exists." },
                { status: 400 }
            );
        }

        // Hash the password securely
        const hashedPassword = await bcrypt.hash(password, 10);

        // Create the user
        const newUser = await User.create({
            name,
            email,
            password: hashedPassword,
        });

        // Exclude the password from the resonse object
        const userWithoutPassword = {
            id: newUser._id,
            name: newUser.name,
            email: newUser.email,
        };

        return NextResponse.json(
            { success: true, data: userWithoutPassword },
            { status: 201 }
        );
    } catch (error: any) {
        console.error("Signup Error:", error);
        return NextResponse.json(
            { success: false, error: "Internal Server Error" },
            { status: 500 }
        );
    }
}
