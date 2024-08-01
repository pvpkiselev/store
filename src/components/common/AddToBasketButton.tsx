import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import { IconButton } from '@mui/material';

interface AddToBasketButtonProps {
  product: Product;
}

function AddToBasketButton({ product }: AddToBasketButtonProps) {
  const { handleAddToBasket, handleRemoveFromBasket, isProductInBasket } = useBasket();
  const isInBasket = isProductInBasket(product.id);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isInBasket ? handleRemoveFromBasket(product.id) : handleAddToBasket(product);
  };

  return (
    <IconButton onClick={handleBasketClick}>
      {isInBasket ? <RemoveShoppingCart /> : <ShoppingCart color="primary" />}
    </IconButton>
  );
}

export default AddToBasketButton;
