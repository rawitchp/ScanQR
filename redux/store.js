import { configureStore } from '@reduxjs/toolkit';
import urlReducer, { urlSlice } from './scanSlice';
import cameraReducer, { cameraSlice } from './cameraSlice';

export const Store = configureStore({
  reducer: {
    url: urlReducer,
    camera: cameraReducer,
  },
});
