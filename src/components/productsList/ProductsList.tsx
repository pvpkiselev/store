import { useCallback, useLayoutEffect, useState } from 'react';
import ProductCard from '../productCard/ProductCard';
import { Alert, Box, Grid, Stack, Typography } from '@mui/material';
import ProductsListSkeleton from './ProductsListSkeleton';
import PaginationButton from '../paginationButton/PaginationButton';
import { useAppDispatch, useAppSelector } from '@/store/redux';
import {
  selectCurrentCategoryId,
  selectFiltersStatus,
  selectLimit,
  selectPriceRange,
  selectProducts,
  selectSearchQuery,
} from '@/store/filters/filtersSelectors';
import { getSortedProductsThunk } from '@/store/filters/thunks/getSortedProductsThunk';
import { PRODUCTS_MAX_LIMIT } from '@/helpers/constants';

function ProductsList() {
  const [error, setError] = useState<string | null>(null);

  const searchQuery = useAppSelector(selectSearchQuery);
  const priceRange = useAppSelector(selectPriceRange);
  const categoryId = useAppSelector(selectCurrentCategoryId);
  const limit = useAppSelector(selectLimit);
  const products = useAppSelector(selectProducts);
  const status = useAppSelector(selectFiltersStatus);
  const dispatch = useAppDispatch();

  const getProductsList = useCallback(async () => {
    setError(null);
    const options = { searchQuery, priceRange, categoryId, limit };
    try {
      await dispatch(getSortedProductsThunk(options));
    } catch (error) {
      setError('Products Fetch Failed');
      console.error(error);
    }
  }, [searchQuery, priceRange, categoryId, limit, dispatch]);

  useLayoutEffect(() => {
    getProductsList();
  }, [getProductsList]);

  const isProductsEmpty = products.length === 0;
  const isEndOfList = products.length % limit !== 0 || products.length === PRODUCTS_MAX_LIMIT;
  const isLoading = status === 'pending';

  return (
    <Box flex="1">
      {error ? (
        <Alert severity="error">{error}</Alert>
      ) : (
        <Stack gap={6} width="100%" pb={10}>
          <Typography fontSize="24px" variant="h3" component="h2">
            {isProductsEmpty ? 'No products found' : `${products.length} products`}
          </Typography>
          {isLoading ? (
            <ProductsListSkeleton />
          ) : (
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
          )}

          {!isProductsEmpty && !isEndOfList ? (
            <PaginationButton />
          ) : (
            <Typography fontSize={18} textAlign="center" color="gray">
              {isLoading ? 'Loading…' : 'No more products'}
            </Typography>
          )}
        </Stack>
      )}
    </Box>
  );
}

export default ProductsList;
