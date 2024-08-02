import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Add, DeleteForever, Remove } from '@mui/icons-material';
import { Box, Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import placeholderImage from '@public/images/placeholder-image.jpg';
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
  const borderRadius = '12px';
  const priceForOneFontSize = '14px';
  const categoryFontSize = '16px';
  const bgColor = '#F6F6F6';

  const currentProduct = basketItems.find((item) => item.id === product.id);
  const totalProductPrice = currentProduct ? currentProduct.price * currentProduct.count : 0;
  const currentProductCount = currentProduct ? currentProduct.count : 0;
  const isProductExist = currentProductCount !== 0;
  const isRemoveButtonActive = currentProductCount <= 1;

  const cleanedImageUrl = cleanUrl(images[0]);
  const isImageExist = checkImageUrl(cleanedImageUrl);
  const imageUrl = isImageExist ? cleanedImageUrl : placeholderImage;

  return (
    isProductExist && (
      <Card
        elevation={0}
        sx={{
          display: 'flex',
          borderRadius,
          maxWidth: '100%',
          minWidth: '240px',
          flexGrow: 1,
          paddingInline: 4,
          paddingBlock: 6,
          backgroundColor: bgColor,
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
              image={imageUrl}
              sx={{ borderRadius, width: '100px', height: '100px' }}
            />
          </Link>
          <CardContent sx={{ width: '100%', padding: '0px !important', flexGrow: 1 }}>
            <Stack gap={1}>
              <Typography color="gray">{title}</Typography>
              <Typography color="gray" fontSize={categoryFontSize}>
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
              <Typography fontSize={priceForOneFontSize}>for one: ${price}</Typography>
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
