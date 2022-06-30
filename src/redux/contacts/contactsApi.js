import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const contactsApi = createApi({
  reducerPath: 'contactsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'https://connections-api.herokuapp.com',
    // refetchOnMountOrArgChange: 1,
    prepareHeaders: (headers, { getState }) => {
      const token = getState().auth.token;

      // If we have a token set in state, let's assume that we should be passing it.
      if (token) {
        headers.set('authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  tagTypes: ['contacts'],

  endpoints: builder => ({
    getContacts: builder.query({
      query: () => `/contacts/`,
      providesTags: ['contacts'],
      invalidatesTags: ['contacts'],
    }),
    addContact: builder.mutation({
      query: ({ name, number }) => ({
        url: `contacts/`,
        method: 'POST',
        body: { name, number },
      }),
      invalidatesTags: ['contacts'],
    }),
    editContact: builder.mutation({
      query: ({ id, name, number }) => ({
        url: `contacts/${id}`,
        method: 'patch',
        body: { name, number },
      }),
      invalidatesTags: ['contacts'],
    }),
    delContact: builder.mutation({
      query: id => ({
        url: `contacts/${id}`,
        method: 'DELETE',
      }),
      invalidatesTags: ['contacts'],
    }),
  }),
});

export const {
  useGetContactsQuery,
  useAddContactMutation,
  useDelContactMutation,
  useEditContactMutation,
} = contactsApi;
