import { forwardRef } from "react";
import { Input } from "antd";
import type { InputProps, InputRef } from "antd/es/input";
import "../../styles/form.css";

type InputAtomType = React.ForwardRefExoticComponent<
  InputProps & React.RefAttributes<InputRef>
> & {
  TextArea: typeof Input.TextArea;
};

const InputAtom = forwardRef<InputRef, InputProps>((props, ref) => {
  return <Input {...props} ref={ref} />;
}) as InputAtomType;

InputAtom.TextArea = Input.TextArea;

export default InputAtom;
