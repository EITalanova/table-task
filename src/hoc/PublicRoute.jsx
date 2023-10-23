import React from 'react';
import { useSelector } from 'react-redux';
import { selectUser } from '../redux/login/loginSelector';
import { Navigate } from 'react-router-dom';
export const PublicRoute = ({ children }) => {
  const isLoggedIn = useSelector(selectUser);

  if (isLoggedIn) {
    return <Navigate to="/table" />;
  }
  return children;
};


