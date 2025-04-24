import { InputNumber, type InputNumberProps } from "antd";
import React, { memo } from "react";

const InputNumberAtom: React.FC<InputNumberProps> = (props) => {
  return <InputNumber {...props} />;
};

export default memo(InputNumberAtom);
