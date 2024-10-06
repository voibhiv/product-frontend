import { createReducer, on } from '@ngrx/store';

import { Product } from '../../interfaces/product.interface';
import {
  deleteProduct,
  deleteProductError,
  deleteProductSuccess,
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './action';
import { IDeleteProductResponse } from '../../services/product/interfaces/product-delete.response.interface';
import { IErrorDefaultResponse } from '../../services/product/interfaces/error-default.response.interface';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';

export interface ProductState {
  products: Product[];
  count: number;
  form: IGetPaginateProducts;
  loading: boolean;
  error: string | null;
}

export interface ProductRemoveState {
  errorMessage: string | null;
  success: boolean;
  loading: boolean;
}

export const initialState: ProductState = {
  products: [],
  count: 0,
  loading: false,
  error: null,
  form: {
    page: 1,
    pageSize: 5,
  },
};

export const initialStateDelete: ProductRemoveState = {
  errorMessage: null,
  success: false,
  loading: false,
};

export const productReducer = createReducer(
  initialState,
  on(loadProducts, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadProductsSuccess, (state, { products, count, request }) => ({
    ...state,
    loading: false,
    products,
    count,
    form: request,
  })),
  on(loadProductsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);

export const productDelete = createReducer(
  initialStateDelete,

  on(deleteProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
    success: false,
  })),

  on(deleteProductError, (state, response: IErrorDefaultResponse) => ({
    ...state,
    loading: false,
    success: false,
    errorMessage: response.message,
  })),

  on(deleteProductSuccess, (state, response: IDeleteProductResponse) => ({
    ...state,
    loading: false,
    success: true,
    errorMessage: null,
  })),
);
