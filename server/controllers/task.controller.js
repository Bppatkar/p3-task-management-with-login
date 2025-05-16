import { Task } from "../models/task.model.js";
import { User } from "../models/user.model.js";

export const getTasks = async (req, res) => {
  try {
    const tasks = await Task.find({ user: req.user._id });
    return res.status(200).json({
      success: true,
      tasks,
    });
  } catch (error) {
    console.error("Error in getting All Tasks: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const getTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in geting Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const createTask = async (req, res) => {
  try {
    const { title, startingDate, dueDate, status, description } = req.body;
    if (!title || !startingDate || !dueDate || !status || !description) {
      return res.status(400).json({
        success: false,
        message: "Please enter all fields",
      });
    }

    // Check for existing task with same title for this user
    const existingTask = await Task.findOne({
      title,
      user: req.user._id,
    });

    if (existingTask) {
      return res.status(400).json({
        success: false,
        message: "You already have a task with this title",
      });
    }

    // Create the task with user reference
    const task = await Task.create({
      title,
      startingDate,
      dueDate,
      status,
      description,
      user: req.user._id,
    });

    // Add task to user's tasks array
    await User.findByIdAndUpdate(req.user._id, {
      $push: { tasks: task._id },
    });

    return res.status(201).json({
      success: true,
      message: "Task created successfully",
      task,
    });
  } catch (error) {
    if (error.code === 11000) {
      return res.status(400).json({
        success: false,
        message:
          "Duplicate key error: A task with the same title already exists",
      });
    }
    console.error("Error in Creating Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const updateTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in Updating Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
export const deleteTask = async (req, res) => {
  try {
  } catch (error) {
    console.error("Error in Deleting Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};
