import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),

  endpoints: build => ({
    register: build.mutation({
      query: data => ({
        url: `/users/signup/`,
        method: 'post',
        body: data,
      }),
    }),
    login: build.mutation({
      query: data => ({
        url: `/users/login/`,
        method: 'post',
        body: data,
      }),
    }),
    logout: build.mutation({
      query: () => ({
        url: `/users/logout/`,
        method: 'post',
      }),
    }),
    currentUser: build.mutation({
      query: () => ({
        url: `/users/current`,
        method: 'get',
      }),
    }),
  }),
});

export const {
  useRegisterMutation,
  useLoginMutation,
  useLogoutMutation,
  useCurrentUserMutation,
} = authApi;
