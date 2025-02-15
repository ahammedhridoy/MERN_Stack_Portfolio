import fs from "fs";
import path from "path";
import { Prisma } from "../Helper/prismaClient.js";

/**
 * METHOD: POST
 * API: /api/v1/skill/create
 */
export const createSkill = async (req, res) => {
  try {
    const { title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newSkill = await Prisma.skill.create({
      data: {
        title,
        image: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Skill created successfully.", skill: newSkill });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating skill.", error: error.message });
  }
};

/**
 * METHOD: GET
 * API: /api/v1/skill/all
 */
export const getAllSkills = async (req, res) => {
  try {
    // Fetch all skills from the database
    const skills = await Prisma.skill.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res.status(200).json({ message: "Skills fetched successfully.", skills });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching skills.", error: error.message });
  }
};

/**
 * METHOD: PATCH
 * API: /api/v1/skill/:id
 */
export const updateSkill = async (req, res) => {
  try {
    const { id } = req.params;
    const { title } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the skill exists
    const existingSkill = await Prisma.skill.findUnique({
      where: { id },
    });

    if (!existingSkill) {
      return res.status(404).json({ message: "Blog not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingSkill.image) {
      const oldImagePath = path.join(__dirname, "..", existingSkill.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the skill
    const updatedSkill = await Prisma.skill.update({
      where: { id },
      data: {
        title,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    if (!updatedSkill) {
      return res
        .status(500)
        .json({ message: "Error updating skill.", error: error.message });
    }

    res
      .status(200)
      .json({ message: "Skill updated successfully.", skill: updatedSkill });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating skill.", error: error.message });
  }
};

/**
 * METHOD: DELETE
 * API: /api/v1/skill/:id
 */
export const deleteSkill = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the skill
    const skill = await Prisma.skill.findUnique({
      where: { id },
    });

    if (!skill) {
      return res.status(404).json({ message: "skill not found." });
    }

    // Delete the image file (if exists)
    if (skill.image) {
      const filePath = path.join(__dirname, "..", skill.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message);
        }
      });
    }

    // Delete the skill
    await Prisma.skill.delete({
      where: { id },
    });

    res.status(200).json({ message: "skill deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting skill.", error: error.message });
  }
};
