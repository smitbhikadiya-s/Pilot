import { Pie, type PieConfig } from "@ant-design/plots";
import React, { memo } from "react";

const PieAtom: React.FC<PieConfig> = (props) => {
  return <Pie {...props} />;
};

export type PieAtomConfig = PieConfig;
export default memo(PieAtom);
