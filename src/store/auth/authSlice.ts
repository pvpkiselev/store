import { createSlice } from '@reduxjs/toolkit';
import { registerUser } from './thunks/registerUserThunk';
import { loginUser } from './thunks/loginUserThunk';
import { checkUser } from './thunks/checkUserThunk';

type AuthState = {
  isAuth: boolean;
  name: string | null;
  email: string | null;
  id: string | null;
  avatar: string | null;
  role: string | null;
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | undefined;
};

const authInitialState: AuthState = {
  isAuth: false,
  name: null,
  email: null,
  id: null,
  avatar: null,
  role: null,
  status: 'fulfilled',
  error: undefined,
};

const authSlice = createSlice({
  name: 'auth',
  initialState: authInitialState,
  reducers: {
    logout() {
      return { ...authInitialState };
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(registerUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerUser.fulfilled, (state, action) => {
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.id = action.payload.data.email.toString();
        state.avatar = action.payload.data.avatar;
        state.role = action.payload.data.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(registerUser.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      })

      .addCase(loginUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUser.fulfilled, (state, action) => {
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.id = action.payload.data.email.toString();
        state.avatar = action.payload.data.avatar;
        state.role = action.payload.data.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(loginUser.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      })

      .addCase(checkUser.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkUser.fulfilled, (state, action) => {
        state.name = action.payload.data.name;
        state.email = action.payload.data.email;
        state.id = action.payload.data.email.toString();
        state.avatar = action.payload.data.avatar;
        state.role = action.payload.data.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(checkUser.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      });
  },
});

export const authReducer = authSlice.reducer;
