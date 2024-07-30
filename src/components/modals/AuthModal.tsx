import { Dialog, DialogActions, DialogContent, DialogTitle } from '@mui/material';
import LoadingButton from '@mui/lab/LoadingButton';

import React from 'react';

interface AuthModalProps {
  open: boolean;
  onSubmit: (event: React.FormEvent<HTMLFormElement>) => void;
  title: string;
  buttonText: string;
  children: React.ReactNode;
  isPending: boolean;
}

export default function AuthModal(props: AuthModalProps) {
  const { isPending, open, onSubmit, title, buttonText, children } = props;

  return (
    <Dialog
      open={open}
      PaperProps={{
        sx: {
          width: '600px',
          p: 3,
        },
        component: 'form',
        onSubmit: onSubmit,
      }}
    >
      <DialogTitle variant="h4" fontWeight={400}>
        {title}
      </DialogTitle>
      <DialogContent>{children}</DialogContent>
      <DialogActions>
        <LoadingButton loading={isPending} variant="contained" fullWidth type="submit">
          {buttonText}
        </LoadingButton>
      </DialogActions>
    </Dialog>
  );
}
