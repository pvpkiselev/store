import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Add, Remove } from '@mui/icons-material';
import { Card, CardContent, CardMedia, IconButton, Stack, Typography } from '@mui/material';
import placeholderImage from '@public/images/placeholder-image.jpg';

interface BasketCardProps {
  product: Product;
}

function BasketCard({ product }: BasketCardProps) {
  const { handleAddToBasket, handleRemoveFromBasket, basketItems } = useBasket();
  const currentProduct = basketItems.find((item) => item.id === product.id);
  const currentProductCount = currentProduct ? currentProduct.count : 0;
  const isProductExist = currentProductCount !== 0;

  const handleIncreaseCount = () => {
    handleAddToBasket({ ...product, count: currentProductCount + 1 });
  };

  const handleDecreaseCount = () => {
    if (currentProductCount > 1) {
      handleAddToBasket({ ...product, count: currentProductCount - 1 });
    } else {
      handleRemoveFromBasket(product.id);
    }
  };

  const { images, title, category, price } = product;
  const bgColor = '#F6F6F6';
  const borderRadius = '12px';
  const textColor = '#808080';
  const categoryFontSize = '16px';

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
          <CardMedia
            component="img"
            image={imageUrl}
            sx={{ borderRadius, maxWidth: '100px', maxHeight: '100px' }}
          />
          <CardContent sx={{ width: '100%', padding: '0px !important', flexGrow: 1 }}>
            <Stack gap={1}>
              <Typography fontWeight={700}>{`$ ${price}`}</Typography>
              <Typography color={textColor}>{title}</Typography>
              <Typography color={textColor} fontSize={categoryFontSize}>
                Category: {category.name}
              </Typography>
            </Stack>
          </CardContent>
          <CardContent sx={{ padding: '0px !important' }}>
            <Stack direction="row" alignItems="center">
              <IconButton onClick={handleDecreaseCount}>
                <Remove />
              </IconButton>
              <Typography fontWeight={700}>{currentProductCount}</Typography>
              <IconButton onClick={handleIncreaseCount}>
                <Add />
              </IconButton>
            </Stack>
          </CardContent>
        </Stack>
      </Card>
    )
  );
}

export default BasketCard;
