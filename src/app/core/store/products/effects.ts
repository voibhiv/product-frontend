import { Actions, createEffect, ofType } from '@ngrx/effects';
import { catchError, map, mergeMap, tap, withLatestFrom } from 'rxjs/operators';
import { of } from 'rxjs';
import { ProductService } from '../../services/product/product.service';
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
  updateProduct,
  updateProductError,
  updateProductSuccess,
} from './action';
import { Injectable } from '@angular/core';
import { Store, select } from '@ngrx/store';
import { ProductState } from './reducer';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';
import { IGetProductResponse } from '../../services/product/interfaces/product-get.response.interface';
import { IDeleteProductResponse } from '../../services/product/interfaces/product-delete.response.interface';
import { IErrorDefaultResponse } from '../../services/product/interfaces/error-default.response.interface';
import { selectForm } from './selector';
import { ISaveProductResponse } from '../../services/product/interfaces/product-save.response.interface';

@Injectable()
export class ProductEffects {
  constructor(
    private actions$: Actions,
    private productService: ProductService,
    private store: Store<ProductState>,
  ) {}

  loadProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(loadProducts),
      mergeMap((request: IGetPaginateProducts) =>
        this.productService.getProductsPaginate(request).pipe(
          map((response: IGetProductResponse) =>
            loadProductsSuccess({
              products: response.data.products,
              count: response.data.count,
              request,
            }),
          ),
          catchError((error) =>
            of(loadProductsFailure({ error: error.message })),
          ),
        ),
      ),
    ),
  );

  deleteProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(deleteProduct),
      mergeMap(({ id }) =>
        this.productService.deleteProduct(id).pipe(
          map((response: IDeleteProductResponse) =>
            deleteProductSuccess(response),
          ),
          catchError((error: IErrorDefaultResponse) =>
            of(deleteProductError(error)),
          ),
        ),
      ),
      withLatestFrom(this.store.select(selectForm)),
      tap(([action, form]) => {
        this.store.dispatch(loadProducts(form));
      }),
      map(() => ({ type: '[Product] No Action' })),
    ),
  );

  createProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(createProduct),
      mergeMap((request) =>
        this.productService.createProduct(request).pipe(
          map((response: ISaveProductResponse) => {
            console.log('chegando aqui response: ', response);
            return createProductSuccess(response);
          }),
          catchError((error: IErrorDefaultResponse) =>
            of(createProductError(error)),
          ),
        ),
      ),
    ),
  );

  updateProducts$ = createEffect(() =>
    this.actions$.pipe(
      ofType(updateProduct),
      mergeMap(({ request, id }) =>
        this.productService.updateProduct(request, id).pipe(
          map((response: ISaveProductResponse) =>
            updateProductSuccess(response),
          ),
          catchError((error: IErrorDefaultResponse) =>
            of(updateProductError(error)),
          ),
        ),
      ),
    ),
  );
}
