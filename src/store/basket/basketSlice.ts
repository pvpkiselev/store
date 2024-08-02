import { Product } from '@/api/models';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface BasketState {
  items: Product[];
}

const basketInitialState: BasketState = {
  items: [],
};

const basketSlice = createSlice({
  name: 'basket',
  initialState: basketInitialState,
  reducers: {
    addedToBasket(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (!existingItem) {
        state.items.push({ ...action.payload, count: 1 });
      }
    },
    removedFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    increasedItemCount(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count += 1;
      }
    },
    decreasedItemCount(state, action: PayloadAction<number>) {
      const existingItem = state.items.find((item) => item.id === action.payload);
      if (existingItem) {
        existingItem.count -= 1;
      }
    },
    basketSet(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const {
  addedToBasket,
  removedFromBasket,
  increasedItemCount,
  decreasedItemCount,
  basketSet,
} = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
