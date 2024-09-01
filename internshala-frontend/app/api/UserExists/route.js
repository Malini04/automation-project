import User from "@/models/User";
import { connectMongoDB } from "@/utils/database";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        await connectMongoDB();
        const {gmail} = await req.json();
        const existingUser = await User.findOne({gmail}).select("_id");
        console.log(existingUser);
        if (existingUser) {
            // User found
            return NextResponse.json({ existingUser });
        } else {
            // User not found
            return NextResponse.json({ message: "User not registered" }, { status: 404 });
        }

    } catch (error) {
        console.error("Error finding user:", error);
        return NextResponse.json({ message: "An error occurred while checking user" }, { status: 500 });
    }
}