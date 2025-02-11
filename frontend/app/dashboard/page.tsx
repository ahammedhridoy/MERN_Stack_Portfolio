import React from "react";
import { Card } from "@mui/material";
import DashOverview from "@/components/Dashboard/DashOverview/DashOverview";
import ProtectedRoute from "../ProtectedRoute";

const Dashboard = () => {
  return (
    <ProtectedRoute>
      <div>
        <Card className="min-h-screen p-4">
          <DashOverview />
        </Card>
      </div>
    </ProtectedRoute>
  );
};

export default Dashboard;
