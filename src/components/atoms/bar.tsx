import { Bar, type BarConfig } from '@ant-design/plots';
import React, { memo } from 'react';

const BarAtom: React.FC<BarConfig> = props => {
  return <Bar {...props} />;
};

export type BarAtomConfig = BarConfig;
export default memo(BarAtom);
