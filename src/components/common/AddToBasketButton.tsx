import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { theme } from '@/theme/theme';
import { RemoveShoppingCart, ShoppingCart } from '@mui/icons-material';
import { Button, IconButton, useMediaQuery } from '@mui/material';

interface AddToBasketButtonProps {
  product: Product;
  isProductPage?: boolean;
}

function AddToBasketButton({ product, isProductPage }: AddToBasketButtonProps) {
  const { handleAddToBasket, handleRemoveFromBasket, isProductInBasket } = useBasket();
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const buttonSize = isSmallScreen ? '100%' : '170px';
  const isInBasket = isProductInBasket(product.id);

  const handleBasketClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    event.preventDefault();
    isInBasket ? handleRemoveFromBasket(product.id) : handleAddToBasket(product);
  };

  return isProductPage ? (
    <Button
      sx={{ textTransform: 'uppercase', fontSize: '15px', width: buttonSize }}
      variant="contained"
      onClick={handleBasketClick}
      startIcon={isInBasket ? <RemoveShoppingCart /> : <ShoppingCart color="inherit" />}
    >
      add to cart
    </Button>
  ) : (
    <IconButton onClick={handleBasketClick}>
      {isInBasket ? <RemoveShoppingCart /> : <ShoppingCart color="primary" />}
    </IconButton>
  );
}

export default AddToBasketButton;
