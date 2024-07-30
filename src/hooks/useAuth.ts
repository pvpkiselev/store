import { setAxiosAuthToken } from '@/api/axiosConfig';
import { logout } from '@/store/auth/authSlice';
import { checkUserThunk } from '@/store/auth/thunks/checkUserThunk';
import { loginUserThunk } from '@/store/auth/thunks/loginUserThunk';
import { registerUserThunk } from '@/store/auth/thunks/registerUserThunk';
import { useAppDispatch } from '@/store/redux';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

function useAuth() {
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(
    async (email: string, password: string) => {
      try {
        const response = await dispatch(loginUserThunk({ email, password })).unwrap();
        const token = response.access_token;
        setAxiosAuthToken(token);
        Cookies.set('token', token);
        return true;
      } catch (error) {
        toast.error('Login error');
        console.error(error);
      }
    },
    [dispatch]
  );

  const handleRegister = useCallback(
    async (name: string, email: string, password: string) => {
      try {
        const response = await dispatch(registerUserThunk({ name, email, password })).unwrap();
        const token = response.access_token;
        setAxiosAuthToken(token);
        Cookies.set('token', token);
        return true;
      } catch (error) {
        toast.error('Register error');
        console.error(error);
      }
    },
    [dispatch]
  );

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    setAxiosAuthToken(null);
    dispatch(logout());
  }, [dispatch]);

  const handleCheckAuth = useCallback(async () => {
    try {
      const token = Cookies.get('token');
      if (token) {
        await dispatch(checkUserThunk({ token }));
        setAxiosAuthToken(token);
        Cookies.set('token', token);
        return true;
      }
    } catch (error) {
      console.error(error);
      dispatch(logout());
    }
  }, [dispatch, handleLogin]);

  return { handleLogin, handleRegister, handleLogout, handleCheckAuth };
}

export default useAuth;
