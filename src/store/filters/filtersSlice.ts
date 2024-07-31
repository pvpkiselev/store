import { Category, Product } from '@/api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { getCategoriesThunk } from './thunks/getCategoriesThunk';
import { getSortedProductsThunk } from './thunks/getSortedProductsThunk';

type FiltersState = {
  products: Product[];
  offset: number;
  categories: Category[];
  categoryId: number | null;
  priceRange: number[];
  searchQuery: string | null;
  status: 'pending' | 'fulfilled' | 'rejected';
  error: string | undefined;
};

const filtersInitialState: FiltersState = {
  products: [],
  offset: 0,
  categories: [],
  categoryId: null,
  priceRange: [0, 300],
  searchQuery: null,
  status: 'fulfilled',
  error: undefined,
};

const filtersSlice = createSlice({
  name: 'auth',
  initialState: filtersInitialState,
  reducers: {
    changedPriceRange(state, action: PayloadAction<number[]>) {
      state.priceRange = action.payload;
      state.offset = 0;
    },
    changeCategoryId(state, action: PayloadAction<number>) {
      state.categoryId = action.payload;
      state.offset = 0;
    },
    changedSearchQuery(state, action: PayloadAction<string>) {
      state.searchQuery = action.payload;
      state.offset = 0;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCategoriesThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getCategoriesThunk.fulfilled, (state, action) => {
        state.categories = action.payload.categories;
      })
      .addCase(getCategoriesThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      })

      .addCase(getSortedProductsThunk.pending, (state) => {
        state.status = 'pending';
      })
      .addCase(getSortedProductsThunk.fulfilled, (state, action) => {
        state.products = action.payload.products;
      })
      .addCase(getSortedProductsThunk.rejected, (state, action) => {
        state.status = 'rejected';
        state.error = action.payload?.errorMessage;
      });
  },
});

export const { changedPriceRange, changeCategoryId, changedSearchQuery } = filtersSlice.actions;
export const filtersReducer = filtersSlice.reducer;
