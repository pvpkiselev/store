import { setAxiosAuthToken } from '@/api/axiosConfig';
import { logout } from '@/store/auth/authSlice';
import { checkUserThunk, loginUserThunk, registerUserThunk } from '@/store/auth/authThunks';
import { useAppDispatch } from '@/store/redux';
import Cookies from 'js-cookie';
import { useCallback } from 'react';
import toast from 'react-hot-toast';

const authErrors = {
  login: 'Login error',
  register: 'Register error',
};

function useAuth() {
  const dispatch = useAppDispatch();

  const handleLogin = useCallback(async (email: string, password: string) => {
    try {
      const response = await dispatch(loginUserThunk({ email, password })).unwrap();
      const token = response.access_token;
      setAxiosAuthToken(token);
      Cookies.set('token', token);
      return true;
    } catch (error) {
      toast.error(authErrors.login);
      console.error(error);
    }
  }, []);

  const handleRegister = useCallback(async (name: string, email: string, password: string) => {
    try {
      const response = await dispatch(registerUserThunk({ name, email, password })).unwrap();
      const token = response.access_token;
      setAxiosAuthToken(token);
      Cookies.set('token', token);
      return true;
    } catch (error) {
      toast.error(authErrors.register);
      console.error(error);
    }
  }, []);

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
  }, []);

  const handleLogout = useCallback(() => {
    Cookies.remove('token');
    setAxiosAuthToken(null);
    dispatch(logout());
  }, []);

  return { handleLogin, handleRegister, handleLogout, handleCheckAuth };
}

export default useAuth;
