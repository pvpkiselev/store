import { setAxiosAuthToken } from '@/api/axiosConfig';
import { loginUser } from '@/store/auth/thunks/loginUserThunk';
import { registerUser } from '@/store/auth/thunks/registerUserThunk';
import { useAppDispatch } from '@/store/redux';
import Cookies from 'js-cookie';

function useAuth() {
  const dispatch = useAppDispatch();

  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
    navigate: (link: string) => void
  ) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    const response = await dispatch(loginUser({ email, password }));

    if (loginUser.fulfilled.match(response)) {
      const token = response.payload.access_token;
      setAxiosAuthToken(token);
      Cookies.set('token', token);
      form.reset();
      navigate('/home');
    }
  }

  async function handleSignUp(
    event: React.FormEvent<HTMLFormElement>,
    navigate: (link: string) => void
  ) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();

    const response = await dispatch(registerUser({ name, email, password }));

    if (registerUser.fulfilled.match(response)) {
      const token = response.payload.access_token;
      setAxiosAuthToken(token);
      Cookies.set('token', token);
      form.reset();
      navigate('/home');
    }
  }

  return { handleLogin, handleSignUp };
}

export default useAuth;
