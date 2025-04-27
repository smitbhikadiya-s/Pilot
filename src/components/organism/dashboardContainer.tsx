import RowAtom from '../atoms/row';
import PageSectionHeader from '../molecules/pageSectionHeader';
import DashboardChartContainer from './dashboardChartContainer';
import DashboardTableContainer from './dashboardTableContainer';
import StatisticsCardContainer from '../molecules/statisticsCardContainer';
import React from 'react';

const DashboardContainer: React.FC = () => {
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

DashboardContainer.displayName = 'DashboardContainer';

export default DashboardContainer;
