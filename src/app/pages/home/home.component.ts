import { Component, OnInit, ViewChild } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';

import { ListProductsComponent } from '../../core/components/list-products/list-products.component';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../../core/components/form-product/form-product.component';
import { Store } from '@ngrx/store';
import {
  selectAllProducts,
  selectLoading,
  selectError,
  selectCount,
  selectForm,
} from '../../core/store/products/selector';
import { Observable } from 'rxjs';
import { deleteProduct, loadProducts } from '../../core/store/products/action';
import { IGetPaginateProducts } from '../../core/services/product/interfaces/get-paginate-products.interface';
import { Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    CommonModule,
    ListProductsComponent,
    FormProductComponent,
    ToastModule,
    RippleModule,
    ButtonModule,
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products$: Observable<Product[]>;
  count$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;
  formStore$: Observable<IGetPaginateProducts>;

  private formRequest: IGetPaginateProducts = {
    page: 1,
    pageSize: 5,
  };

  @ViewChild(ListProductsComponent)
  listProductsComponent!: ListProductsComponent;

  constructor(
    private store: Store,
    private router: Router,
  ) {
    this.products$ = this.store.select(selectAllProducts);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
    this.formStore$ = this.store.select(selectForm);
  }

  ngOnInit() {
    this.fetchData(this.formRequest);
    this.formStore$.subscribe((value) => (this.formRequest = value));
  }

  onPaginate(event: { page: number; pageSize: number }) {
    const { page, pageSize } = event;

    this.fetchData({ ...this.formRequest, page, pageSize });
  }

  onSearch(search: Omit<IGetPaginateProducts, 'page' | 'pageSize'>) {
    const formRequest: IGetPaginateProducts = {
      ...search,
      page: 1,
      pageSize: 5,
    };

    this.listProductsComponent.reset();

    this.fetchData(formRequest);
  }

  fetchData(data: IGetPaginateProducts) {
    this.store.dispatch(loadProducts(data));
  }

  deleteProduct(id: number) {
    this.store.dispatch(deleteProduct({ id }));
  }

  editProduct(product: Product) {
    this.router.navigate(['/produto/cadastro'], {
      state: { product },
    });
  }
}
