import React, { useMemo } from "react";
import { useAppSelector } from "../../store";
import TagAtom from "../atoms/tag";
import { Category } from "../../interface/types";
import { Text } from "../atoms/typography";
import TableAtom, { TableAtomColumnType } from "../atoms/table";

interface Item {
  id: string;
  itemName: string;
  category: string;
  ingredients: string[];
  pricing: number;
  description?: string;
}

interface ParentData {
  key: string;
  category: string;
}

const GroupedItemsTable: React.FC = () => {
  const items = useAppSelector((state) => state.menu.items);

  const groupedItems = useMemo(
    () =>
      items.reduce((acc: Record<string, Item[]>, item) => {
        if (!acc[item.category]) acc[item.category] = [];
        acc[item.category].push(item);
        return acc;
      }, {}),
    [items]
  );

  const parentData: ParentData[] = useMemo(
    () =>
      Object.keys(groupedItems).map((category) => ({
        key: category,
        category,
      })),
    [groupedItems]
  );

  const childColumns: TableAtomColumnType<Item> = useMemo(
    () => [
      {
        title: "Item Name",
        dataIndex: "itemName",
        key: "itemName",
        render: (text: string) => (
          <span style={{ fontWeight: 600, fontSize: "16px" }}>{text}</span>
        ),
        width: 150,
      },
      {
        title: "Ingredients",
        dataIndex: "ingredients",
        key: "ingredients",
        render: (ingredients: string[]) => (
          <>
            {ingredients.map((ingredient) => (
              <TagAtom key={ingredient}>{ingredient}</TagAtom>
            ))}
          </>
        ),
      },
      {
        title: "Pricing",
        dataIndex: "pricing",
        key: "pricing",
        render: (price: number) => `₹${price}`,
      },
      {
        title: "Description",
        dataIndex: "description",
        key: "description",
      },
    ],
    [groupedItems]
  );

  const parentColumns: TableAtomColumnType<ParentData> = useMemo(
    () => [
      {
        title: "Category",
        dataIndex: "category",
        key: "category",
        render: (label: Category) => (
          <TagAtom
            color="purple"
            style={{
              fontWeight: 500,
              maxWidth: "max-content",
            }}
          >
            {label} - {groupedItems[label].length} items
          </TagAtom>
        ),
      },
    ],
    []
  );

  return (
    <>
      <Text style={{ display: "inline-block", margin: 8, marginBottom: 16 }}>
        Items Grouped by Category
      </Text>
      <TableAtom<ParentData>
        columns={parentColumns}
        dataSource={parentData}
        pagination={false}
        scroll={{ x: 570 }}
        expandable={{
          expandedRowRender: (record) => (
            <TableAtom<Item>
              columns={childColumns}
              dataSource={groupedItems[record.category]}
              pagination={false}
              scroll={{ x: 570 }}
            />
          ),
        }}
      />
    </>
  );
};

GroupedItemsTable.displayName = "GroupedItemsTable";

export default GroupedItemsTable;
