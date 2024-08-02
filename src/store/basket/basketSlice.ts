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
    addToBasket(state, action: PayloadAction<Product>) {
      const existingItem = state.items.find((item) => item.id === action.payload.id);
      if (existingItem) {
        existingItem.count = action.payload.count;
      } else {
        state.items.push(action.payload);
      }
    },
    removeFromBasket(state, action: PayloadAction<number>) {
      state.items = state.items.filter((item) => item.id !== action.payload);
    },
    setBasket(state, action: PayloadAction<Product[]>) {
      state.items = action.payload;
    },
  },
});

export const { addToBasket, removeFromBasket, setBasket } = basketSlice.actions;
export const basketReducer = basketSlice.reducer;
