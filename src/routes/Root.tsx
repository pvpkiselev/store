import { Box } from '@mui/material';
import { Toaster } from 'react-hot-toast';
import { Outlet } from 'react-router-dom';
import Header from '../components/header/Header';
import { useAppSelector } from '@/store/redux';
import { selectBasketTotalCount } from '@/store/basket/basketSelectors';

export default function Root() {
  const state = useAppSelector((state) => state.basket.items);
  const basketTotalCount = useAppSelector(selectBasketTotalCount);
  console.log(state);
  console.log(basketTotalCount);
  return (
    <Box display="flex" flexDirection="column" width="100%" height="100vh" gap={10}>
      <Toaster position="top-center" />
      <Header />
      <Outlet />
    </Box>
  );
}
