import { Flex, type FlexProps } from "antd";
import React from "react";

const FlexAtom: React.FC<FlexProps> = (props) => {
  return <Flex {...props} />;
};

export default React.memo(FlexAtom);

