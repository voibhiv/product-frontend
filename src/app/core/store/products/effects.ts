import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
import {
  loadProducts,
  loadProductsFailure,
  loadProductsSuccess,
} from './action';
import { Injectable } from '@angular/core';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';
import { IGetProductResponse } from '../../services/product/interfaces/product-get.response.interface';

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
      mergeMap((request: IGetPaginateProducts) =>
        this.productService.getProductsPaginate(request).pipe(
          map((response: IGetProductResponse) =>
            loadProductsSuccess({
              products: response.data.products,
              count: response.data.count,
            }),
          ),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );
}
