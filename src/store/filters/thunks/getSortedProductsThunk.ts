import { Product } from '@/api/models';
import { createAppAsyncThunk } from '@/store/redux';

interface GetSortedProductsPayload {
  products: Product[];
}

interface GetSortedProductsError {
  errorMessage: string;
}

const getSortedProductsErrorMessage = 'Get Sorted Products Error';

export const getSortedProductsThunk = createAppAsyncThunk<
  GetSortedProductsPayload,
  { searchQuery: string; priceRange: number[]; categoryId: number; offset: number },
  { rejectValue: GetSortedProductsError }
>(
  'filters/getSortedProducts',
  async ({ searchQuery, priceRange, categoryId, offset }, thunkAPI) => {
    try {
      const response = await thunkAPI.extra.api.filters.getSortedProducts({
        searchQuery,
        priceRange,
        categoryId,
        offset,
      });
      const products = response;

      return { products };
    } catch (error) {
      return thunkAPI.rejectWithValue({ errorMessage: getSortedProductsErrorMessage });
    }
  }
);
