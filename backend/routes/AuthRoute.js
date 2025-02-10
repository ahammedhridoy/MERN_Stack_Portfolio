import expres from "express";
import { login, register } from "../controllers/AuthController.js";

export const AuthRouter = expres.Router();

// POST /api/v1/auth/register
AuthRouter.post("/register", register);

// POST /api/v1/auth/login
AuthRouter.post("/login", login);
