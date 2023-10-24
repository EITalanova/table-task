import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { selectIslogin } from "../redux/login/loginSelector";
import { Navigate } from "react-router-dom";

export const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectIslogin);
  const dispatch = useDispatch();

  if (isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
