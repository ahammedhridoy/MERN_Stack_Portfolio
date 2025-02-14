"use client";
import { axiosPublic } from "@/Helper/axiosConfig";
import { Card } from "@mui/material";
import { useParams, useRouter } from "next/navigation";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const ResetPasswordForm = () => {
  const [loading, setLoading] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const { token } = useParams();

  const router = useRouter();

  // Submit form
  const onSubmit = async (e: any) => {
    e.preventDefault();
    setLoading(true);

    if (!token) {
      toast.error("Invalid or missing token");
      return;
    }

    try {
      if (!password || !confirmPassword) {
        toast.error("Email is required");
        return;
      }

      if (password !== confirmPassword) {
        toast.error("Password and confirm password do not match");
        return;
      }

      const res = await axiosPublic.post("/api/v1/auth/reset-password", {
        token,
        newPassword: password,
      });

      if (res?.status === 200) {
        toast.success("Password updated successfully");

        setTimeout(() => router.push("/login"), 500);
      }
    } catch (error: any) {
      toast.error("Failed update password ");
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
          type="password"
          className="inputCss"
          placeholder="type new password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <input
          type="password"
          className="inputCss"
          placeholder="confirm new password"
          onChange={(e) => setConfirmPassword(e.target.value)}
        />

        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="md:px-8 md:py-2.5 px-6 py-1.5 w-full text-center text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-4 bg-[--blue] hover:bg-blue-900 "
          type="submit"
        >
          {loading ? "Updating Password..." : "Update Password"}
        </button>
      </form>
    </Card>
  );
};

export default ResetPasswordForm;
