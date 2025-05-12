import express from "express";
const router = express.Router();
import {
  createTask,
  getTasks,
  getTask,
  updateTask,
  deleteTask,
} from "../controllers/task.controller.js";
import verifyToken from "../middleware/auth.js";

// Apply token verification to all routes
router.use(verifyToken);

router.route("/get-all-tasks").get(getTasks);
router.route("/create-task").post(createTask);
router.route("/get-task/:id").get(getTask);
router.route("/update-task/:id").patch(updateTask);
router.route("/delete-task/:id").delete(deleteTask);

export default router;
