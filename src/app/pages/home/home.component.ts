import { Component, OnInit } from '@angular/core';
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
} from '../../core/store/products/selector';
import { Observable } from 'rxjs';
import { loadProducts } from '../../core/store/products/action';
import { IGetPaginateProducts } from '../../core/services/product/interfaces/get-paginate-products.interface';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProductsComponent, FormProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  private page!: number;
  private pageSize!: number;

  products$: Observable<Product[]>;
  count$: Observable<number>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;

  constructor(private store: Store) {
    this.products$ = this.store.select(selectAllProducts);
    this.count$ = this.store.select(selectCount);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    this.setPaginator(1, 5, true);
    this.products$.subscribe((value) => console.log('valor => ', value));
    this.count$.subscribe((value) => console.log('counter -> ', value));
    this.loading$.subscribe((value) => console.log('loading', value));
  }

  onPaginate(event: { page: number; pageSize: number }) {
    const { page, pageSize } = event;
    this.setPaginator(page, pageSize, true);
  }

  onSearch(search: Omit<IGetPaginateProducts, 'page' | 'pageSize'>) {
    this.setPaginator(1, this.pageSize);

    const formRequest: IGetPaginateProducts = {
      ...search,
      page: this.page,
      pageSize: this.pageSize,
    };

    this.fetchData(formRequest);
  }

  setPaginator(page: number, pageSize: number, callRequest: boolean = false) {
    this.page = page;
    this.pageSize = pageSize;
    if (callRequest) {
      this.fetchData({ page, pageSize });
    }
  }

  fetchData(data: IGetPaginateProducts) {
    this.store.dispatch(loadProducts(data));
  }
}
