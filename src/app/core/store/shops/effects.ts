import { Injectable } from '@angular/core';
import { ShopState } from './reducer';
import { Actions, createEffect, ofType } from '@ngrx/effects';
import { Store } from '@ngrx/store';
import { loadShops, loadShopsFailure, loadShopsSuccess } from './action';
import { ShopService } from '../../services/shop/shop.service';
import { catchError, map, mergeMap, of } from 'rxjs';
import { IGetShopResponse } from '../../services/shop/interfaces/shop-get.response.interface';

@Injectable()
export class ShopEffects {
  constructor(
    private actions$: Actions,
    private shopService: ShopService,
    private store: Store<ShopState>,
  ) {}

  loadShops$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadShops),
      mergeMap(() =>
        this.shopService.getAllShops().pipe(
          map((response: IGetShopResponse) =>
            loadShopsSuccess({
              data: response.data,
            }),
          ),
          catchError((error) => of(loadShopsFailure({ error: error.message }))),
        ),
      ),
    ),
  );
}
