import Register from '../../../models/register'; // Adjust the path as needed
import mongoose from 'mongoose';

async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }
  
  await mongoose.connect(process.env.MONGODB_URI); // Replace with your MongoDB URI
}

// Handler for the POST request
export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  const { gmail, username, password, confirmPassword } = await req.json(); // Get data from request body

  // Basic validation
  if (!gmail || !username || !password || !confirmPassword) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  if (password !== confirmPassword) {
    return new Response(JSON.stringify({ message: "Passwords do not match" }), { status: 400 });
  }

  // Check if the user already exists
  const userExists = await Register.findOne({ gmail });
  if (userExists) {
    return new Response(JSON.stringify({ message: "User already exists" }), { status: 400 });
  }

  // Create and save the new user
  const newUser = new Register({ gmail, username, password });
  await newUser.save();

  // If successful, send a success response
  return new Response(JSON.stringify({ message: "User registered successfully" }), { status: 201 });
}
