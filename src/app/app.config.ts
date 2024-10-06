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
import { productReducer } from './core/store/products/reducer';
import { ProductEffects } from './core/store/products/effects';
import { provideEnvironmentNgxMask } from 'ngx-mask';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes),
    provideHttpClient(),
    provideStore({ products: productReducer }),
    provideEffects([ProductEffects]),
    provideEnvironmentNgxMask(),
    importProvidersFrom([BrowserModule, BrowserAnimationsModule]),
  ],
};
