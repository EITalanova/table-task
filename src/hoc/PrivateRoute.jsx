import React from 'react';
import { Navigate } from 'react-router-dom';
import { selectUser } from '../redux/login/loginSelector';
import { useDispatch, useSelector } from 'react-redux';

export const PrivateRoute = ({ children }) => {
  const dispatch = useDispatch();
  const isLoggedIn = useSelector(selectUser);

  if (!isLoggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};
