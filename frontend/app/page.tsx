import Home from "@/components/Home/Home";
import { Metadata } from "next";
import React from "react";

export const metadata: Metadata = {
  title: "Ashik Hridoy Portfolio",
  description: "Software Developer",
};

const HomePage = () => {
  return (
    <div>
      <Home />
    </div>
  );
};

export default HomePage;
