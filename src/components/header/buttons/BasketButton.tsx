import { ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';
import { Link } from 'react-router-dom';

function BasketButton() {
  return (
    <Link to="#" style={{ textDecoration: 'none', color: 'inherit' }}>
      <IconButton size="large" aria-label="login">
        <ShoppingCart fontSize="inherit" />
      </IconButton>
    </Link>
  );
}

export default BasketButton;
