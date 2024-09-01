import User from "@/models/User";
import { connectMongoDB } from "@/utils/database";
import { NextResponse } from "next/server";
import bcrypt from 'bcryptjs';

export async function POST(req) {
  try {
    const { gmail, username, password , confirmPassword} = await req.json();

    // Validate password and confirmPassword match
    if (password !== confirmPassword) {
      return NextResponse.json({ message: "Passwords do not match" }, { status: 400 });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    await connectMongoDB();

    // Check if user already exists
    const existingUser = await User.findOne({ gmail });
    if (existingUser) {
      return NextResponse.json({ message: "User already exists" }, { status: 400 });
    }

    // Create a new user
    await User.create({ gmail, username, password: hashedPassword });

    return NextResponse.json({ message: "User Registered!" }, { status: 201 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ message: "An error occurred while registering user" }, { status: 500 });
  }
}
