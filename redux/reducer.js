import { createSlice } from '@reduxjs/toolkit';

export const urlSlice = createSlice({
  name: 'url',
  initialState: [],
  reducers: {
    scanUrl: (state, action) => {
      state.push({ data: action.payload });
    },
  },
});

// this is for dispatch
export const { scanUrl } = urlSlice.actions;

// this is for configureStore
export default urlSlice.reducer;



