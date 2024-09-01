import User from '../../../models/User'; // Adjust the path as needed
import mongoose from 'mongoose';
import bcrypt from 'bcrypt';

async function connectDB() {
  if (mongoose.connections[0].readyState) {
    return; // Already connected
  }

  await mongoose.connect(process.env.MONGODB_URI); // Replace with your MongoDB URI
}

// Handler for the POST request
export async function POST(req) {
  await connectDB(); // Ensure the database is connected

  const { gmail, username, password } = await req.json(); // Get data from request body

  // Basic validation
  if (!gmail || !username || !password) {
    return new Response(JSON.stringify({ message: "All fields are required" }), { status: 400 });
  }

  // Check if the user exists
  const user = await User.findOne({ gmail, username });
  if (!user) {
    console.log('User not found');
    return new Response(JSON.stringify({ message: "User not found" }), { status: 404 });
  }

  // Log the stored hashed password and the provided password
  console.log('Stored password hash:', user.password);
  console.log('Provided password:', password);

  // Compare the provided password with the stored hashed password
  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) {
    console.log('Password mismatch');
    return new Response(JSON.stringify({ message: "Invalid credentials" }), { status: 400 });
  }

  // If successful, send a success response
  console.log('Login successful');
  return new Response(JSON.stringify({ message: "Login successful" }), { status: 200 });
}
