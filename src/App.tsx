import { Toaster } from 'react-hot-toast';

export default function App() {
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100%" gap={10}>
      <Toaster position="top-center" />
      <Header />
      <Outlet />
    </Box>
  );
}
