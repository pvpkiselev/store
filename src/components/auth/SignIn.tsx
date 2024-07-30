import { useState } from 'react';
import AuthModal from '../modals/AuthModal';
import { Button, DialogContentText, Stack, TextField } from '@mui/material';
import fetchAuthentication from '@/api/fetchAuthentication';
import { setAxiosAuthToken } from '@/api/axiosConfig';
import getUserSession from '@/api/getUserSession';
import Cookies from 'node_modules/@types/js-cookie';

function SignIn(props: { isHasAccount: boolean; toggleModal: () => void }) {
  const [isPending, setIsPending] = useState(false);

  const { isHasAccount, toggleModal } = props;
  const email = localStorage.getItem('email');

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();

    try {
      setIsPending(true);
      const response = await fetchAuthentication(email, password);
      const token = await response.data.access_token;
      setAxiosAuthToken(token);
      Cookies.set('token', token);

      const responseUserSession = await getUserSession();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
      form.reset();
    }
  }

  return (
    <AuthModal
      isPending={isPending}
      onSubmit={handleSubmit}
      buttonText="Sign in"
      open={isHasAccount}
      title="Sign in"
    >
      <DialogContentText>
        New user? <Button onClick={toggleModal}>Sign up</Button>
      </DialogContentText>
      <Stack flexDirection="column" gap={3}>
        <TextField
          name="email"
          value={email}
          required
          autoFocus
          fullWidth
          label="Email address"
          type="email"
        />
        <TextField name="password" required fullWidth label="Password" type="password" />
      </Stack>
    </AuthModal>
  );
}

export default SignIn;
