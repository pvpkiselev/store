import { Product } from '@/api/models';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import placeholderImage from '@public/images/placeholder-image.jpg';
import AddToBasketButton from '@/components/common/AddToBasketButton';
import NavigateButton from '@/components/common/NavigateButton';

function ProductPage() {
  const product = useLoaderData() as Product;

  const { title, price, category, images, description } = product;

  const cleanedImageUrl = cleanUrl(images[0]);
  const isImageExist = checkImageUrl(cleanedImageUrl);
  const imageUrl = isImageExist ? cleanedImageUrl : placeholderImage;

  const priceFontSize = '24px';
  const titleFontSize = '40px';
  const priceColor = '#2196F3';
  const textColor = '#808080';

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={imageUrl} borderRadius="12px" width="100%" height="100%" />
        </Grid>

        <Grid item xs={12} md={6} gap={6}>
          <Stack spacing={6}>
            <Box maxWidth={200}>
              <NavigateButton color="inherit" variant="text" direction="back" />
            </Box>

            <Typography fontSize={titleFontSize} fontWeight={600} component="h4" variant="h4">
              {title}
            </Typography>
            <Typography
              fontSize={priceFontSize}
              color={priceColor}
              fontWeight={700}
            >{`$ ${price}`}</Typography>
            <AddToBasketButton product={product} />
            <Typography color={textColor}>Category: {category.name}</Typography>
            <Typography color={textColor}>{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
