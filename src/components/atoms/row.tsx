import { Row, type RowProps } from "antd";
import React, { memo } from "react";

const RowAtom: React.FC<RowProps> = ({ children, ...rest }) => {
  return <Row {...rest}>{children}</Row>;
};

export default memo(RowAtom);
