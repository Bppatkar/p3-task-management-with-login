import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import verifyToken from "../middleware/auth.js  ";

// Apply token verification to all routes
router.use(verifyToken);

router.route("/").get(getTasks).post(createTask);

router.route("/:id").get(getTask).patch(updateTask).delete(deleteTask);

export default router;
