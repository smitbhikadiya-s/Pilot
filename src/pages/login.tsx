import React from "react";
import { useTheme } from "../context/themeContext";
import "../styles/login.css";
import LoginContainer from "../components/organism/loginContainer";
import { LoginFormData } from "../interface/types";
import { useAppDispatch } from "../store";
import { signInUser } from "../store/features/authSlice";
import { useNotification } from "../context/notificationContext";
import { useNavigate } from "react-router-dom";

const Login: React.FC = () => {
  const { theme } = useTheme();
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { openNotificationWithIcon } = useNotification();

  const onSignInHandler = (formData: LoginFormData) => {
    const { email, password } = formData;

    if (
      email?.toLowerCase() == "admin@simform.com" &&
      password?.toLowerCase() == "admin@12"
    ) {
      dispatch(signInUser(true));
      navigate("/");
    } else {
      openNotificationWithIcon({
        message: "Invalid credentials",
        placement: "top",
        theme: "error",
      });
    }
  };

  return (
    <div
      className={`loginPage ${theme === "dark" ? "dark-theme" : "light-theme"}`}
    >
      <LoginContainer updateFormData={onSignInHandler} />
    </div>
  );
};

export default Login;
