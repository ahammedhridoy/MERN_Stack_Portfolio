import fs from "fs";
import path from "path";
import { Prisma } from "../Helper/prismaClient.js";

/**
 * METHOD: POST
 * API: /api/v1/review/create
 */
export const createReview = async (req, res) => {
  try {
    const { name, review, rating, profession } = req.body;

    const newReview = await Prisma.review.create({
      data: {
        name,
        review,
        rating,
        profession,
      },
    });

    res
      .status(201)
      .json({ message: "Review created successfully.", review: newReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating review.", error: error.message });
  }
};

/**
 * METHOD: GET
 * API: /api/v1/review/all
 */
export const getAllReviews = async (req, res) => {
  try {
    // Fetch all skills from the database
    const reviews = await Prisma.review.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({ message: "Reviews fetched successfully.", reviews });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching reviews.", error: error.message });
  }
};

/**
 * METHOD: PATCH
 * API: /api/v1/review/:id
 */
export const updateReview = async (req, res) => {
  try {
    const { id } = req.params;
    const { name, review, rating, profession } = req.body;

    // Check if the review exists
    const existingReview = await Prisma.review.findUnique({
      where: { id },
    });

    if (!existingReview) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Update the review
    const updatedReview = await Prisma.review.update({
      where: { id },
      data: {
        name,
        review,
        rating,
        profession,
      },
    });

    if (!updatedReview) {
      return res
        .status(500)
        .json({ message: "Error updating review.", error: error.message });
    }

    res
      .status(200)
      .json({ message: "Review updated successfully.", review: updatedReview });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating review.", error: error.message });
  }
};

/**
 * METHOD: DELETE
 * API: /api/v1/review/:id
 */
export const deleteReview = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the Review
    const review = await Prisma.review.findUnique({
      where: { id },
    });

    if (!review) {
      return res.status(404).json({ message: "Review not found." });
    }

    // Delete the review
    await Prisma.review.delete({
      where: { id },
    });

    res.status(200).json({ message: "Review deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting review.", error: error.message });
  }
};
