import fs from "fs";
import path from "path";
import { Prisma } from "../Helper/prismaClient.js";

/**
 * METHOD: POST
 * API: /api/v1/service/create
 */
export const createService = async (req, res) => {
  try {
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    const newService = await Prisma.service.create({
      data: {
        title,
        description,
        icon: imageUrl,
      },
    });

    res
      .status(201)
      .json({ message: "Service created successfully.", service: newService });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error creating service.", error: error.message });
  }
};

/**
 * METHOD: GET
 * API: /api/v1/service/all
 */
export const getAllServices = async (req, res) => {
  try {
    // Fetch all blogs from the database
    const services = await Prisma.service.findMany({
      orderBy: { updatedAt: "desc" },
    });

    res
      .status(200)
      .json({ message: "Services fetched successfully.", services });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error fetching services.", error: error.message });
  }
};

/**
 * METHOD: PATCH
 * API: /api/v1/service/:id
 */
export const updateService = async (req, res) => {
  try {
    const { id } = req.params;
    const { title, description } = req.body;
    const imageUrl = req.file ? `/uploads/${req.file.filename}` : null;

    // Check if the service exists
    const existingService = await Prisma.service.findUnique({
      where: { id },
    });

    if (!existingService) {
      return res.status(404).json({ message: "Service not found." });
    }

    // If a new image is uploaded, delete the old one
    if (imageUrl && existingService.icon) {
      const oldImagePath = path.join(__dirname, "..", existingService.icon);
      fs.unlink(oldImagePath, (err) => {
        if (err) console.error("Error deleting old icon:", err);
      });
    }

    // Update the service
    const updatedService = await Prisma.service.update({
      where: { id },
      data: {
        title,
        description,
        ...(imageUrl && { icon: imageUrl }),
      },
    });

    if (!updatedService) {
      return res
        .status(500)
        .json({ message: "Error updating service.", error: error.message });
    }

    res.status(200).json({
      message: "Service updated successfully.",
      service: updatedService,
    });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error updating service.", error: error.message });
  }
};

/**
 * METHOD: DELETE
 * API: /api/v1/service/:id
 */
export const deleteService = async (req, res) => {
  try {
    const { id } = req.params;

    // Find the blog
    const service = await Prisma.service.findUnique({
      where: { id },
    });

    if (!service) {
      return res.status(404).json({ message: "Service not found." });
    }

    // Delete the image file (if exists)
    if (service.icon) {
      const filePath = path.join(__dirname, "..", service.icon);
      fs.unlink(filePath, (err) => {
        if (err) {
          console.error("Error deleting file:", err.message);
        }
      });
    }

    // Delete the service
    await Prisma.service.delete({
      where: { id },
    });

    res.status(200).json({ message: "Service deleted successfully." });
  } catch (error) {
    res
      .status(500)
      .json({ message: "Error deleting service.", error: error.message });
  }
};
