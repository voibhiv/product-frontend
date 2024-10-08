import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ProductCreateState, ProductState } from './reducer';

export const selectProductState =
  createFeatureSelector<ProductState>('products');

export const selectCreateProductState =
  createFeatureSelector<ProductCreateState>('product');

  export const selectUpdateProductState =
  createFeatureSelector<ProductCreateState>('productUpdate');

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

export const selectProductCreated = createSelector(
  selectCreateProductState,
  (state: ProductCreateState) => state.product,
);

export const selectProductUpdated = createSelector(
  selectUpdateProductState,
  (state: ProductCreateState) => state.product,
);
