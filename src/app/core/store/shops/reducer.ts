import { createReducer, on } from '@ngrx/store';
import { IShopList } from '../../interfaces/shop-list.interface';
import { loadShops, loadShopsFailure, loadShopsSuccess } from './action';

export interface ShopState {
  shops: IShopList[];
  loading: boolean;
  error: string | null;
}

export const initialState: ShopState = {
  shops: [],
  loading: false,
  error: null,
};

export const shopReducer = createReducer(
  initialState,
  on(loadShops, (state) => ({
    ...state,
    loading: true,
    error: null,
  })),
  on(loadShopsSuccess, (state, { data }) => ({
    ...state,
    shops: data,
    loading: false,
    error: null,
  })),
  on(loadShopsFailure, (state, { error }) => ({
    ...state,
    loading: false,
    error,
  })),
);
