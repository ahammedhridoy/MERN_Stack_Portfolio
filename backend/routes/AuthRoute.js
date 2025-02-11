import expres from "express";
import {
  authorized,
  login,
  register,
  verifyUser,
} from "../controllers/AuthController.js";

export const AuthRouter = expres.Router();

// POST /api/v1/auth/register
AuthRouter.post("/register", register);

// POST /api/v1/auth/login
AuthRouter.post("/login", login);

// POST /api/v1/auth/verify
AuthRouter.post("/verify", verifyUser, authorized);
