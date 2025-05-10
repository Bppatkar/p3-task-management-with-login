import { User } from "../models/user.model.js";
import multer from "multer";
import path from "path";
import fs from "fs";

const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const publicPath = path.join(process.cwd(), "public");
    cb(null, publicPath);
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
  limits: { fileSize: 5 * 1024 * 1024 },
}).fields([
  { name: "profilePic", maxCount: 1 },
  { name: "coverImage", maxCount: 1 },
]);

const deleteFiles = async (filePaths) => {
  try {
    for (const filePath of filePaths) {
      await new Promise((resolve, reject) => {
        fs.unlink(filePath, (err) => {
          if (err && err.code !== "ENOENT") {
            reject(err);
          } else {
            resolve();
          }
        });
      });
    }
  } catch (error) {
    console.error("Error deleting files:", error);
  }
};

const registerUser = async (req, res) => {
  try {
    upload(req, res, async (err) => {
      if (err) {
        return res.status(400).json({
          success: false,
          message: err.message,
        });
      }

      const { name, password, email } = req.body;
      if (!name || !password || !email) {
        return res.status(400).json({
          success: false,
          message: "Please enter all fields",
        });
      }

      const userExists = await User.findOne({ email });
      if (userExists) {
        return res.status(409).json({
          success: false,
          message: "User with this email already exists",
        });
      }

      const profilePicPath = req.files?.profilePic?.[0]?.path || "";
      const coverImagePath = req.files?.coverImage?.[0]?.path || "";

      const newUser = await User.create({
        name,
        password,
        email,
        profilePic: profilePicPath,
        coverImage: coverImagePath,
      });

      if (!newUser) {
        await deleteFiles([profilePicPath, coverImagePath]);
        return res.status(500).json({
          success: false,
          message: "Failed to register user",
        });
      }

      return res
        .status(201)
        .json({ success: true, message: "User Registered Successfully " });
    });
  } catch (error) {
    console.error("Error in Registering User: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: "Both fields are mandatory to fill",
      });
    }
    const user = await User.findOne({ email });
    if (!user || !(await user.isPasswordCorrect(password))) {
      return res.status(400).json({
        success: false,
        message: "Incorrect email or password",
      });
    }

    const tokenForLogin = await user.generateToken();
    if (!tokenForLogin) {
      return res.status(500).json({
        success: false,
        message: "Failed to generate token",
      });
    }

    const options = {
      httpOnly: true,
      secure: true,
      sameSite: "none",
      expires: new Date(Date.now() + 24 * 60 * 60 * 1000),
    };

    return res
      .status(200)
      .cookie("token", tokenForLogin, options)
      .json({
        success: true,
        message: "User logged in successfully",
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
          profilePic: user.profilePic,
          coverImage: user.coverImage,
        },
      });
  } catch (error) {
    console.error("Error in Logging In User: ", error.message);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

const logoutUser = async (req, res) => {
  try {
    return res.status(200).clearCookie("token").json({
      success: true,
      message: "User logged out successfully",
    });
  } catch (error) {
    console.error("Logout error:", error);
    return res.status(500).json({
      success: false,
      message: "Internal server error",
    });
  }
};

export { registerUser, loginUser, logoutUser };
