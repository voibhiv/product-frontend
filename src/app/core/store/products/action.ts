import { createAction, props } from '@ngrx/store';
import { Product } from '../../interfaces/product.interface';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';

export const loadProducts = createAction(
  '[Product] Load Products',
  props<IGetPaginateProducts>(),
);
export const loadProductsSuccess = createAction(
  '[Product] Load Products Success',
  props<{ products: Product[], count: number }>(),
);

export const loadProductsFailure = createAction(
  '[Product] Load Products Failure',
  props<{ error: string }>(),
);
