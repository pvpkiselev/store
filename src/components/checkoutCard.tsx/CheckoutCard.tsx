import { Product } from '@/api/models';
import useBasket from '@/hooks/useBasket';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import placeholderImage from '@public/images/placeholder-image.jpg';
import { Link } from 'react-router-dom';

interface CheckoutCardProps {
  product: Product;
}

function CheckoutCard({ product }: CheckoutCardProps) {
  const { basketItems } = useBasket();

  const { images, title, id } = product;

  const borderRadius = '12px';
  const textColor = '#808080';

  const cleanedImageUrl = cleanUrl(images[0]);
  const isImageExist = checkImageUrl(cleanedImageUrl);
  const imageUrl = isImageExist ? cleanedImageUrl : placeholderImage;

  const currentProduct = basketItems.find((item) => item.id === product.id);
  const totalProductPrice = currentProduct ? currentProduct.price * currentProduct.count : 0;
  const totalProductCount = currentProduct ? currentProduct.count : null;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        borderRadius,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
      }}
    >
      <Stack direction="row" gap={4} alignItems="center" width="100%" flexWrap="wrap">
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
        <CardContent sx={{ padding: '0px !important', flexGrow: 1 }}>
          <Typography color={textColor}>{title}</Typography>
        </CardContent>
        <CardContent sx={{ padding: '0px !important', flexGrow: 0 }}>
          <Stack gap={2} textAlign={{ xs: 'left', sm: 'right' }}>
            <Typography fontWeight={700}> ${totalProductPrice}</Typography>
            <Typography>x{totalProductCount}</Typography>
          </Stack>
        </CardContent>
      </Stack>
    </Card>
  );
}

export default CheckoutCard;
