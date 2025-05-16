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
    const task = await Task.findOne({
      _id: req.params.id,
      user: req.user._id
    });

    if (!task) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      task,
    });
  } catch (error) {
    console.error("Error in getting Task: ", error.message);
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

    const task = await Task.create({
      title,
      startingDate,
      dueDate,
      status,
      description,
      user: req.user._id,
    });

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
        message: "Duplicate key error: A task with the same title already exists",
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
    const { title, startingDate, dueDate, status, description } = req.body;
    
    const updatedTask = await Task.findOneAndUpdate(
      {
        _id: req.params.id,
        user: req.user._id
      },
      {
        title,
        startingDate,
        dueDate,
        status,
        description,
      },
      { new: true }
    );

    if (!updatedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    return res.status(200).json({
      success: true,
      message: "Task updated successfully",
      task: updatedTask,
    });
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
    const deletedTask = await Task.findOneAndDelete({
      _id: req.params.id,
      user: req.user._id
    });

    if (!deletedTask) {
      return res.status(404).json({
        success: false,
        message: "Task not found",
      });
    }

    await User.findByIdAndUpdate(req.user._id, {
      $pull: { tasks: deletedTask._id },
    });

    return res.status(200).json({
      success: true,
      message: "Task deleted successfully",
    });
  } catch (error) {
    console.error("Error in Deleting Task: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};