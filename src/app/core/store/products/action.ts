import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';
import { IDeleteProductResponse } from '../../services/product/interfaces/product-delete.response.interface';
import { IErrorDefaultResponse } from '../../services/product/interfaces/error-default.response.interface';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<IGetPaginateProducts>(),
);

export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[]; count: number }>(),
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>(),
);

export const deleteProduct = createAction(
  '[Product] Delete Product',
  props<{ id: number }>(),
);

export const deleteProductSuccess = createAction(
  '[Product] Delete Product Success',
  props<IDeleteProductResponse>(),
);

export const deleteProductError = createAction(
  '[Product] Delete Product Error',
  props<IErrorDefaultResponse>(),
);
