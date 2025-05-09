import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
  getAllUsers,
  getUserById,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(logoutUser);
router.route("/users").get(verifyToken, getAllUsers);
router.route("/users/:id").get(verifyToken, getUserById);
router.route("/users/:id").put(verifyToken, updateUser);
router.route("/users/:id").delete(verifyToken, deleteUser);

export default router;
