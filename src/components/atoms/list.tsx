import { List, ListProps } from 'antd';
import { memo } from 'react';

// Define your wrapper
const ListAtom = <T,>(props: ListProps<T>) => {
  return <List<T> {...props} />;
};

// Attach the static members from Ant Design's List
ListAtom.Item = List.Item;
ListAtom.Item.Meta = List.Item.Meta;

export default memo(ListAtom);
