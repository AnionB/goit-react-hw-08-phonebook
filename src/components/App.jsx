import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';

import AppBar from './AppBar/AppBar';
import StartPage from '../pages/StartPage/StartPage';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import Contacts from 'pages/Contacts/Contacts';

import { getIsLogin, getToken, getUser, useAuth } from 'redux/auth/authSlice';
import { useCurrentUserMutation } from 'redux/auth/authApi';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

export const App = () => {
  const token = useSelector(getToken);
  const currentUser = useSelector(getUser);
  const isLogin = useSelector(getIsLogin);
  const { changeCredentials } = useAuth();

  const [getCurrentUser, { error }] = useCurrentUserMutation();
  useEffect(() => {
    if (token && !isLogin) {
      // console.log('vot sei4as');
      const refreshUser = async () => {
        const { data } = await getCurrentUser();
        data && changeCredentials({ user: data, token, isLogin });
        error && console.log('чтото пошло не так', error);
      };
      refreshUser();
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);
  return (
    <div>
      <AppBar />
      {isLogin ? (
        <h1> User {currentUser.name}, is online</h1>
      ) : (
        <h1> Logout</h1>
      )}
      <Routes>
        <Route path="/*" index element={<StartPage />} />
        <Route
          path="/register"
          element={
            <PublicRoute>
              <Register />
            </PublicRoute>
          }
        />
        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path="/contacts"
          element={
            <PrivateRoute>
              <Contacts />
            </PrivateRoute>
          }
        />
      </Routes>
    </div>
  );
};
