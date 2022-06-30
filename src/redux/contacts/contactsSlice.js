import { createSlice } from '@reduxjs/toolkit';
import { useDispatch, useSelector } from 'react-redux';

const contactSlice = createSlice({
  name: 'contacts',
  initialState: { filter: '' },
  reducers: {
    filterChange: (state, action) => {
      state.filter = action.payload;
    },
  },
});

const { filterChange } = contactSlice.actions;

export const useContacts = () => {
  const dispatch = useDispatch();
  const filter = useSelector(state => state.contacts.filter);
  const filtrChange = value => dispatch(filterChange(value));

  return {
    filtrChange,
    filter,
  };
};

export const contactsReducer = contactSlice.reducer;
