import { useState } from 'react';
import AuthModal from '../modals/AuthModal';
import { Button, DialogContentText, Stack, TextField } from '@mui/material';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function SignIn(props: { isHasAccount: boolean; toggleModal: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const { handleLogin } = useAuth();
  const navigate = useNavigate();
  const { isHasAccount, toggleModal } = props;
  const email = localStorage.getItem('email');

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    handleLogin(event, setIsPending, navigate);
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
