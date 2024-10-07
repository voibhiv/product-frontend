import { Routes } from '@angular/router';
import { HomeComponent } from './pages/home/home.component';
import { PageNotFoundComponent } from './pages/page-not-found/page-not-found.component';
import { ProductDetailComponent } from './pages/product-detail/product-detail.component';

export const routes: Routes = [
  {
    path: 'produto',
    component: HomeComponent,
  },
  { path: 'produto/cadastro', component: ProductDetailComponent },
  { path: '', redirectTo: '/produto', pathMatch: 'full' },
  { path: '**', component: PageNotFoundComponent },
];
