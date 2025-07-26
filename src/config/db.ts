
import mongoose from "mongoose";

const MONGO_URI = process.env.MONGO_URI || "mongodb+srv://jaideeppatidar3421:iys6BMD5FfqdOkXm@cluster4.kloqasl.mongodb.net/?retryWrites=true&w=majority&appName=Cluster4";

export const connectDB = async (): Promise<void> => {
    try {
        const conn = await mongoose.connect(MONGO_URI);
        console.log(`MongoDB Connected: ${conn.connection.host}`);
    } catch (error) {
        console.error(" MongoDB connection error:", (error as Error).message);
        process.exit(1); 
    }
};
