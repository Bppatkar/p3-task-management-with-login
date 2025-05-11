import mongoose from "mongoose";

const TaskSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
      trim: true,
      maxlength: [50, "Title cannot exceed 50 characters"],
    },
    startingDate: {
      type: Date,
      required: [true, "Starting date is required"],
      validate: {
        validator: function (value) {
          return value <= this.dueDate;
        },
        message: "Starting date must be before due date",
      },
    },
    dueDate: {
      type: Date,
      required: [true, "Due date is required"],
      validate: {
        validator: function (value) {
          return value >= this.startingDate;
        },
        message: "Due date must be after starting date",
      },
    },
    description: {
      type: String,
      required: [true, "Description is required"],
      trim: true,
    },
    status: {
      type: String,
      required: true,
      enum: {
        values: ["pending", "inProgress", "completed"],
        message: "Status must be either pending, inProgress, or completed",
      },
      default: "pending",
    },
    user: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: [true, "User reference is required"],
    },
  },
  { timestamps: true }
);

export const Task = mongoose.model("Task", TaskSchema);

