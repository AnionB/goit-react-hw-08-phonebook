import { Routes, Route } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { useEffect } from 'react';
import { ToastContainer } from 'react-toastify';

import AppBar from './AppBar/AppBar';
import StartPage from '../pages/StartPage/StartPage';
import Register from 'pages/Register/Register';
import Login from 'pages/Login/Login';
import Contacts from 'pages/Contacts/Contacts';
import PrivateRoute from './PrivateRoute/PrivateRoute';
import PublicRoute from './PublicRoute/PublicRoute';

import { getIsLogin, getToken, useAuth } from 'redux/auth/authSlice';
import { useCurrentUserMutation } from 'redux/auth/authApi';

export const App = () => {
  const token = useSelector(getToken);
  const isLogin = useSelector(getIsLogin);
  const { changeCredentials } = useAuth();
  const [getCurrentUser, { error }] = useCurrentUserMutation();

  useEffect(() => {
    if (token && !isLogin) {
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
      <ToastContainer
        position="top-center"
        autoClose={3000}
        hideProgressBar
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />

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
