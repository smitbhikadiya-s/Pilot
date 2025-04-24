import { Select, type SelectProps } from "antd";
import React from "react";

interface SelectAtomProps extends React.FC<SelectProps> {
  Option: typeof Select.Option;
}

const SelectAtom: SelectAtomProps = (props) => {
  return <Select {...props} />;
};

SelectAtom.Option = Select.Option;

export default SelectAtom;
