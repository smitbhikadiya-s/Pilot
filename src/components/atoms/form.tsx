import { Form, type FormProps } from "antd";
import { ReactNode } from "react";

const FormAtom = <T,>(props: FormProps<T> & { children: ReactNode }) => {
  return <Form<T> {...props} />;
};

FormAtom.Item = Form.Item;
FormAtom.List = Form.List;
FormAtom.useForm = Form.useForm;

export default FormAtom;
