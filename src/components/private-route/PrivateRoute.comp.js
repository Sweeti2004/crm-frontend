import React from 'react';
import { Navigate } from 'react-router-dom';

const isAuth = true; // Replace with real auth logic

const PrivateRoute = ({ children, ...rest}) => {
  return isAuth ? children : <Navigate to="/" replace />;
};

export default PrivateRoute;
