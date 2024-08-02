import { Product } from '@/api/models';
import BasketCard from '@/components/basket/basketCard/BasketCard';
import NavigateButton from '@/components/common/NavigateButton';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import { selectBasketTotalPrice } from '@/store/basket/basketSelectors';
import { useAppSelector } from '@/store/redux';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function BasketPage() {
  const basketItems = useLoaderData() as Product[];
  const totalPrice = useAppSelector(selectBasketTotalPrice);
  const isBasketEmpty = basketItems.length === 0;

  return (
    <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      {isBasketEmpty ? (
        <Stack
          alignItems="center"
          justifyContent="space-between"
          paddingInline={4}
          paddingBlock={6}
          bgcolor={GRAY_BG}
          borderRadius={BORDER_RADIUS_M}
          gap={4}
        >
          <Typography fontSize="40px" variant="h1" component="h1">
            No products in Basket
          </Typography>
          <NavigateButton direction="home" />
        </Stack>
      ) : (
        <Box>
          <Stack gap={6} width="100%" pb={10}>
            <Typography fontSize="40px" variant="h2" component="h1">
              Shopping Basket
            </Typography>
            <Stack direction="row" gap={6} width="100%" flexWrap="wrap">
              <Stack gap={6} minWidth={288} flexGrow={1}>
                {basketItems.map((product) => (
                  <BasketCard key={product.id} product={product} />
                ))}
              </Stack>
              <Stack
                bgcolor={GRAY_BG}
                justifyContent="space-between"
                borderRadius={BORDER_RADIUS_M}
                paddingInline={4}
                paddingBlock={6}
                maxWidth={{ xs: '100%', sm: 288 }}
                height="fit-content"
                gap={4}
              >
                <Stack direction="row" justifyContent="space-between" gap={4}>
                  <Typography fontSize="24px" variant="h3" component="h2">
                    Total
                  </Typography>
                  <Typography fontSize="24px" variant="h3" color="primary">
                    ${totalPrice}
                  </Typography>
                </Stack>
                <NavigateButton direction="checkout" />
              </Stack>
            </Stack>
          </Stack>
        </Box>
      )}
    </Container>
  );
}

export default BasketPage;
