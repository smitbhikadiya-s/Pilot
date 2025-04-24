import { Switch, SwitchProps } from "antd";

import React, { memo } from "react";

const SwitchAtom: React.FC<SwitchProps> = ({ ...props }) => {
  return <Switch {...props} />;
};

export default memo(SwitchAtom);
