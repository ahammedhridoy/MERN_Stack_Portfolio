import express from "express";
import { verifyUser } from "../controllers/AuthController.js";
import {
  createSkill,
  deleteSkill,
  getAllSkills,
  updateSkill,
} from "../controllers/SkillController.js";

export const SkillRouter = express.Router();

// POST /api/v1/skill/create
SkillRouter.post("/create", verifyUser, createSkill);

// GET /api/v1/skill/all
SkillRouter.get("/all", getAllSkills);

// PATCH /api/v1/skill/:id
SkillRouter.patch("/:id", verifyUser, updateSkill);

// DELETE /api/v1/skill/:id
SkillRouter.delete("/:id", verifyUser, deleteSkill);
