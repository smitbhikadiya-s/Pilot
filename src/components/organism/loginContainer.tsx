import ButtonAtom from "../atoms/button";
import LoginFormInput from "../molecules/loginFormInput";
import CardAtom from "../atoms/card";
import "../../styles/form.css";
import "../../styles/login.css";
import ImageAtom from "../atoms/image";
import simrestro from "../../assets/simrestro.png";
import { LoginFormContainerProps, LoginFormData } from "../../interface/types";
import FormAtom from "../atoms/form";
import { useCallback } from "react";

const LoginContainer: React.FC<LoginFormContainerProps> = ({
  updateFormData,
}) => {
  const [form] = FormAtom.useForm();

  const handleSubmit = useCallback(
    (values: LoginFormData) => {
      const newFormData: LoginFormData = {
        ...values,
      };
      updateFormData(newFormData);
      form.resetFields();
    },
    [form, updateFormData]
  );

  return (
    <div className="login-container">
      <CardAtom
        title={<ImageAtom src={simrestro} height={50} preview={false} />}
        bordered={false}
        className="login-container-card"
      >
        <FormAtom form={form} onFinish={handleSubmit} layout="vertical">
          <LoginFormInput />
          <FormAtom.Item className="formInputItem" label={null}>
            <ButtonAtom size="large" type="primary" htmlType="submit" block>
              Login
            </ButtonAtom>
          </FormAtom.Item>
        </FormAtom>
      </CardAtom>
    </div>
  );
};

LoginContainer.displayName = "LoginContainer";

export default LoginContainer;
