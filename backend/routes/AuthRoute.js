import expres from "express";
import { register } from "../controllers/AuthController.js";

export const AuthRouter = expres.Router();

// POST /api/v1/auth/register
AuthRouter.post("/register", register);
