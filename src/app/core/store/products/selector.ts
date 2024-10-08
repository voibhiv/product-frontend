import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductState } from './reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectAllProducts = createSelector(
  selectProductState,
  (state: ProductState) => state.products,
);

export const selectCount = createSelector(
  selectProductState,
  (state: ProductState) => state.count,
);

export const selectLoading = createSelector(
  selectProductState,
  (state: ProductState) => state.loading,
);

export const selectError = createSelector(
  selectProductState,
  (state: ProductState) => state.error,
);

export const selectForm = createSelector(
  selectProductState,
  (state: ProductState) => state.form,
);
