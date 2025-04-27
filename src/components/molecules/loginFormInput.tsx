import React from 'react';
import { MailOutlined, LockOutlined } from '@ant-design/icons';
import InputAtom from '../atoms/input';
import FormAtom from '../atoms/form';
import '../../styles/form.css';

const LoginFormInput: React.FC = () => {
  return (
    <>
      <FormAtom.Item
        label="Email"
        name="email"
        layout="vertical"
        className="formInputItem"
        rules={[
          { required: true, message: 'Please enter your email!' },
          { type: 'email', message: 'Please enter a valid email address!' },
        ]}
      >
        <InputAtom prefix={<MailOutlined />} placeholder="Enter your email" />
      </FormAtom.Item>

      <FormAtom.Item
        label="Password"
        name="password"
        className="formInputItem"
        layout="vertical"
        rules={[{ required: true, message: 'Please enter your password!' }]}
      >
        <InputAtom
          prefix={<LockOutlined />}
          type="password"
          placeholder="Enter your password"
        />
      </FormAtom.Item>
    </>
  );
};

LoginFormInput.displayName = 'LoginFormInput';

export default LoginFormInput;
