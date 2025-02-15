import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { Prisma } from "../Helper/prismaClient.js";
import { generateToken } from "../Helper/generateToken.js";
import cookie from "cookie";
import {
  invalidateToken,
  sendPasswordResetEmail,
  updatePassword,
  validateTokenAndGetEmail,
} from "../Helper/utils.js";

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
        maxAge: 60 * 60 * 24 * 7,
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

/**
 * METHOD: POST
 * API: /api/v1/auth/verify
 */
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

// Authorized
export const authorized = async (req, res) => {
  res.status(200).json({ message: "Authorized" });
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

/**
 * METHOD: POST
 * API: /api/v1/auth/logout
 */
export const logout = async (req, res) => {
  try {
    res.setHeader("Set-Cookie", [
      cookie.serialize("accessToken", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      }),
      cookie.serialize("refreshToken", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      }),
      cookie.serialize("user", "", {
        httpOnly: false,
        secure: process.env.NODE_ENV === "production",
        maxAge: 0,
        path: "/",
      }),
    ]);

    return res.status(200).json({ message: "Logout successful" });
  } catch (error) {
    console.error("Error logging out:", error);
    res.status(500).json({ message: "An error occurred during logout" });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/forgot-password
 */
export const forgotPassword = async (req, res) => {
  const { email } = req.body;
  if (!email) return res.status(404).json({ message: "No email found!" });
  try {
    // Check if the email exists in the database
    const user = await Prisma.user.findUnique({
      where: { email },
    });

    if (!user) return res.status(404).json({ message: "User not found" });

    const encoded = jwt.sign({ email }, process.env.JWT_SECRET, {
      expiresIn: "5min",
    });

    await Prisma.resetToken.create({
      data: {
        email,
        token: encoded,
      },
    });

    // Send password reset email
    await sendPasswordResetEmail(email, encoded, user?.name);

    res.status(200).json({ message: "Password reset email sent", encoded });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Error on forgot password" });
  }
};

/**
 * METHOD: POST
 * API: /api/v1/auth/reset-password
 */
export const resetPassword = async (req, res) => {
  const { token, newPassword } = req.body;

  if (!token || !newPassword) {
    return res
      .status(400)
      .json({ message: "Please provide both token and new password" });
  }

  try {
    const email = await validateTokenAndGetEmail(token);
    if (!email) {
      return res.status(400).json({ error: "Invalid or expired token" });
    }

    await updatePassword(email, newPassword);
    await invalidateToken(token);

    return res.status(200).json({ message: "Password updated successfully" });
  } catch (error) {
    console.error(error);
    return res.status(500).json({ message: "Error resetting password" });
  }
};
