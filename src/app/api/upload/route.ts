import { NextResponse } from "next/server";
import { uploadImage } from "@/lib/cloudinary";

export async function POST(request: Request) {
    try {
        const formData = await request.formData();
        const file = formData.get("file") as File;

        if (!file) {
            return NextResponse.json({ error: "File is required" }, { status: 400 });
        }

        const url = await uploadImage(file);
        return NextResponse.json({ url }, { status: 200 });
    } catch (error) {
        return NextResponse.json({ error: "Failed to upload image" }, { status: 500 });
    }
}
