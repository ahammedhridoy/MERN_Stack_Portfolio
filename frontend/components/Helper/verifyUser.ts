"use client";
import axios from "axios";

export const verifyUser = async () => {
  try {
    // Send a request to the backend to verify the user
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify`,
      {},
      {
        withCredentials: true,
      }
    );

    // Check if the response indicates verification success
    if (response?.status === 200 && response?.data?.verified) {
      return true; // User is verified
    } else {
      console.log("User is not verified");
      window.location.href = "/login";
      return false; // User is not verified
    }
  } catch (error) {
    console.error("Verification failed:", error);
    window.location.href = "/login";
    return false; // Return false if there's an error
  }
};
