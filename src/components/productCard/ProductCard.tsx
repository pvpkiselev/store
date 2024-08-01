import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import AddToBasketButton from '../common/AddToBasketButton';
import { Link } from 'react-router-dom';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Product } from '@/api/models';
import placeholderImage from '@public/images/placeholder-image.jpg';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { images, title, category, price, id } = product;
  const bgColor = '#F6F6F6';
  const borderRadius = '12px';
  const textColor = '#808080';
  const categoryFontSize = '16px';

  const cleanedImageUrl = cleanUrl(images[0]);
  const isImageExist = checkImageUrl(cleanedImageUrl);
  const imageUrl = isImageExist ? cleanedImageUrl : placeholderImage;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
        paddingBlock: 6,
        backgroundColor: bgColor,
      }}
    >
      <Link to={`/card/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Stack gap={2}>
          <CardMedia
            component="img"
            image={imageUrl}
            sx={{ borderRadius, maxWidth: '100%', maxHeight: '100%' }}
          />
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography fontWeight={700}>{`$ ${price}`}</Typography>
              <AddToBasketButton product={product} />
            </Stack>
          </CardContent>
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack>
              <Typography color={textColor}>{title}</Typography>
              <Typography color={textColor} fontSize={categoryFontSize}>
                Category: {category.name}
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
      </Link>
    </Card>
  );
}

export default ProductCard;
