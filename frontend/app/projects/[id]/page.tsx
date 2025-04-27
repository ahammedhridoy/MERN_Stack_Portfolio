"use client";

import Nav from "@/components/Home/Navbar/Nav";
import { useGetSingleProjectQuery } from "@/services/projectData";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import React from "react";

interface Project {
  id: string;
  title: string;
  description: string;
  image: string;
  link: string;
  github: string;
}

const techIcons = [
  { key: "html", src: "/images/html.svg", alt: "HTML" },
  { key: "css", src: "/images/css.svg", alt: "CSS" },
  { key: "js", src: "/images/js.svg", alt: "JavaScript" },
  { key: "bootstrap", src: "/images/bootstrap.png", alt: "Bootstrap" },
  { key: "tailwind", src: "/images/tailwind.png", alt: "Tailwind CSS" },
  { key: "react", src: "/images/react.svg", alt: "React" },
  { key: "nextjs", src: "/images/nextjs.png", alt: "Next.js" },
  { key: "reactnative", src: "/images/reactnative.png", alt: "React Native" },
  { key: "ts", src: "/images/ts.svg", alt: "TypeScript" },
  { key: "node", src: "/images/node.svg", alt: "Node.js" },
  { key: "express", src: "/images/express.png", alt: "Express.js" },
  { key: "mongo", src: "/images/mongo.svg", alt: "MongoDB" },
  { key: "mysql", src: "/images/mysql.png", alt: "MySQL" },
  { key: "wordpress", src: "/images/wordpress.png", alt: "WordPress" },
  { key: "shopify", src: "/images/shopify.png", alt: "Shopify" },
];

const ProjectDetails = () => {
  const params = useParams();
  const projectId = params?.id as string; // Make sure it's string
  const { data, isLoading } = useGetSingleProjectQuery(projectId);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">Loading...</p>
      </div>
    );
  }

  if (!data || !data.project) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <p className="text-white text-lg">Project not found.</p>
      </div>
    );
  }

  const { project } = data;

  return (
    <>
      <Nav openNav={() => {}} />
      <div className="pt-16 pb-16 bg-[--dark-black] min-h-screen">
        <div className="w-[80%] mx-auto mt-20">
          <div className="bg-blue-950 p-6 rounded-lg ">
            {/* Project Image */}
            <Image
              src={process.env.NEXT_PUBLIC_IMAGE_URL + project.image}
              alt={project.title}
              width={300}
              height={300}
              quality={100}
              className="w-full h-[400px] object-cover rounded-md"
            />

            {/* Project Title */}
            <p className="text-xl mt-4 line-clamp-2 text-white">
              {project.title}
            </p>

            {/* Tech Stack (if needed, you can uncomment) */}

            <div className="flex items-center flex-wrap gap-2 mt-4">
              {project.stack.map((techKey: string, index: number) => {
                const techIcon = techIcons.find((icon) => icon.key === techKey);
                return (
                  techIcon && (
                    <Image
                      key={index}
                      src={techIcon.src}
                      alt={techIcon.alt}
                      width={30}
                      height={30}
                      className="hover:scale-110 transition-all duration-300 w-[40px] h-[40px] p-2 bg-[--dark-black] rounded-full"
                    />
                  )
                );
              })}
            </div>

            {/* Project Description */}
            <p
              className="text-white mt-4 single-project-description p-4"
              dangerouslySetInnerHTML={{ __html: project.description }}
            ></p>

            {/* Project Links */}
            <div className="flex items-center justify-end gap-4 mt-4">
              {project.url && (
                <Link href={project.url} target="_blank">
                  <Image
                    src="/images/webicon.png"
                    alt="Website"
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-all duration-300 w-[30px] h-[30px]"
                  />
                </Link>
              )}
              {project.github && (
                <Link href={project.github} target="_blank">
                  <Image
                    src="/images/github.png"
                    alt="GitHub"
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-all duration-300 w-[35px] h-[35px]"
                  />
                </Link>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ProjectDetails;
