import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '@/api/api';
import { authReducer } from './auth/authSlice';

export const extraArgument = {
  api,
};

const appReducer = combineReducers({
  auth: authReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});
