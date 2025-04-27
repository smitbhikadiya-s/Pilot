import React, { useMemo } from 'react';
import { useAppSelector } from '../../store';
import TableAtom, { TableAtomColumnType } from '../atoms/table';
import TagAtom from '../atoms/tag';
import { Category } from '../../interface/types';
import { Text } from '../atoms/typography';

import '../../styles/recentlyitem.css';

interface Item {
  id: string;
  itemName: string;
  category: string;
  ingredients: string[];
  pricing: number;
  description?: string;
  createdAt?: string;
}

const RecentItemsTable: React.FC = () => {
  const items = useAppSelector(state => state.menu.items);

  const sortedItems = useMemo(
    () =>
      [...items]
        .sort(
          (a, b) =>
            new Date(b.createdAt || 0).getTime() -
            new Date(a.createdAt || 0).getTime(),
        )
        .slice(0, 10),
    [items],
  );

  const columns: TableAtomColumnType<Item> = useMemo(
    () => [
      {
        title: 'Item Name',
        dataIndex: 'itemName',
        key: 'itemName',
        render: (text: string) => (
          <span style={{ fontWeight: 600, fontSize: '16px' }}>{text}</span>
        ),
        width: 150,
      },
      {
        title: 'Category',
        dataIndex: ['category'],
        key: 'category',
        render: (label: Category) => (
          <TagAtom
            color="purple"
            style={{
              fontWeight: 500,
              maxWidth: 'max-content',
            }}
          >
            {label}
          </TagAtom>
        ),
        width: 100,
      },
      {
        title: 'Ingredients',
        dataIndex: 'ingredients',
        key: 'ingredients',
        render: (ingredients: string[]) => (
          <>
            {ingredients.map(ingredient => (
              <TagAtom key={ingredient}>{ingredient}</TagAtom>
            ))}
          </>
        ),
      },
      {
        title: 'Pricing',
        dataIndex: 'pricing',
        key: 'pricing',
        render: (price: number) => `₹${price}`,
      },
      {
        title: 'Description',
        dataIndex: 'description',
        key: 'description',
      },
    ],
    [],
  );

  return (
    <>
      <Text className="recently-item-title">Recently Added Items</Text>
      <TableAtom
        columns={columns}
        dataSource={sortedItems}
        rowKey="recentItems"
        pagination={false}
        scroll={{ x: 570 }}
      />
    </>
  );
};

RecentItemsTable.displayName = 'RecentItemsTable';

export default RecentItemsTable;
