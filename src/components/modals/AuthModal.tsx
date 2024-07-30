import React from 'react';
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
  TextField,
} from '@mui/material';
import { LoadingButton } from '@mui/lab';

interface AuthModalProps {
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  onToggle: () => void;
  isPending: boolean;
  isRegistered: boolean;
  isOpen: boolean;
}

function AuthModal(props: AuthModalProps) {
  const { onSubmit, onToggle, isPending, isRegistered, isOpen } = props;
  const title = isRegistered ? 'Sign in' : 'Sign up';
  const dialogContentText = isRegistered ? 'New user?' : 'Already have an account?';
  const toggleText = isRegistered ? 'Create an account' : 'Sign in';
  const submitButtonText = isRegistered ? 'Sign in' : 'Sign up';

  return (
    <Dialog
      open={isOpen}
      PaperProps={{
        sx: {
          width: { sm: '100%', md: '600px' },
          paddingBlock: { sm: 6, md: 0 },
          paddingInline: { sm: 4, md: 0 },
          gap: 4,
          boxShadow: 'none',
        },
        component: 'form',
        onSubmit: onSubmit,
      }}
      slotProps={{
        backdrop: {
          sx: {
            backgroundColor: 'transparent',
          },
        },
      }}
    >
      <DialogTitle variant="h4" fontWeight={400} sx={{ p: 0 }}>
        {title}
      </DialogTitle>
      <DialogContent sx={{ p: 0 }}>
        <Stack flexDirection="column" gap={4}>
          <DialogContentText>
            {dialogContentText}
            <Button onClick={onToggle}>{toggleText}</Button>
          </DialogContentText>
          {!isRegistered && (
            <TextField name="userName" label="Name" type="text" required fullWidth />
          )}
          <TextField name="email" label="Email address" type="email" required fullWidth />
          <TextField name="password" label="Password" type="password" required fullWidth />
        </Stack>
      </DialogContent>
      <DialogActions sx={{ p: 0 }}>
        <LoadingButton
          size="large"
          loading={isPending}
          variant="contained"
          type="submit"
          fullWidth
          disableElevation
        >
          {submitButtonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}

export default AuthModal;
