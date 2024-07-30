import { createSlice } from '@reduxjs/toolkit';
import { registerUserThunk } from './thunks/registerUserThunk';
import { loginUserThunk } from './thunks/loginUserThunk';
import { checkUserThunk } from './thunks/checkUserThunk';

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
      .addCase(registerUserThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(registerUserThunk.fulfilled, (state, action) => {
        state.name = action.payload.userData.name;
        state.email = action.payload.userData.email;
        state.id = action.payload.userData.email.toString();
        state.avatar = action.payload.userData.avatar;
        state.role = action.payload.userData.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(registerUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      })

      .addCase(loginUserThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(loginUserThunk.fulfilled, (state, action) => {
        state.name = action.payload.userData.name;
        state.email = action.payload.userData.email;
        state.id = action.payload.userData.email.toString();
        state.avatar = action.payload.userData.avatar;
        state.role = action.payload.userData.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(loginUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      })

      .addCase(checkUserThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(checkUserThunk.fulfilled, (state, action) => {
        state.name = action.payload.userData.name;
        state.email = action.payload.userData.email;
        state.id = action.payload.userData.email.toString();
        state.avatar = action.payload.userData.avatar;
        state.role = action.payload.userData.role;
        state.isAuth = true;
        state.status = 'fulfilled';
        state.error = undefined;
      })
      .addCase(checkUserThunk.rejected, (state, action) => {
        state.isAuth = false;
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      });
  },
});

export const { logout } = authSlice.actions;
export const authReducer = authSlice.reducer;
