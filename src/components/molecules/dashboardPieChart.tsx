import React, { memo, useMemo } from "react";
import { useAppSelector } from "../../store";
import EmptyAtom from "../atoms/empty";
import { Title } from "../atoms/typography";
import PieAtom, { PieAtomConfig } from "../atoms/pie";

const DashboardPieChart: React.FC = () => {
  const items = useAppSelector((state) => state.menu.items);

  const categoryCounts = useMemo(
    () =>
      (items || []).reduce((acc: Record<string, number>, item) => {
        if (item.category) {
          acc[item.category] = (acc[item.category] || 0) + 1;
        }
        return acc;
      }, {}),
    [items]
  );

  const data = useMemo(
    () =>
      Object.entries(categoryCounts).map(([category, count]) => ({
        type: category,
        value: count,
      })),
    [categoryCounts]
  );

  const config: PieAtomConfig = useMemo(
    () => ({
      data,
      angleField: "value",
      colorField: "type",
      label: {
        text: "type",
        style: {
          fontWeight: "bold",
        },
      },
      legend: {
        color: {
          title: false,
          position: "top",
          rowPadding: 5,
        },
      },
    }),
    [data]
  );

  return (
    <>
      {data.length > 0 ? (
        <PieAtom {...config} />
      ) : (
        <EmptyAtom description="No data available to display." />
      )}
      <Title level={5} style={{ textAlign: "center", marginTop: 16 }}>
        Number of Items in Each Category
      </Title>
    </>
  );
};

export default memo(DashboardPieChart);
