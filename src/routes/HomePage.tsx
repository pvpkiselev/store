import Filters from '@/components/filters/Filters';
import ProductsList from '@/components/products/productsList/ProductsList';
import { Container, Stack } from '@mui/material';

function HomePage() {
  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Stack direction={{ xs: 'column', md: 'row' }} spacing={6} width="100%">
        <Filters />
        <ProductsList />
      </Stack>
    </Container>
  );
}

export default HomePage;
