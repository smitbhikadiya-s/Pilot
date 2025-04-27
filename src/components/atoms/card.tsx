import { Card, type CardProps } from 'antd';
import React, { memo } from 'react';

const CardAtom: React.FC<CardProps> = ({ children, ...rest }) => {
  return <Card {...rest}>{children}</Card>;
};

export default memo(CardAtom);
