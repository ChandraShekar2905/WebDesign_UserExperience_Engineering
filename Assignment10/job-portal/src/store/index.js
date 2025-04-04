import { configureStore } from '@reduxjs/toolkit';
import authReducer from './slices/authSlice';
import userReducer from './slices/userSlice';
import jobReducer from './slices/jobSlice';

export const store = configureStore({
  reducer: {
    auth: authReducer,
    users: userReducer,
    jobs: jobReducer
  },
});