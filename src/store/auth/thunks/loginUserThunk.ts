import { createAppAsyncThunk } from '@/store/redux';

interface LoginUserPayload {
  userData: {
    name: string;
    email: string;
    id: number;
    avatar: string;
    role: string;
  };
  access_token: string;
}

interface LoginUserError {
  errorMessage: string;
}

const loginUserErrorMessage = 'Login User Error';

export const loginUserThunk = createAppAsyncThunk<
  LoginUserPayload,
  { email: string; password: string },
  { rejectValue: LoginUserError }
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const authResponse = await thunkAPI.extra.api.auth.fetchAuthentication(email, password);
    const { access_token } = authResponse;

    const userResponse = await thunkAPI.extra.api.auth.getUserSession(access_token);
    const userData = userResponse;

    return { userData, access_token };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: loginUserErrorMessage });
  }
});
