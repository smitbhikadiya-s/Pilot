import ColAtom from "../atoms/col";
import DashboardPieChart from "../molecules/dashboardPieChart";
import CardAtom from "../atoms/card";
import DashboardBarChart from "../molecules/dashboardBarChart";
import React from "react";

const DashboardChartContainer: React.FC = () => {
  return (
    <>
      <ColAtom xs={24} md={12} sm={24}>
        <CardAtom
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <DashboardPieChart />
        </CardAtom>
      </ColAtom>
      <ColAtom xs={24} md={12} sm={24}>
        <CardAtom
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <DashboardBarChart />
        </CardAtom>
      </ColAtom>
    </>
  );
};

DashboardChartContainer.displayName = "DashboardChartContainer";

export default DashboardChartContainer;
