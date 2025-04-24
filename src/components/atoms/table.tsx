// src/atoms/Table.tsx
import { Table, type TableProps } from "antd";

// Declare it as a generic function, NOT as React.FC
function TableAtom<T extends object>(props: TableProps<T>) {
  return <Table<T> {...props} />;
}

export type TableAtomColumnType<T> = TableProps<T>["columns"];

export default TableAtom;
