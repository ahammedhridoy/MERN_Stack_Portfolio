import express from "express";
import { verifyUser } from "../controllers/AuthController.js";
import {
  createReview,
  deleteReview,
  getAllReviews,
  updateReview,
} from "../controllers/ReviewController.js";

export const ReviewRouter = express.Router();

// POST /api/v1/review/create
ReviewRouter.post("/create", verifyUser, createReview);

// GET /api/v1/review/all
ReviewRouter.get("/all", getAllReviews);

// PATCH /api/v1/review/:id
ReviewRouter.patch("/:id", verifyUser, updateReview);

// DELETE /api/v1/review/:id
ReviewRouter.delete("/:id", verifyUser, deleteReview);
