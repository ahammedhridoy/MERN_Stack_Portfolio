import { ReactNode } from "react";
import DashSidebar from "@/components/Dashboard/DashSidebar/DashSidebar";
import ProtectedRoute from "../ProtectedRoute";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <ProtectedRoute>
      <div className="flex h-screen">
        {/* Sidebar */}
        <aside className="w-64 text-white bg-[--light-blue]">
          <DashSidebar />
        </aside>

        {/* Main Content */}
        <main className="flex-1 p-4 overflow-auto bg-[--dark-blue]">
          {children}
        </main>
      </div>
    </ProtectedRoute>
  );
}
