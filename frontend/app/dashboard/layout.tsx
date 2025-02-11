import { ReactNode } from "react";
import DashSidebar from "@/components/Dashboard/DashSidebar/DashSidebar";

interface DashboardLayoutProps {
  children: ReactNode;
}

export default function DashboardLayout({ children }: DashboardLayoutProps) {
  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <aside className="w-64 text-white bg-gray-800">
        <DashSidebar />
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-4 overflow-auto bg-gray-100">{children}</main>
    </div>
  );
}
