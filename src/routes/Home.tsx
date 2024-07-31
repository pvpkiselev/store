import Filters from '@/components/filters/Filters';
import { Container } from '@mui/material';

function Home() {
  return (
    <Container maxWidth="xl" sx={{ paddingInline: { sm: 4, md: 6 } }}>
      <Filters />
    </Container>
  );
}

export default Home;
