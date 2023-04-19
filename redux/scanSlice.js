import { createSlice } from '@reduxjs/toolkit';

export const urlSlice = createSlice({
  name: 'url',
  initialState: [],
  reducers: {
    scanUrl: (state, action) => {
      state.push({
        id: action.payload.uuid,
        data: action.payload.data,
        checked: false,
      });
    },
    checked: (state, action) => {
      const id = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          return { ...item, checked: true };
        }
        return item;
      });
    },
    unChecked: (state, action) => {
      const id = action.payload;
      return state.map((item) => {
        if (item.id === id) {
          return { ...item, checked: false };
        }
        return item;
      });
    },
  },
});

// this is for dispatch
export const { scanUrl, checked, unChecked } = urlSlice.actions;

// this is for configureStore
export default urlSlice.reducer;
