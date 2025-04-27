import { Empty, type EmptyProps } from 'antd';
import React, { memo } from 'react';

const EmptyAtom: React.FC<EmptyProps> = props => {
  return <Empty {...props} />;
};

export default memo(EmptyAtom);
