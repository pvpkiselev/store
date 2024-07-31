import useAuth from '@/hooks/useAuth';
import { selectIsAuth } from '@/store/auth/authSelectors';
import { useAppSelector } from '@/store/redux';
import { Logout, Person, ShoppingCart } from '@mui/icons-material';
import { AppBar, Container, IconButton, Stack } from '@mui/material';
import { Link } from 'react-router-dom';
import Logo from '@public/logo/logo.svg';
import Search from '../search/Search';

const LoginButton = () => (
  <Link to="/auth" style={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton size="large" aria-label="login">
      <Person fontSize="inherit" />
    </IconButton>
  </Link>
);

const LogoutButton = () => {
  const { handleLogout } = useAuth();

  return (
    <IconButton size="large" aria-label="logout" onClick={handleLogout}>
      <Logout fontSize="inherit" />
    </IconButton>
  );
};

const BasketButton = () => (
  <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
    <IconButton size="large" aria-label="login">
      <ShoppingCart fontSize="inherit" />
    </IconButton>
  </Link>
);

function Header() {
  const isAuth = useAppSelector(selectIsAuth);

  return (
    <AppBar
      position="static"
      sx={{
        boxShadow: 'none',
        bgcolor: 'transparent',
        paddingInline: 0,
        paddingTop: 6,
        paddingBottom: 3,
      }}
    >
      <Container maxWidth="xl" sx={{ minHeight: 80, paddingInline: { xs: 4, md: 6 } }}>
        <Stack
          direction="row"
          height="100%"
          alignItems="center"
          flexWrap="wrap"
          gap={{ xs: 6, md: 10 }}
        >
          <Stack
            direction="row"
            alignItems="center"
            flexGrow={{ xs: 1, md: 0 }}
            order={{ xs: 1, md: 1 }}
          >
            <Link to="/" style={{ textDecoration: 'none' }}>
              <img src={Logo} alt="Logo" style={{ height: 42 }} />
            </Link>
          </Stack>

          <Stack
            direction="row"
            alignItems="center"
            justifyContent="center"
            width={{ xs: '100%', md: 'inherit' }}
            gap={6}
            order={{ xs: 3, md: 2 }}
          >
            <Link to="/" style={{ textDecoration: 'none', color: 'initial' }}>
              Home
            </Link>
            <Link to="#" style={{ textDecoration: 'none', color: 'initial' }}>
              Catalog
            </Link>
            <Link to="#" style={{ textDecoration: 'none', color: 'initial' }}>
              About
            </Link>
          </Stack>

          <Stack direction="row" alignItems="center" flexGrow={1} order={{ xs: 4, md: 3 }}>
            <Search />
          </Stack>

          <Stack direction="row" alignItems="center" gap={4} order={{ xs: 2, md: 4 }}>
            <BasketButton />
            {isAuth ? <LogoutButton /> : <LoginButton />}
          </Stack>
        </Stack>
      </Container>
    </AppBar>
  );
}

export default Header;
