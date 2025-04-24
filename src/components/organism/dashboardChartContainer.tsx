import ColAtom from "../atoms/col";
import DashboardPieChart from "../molecules/dashboardPieChart";
import CardAtom from "../atoms/card";
import DashboardBarChart from "../molecules/dashboardBarChart";

const DashboardChartContainer = () => {
  return (
    <>
      <ColAtom xs={24} md={12}>
        <CardAtom
          bordered={false}
          style={{ borderRadius: 12, boxShadow: "0 2px 10px rgba(0,0,0,0.05)" }}
        >
          <DashboardPieChart />
        </CardAtom>
      </ColAtom>
      <ColAtom xs={24} md={12}>
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

export default DashboardChartContainer;
