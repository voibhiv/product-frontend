import {
  ApplicationConfig,
  importProvidersFrom,
  provideZoneChangeDetection,
} from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { provideState, provideStore } from '@ngrx/store';
import { provideHttpClient } from '@angular/common/http';
// import { productsReducer } from './core/stores/products/reducers';
// import { ProductEffect } from './core/stores/products/effects';
import { provideEffects } from '@ngrx/effects';
import {
  productCreateReducer,
  productReducer,
  productUpdateReducer,
} from './core/store/products/reducer';
import { ProductEffects } from './core/store/products/effects';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { shopReducer } from './core/store/shops/reducer';
import { ShopEffects } from './core/store/shops/effects';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({
      products: productReducer,
      shops: shopReducer,
      product: productCreateReducer,
      productUpdate: productUpdateReducer,
    }),
    provideEffects([ProductEffects, ShopEffects]),
    provideEnvironmentNgxMask(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ],
};
