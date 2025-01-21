import SectionHeading from "@/components/Helper/SectionHeading";
import React from "react";
import Slider from "./Slider";

const Reviews = () => {
  return (
    <section id="reviews">
      <div className="pt-16 pb-16 bg-[--dark-black]">
        <SectionHeading>Client Reviews</SectionHeading>
        <div className="w-[90%] sm:w-[80%] mx-auto mt-20">
          <Slider />
        </div>
      </div>
    </section>
  );
};

export default Reviews;
