import Filters from '@/components/filters/Filters';
import ProductList from '@/components/productsList/ProductList';
import { Container, Stack, useMediaQuery } from '@mui/material';

function Home() {
  const isMobile = useMediaQuery('(max-width:620px)');

  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Stack direction={isMobile ? 'column' : 'row'} spacing={6}>
        <Filters />
        <ProductList />
      </Stack>
    </Container>
  );
}

export default Home;
