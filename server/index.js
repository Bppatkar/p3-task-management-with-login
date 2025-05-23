import express from "express";
import cookieParser from "cookie-parser";
import cors from "cors";
import path from "path";
import dotenv from "dotenv";
dotenv.config();
import connectDB from "./db/db.js";

const app = express();
const PORT = process.env.PORT || 3000;

const corsOptions = {
  origin: [
    "http://localhost:5173",
    "https://p3-task-management-with-login.vercel.app",
  ],
  methods: ["GET", "POST", "PUT", "PATCH", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true, // Allow credentials (cookies, authorization headers, etc.)
};

app.use(cors(corsOptions));
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Update your static file serving
app.use("/public", express.static(path.join(process.cwd(), "public")));

// Routes
import userRoutes from "./routes/user.routes.js";
import userTasks from "./routes/task.route.js";
app.use("/api/v1", userRoutes);
app.use("/api/v1/tasks", userTasks);

app.listen(PORT, () => {
  connectDB();
  console.log(`Server is running on http://localhost:${PORT}`);
});
