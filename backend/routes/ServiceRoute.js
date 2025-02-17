import express from "express";
import { verifyUser } from "../controllers/AuthController.js";
import {
  createService,
  deleteService,
  getAllServices,
  updateService,
} from "../controllers/ServiceController.js";

export const ServiceRouter = express.Router();

// POST /api/v1/service/create
ServiceRouter.post("/create", verifyUser, createService);

// GET /api/v1/service/all
ServiceRouter.get("/all", getAllServices);

// PATCH /api/v1/service/:id
ServiceRouter.patch("/:id", verifyUser, updateService);

// DELETE /api/v1/service/:id
ServiceRouter.delete("/:id", verifyUser, deleteService);
