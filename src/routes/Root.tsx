import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';

export default function Root() {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh" gap={10}>
      <Toaster position="top-center" />
      <Header />
      <Outlet />
    </Box>
  );
}
