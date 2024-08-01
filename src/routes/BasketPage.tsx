import { Product } from '@/api/models';
import BasketCard from '@/components/basketCard/BasketCard';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function BasketPage() {
  const basketItems = useLoaderData() as Product[];
  const isBasketNotEmpty = basketItems.length > 0;

  return (
    <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Box>
        <Stack gap={6} width="100%" pb={10}>
          <Typography fontSize="40px" variant="h2" component="h1">
            Shopping Basket
          </Typography>
          <Stack direction="row" gap={6} width="100%">
            {isBasketNotEmpty ? (
              <Stack gap={6} width="100%">
                {basketItems.map((product) => (
                  <BasketCard key={product.id} product={product} />
                ))}
              </Stack>
            ) : (
              <Typography>No items in basket</Typography>
            )}
            <Box bgcolor="gray">Price</Box>
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default BasketPage;
