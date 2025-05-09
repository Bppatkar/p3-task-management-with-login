import express from "express";
const router = express.Router();
import {
  registerUser,
  loginUser,
  logoutUser,
} from "../controllers/user.controller.js";
import verifyToken from "../middleware/auth.js";

router.route("/register").post(registerUser);
router.route("/login").post(loginUser);
router.route("/logout").post(verifyToken, logoutUser);

export default router;
