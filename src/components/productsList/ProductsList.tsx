import { useEffect, useState } from 'react';
import axios, { HttpStatusCode } from 'axios';
import ProductCard from '../productCard/ProductCard';
import { Grid, Stack, Typography } from '@mui/material';
import ProductsListSkeleton from './ProductsListSkeleton';
import PaginationButton from '../paginationButton/PaginationButton';

function ProductsList() {
  const [products, setProducts] = useState<Product[]>([]);

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
    <Stack gap={6} width="100%" pb={10}>
      <Typography fontSize="24px" variant="h3" component="h2">
        {isProductsEmpty ? `${products.length} products` : 'Loading products...'}
      </Typography>
      {isProductsEmpty ? (
        <Grid container spacing={4} wrap="wrap">
          {products.map((product) => (
            <Grid
              item
              xs={12}
              sm={6}
              md={4}
              lg={3}
              display="flex"
              flexDirection="column"
              key={product.id}
            >
              <ProductCard
                category={product.category.name}
                title={product.title}
                price={product.price}
                image={product.images[0]}
              />
            </Grid>
          ))}
        </Grid>
      ) : (
        <ProductsListSkeleton />
      )}
      <PaginationButton />
    </Stack>
  );
}

export default ProductsList;
