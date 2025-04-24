import React, { memo } from 'react';
import { useAppSelector } from '../../store';
import { Title } from '../atoms/typography';
import BarAtom, { BarAtomConfig } from '../atoms/bar';
import EmptyAtom from '../atoms/empty';

const DashboardBarChart: React.FC = () => {
  const items = useAppSelector((state) => state.menu.items) || [];

  // Count the frequency of each ingredient
  const ingredientCounts = items.reduce((acc: Record<string, number>, item) => {
    (item.ingredients || []).forEach((ingredient: string) => {
      acc[ingredient] = (acc[ingredient] || 0) + 1;
    });
    return acc;
  }, {});

  // Convert the counts to an array and sort to get top 5 ingredients
  const data = Object.entries(ingredientCounts)
    .map(([ingredient, count]) => ({ ingredient, count }))
    .sort((a, b) => b.count - a.count)
    .slice(0, 5); // Select top 5 ingredients

  const config: BarAtomConfig = {
    data,
    xField: 'ingredient',
    yField: 'count',
    colorField: 'ingredient',
    legend: true,
    label: {
      position: 'middle',
      style: {
        fill: '#fff',
        fontSize: 12,
      },
      text: 'count',
    },
    interactions: [{ type: 'active-region' }],
  };

  return (
    <>
      {data.length > 0 ? (
        <BarAtom {...config} />
      ) : (
        <EmptyAtom description="No data available to display." />
      )}
      <Title level={5} style={{ textAlign: 'center', marginTop: 16 }}>
        Top 5 Most Used Ingredients Across All Items
      </Title>
    </>
  )
};

export default memo(DashboardBarChart);
