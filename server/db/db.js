import mongoose from "mongoose";
import dotenv from "dotenv";
dotenv.config();

const connectDB = async () => {
  try {
    const connection = await mongoose.connect(process.env.MONGO_URI, {
      dbName: "task_management",
    });
    console.log("Database Connected Successfully");
  } catch (error) {
    console.log("Error in Database Connection: ", error.message);
    process.exit(1);
  }
};

export default connectDB;
