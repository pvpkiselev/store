import { Product } from '@/api/models';
import CheckoutCard from '@/components/checkoutCard.tsx/CheckoutCard';
import NavigateButton from '@/components/common/NavigateButton';
import { BORDER_RADIUS_M, GRAY_BG } from '@/helpers/constants';
import { selectBasketTotalCount, selectBasketTotalPrice } from '@/store/basket/basketSelectors';
import { useAppSelector } from '@/store/redux';
import { getFormattedDate } from '@/utils/getFormattedDate';
import { Box, Container, Stack, Typography } from '@mui/material';
import { useLoaderData } from 'react-router-dom';

function CheckoutPage() {
  const checkoutItems = useLoaderData() as Product[];
  const totalPrice = useAppSelector(selectBasketTotalPrice);
  const totalCount = useAppSelector(selectBasketTotalCount);
  const currentDate = getFormattedDate();

  return (
    <Container maxWidth="md" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Box>
        <Stack gap={6} width="100%" pb={10}>
          <Stack
            direction="row"
            gap={4}
            justifyContent="space-between"
            alignItems="center"
            flexWrap="wrap"
          >
            <Typography fontSize={40} variant="h2" component="h1">
              My order
            </Typography>
            <NavigateButton direction="home" />
          </Stack>
          <Stack
            direction="row"
            alignItems="center"
            justifyContent="space-between"
            paddingInline={4}
            paddingBlock={6}
            bgcolor={GRAY_BG}
            borderRadius={BORDER_RADIUS_M}
          >
            <Stack gap={4}>
              <Typography fontSize={24} variant="h2" component="h2">
                {currentDate}
              </Typography>
              <Typography color="gray">{totalCount} products</Typography>
            </Stack>
            <Typography fontSize="24px" variant="h3" color="primary">
              ${totalPrice}
            </Typography>
          </Stack>
          <Stack gap={6} width="100%">
            {checkoutItems.map((product) => (
              <CheckoutCard key={product.id} product={product} />
            ))}
          </Stack>
        </Stack>
      </Box>
    </Container>
  );
}

export default CheckoutPage;
