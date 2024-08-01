import { Product } from '@/api/models';
import { checkImageUrl } from '@/utils/checkImageUrl';
import { cleanUrl } from '@/utils/cleanUrl';
import { Box, Container, Stack, Typography, useMediaQuery } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import placeholderImage from '@public/images/placeholder-image.jpg';
import AddToBasketButton from '@/components/common/AddToBasketButton';
import Grid2 from '@mui/material/Unstable_Grid2/Grid2';
import { theme } from '@/theme/theme';
import BackButton from '@/components/common/BackButton';

function ProductPage() {
  const product = useLoaderData() as Product;
  const isSmallScreen = useMediaQuery(theme.breakpoints.down('md'));

  const { title, price, category, images, description } = product;

  const cleanedImageUrl = cleanUrl(images[0]);
  const isImageExist = checkImageUrl(cleanedImageUrl);
  const imageUrl = isImageExist ? cleanedImageUrl : placeholderImage;

  const priceFontSize = '24px';
  const priceColor = '#2196F3';
  const textColor = '#808080';
  const mainFontSize = '18px';
  const titleFontSize = '40px';

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Grid2 container spacing={6} justifyContent={{ sm: 'center' }}>
        {isSmallScreen && (
          <Grid2 xs={12}>
            <BackButton color="inherit" />
          </Grid2>
        )}
        <Grid2 xs={12} md={6} maxWidth="730px" maxHeight="730px">
          <Box component="img" src={imageUrl} borderRadius="12px" width="100%" height="100%" />
        </Grid2>

        <Grid2 xs={12} md={6} spacing={6}>
          <Stack spacing={6} alignItems={isSmallScreen ? 'center' : 'inherit'}>
            {!isSmallScreen && (
              <Box maxWidth={200}>
                <BackButton color="inherit" />
              </Box>
            )}
            <Typography fontSize={titleFontSize} fontWeight={600} component="h4" variant="h4">
              {title}
            </Typography>
            <Typography
              fontSize={priceFontSize}
              color={priceColor}
              fontWeight={700}
            >{`$ ${price}`}</Typography>
            <AddToBasketButton product={product} isProductPage={true} />
            <Typography fontSize={mainFontSize} color={textColor}>
              Category: {category.name}
            </Typography>
            <Typography fontSize={mainFontSize} color={textColor}>
              {description}
            </Typography>
          </Stack>
        </Grid2>
      </Grid2>
    </Container>
  );
}

export default ProductPage;
