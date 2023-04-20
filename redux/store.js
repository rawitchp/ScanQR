import { configureStore } from '@reduxjs/toolkit';
import urlReducer from './scanSlice';
import cameraReducer from './cameraSlice';

export const Store = configureStore({
  reducer: {
    url: urlReducer,
    camera: cameraReducer,
  },
});
