import expres from "express";
import {
  authorized,
  forgotPassword,
  login,
  logout,
  register,
  resetPassword,
  verifyUser,
} from "../controllers/AuthController.js";

export const AuthRouter = expres.Router();

// POST /api/v1/auth/register
AuthRouter.post("/register", register);

// POST /api/v1/auth/login
AuthRouter.post("/login", login);

// POST /api/v1/auth/verify
AuthRouter.post("/verify", verifyUser, authorized);

// POST /api/v1/auth/logut
AuthRouter.post("/logout", verifyUser, logout);

// POST /api/v1/auth/forgot-password
AuthRouter.post("/forgot-password", forgotPassword);

// POST /api/v1/auth/reset-password
AuthRouter.post("/reset-password", resetPassword);
