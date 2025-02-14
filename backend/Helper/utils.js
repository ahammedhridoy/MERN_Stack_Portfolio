import jwt from "jsonwebtoken";
import nodemailer from "nodemailer";
import bcrypt from "bcryptjs";
import { Prisma } from "../Helper/prismaClient.js";

// Send password reset email
export const sendPasswordResetEmail = async (email, token, name) => {
  // Create Nodemailer transporter
  let transporter = nodemailer.createTransport({
    service: "Gmail",
    auth: {
      user: process.env.SMTP_AUTH_USER,
      pass: process.env.SMTP_AUTH_PASSWORD,
    },
  });

  // Properly encode the token in the reset password URL
  const resetPasswordUrl = `${
    process.env.CLIENT_DOMAIN
  }/reset-password/${encodeURIComponent(token)}`;

  // Send email with password reset link
  await transporter.sendMail({
    from: `Ashik Hridoy Portfolio ${process.env.SMTP_AUTH_USER}`,
    to: email,
    subject: `Password Reset Link`,
    priority: "high",
    html: `
      <div style="width: 100%; height: auto; padding: 15px 10px; text-align: center;">
        <h1 style="font-size: 25px;">Hi ${name}</h1>
        <div>
          <p>You have requested to reset your password. Please click on the button below to continue.<br>If you did not request a password reset, please ignore this email. <br> <p> <strong>NOTE: This link will expire in 5 minutes. </p></strong>
          <a href="${resetPasswordUrl}" style="background: blue; color: white; font-weight: 500; font-size: 17px; padding: 7px 15px; text-decoration: none; border-radius: 6px; margin-top: 7px">Reset Password</a>
        </div>
      </div>
    `,
  });
};

// Validate token and get email
export async function validateTokenAndGetEmail(token) {
  try {
    // Decode the token to handle URL-encoded characters
    const decodedToken = decodeURIComponent(token);

    const decoded = jwt.verify(decodedToken, process.env.JWT_SECRET);

    const resetToken = await Prisma.resetToken.findFirst({
      where: {
        email: decoded.email,
        token: decodedToken,
      },
    });

    if (!resetToken) {
      throw new Error("Token does not exist in database");
    }

    return resetToken.email;
  } catch (err) {
    console.error("Error validating token:", err.message);
    throw new Error("Invalid token");
  }
}

// Update password
export async function updatePassword(email, newPassword) {
  try {
    const hashedPassword = await bcrypt.hash(newPassword, 10);

    // Check if user exists
    const user = await Prisma.user.findUnique({ where: { email } });
    if (!user) throw new Error("User not found");

    // Update the password
    await Prisma.user.update({
      where: { email },
      data: { password: hashedPassword },
    });
  } catch (error) {
    console.error("Error updating password:", error.message);
    throw error;
  }
}

// Invalidate token
export async function invalidateToken(token) {
  try {
    const deleted = await Prisma.resetToken.deleteMany({
      where: { token },
    });

    if (!deleted.count) throw new Error("Token not found for deletion");
  } catch (error) {
    console.error("Error invalidating token:", error.message);
    throw error;
  }
}
