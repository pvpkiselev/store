import fetchCreateUser from '@/api/fetchCreateUser';
import AuthModal from '../modals/AuthModal';
import { Button, DialogContentText, Stack, TextField } from '@mui/material';
import { useState } from 'react';

function SignUp(props: { isHasAccount: boolean; toggleModal: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const { isHasAccount, toggleModal } = props;

  async function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const form = event.currentTarget as HTMLFormElement;

    const name = (form.elements.namedItem('name') as HTMLInputElement).value.trim();
    const email = (form.elements.namedItem('email') as HTMLInputElement).value.trim();
    const password = (form.elements.namedItem('password') as HTMLInputElement).value.trim();

    try {
      setIsPending(true);
      const response = await fetchCreateUser(name, email, password);
      const { emailFromData } = await response.data;
      localStorage.setItem('email', emailFromData);
      toggleModal();
    } catch (error) {
      console.error(error);
    } finally {
      setIsPending(false);
    }
  }

  return (
    <AuthModal
      isPending={isPending}
      onSubmit={handleSubmit}
      buttonText="Sign up"
      open={isHasAccount}
      title="Sign up"
    >
      <DialogContentText>
        Already have an account? <Button onClick={toggleModal}>Sign in</Button>
      </DialogContentText>
      <Stack flexDirection="column" gap={3}>
        <TextField required fullWidth name="name" label="Name" type="text" />
        <TextField required autoFocus name="email" fullWidth label="Email address" type="email" />
        <TextField required fullWidth name="password" label="Password" type="password" />
      </Stack>
    </AuthModal>
  );
}

export default SignUp;
