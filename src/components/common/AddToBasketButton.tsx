import { ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';

function AddToBasketButton() {
  function handleAddToBasket() {}

  return (
    <IconButton onClick={handleAddToBasket}>
      <ShoppingCart />
    </IconButton>
  );
}

export default AddToBasketButton;
