"use client";
import { navLinks } from "@/constant/constant";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import ScrollSpy from "react-ui-scrollspy";

const FloatMenu = () => {
  const [activeSection, setActiveSection] = useState("home");

  useEffect(() => {
    const handleIntersection = (entries: IntersectionObserverEntry[]) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          setActiveSection(entry.target.id);
        }
      });
    };

    const observer = new IntersectionObserver(handleIntersection, {
      root: null,
      threshold: 0.6,
    });

    navLinks.forEach((link) => {
      const element = document.getElementById(link.id);
      if (element) observer.observe(element);
    });
    return () => observer.disconnect();
  }, [activeSection]);

  return (
    <ScrollSpy>
      <div className="fixed top-1/2 lg:right-5 right-2 transform -translate-y-1/2 bg-[var(--light-blue)] p-2 rounded ">
        <div className="flex flex-col gap-2">
          {navLinks.map((navlink) => (
            <Link
              key={navlink.id}
              href={`#${navlink.id}`}
              className={`flex items-center gap-4 `}
              data-to-scrollspy-id={navlink.id}
            >
              <navlink.icon
                className={`w-6 h-6  ${
                  activeSection === navlink.id
                    ? "font-bold text-blue-400"
                    : "text-white"
                }`}
              />
              <p
                className={`nav__link hidden lg:block ${
                  activeSection === navlink.id
                    ? "font-bold text-blue-400"
                    : "text-white"
                }`}
              >
                {navlink.label}
              </p>
            </Link>
          ))}
        </div>
      </div>
    </ScrollSpy>
  );
};

export default FloatMenu;
