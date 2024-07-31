import Grid from '@mui/material/Unstable_Grid2/Grid2';
import axios, { HttpStatusCode } from 'axios';
import { useEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import { Skeleton, Stack, Typography, useMediaQuery } from '@mui/material';

function ProductList() {
  const [products, setProducts] = useState<Product[]>([]);
  const isMobile = useMediaQuery('(max-width:620px)');

  useEffect(() => {
    async function getProducts() {
      const response = await axios.get('https://api.escuelajs.co/api/v1/products');
      if (response.status === HttpStatusCode.Ok) {
        setProducts(response.data);
      }
    }
    getProducts();
  }, []);

  const isProductsEmpty = products.length > 0;

  return (
    <Stack>
      <Typography
        variant="h4"
        component="h4"
        fontSize="24px"
        textAlign={isMobile ? 'center' : 'inherit'}
        mb={9}
      >
        {isProductsEmpty ? `${products.length} products` : 'Loading products...'}
      </Typography>
      <Grid justifyContent={isMobile ? 'center' : ''} container spacing={4}>
        {isProductsEmpty
          ? products.map((product) => (
              <Grid key={product.id}>
                <ProductCard
                  category={product.category.name}
                  title={product.title}
                  price={product.price}
                  image={product.images[0]}
                />
              </Grid>
            ))
          : Array.from(new Array(8)).map((_, index) => (
              <Grid key={index} xs={12} sm={8} md={6} lg={4} xl={3}>
                <Skeleton variant="rectangular" width="300px" height={250} />
                <Skeleton variant="text" width="320px" sx={{ mt: 1 }} />
                <Skeleton variant="text" width="180px" />
              </Grid>
            ))}
      </Grid>
    </Stack>
  );
}

export default ProductList;
