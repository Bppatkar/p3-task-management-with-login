import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: "http://localhost:5173", // Replace with your frontend URL
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Routes
import userRoutes from "./routes/user.routes.js";
app.use("/api/v1", userRoutes);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
