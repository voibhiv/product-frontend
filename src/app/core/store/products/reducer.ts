import { createReducer, on } from '@ngrx/store';

import { Product } from '../../interfaces/product.interface';
import { loadProducts, loadProductsFailure, loadProductsSuccess } from './action';

export interface ProductState {
  products: Product[];
  count: number;
  loading: boolean;
  error: string | null;
}

export const initialState: ProductState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products, count }) => ({
    ...state,
    loading: false,
    products,
    count
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
