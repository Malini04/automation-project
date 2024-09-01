import mongoose from "mongoose";
// import dotenv from "dotenv";
// dotenv.config();

export const connectMongoDB = async () => {
    try {
        console.log("Connecting to MongoDB with URI:", process.env.MONGODB_URI);
        await mongoose.connect(process.env.MONGODB_URI);
        console.log("Connected to MongoDB.");
    } catch (error) {
        console.error("MongoDB connection error:", error);
    }
};

