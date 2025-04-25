import React, { memo, useMemo } from "react";
import { useAppSelector } from "../../store";
import { Title } from "../atoms/typography";
import BarAtom, { BarAtomConfig } from "../atoms/bar";
import EmptyAtom from "../atoms/empty";

const DashboardBarChart: React.FC = () => {
  const items = useAppSelector((state) => state.menu.items) || [];

  const ingredientCounts = useMemo(
    () =>
      items.reduce((acc: Record<string, number>, item) => {
        (item.ingredients || []).forEach((ingredient: string) => {
          acc[ingredient] = (acc[ingredient] || 0) + 1;
        });
        return acc;
      }, {}),
    [items]
  );

  const data = useMemo(
    () =>
      Object.entries(ingredientCounts)
        .map(([ingredient, count]) => ({ ingredient, count }))
        .sort((a, b) => b.count - a.count)
        .slice(0, 5),
    [ingredientCounts]
  );

  const config: BarAtomConfig = useMemo(
    () => ({
      data,
      xField: "ingredient",
      yField: "count",
      colorField: "ingredient",
      legend: true,
      label: {
        position: "middle",
        style: {
          fill: "#fff",
          fontSize: 12,
        },
        text: "count",
      },
      interactions: [{ type: "active-region" }],
    }),
    [data]
  );

  return (
    <>
      {data.length > 0 ? (
        <BarAtom {...config} />
      ) : (
        <EmptyAtom description="No data available to display." />
      )}
      <Title level={5} style={{ textAlign: "center", marginTop: 16 }}>
        Top 5 Most Used Ingredients Across All Items
      </Title>
    </>
  );
};

DashboardBarChart.displayName = "DashboardBarChart";

export default memo(DashboardBarChart);
