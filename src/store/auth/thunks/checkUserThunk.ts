import { createAppAsyncThunk } from '@/store/redux';

interface CheckUserPayload {
  data: {
    name: string;
    email: string;
    id: number;
    avatar: string;
    role: string;
  };
  token: string;
}

interface CheckUserError {
  errorMessage: string;
}

const checkUserErrorMessage = 'Check User Error';

export const checkUser = createAppAsyncThunk<
  CheckUserPayload,
  { token: string },
  { rejectValue: CheckUserError }
>('auth/checkUser', async ({ token }, thunkAPI) => {
  try {
    const userResponse = await thunkAPI.extra.api.auth.getUserSession(token);
    const { data } = userResponse;

    return { data, token };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: checkUserErrorMessage });
  }
});
