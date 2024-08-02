import { Product } from '@/api/models';
import { BORDER_RADIUS_M, FONT_SIZE_M, FONT_SIZE_S, GRAY_BG } from '@/helpers/constants';
import useBasket from '@/hooks/useBasket';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

interface BasketCardProps {
  product: Product;
}

function BasketCard({ product }: BasketCardProps) {
  const { increaseItemCount, decreaseItemCount, removeFromBasket, basketItems } = useBasket();

  const handleIncreaseCount = () => {
    increaseItemCount(product.id);
  };

  const handleDecreaseCount = () => {
    decreaseItemCount(product.id);
  };

  const handleRemoveFromBasket = () => {
    removeFromBasket(product.id);
  };

  const { images, title, category, price, id } = product;

  const currentProduct = basketItems.find((item) => item.id === product.id);
  const totalProductPrice = currentProduct ? currentProduct.price * currentProduct.count : 0;
  const currentProductCount = currentProduct ? currentProduct.count : 0;
  const isProductExist = currentProductCount !== 0;
  const isRemoveButtonActive = currentProductCount <= 1;

  return (
    isProductExist && (
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          borderRadius: BORDER_RADIUS_M,
          maxWidth: '100%',
          minWidth: '240px',
          flexGrow: 1,
          paddingInline: 4,
          paddingBlock: 6,
          backgroundColor: GRAY_BG,
        }}
      >
        <Stack direction="row" gap={4} alignItems="center" width="100%">
          <Link
            to={`/card/${id}`}
            style={{
              textDecoration: 'none',
              color: 'inherit',
              width: 'fit-content',
              height: 'fit-content',
            }}
          >
            <CardMedia
              component="img"
              image={images[0]}
              sx={{ borderRadius: BORDER_RADIUS_M, width: '100px', height: '100px' }}
            />
          </Link>
          <CardContent sx={{ width: '100%', padding: '0px !important', flexGrow: 1 }}>
            <Stack gap={1}>
              <Typography color="gray">{title}</Typography>
              <Typography color="gray" fontSize={FONT_SIZE_M}>
                Category: {category.name}
              </Typography>
            </Stack>
          </CardContent>
          <Stack direction="row" alignItems="center">
            <IconButton onClick={handleDecreaseCount} disabled={isRemoveButtonActive}>
              <Remove />
            </IconButton>
            <Typography fontWeight={700}>{currentProductCount}</Typography>
            <IconButton onClick={handleIncreaseCount}>
              <Add />
            </IconButton>
          </Stack>
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack gap={2} alignItems="right" textAlign={{ xs: 'left', sm: 'right' }}>
              <Typography fontSize={FONT_SIZE_S}>for one: ${price}</Typography>
              <Typography fontWeight={700}>${totalProductPrice}</Typography>
              <Box>
                <IconButton onClick={handleRemoveFromBasket}>
                  <DeleteForever />
                </IconButton>
              </Box>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    )
  );
}

export default BasketCard;
