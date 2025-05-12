import mongoose from "mongoose";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
      minlength: [2, "Name must be at least 2 characters"],
    },
    password: {
      type: String,
      required: true,
      minlength: [6, "Password must be at least 6 characters"],
      
    },
    email: {
      type: String,
      required: [true, "Email is required"],
      unique: true,
      trim: true,
      lowercase: true,
      validate: {
        validator: (v) => /^\S+@\S+\.\S+$/.test(v),
        message: "Invalid email format",
      },
    },
    profilePic: {
      type: String,
      required: false,
      default: null,
    },
    coverImage: {
      type: String,
      required: false,
      default: null,
    },
    tasks: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Task",
      },
    ],
  },
  { timestamps: true }
);

// saving password as hash
UserSchema.pre("save", async function (next) {
  if (!this.isModified("password")) return next();
  this.password = await bcrypt.hash(this.password, 10);
  next();
});

// Comparing Password
// In user.model.js
UserSchema.methods.isPasswordCorrect = async function (password) {
  try {
    if (!password || !this.password) {
      throw new Error("Missing password or hash for comparison");
    }
    return await bcrypt.compare(password, this.password);
  } catch (error) {
    console.error("Password comparison error:", error);
    throw error; // Rethrow to handle in controller
  }
};

// generating token
UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { _id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    { expiresIn: "1d" }
  );
};

export const User = mongoose.model("User", UserSchema);

