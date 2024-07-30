import { createAppAsyncThunk } from '@/store/redux';

interface CheckUserPayload {
  userData: {
    name: string;
    email: string;
    id: number;
    avatar: string;
    role: string;
  };
}

interface CheckUserError {
  errorMessage: string;
}

const checkUserErrorMessage = 'Check User Error';

export const checkUserThunk = createAppAsyncThunk<
  CheckUserPayload,
  { token: string },
  { rejectValue: CheckUserError }
>('auth/checkUser', async ({ token }, thunkAPI) => {
  try {
    const userResponse = await thunkAPI.extra.api.auth.getUserSession(token);
    const userData = userResponse;

    return { userData };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: checkUserErrorMessage });
  }
});
