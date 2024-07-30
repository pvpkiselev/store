import { createAppAsyncThunk } from '@/store/redux';

interface RegisterUserPayload {
  data: {
    name: string;
    email: string;
    id: number;
    avatar: string;
    role: string;
  };
  access_token: string;
}

interface RegisterUserError {
  errorMessage: string;
}

const registerUserErrorMessage = 'Register User Error';

export const registerUser = createAppAsyncThunk<
  RegisterUserPayload,
  { name: string; email: string; password: string },
  { rejectValue: RegisterUserError }
>('auth/registerUser', async ({ name, email, password }, thunkAPI) => {
  try {
    const createUserResponse = await thunkAPI.extra.api.auth.fetchCreateUser(name, email, password);
    const { data } = createUserResponse;

    const authResponse = await thunkAPI.extra.api.auth.fetchAuthentication(email, password);
    const { access_token } = authResponse.data;

    return { data, access_token };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: registerUserErrorMessage });
  }
});
