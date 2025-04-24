import { useEffect } from "react";
import { useAppDispatch } from "../store";
import { signOutUser } from "../store/features/authSlice";
import { useNavigate } from "react-router-dom";

const Logout = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    dispatch(signOutUser());
    navigate("/");
  }, []);

  return null;
};

export default Logout;
