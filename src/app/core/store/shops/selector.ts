import { createFeatureSelector, createSelector } from '@ngrx/store';
import { ShopState } from './reducer';

export const selectShopState = createFeatureSelector<ShopState>('shops');

export const selectAllShops = createSelector(
  selectShopState,
  (state: ShopState) => state.shops,
);
