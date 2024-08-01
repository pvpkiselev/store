import { combineReducers, configureStore } from '@reduxjs/toolkit';
import api from '@/api/api';
import { authReducer } from './auth/authSlice';
import { filtersReducer } from './filters/filtersSlice';
import { basketReducer } from './basket/basketSlice';

export const extraArgument = {
  api,
};

const appReducer = combineReducers({
  auth: authReducer,
  filters: filtersReducer,
  basket: basketReducer,
});

export const store = configureStore({
  reducer: appReducer,
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ thunk: { extraArgument } }),
});
