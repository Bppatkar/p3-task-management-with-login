import mongoose from "mongoose";

const UserSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    password: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
    },
    profilePic: {
      type: String,
      required: false,
    },
    coverImage: {
      type: String,
      required: false,
    },
  },
  { timestamps: true }
);

export const User = mongoose.model("User", UserSchema);
