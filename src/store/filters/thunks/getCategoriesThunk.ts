import { Category } from '@/api/models';
import { createAppAsyncThunk } from '@/store/redux';

interface GetCategoriesPayload {
  categories: Category[];
}

interface GetCategoriesError {
  errorMessage: string;
}

const getCategoriesErrorMessage = 'Get Categories Error';

export const getCategoriesThunk = createAppAsyncThunk<
  GetCategoriesPayload,
  Record<string, never>,
  { rejectValue: GetCategoriesError }
>('filters/getCategories', async (_, thunkAPI) => {
  try {
    const response = await thunkAPI.extra.api.filters.getCategories();
    const categories = response;

    return { categories };
  } catch (error) {
    return thunkAPI.rejectWithValue({ errorMessage: getCategoriesErrorMessage });
  }
});
