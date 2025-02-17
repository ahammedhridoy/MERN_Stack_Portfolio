import Home from "@/components/Home/Home";
import ResponsiveNav from "@/components/Home/Navbar/ResponsiveNav";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ashik Hridoy Portfolio",
  description: "Software Developer",
};

const HomePage = () => {
  return (
    <div>
      <ResponsiveNav />
      <Home />
    </div>
  );
};

export default HomePage;
