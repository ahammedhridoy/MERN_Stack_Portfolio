import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from "../Helper/prismaClient.js";

/**
 * METHOD: POST
 * API: /api/v1/auth/register
 */
export const register = async (req, res) => {
  const { name, email, password, role } = req.body;

  // Validate user input
  if (!email || !password || !name || !role) {
    return res.status(400).json({ message: "Please enter all fields" });
  }

  try {
    // Check if user already exists
    const existingUser = await Prisma.user.findUnique({ where: { email } });

    if (existingUser) {
      return res.status(400).json({ message: "User already exists" });
    }

    // Hash the password
    const hashedPassword = await bcrypt.hash(password, 10);

    // Create the new user
    const data = {
      email,
      password: hashedPassword,
      name,
      role,
    };

    const user = await Prisma.user.create({ data });

    // Remove the password field from the user object before sending the response
    delete user.password;

    res.status(201).json({ message: "User registered successfully", user });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal server error" });
  }
};
