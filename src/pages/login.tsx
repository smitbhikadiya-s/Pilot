import React from 'react';
import LoginContainer from '../components/organism/loginContainer';
import { LoginFormData } from '../interface/types';
import { useAppDispatch } from '../store';
import { signInUser } from '../store/features/authSlice';
import { useNotification } from '../context/notificationContext';
import { useNavigate } from 'react-router-dom';

import '../styles/login.css';

const Login: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openNotification } = useNotification();

  const onSignInHandler = (formData: LoginFormData): void => {
    const { email, password } = formData;

    if (
      email?.toLowerCase() == 'admin@simform.com' &&
      password?.toLowerCase() == 'admin@12'
    ) {
      dispatch(signInUser(true));
      navigate('/');
    } else {
      openNotification({
        message: 'Invalid credentials',
        placement: 'top',
        theme: 'error',
      });
    }
  };

  return (
    <div className="loginPage">
      <LoginContainer updateFormData={onSignInHandler} />
    </div>
  );
};

export default Login;
