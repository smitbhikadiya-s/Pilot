import React from "react";
import DashboardContainer from "../components/organism/dashboardContainer";
import '../styles/dashboard.css';

const Dashboard: React.FC = () => {
  return (
    <div className="dashboard">
      <DashboardContainer />
    </div>
  );
};

export default Dashboard;
