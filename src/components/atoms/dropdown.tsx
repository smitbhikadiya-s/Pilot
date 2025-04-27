import { Dropdown, type DropDownProps } from 'antd';
import React, { memo } from 'react';

const DropdownAtom: React.FC<DropDownProps> = props => {
  return <Dropdown {...props} />;
};

export default memo(DropdownAtom);
