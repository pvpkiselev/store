import { Product } from '@/api/models';
import { Box, Container, Grid, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';
import AddToBasketButton from '@/components/common/AddToBasketButton';
import NavigateButton from '@/components/common/NavigateButton';
import { FONT_SIZE_H_1, FONT_SIZE_H_2 } from '@/helpers/constants';

function ProductPage() {
  const product = useLoaderData() as Product;

  const { title, price, category, images, description } = product;

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Grid container spacing={6}>
        <Grid item xs={12} md={6}>
          <Box component="img" src={images[0]} borderRadius="12px" width="100%" height="100%" />
        </Grid>

        <Grid item xs={12} md={6} gap={6}>
          <Stack spacing={6}>
            <Box maxWidth={200}>
              <NavigateButton color="inherit" variant="text" direction="back" />
            </Box>

            <Typography fontSize={FONT_SIZE_H_1} fontWeight={600} component="h4" variant="h4">
              {title}
            </Typography>
            <Typography
              fontSize={FONT_SIZE_H_2}
              color="primary"
              fontWeight={700}
            >{`$ ${price}`}</Typography>
            <AddToBasketButton product={product} />
            <Typography color="gray">Category: {category.name}</Typography>
            <Typography color="gray">{description}</Typography>
          </Stack>
        </Grid>
      </Grid>
    </Container>
  );
}

export default ProductPage;
