import { Card, CardContent, CardMedia, Stack, Typography } from '@mui/material';
import AddToBasketButton from '../../common/AddToBasketButton';
import { Link } from 'react-router-dom';
import { Product } from '@/api/models';
import { BORDER_RADIUS_M, FONT_SIZE_M, GRAY_BG } from '@/helpers/constants';

interface ProductCardProps {
  product: Product;
}

function ProductCard({ product }: ProductCardProps) {
  const { images, title, category, price, id } = product;

  return (
    <Card
      elevation={0}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        borderRadius: BORDER_RADIUS_M,
        maxWidth: '100%',
        minWidth: '240px',
        flexGrow: 1,
        paddingInline: 4,
        paddingBlock: 6,
        backgroundColor: GRAY_BG,
      }}
    >
      <Link to={`/card/${id}`} style={{ textDecoration: 'none', color: 'inherit' }}>
        <Stack gap={2}>
          <CardMedia
            component="img"
            image={images[0]}
            sx={{
              borderRadius: BORDER_RADIUS_M,
              width: '100%',
              maxHeight: '100%',
              aspectRatio: '3/2',
            }}
          />
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack direction="row" alignItems="center" justifyContent="space-between">
              <Typography fontWeight={700}>${price}</Typography>
              <AddToBasketButton product={product} isIconButton={true} />
            </Stack>
          </CardContent>
          <CardContent sx={{ width: '100%', padding: '0px !important' }}>
            <Stack>
              <Typography color="gray">{title}</Typography>
              <Typography color="gray" fontSize={FONT_SIZE_M}>
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
