"use client";
import { useEffect, useState, useRef } from "react";
import { useRouter } from "next/navigation";
import { ReactNode } from "react";
import LoadingSpinner from "@/components/Shared/LoadingSpinner/LoadingSpinner";

interface DashboardLayoutProps {
  children: ReactNode;
}

const ProtectedRoute = ({ children }: DashboardLayoutProps) => {
  const router = useRouter();
  const [loading, setLoading] = useState(true);
  const [isAuthorized, setIsAuthorized] = useState(false);
  const verifiedRef = useRef(false);

  useEffect(() => {
    const verifyUser = async () => {
      if (verifiedRef.current) return;
      verifiedRef.current = true;

      try {
        const response = await fetch(
          `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/v1/auth/verify`,
          {
            method: "POST",
            credentials: "include",
          }
        );

        if (response?.ok) {
          setIsAuthorized(true);
        } else {
          router.push("/login");
        }
      } catch (error) {
        console.error("Error verifying user:", error);
        router.push("/login");
      } finally {
        setLoading(false);
      }
    };

    verifyUser();
  }, [router]);

  // Render loading state
  if (loading) {
    return <LoadingSpinner />;
  }

  // Render children if authorized
  return isAuthorized ? children : null;
};

export default ProtectedRoute;
