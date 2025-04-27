import { Menu, type MenuProps } from 'antd';
import React, { memo } from 'react';

const MenuAtom: React.FC<MenuProps> = props => {
  return <Menu {...props} />;
};

export type MenuAtomProps = MenuProps;

export default memo(MenuAtom);
