import { createSlice } from '@reduxjs/toolkit';
import { useDispatch } from 'react-redux';

const authSlice = createSlice({
  name: 'auth',
  initialState: { user: null, token: null, isLogin: false },
  reducers: {
    setCredentials: (state, { payload: { user, token } }) => {
      state.user = user;
      state.token = token;
      token ? (state.isLogin = true) : (state.isLogin = false);
    },
  },
});

export const { setCredentials } = authSlice.actions;

export const authReducer = authSlice.reducer;

export const useAuth = () => {
  const dispatch = useDispatch();
  const changeCredentials = data => dispatch(setCredentials(data));
  return { changeCredentials, getIsLogin };
};
export const getIsLogin = state => state.auth.isLogin;
export const getUser = state => state.auth.user;
export const getToken = state => state.auth.token;
