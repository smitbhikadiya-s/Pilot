import RowAtom from "../atoms/row";
import PageSectionHeader from "../molecules/pageSectionHeader";
import DashboardChartContainer from "./dashboardChartContainer";
import DashboardTableContainer from "./dashboardTableContainer";
import StatisticsCardContainer from "../molecules/statisticsCardContainer";

const DashboardContainer = () => {
  return (
    <>
      {/* Header */}
      <PageSectionHeader title="Dashboard" />

      {/* Stats Row */}
      <RowAtom gutter={[24, 24]} justify="center">
        <StatisticsCardContainer />
      </RowAtom>

      {/* Charts */}
      <RowAtom gutter={[24, 24]} style={{ marginTop: 40 }}>
        <DashboardChartContainer />
      </RowAtom>

      {/* Tables */}
      <RowAtom gutter={[24, 24]} style={{ marginTop: 40 }}>
        <DashboardTableContainer />
      </RowAtom>
    </>
  );
};

export default DashboardContainer;
