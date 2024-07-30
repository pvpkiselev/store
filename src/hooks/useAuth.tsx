import { setAxiosAuthToken } from '@/api/axiosConfig';
import fetchAuthentication from '@/api/fetchAuthentication';
import fetchCreateUser from '@/api/fetchCreateUser';
import getUserSession from '@/api/getUserSession';
import { HttpStatusCode } from 'axios';
import Cookies from 'js-cookie';

function useAuth() {
  async function handleLogin(
    event: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    navigate: (link: string) => void
  ) {
    event.preventDefault();

    const form = event.currentTarget as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    try {
      setIsPending(true);
      const response = await fetchAuthentication(email, password);
      const isSuccess = response.status === HttpStatusCode.Ok || HttpStatusCode.Created;

      if (isSuccess) {
        const token = response.data.access_token;
        setAxiosAuthToken(token);
        Cookies.set('token', token);
      }

      const responseUserSession = await getUserSession();
      const isSuccessUserSession =
        responseUserSession.status === HttpStatusCode.Ok || HttpStatusCode.Created;

      if (isSuccessUserSession) {
        navigate('/home');
      }
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
      form.reset();
    }
  }

  async function handleSignUp(
    event: React.FormEvent<HTMLFormElement>,
    setIsPending: (pending: boolean) => void,
    toggleModal: () => void
  ) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const emailInput = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();

    try {
      setIsPending(true);
      const response = await fetchCreateUser(name, emailInput, password);
      const { email } = response.data;
      localStorage.setItem('email', email);
      toggleModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return { handleLogin, handleSignUp };
}

export default useAuth;
