import SectionHeading from "@/components/Helper/SectionHeading";
import { blogs } from "@/Data/data";
import React from "react";
import BlogCard from "./BlogCard";

const Blog = () => {
  return (
    <section id="blogs">
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
    </section>
  );
};

export default Blog;
