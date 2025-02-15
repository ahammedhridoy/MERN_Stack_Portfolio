import express from "express";
import { verifyUser } from "../controllers/AuthController.js";
import {
  createProject,
  deleteProject,
  getAllProjects,
  getSingleProject,
  updateProject,
} from "../controllers/ProjectController.js";

export const ProjectRouter = express.Router();

// POST /api/v1/project/create
ProjectRouter.post("/create", verifyUser, createProject);

// GET /api/v1/project/all
ProjectRouter.get("/all", getAllProjects);

// GET /api/v1/project/:id
ProjectRouter.get("/:id", getSingleProject);

// PATCH /api/v1/project/:id
ProjectRouter.patch("/:id", verifyUser, updateProject);

// DELETE /api/v1/project/:id
ProjectRouter.delete("/:id", verifyUser, deleteProject);
