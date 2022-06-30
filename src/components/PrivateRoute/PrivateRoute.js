import React from 'react';
import { useSelector } from 'react-redux';
import { Navigate } from 'react-router-dom';
import { getIsLogin } from 'redux/auth/authSlice';

export default function PrivateRoute({ children, ...routerProps }) {
  const isLoggedIn = useSelector(getIsLogin);
  return isLoggedIn ? children : <Navigate to={'/login'} />;
}
