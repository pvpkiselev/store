import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import AddToBasketButton from '../common/AddToBasketButton';

interface ProductProps {
  image: string;
  price: number;
  title: string;
  category: string;
  id?: number;
}

function ProductCard(props: ProductProps) {
  const { image, title, category, price } = props;
  const bgColor = '#F6F6F6';
  const borderRadius = '12px';
  const textColor = '#808080';
  const fontSize = '18px';

  return (
    <Card
      sx={{
        borderRadius,
        height: 430,
        width: 300,
        p: 5,
        backgroundColor: bgColor,
        boxShadow: 'none',
      }}
    >
      <CardMedia
        component="img"
        image={image}
        sx={{ borderRadius, maxWidth: '100%', maxHeight: '100%' }}
      />
      <CardContent sx={{ width: '100%', px: 0 }}>
        <Stack direction="row" pl={2} alignItems="center" justifyContent="space-between">
          <Typography fontSize={fontSize} fontWeight={700}>{`$ ${price}`}</Typography>
          <AddToBasketButton />
        </Stack>

        <Stack>
          <Typography color={textColor}>{title}</Typography>
          <Typography color={textColor}>Category: {category}</Typography>
        </Stack>
      </CardContent>
    </Card>
  );
}

export default ProductCard;
