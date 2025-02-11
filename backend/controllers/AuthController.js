import fs from "fs";
import path from "path";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from "../Helper/prismaClient.js";
import { generateToken } from "../Helper/generateToken.js";
import cookie from "cookie";

/**
 * METHOD: POST
 * API: /api/v1/auth/register
 */
export const register = async (req, res) => {
  const { name, email, password } = req.body;

  // Validate user input
  if (!email || !password || !name) {
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

/**
 * METHOD: POST
 * API: /api/v1/auth/login
 */

export const login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Prisma.user.findUnique({ where: { email } });

    if (!user) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const passwordMatch = await bcrypt.compare(password, user.password);

    if (!passwordMatch) {
      return res.status(401).json({ message: "Invalid email or password" });
    }

    const { accessToken, refreshToken } = await generateToken(user);

    if (!accessToken || !refreshToken)
      throw new Error("Failed to generate tokens.");
    // Remove sensitive data
    const { password: _, ...userWithoutPassword } = user;

    // Set token in cookies
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60,
        path: "/",
      }),

      cookie.serialize("refreshToken", refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 300,
        path: "/",
      }),

      cookie.serialize("user", JSON.stringify(userWithoutPassword), {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        path: "/",
      }),
    ]);

    return res.status(200).json({
      message: "Login successful",
      user: userWithoutPassword,
      accessToken,
      refreshToken,
      isAuthenticated: true,
    });
  } catch (error) {
    console.error("Error logging in:", error);
    return res.status(500).json({ message: "Internal server error" });
  }
};

// Verify User
export const verifyUser = async (req, res, next) => {
  try {
    let token =
      req.cookies?.accessToken ||
      (req.headers.authorization && req.headers.authorization.split(" ")[1]);

    if (!token || token.split(".").length !== 3) {
      return await renewToken(req, res, next);
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error verifying token:", error.message);
    return res.status(401).json({ message: "Unauthorized: Invalid token" });
  }
};

// Renew Token
export const renewToken = async (req, res, next) => {
  try {
    const refreshToken = req.cookies?.refreshToken;

    if (!refreshToken) {
      return res
        .status(401)
        .json({ message: "Unauthorized: Missing refresh token" });
    }

    const decoded = jwt.verify(refreshToken, process.env.JWT_REFRESH_SECRET);

    const { accessToken, refreshToken: newRefreshToken } = await generateToken(
      decoded
    );

    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", accessToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 60, // 1 minute
        path: "/",
      }),

      cookie.serialize("refreshToken", newRefreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === "production",
        maxAge: 300, // 5 minutes
        path: "/",
      }),
    ]);

    req.user = decoded;
    next();
  } catch (error) {
    console.error("Error renewing token:", error);
    return res
      .status(401)
      .json({ message: "Unauthorized: Invalid refresh token" });
  }
};

// Authorized
export const authorized = async (req, res) => {
  res.status(200).json({ message: "Authorized" });
};
