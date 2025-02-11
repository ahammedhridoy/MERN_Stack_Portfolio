"use client";
import { axiosPublic } from "@/Helper/axiosConfig";
import { Card } from "@mui/material";
import React, { useState } from "react";
import { toast } from "react-hot-toast";
import { Toaster } from "react-hot-toast";

const LoginForm = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   Handle Login Form
  const handleSubmit = async (e: any) => {
    e.preventDefault();

    if (!email || !password) {
      toast.error("Please enter all fields");
      return;
    }

    if (password.length < 6) {
      toast.error("Password must be at least 6 characters");
      return;
    }

    if (email === "") {
      toast.error("Please enter email");
      return;
    }

    if (password === "") {
      toast.error("Please enter password");
      return;
    }

    try {
      const res = await axiosPublic.post(`/api/v1/auth/login`, {
        email,
        password,
      });

      if (res?.status === 401) {
        toast.error(res?.data?.message);
        return;
      }

      if (res?.status === 200) {
        toast.success("Login successfully!");
        window.location.href = "/dashboard";
      }
    } catch (error: any) {
      if (error?.response) {
        toast.error(error?.response.data.message || "Something went wrong!");
      } else {
        toast.error("Network error, please try again.");
      }
    }
  };
  return (
    <Card
      sx={{ maxWidth: 345 }}
      className="shadow-2xl p-6 rounded-lg bg-[--light-blue]"
    >
      <Toaster />
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          className="inputCss"
          placeholder="email"
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          className="inputCss"
          placeholder="password"
          onChange={(e) => setPassword(e.target.value)}
        />

        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="md:px-8 md:py-2.5 px-6 py-1.5 w-full text-center text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-4 bg-[--blue] hover:bg-blue-900 "
          type="submit"
        >
          Login
        </button>
      </form>
    </Card>
  );
};

export default LoginForm;
