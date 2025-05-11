import jwt from "jsonwebtoken";
import { User } from "../models/user.model.js";

const verifyToken = async (req, res, next) => {
  try {
    const token =
      req.cookies?.token || req.headers.authorization?.split(" ")[1];

    if (!token) {
      return res.status(401).json({
        success: false,
        message: "Unauthorized Access || NO Token Provided",
      });
    }
    const decodeToken = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decodeToken._id).select("-password");
    if (!user) {
      return res.status(401).json({
        success: false,
        message: " User Not Found",
      });
    }

    req.user = user;
    next();
  } catch (error) {
    console.log("Error in Verifying Token: ", error.message);
    return res.status(401).json({
      success: false,
      message: "Unauthorized Access - Invalid Token",
    });
  }
};

export default verifyToken;
