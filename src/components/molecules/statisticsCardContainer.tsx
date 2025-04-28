import { useMemo } from 'react';
import ColAtom from '../atoms/col';
import CardAtom from '../atoms/card';

import {
  ShoppingOutlined,
  AppstoreOutlined,
  TagsOutlined,
} from '@ant-design/icons';
import { useAppSelector } from '../../store';
import { Text, Title } from '../atoms/typography';
import FlexAtom from '../atoms/flex';
import * as React from 'react';

interface Stats {
  title: string;
  value: number;
  icon: React.JSX.Element;
  backgroundColor: string;
}

const StatisticsCardContainer: React.FC = () => {
  const { ingredients, categories, items } = useAppSelector(
    state => state.menu,
  );

  const stats: Stats[] = useMemo(
    () => [
      {
        title: 'Total Items',
        value: items.length,
        icon: <ShoppingOutlined style={{ fontSize: 30, color: '#1890ff' }} />,
        backgroundColor: '#f0f5ff',
      },
      {
        title: 'Total Categories',
        value: categories.length,
        icon: <AppstoreOutlined style={{ fontSize: 30, color: '#722ed1' }} />,
        backgroundColor: '#f9f0ff',
      },
      {
        title: 'Total Ingredients',
        value: ingredients.length,
        icon: <TagsOutlined style={{ fontSize: 30, color: '#faad14' }} />,
        backgroundColor: '#fffbe6',
      },
    ],
    [items, categories, ingredients],
  );

  return (
    <>
      {stats.map(stat => (
        <ColAtom xs={24} sm={24} md={16} lg={8} key={stat.title}>
          <CardAtom
            bordered={false}
            style={{
              backgroundColor: stat.backgroundColor,
              borderRadius: 16,
              height: '100%',
              padding: '24px',
              boxShadow: '0 4px 20px rgba(0, 0, 0, 0.06)',
              transition: 'transform 0.3s',
            }}
            bodyStyle={{ padding: 0 }}
            hoverable
          >
            <FlexAtom align="center" justify="center" gap={16}>
              {stat.icon}
              <div>
                <Text type="secondary">{stat.title}</Text>
                <Title level={4} style={{ margin: 0 }}>
                  {stat.value}
                </Title>
              </div>
            </FlexAtom>
          </CardAtom>
        </ColAtom>
      ))}
    </>
  );
};

StatisticsCardContainer.displayName = 'StatisticsCardContainer';

export default StatisticsCardContainer;
