import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product.service';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './action';
import { Injectable } from '@angular/core';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
  ) {
    console.log(this.actions$);
  }

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap(() =>
        this.productService.getProductsPaginate().pipe(
          map((products) => loadProductsSuccess({ products })),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
