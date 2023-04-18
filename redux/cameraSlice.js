import { createSlice } from '@reduxjs/toolkit';

export const cameraSlice = createSlice({
  name: 'camera',
  initialState: null,
  reducers: {
    changeStatus: (state, action) => action.payload,
  },
});

// this is for dispatch
export const { changeStatus } = cameraSlice.actions;

// this is for configureStore
export default cameraSlice.reducer;
