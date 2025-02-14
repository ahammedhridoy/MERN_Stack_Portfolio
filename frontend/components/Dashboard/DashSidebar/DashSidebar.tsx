"use client";
import { axiosPublic } from "@/Helper/axiosConfig";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import toast, { Toaster } from "react-hot-toast";

const DashSidebar = () => {
  const pathname = usePathname();
  const [loading, setLoading] = useState(false);

  // Logout
  const userLogout = async () => {
    setLoading(true);
    try {
      const response = await axiosPublic.post(`/api/v1/auth/logout`, {
        withCredentials: true,
      });

      if (response?.status === 200) {
        toast.success("Logged out successfully");
        window.location.href = "/";
      }
    } catch (error) {
      console.log(error);
      toast.error("An error occurred during logout");
    } finally {
      setLoading(false);
    }
  };

  const links = [
    { name: "Dashboard Overview", path: "/dashboard" },
    { name: "Blogs", path: "/dashboard/manage-blog" },
    { name: "Projects", path: "/dashboard/manage-product" },
    { name: "Settings", path: "/dashboard/settings" },
    { name: "Update Logo", path: "/dashboard/update-logo" },
    { name: "Update About", path: "/dashboard/update-about" },
    { name: "Update Contact", path: "/dashboard/update-contact" },
  ];

  return (
    <nav className="p-4">
      <Toaster />
      <ul className="space-y-4">
        {links.map((link) => (
          <li key={link.path}>
            <Link
              href={link.path}
              className={`block px-4 py-2 rounded ${
                pathname === link.path ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
            >
              {link.name}
            </Link>
          </li>
        ))}
        <li onClick={userLogout}>
          <Link href={""} className="block px-4 py-2 rounded hover:bg-gray-600">
            {loading ? "Loading..." : "Logout"}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export default DashSidebar;
