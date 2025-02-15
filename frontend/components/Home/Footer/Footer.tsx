import Image from "next/image";
import Link from "next/link";
import React from "react";

const Footer = () => {
  return (
    <div className="pt-10 pb-10 bg-[--dark-blue]">
      {/* Logo */}
      <div>
        <Image
          src="/images/ashik_logo.png"
          alt="logo"
          width={60}
          height={60}
          className="mx-auto"
        />
      </div>

      {/* Social Links */}
      <div className="flex items-center flex-wrap justify-center gap-4">
        <Link href={"https://www.facebook.com/ashikhridoyy"} target="_blank">
          <Image
            src="/images/facebook.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link
          href={"https://www.threads.net/@ashik_ahammed_hridoy"}
          target="_blank"
        >
          <Image
            src="/images/threads.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link
          href={"https://www.instagram.com/ashik_ahammed_hridoy/"}
          target="_blank"
        >
          <Image
            src="/images/instagram.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link href={"https://x.com/AhmedHridoy0"} target="_blank">
          <Image
            src="/images/x.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link
          href={"https://www.linkedin.com/in/ashik-ahammed-hridoy/"}
          target="_blank"
        >
          <Image
            src="/images/linkedin.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link href={"https://github.com/ahammedhridoy"} target="_blank">
          <Image
            src="/images/github2.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>

        <Link href={"https://www.youtube.com/@TECHNOLOGYNULL"} target="_blank">
          <Image
            src="/images/youtube.png"
            alt="logo"
            width={50}
            height={50}
            className="mx-auto p-2 bg-[--light-blue] rounded-full hover:scale-105 transition-all duration-300 cursor-pointer mt-4"
          />
        </Link>
      </div>
      <p className="text-white text-opacity-60 mt-6 text-center">
        © {new Date().getFullYear()} All Rights Reserved by Ashik Hridoy
      </p>
    </div>
  );
};

export default Footer;
