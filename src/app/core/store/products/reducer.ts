import { createReducer, on } from '@ngrx/store';

import { Product } from '../../interfaces/product.interface';
import {
  createProduct,
  createProductError,
  createProductSuccess,
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
import { IGetProductResponse } from '../../services/product/interfaces/product-get.response.interface';
import { ISaveProductResponse } from '../../services/product/interfaces/product-save.response.interface';

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

export interface ProductCreateState {
  product: Product;
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

export const initialStateCreate: ProductCreateState = {
  product: {} as Product,
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

export const productCreateReducer = createReducer(
  initialStateCreate,

  on(createProduct, (state) => ({
    ...state,
    loading: true,
    errorMessage: null,
    success: false,
  })),

  on(createProductError, (state, response: IErrorDefaultResponse) => ({
    ...state,
    loading: false,
    success: false,
    errorMessage: response.message,
  })),

  on(createProductSuccess, (state, response: ISaveProductResponse) => ({
    ...state,
    loading: false,
    success: true,
    product: response.data.product,
    errorMessage: null,
  })),
);
