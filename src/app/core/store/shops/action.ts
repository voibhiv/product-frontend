import { createAction, props } from '@ngrx/store';
import { IGetAllShops } from '../../services/shop/interfaces/get-all-shops.interface';

export const loadShops = createAction('[Shop] Load Shops');

export const loadShopsSuccess = createAction(
  '[Shop] Load Shops Success',
  props<{ data: IGetAllShops[] }>(),
);

export const loadShopsFailure = createAction(
  '[Shop] Load Shops Failure',
  props<{ error: string }>(),
);
