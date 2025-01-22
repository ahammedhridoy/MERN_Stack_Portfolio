import SectionHeading from "@/components/Helper/SectionHeading";
import { blogs } from "@/Data/data";
import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <section id="blogs" className="bg-[--dark-blue]">
      <div className="pt-16 pb-16 bg-[--dark-blue]">
        <SectionHeading>My Blogs</SectionHeading>
        <div className="w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-12 items-center">
          {blogs.map((blog, i) => {
            return (
              <div
                data-aos="zoom-in"
                data-aos-anchor-placement="top-center"
                data-aos-delay={`${i * 150}`}
                key={blog.id}
              >
                <BlogCard blog={blog} />
              </div>
            );
          })}
        </div>
      </div>

      {/* View More Button */}
      <div className="w-[80%] mx-auto py-10 flex items-center justify-center">
        <button
          data-aos="zoom-in"
          data-aos-delay="300"
          className="md:px-8 md:py-2.5 px-6 py-1.5 text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-8 bg-[--blue] hover:bg-blue-900 flex items-center space-x-2"
        >
          <span>VIEW MORE</span>
        </button>
      </div>
    </section>
  );
};

export default Blog;
