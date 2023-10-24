import React from "react";
import { Navigate } from "react-router-dom";
import { selectIslogin } from "../redux/login/loginSelector";
import { useDispatch, useSelector } from "react-redux";

export const PrivateRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIslogin);
  const dispatch = useDispatch();

  if (!isLoggedIn) {
    return <Navigate to="/table" />;
  }
  return children;
};
