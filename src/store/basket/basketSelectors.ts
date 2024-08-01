import { AppState, createAppSelector } from '../redux';

const selectBasketState = (state: AppState) => state.basket;

export const selectBasketItems = createAppSelector(
  [selectBasketState],
  (basketState) => basketState.items
);

export const selectBasketTotalCount = createAppSelector([selectBasketState], (basketState) =>
  basketState.items.reduce((total, item) => total + (item.count || 0), 0)
);
