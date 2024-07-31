import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import AddToBasketButton from '../common/AddToBasketButton';
import { Link } from 'react-router-dom';
import { checkImageUrl } from '@/utils/checkImageUrl';
import placeholderImage from '@public/images/placeholder-image.jpg';

interface ProductProps {
  image: string;
  price: number;
  title: string;
  category: string;
  id?: number;
}

function ProductCard(props: ProductProps) {
  const { image, title, category, price, id } = props;
  const bgColor = '#F6F6F6';
  const borderRadius = '12px';
  const textColor = '#808080';
  const categoryFontSize = '16px';

  const isImageExist = checkImageUrl(image);
  const imageUrl = isImageExist ? image : placeholderImage;

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
              <AddToBasketButton />
            </Stack>
          </CardContent>
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack>
              <Typography color={textColor}>{title}</Typography>
              <Typography color={textColor} fontSize={categoryFontSize}>
                Category: {category}
              </Typography>
            </Stack>
          </CardContent>
        </Stack>
      </Link>
    </Card>
  );
}

export default ProductCard;
