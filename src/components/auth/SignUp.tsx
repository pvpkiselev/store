import AuthModal from '../modals/AuthModal';
import { Button, DialogContentText, Stack, TextField } from '@mui/material';
import { useState } from 'react';
import useAuth from '@/hooks/useAuth';
import { useNavigate } from 'react-router-dom';

function SignUp(props: { isHasAccount: boolean; toggleModal: () => void }) {
  const [isPending, setIsPending] = useState(false);
  const navigate = useNavigate();
  const { handleSignUp } = useAuth();
  const { isHasAccount, toggleModal } = props;

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    handleSignUp(event, navigate);
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
