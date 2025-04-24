import { Col, type ColProps } from "antd";
import React, { memo } from "react";

const ColAtom: React.FC<ColProps> = ({ children, ...rest }) => {
  return <Col {...rest}>{children}</Col>;
};

export type ColAtomConfig = ColProps;
export default memo(ColAtom);
