import { createAppAsyncThunk } from '@/store/redux';

interface LoginUserPayload {
  data: {
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

export const loginUser = createAppAsyncThunk<
  LoginUserPayload,
  { email: string; password: string },
  { rejectValue: LoginUserError }
>('auth/loginUser', async ({ email, password }, thunkAPI) => {
  try {
    const authResponse = await thunkAPI.extra.api.auth.fetchAuthentication(email, password);
    const { access_token } = authResponse.data;

    const userResponse = await thunkAPI.extra.api.auth.getUserSession(access_token);
    const { data } = userResponse;

    return { data, access_token };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: loginUserErrorMessage });
  }
});
