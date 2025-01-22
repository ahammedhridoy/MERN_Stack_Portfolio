import SectionHeading from "@/components/Helper/SectionHeading";
import { projectData } from "@/Data/data";
import Image from "next/image";
import Link from "next/link";
import React from "react";

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

const Project = () => {
  return (
    <section id="projects">
      <div className="pt-16 pb-16 bg-[--dark-black] min-h-screen">
        <SectionHeading>My Projects</SectionHeading>

        <div className="w-[80%] mx-auto mt-20 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12 items-center">
          {projectData.map((project, i) => (
            <div
              data-aos="fade-up"
              data-aos-anchor-placement="top-center"
              data-aos-delay={`${i * 150}`}
              key={project.id}
              className="bg-blue-950 p-6 rounded-lg hover:scale-105 transition-all duration-300"
            >
              {/* Project Image */}
              <Link href={project.url} target="_blank">
                <Image
                  src={project.image}
                  alt={project.title}
                  width={300}
                  height={200}
                  className="w-full"
                />
              </Link>

              {/* Project Title */}
              <p className="text-xl mt-4 line-clamp-2 text-white">
                {project.title}
              </p>

              {/* Tech Stack */}
              <div className="flex items-center flex-wrap gap-2 mt-4">
                {project?.stack.map((techKey, index) => {
                  const techIcon = techIcons.find(
                    (icon) => icon.key === techKey
                  );
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

              {/* Project Links */}
              <div className="flex items-center justify-end gap-4 mt-4">
                {project.url && (
                  <Image
                    src="/images/webicon.png"
                    alt="Website"
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-all duration-300 w-[30px] h-[30px]"
                  />
                )}
                {project.github && (
                  <Image
                    src="/images/github.png"
                    alt="GitHub"
                    width={30}
                    height={30}
                    className="hover:scale-110 transition-all duration-300 w-[35px] h-[35px]"
                  />
                )}
              </div>
            </div>
          ))}
        </div>

        {/* View More Button */}
        <div className="w-[80%] mx-auto mt-10 flex items-center justify-center">
          <button
            data-aos="zoom-in"
            data-aos-delay="300"
            className="md:px-8 md:py-2.5 px-6 py-1.5 text-white font-semibold text-sm md:text-lg transition-all duration-200 rounded-lg mt-8 bg-[--blue] hover:bg-blue-900 flex items-center space-x-2"
          >
            <span>VIEW MORE</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default Project;
