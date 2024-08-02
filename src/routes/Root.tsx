import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
// import { useAppSelector } from '@/store/redux';
// import { selectBasketTotalCount } from '@/store/basket/basketSelectors';
import useAuth from '@/hooks/useAuth';
import { useEffect } from 'react';

export default function Root() {
  const { handleCheckAuth } = useAuth();

  useEffect(() => {
    handleCheckAuth();
  }, []);
  // const state = useAppSelector((state) => state.basket.items);
  // const authState = useAppSelector((state) => state.auth.isAuth);
  // const basketTotalCount = useAppSelector(selectBasketTotalCount);
  // console.log(authState);
  // console.log(state);
  // console.log(basketTotalCount);
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh" gap={10}>
      <Toaster position="top-center" />
      <Header />
      <Outlet />
    </Box>
  );
}
