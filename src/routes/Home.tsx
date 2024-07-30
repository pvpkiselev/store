import useAuth from '@/hooks/useAuth';
import { selectIsAuth } from '@/store/auth/authSelectors';
import { useAppSelector } from '@/store/redux';
import { Container } from '@mui/material';
import { useEffect } from 'react';

function Home() {
  //Тестовые штуки для проверки работы авторизации
  const { handleCheckAuth } = useAuth();
  const isAuth = useAppSelector(selectIsAuth);

  useEffect(() => {
    const authenticate = async () => {
      await handleCheckAuth();
    };

    authenticate();
  }, [handleCheckAuth]);

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      {isAuth ? 'Home' : 'Loading'}
    </Container>
  );
}

export default Home;
