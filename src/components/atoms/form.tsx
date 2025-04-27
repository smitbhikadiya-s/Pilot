import { Form, type FormProps } from 'antd';
import React, { ReactNode } from 'react';

function FormAtom<T>(
  props: FormProps<T> & { children: ReactNode },
): React.ReactElement {
  return <Form<T> {...props} />;
}

FormAtom.Item = Form.Item;
FormAtom.List = Form.List;
FormAtom.useForm = Form.useForm;

export default FormAtom;
