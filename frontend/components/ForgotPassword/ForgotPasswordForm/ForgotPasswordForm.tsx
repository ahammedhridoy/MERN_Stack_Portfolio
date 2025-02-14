"use client";
import { axiosPublic } from "@/Helper/axiosConfig";
import { Card } from "@mui/material";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ForgotPasswordForm = () => {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);

  const router = useRouter();

  // Submit form
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);
    try {
      if (!email) {
        toast.error("Email is required");
        return;
      }

      const res = await axiosPublic.post("/api/v1/auth/forgot-password", {
        email,
      });

      if (res?.status === 200) {
        toast.success("Password reset email sent");

        setTimeout(() => router.push("/login"), 500);
      }
    } catch (error: any) {
      toast.error("Failed to send password reset email");
    } finally {
      setLoading(false);
    }
  };

  return (
    <Card
      sx={{ maxWidth: 445 }}
      className="shadow-2xl p-6 rounded-lg bg-[--light-blue]"
    >
      <Toaster />
      <form onSubmit={onSubmit}>
        <input
          type="text"
          className="inputCss"
          placeholder="enter email"
          onChange={(e) => setEmail(e.target.value)}
        />

        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="md:px-8 md:py-2.5 px-6 py-1.5 w-full text-center text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-4 bg-[--blue] hover:bg-blue-900 "
          type="submit"
        >
          {loading
            ? "Sending Password Reset Link..."
            : "Send Password Reset Link"}
        </button>
      </form>
    </Card>
  );
};

export default ForgotPasswordForm;
