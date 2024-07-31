import { AppState, createAppSelector } from '../redux';

const selectFiltersState = (state: AppState) => state.filters;

export const selectFiltersStatus = createAppSelector(
  [selectFiltersState],
  (filtersState) => filtersState.status
);
