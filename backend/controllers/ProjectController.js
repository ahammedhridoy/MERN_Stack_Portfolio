import fs from "fs";
import path from "path";
import { Prisma } from "../Helper/prismaClient.js";

/**
 * METHOD: POST
 * API: /api/v1/project/create
 */
export const createProject = async (req, res) => {
  try {
    const { title, description, stack, url, github } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newProject = await Prisma.project.create({
      data: {
        title,
        description,
        image: imageUrl,
        stack,
        url,
        github,
      },
    });

    res
      .status(201)
      .json({ message: "Project created successfully.", project: newProject });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating project.", error: error.message });
  }
};

/**
 * METHOD: GET
 * API: /api/v1/project/all
 */
export const getAllProjects = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const projects = await Prisma.project.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Projects fetched successfully.", projects });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching projects.", error: error.message });
  }
};

/**
 * METHOD: GET
 * API: /api/v1/project/:id
 */
export const getSingleProject = async (req, res) => {
  const { id } = req.params;

  try {
    const project = await Prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    res.status(200).json({ message: "Project fetched successfully.", project });
  } catch (error) {
    console.error("Error fetching project:", error);
    res
      .status(500)
      .json({ message: "Error fetching project.", error: error.message });
  }
};

/**
 * METHOD: PATCH
 * API: /api/v1/project/:id
 */
export const updateProject = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description, stack, url, github } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the project exists
    const existingProject = await Prisma.project.findUnique({
      where: { id },
    });

    if (!existingProject) {
      return res.status(404).json({ message: "Project not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingProject.image) {
      const oldImagePath = path.join(__dirname, "..", existingProject.image);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old image:", err);
      });
    }

    // Update the project
    const updatedProject = await Prisma.project.update({
      where: { id },
      data: {
        title,
        description,
        stack,
        url,
        github,
        ...(imageUrl && { image: imageUrl }),
      },
    });

    if (!updatedProject) {
      return res
        .status(500)
        .json({ message: "Error updating project.", error: error.message });
    }

    res.status(200).json({
      message: "Project updated successfully.",
      project: updatedProject,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating project.", error: error.message });
  }
};

/**
 * METHOD: DELETE
 * API: /api/v1/project/:id
 */
export const deleteProject = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the project
    const project = await Prisma.project.findUnique({
      where: { id },
    });

    if (!project) {
      return res.status(404).json({ message: "Project not found." });
    }

    // Delete the image file (if exists)
    if (project.image) {
      const filePath = path.join(__dirname, "..", project.image);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message);
        }
      });
    }

    // Delete the project
    await Prisma.project.delete({
      where: { id },
    });

    res.status(200).json({ message: "Project deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting project.", error: error.message });
  }
};
