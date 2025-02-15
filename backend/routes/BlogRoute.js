import express from "express";
import { verifyUser } from "../controllers/AuthController.js";
import {
  createBlog,
  deleteBlog,
  getAllBlogs,
  getSingleBlog,
  updateBlog,
} from "../controllers/blogController.js";

export const BlogRouter = express.Router();

// POST /api/v1/blog/create
BlogRouter.post("/create", verifyUser, createBlog);

// GET /api/v1/blog/all
BlogRouter.get("/all", getAllBlogs);

// GET /api/v1/blog/:id
BlogRouter.get("/:id", getSingleBlog);

// PATCH /api/v1/blog/:id
BlogRouter.patch("/:id", verifyUser, updateBlog);

// DELETE /api/v1/blog/:id
BlogRouter.delete("/:id", verifyUser, deleteBlog);
