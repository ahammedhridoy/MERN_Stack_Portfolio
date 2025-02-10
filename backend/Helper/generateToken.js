import jwt from "jsonwebtoken";

export const generateToken = async (user) => {
  try {
    const payload = {
      id: user.id,
      email: user.email,
    };

    const accessToken = jwt.sign(payload, process.env.JWT_SECRET, {
      expiresIn: "365d",
    });

    const accessTokenExp = Math.floor(Date.now() / 1000) + 60 * 60 * 24 * 365;

    return { accessToken, accessTokenExp };
  } catch (error) {
    console.error("Error generating tokens:", error);
    throw new Error("Failed to generate tokens.");
  }
};
