import { ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function AddToBasketButton() {
  function handleQueryAddToBasket() {}

  return (
    <IconButton onClick={handleQueryAddToBasket}>
      <ShoppingCart />
    </IconButton>
  );
}

export default AddToBasketButton;
