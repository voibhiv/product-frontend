import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';

import { ListProductsComponent } from '../../core/components/list-products/list-products.component';
import { CommonModule } from '@angular/common';
import { FormProductComponent } from '../../core/components/form-product/form-product.component';
import { Store } from '@ngrx/store';
import { selectAllProducts, selectLoading, selectError } from '../../core/states/products/selector';
import { Observable } from 'rxjs';
import { loadProducts } from '../../core/states/products/action';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProductsComponent, FormProductComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [
    {
      id: 1,
      description: 'Product description 1',
      cost: 336.25,
      image: null,
      shops: [
        {
          idShop: 1,
          shopPrice: 5.99,
          description: 'Green Valley Market',
        },
      ],
    },
    {
      id: 2,
      description: 'Product description 2',
      cost: 306.25,
      image: null,
      shops: [
        {
          idShop: 1,
          shopPrice: 5.99,
          description: 'Green Valley Market',
        },
      ],
    },
    {
      id: 3,
      description: 'Product description 3',
      cost: 326.25,
      image: null,
      shops: [],
    },
    {
      id: 4,
      description: 'Product description 4',
      cost: 236.25,
      image: null,
      shops: [
        {
          idShop: 1,
          shopPrice: 5.99,
          description: 'Green Valley Market',
        },
      ],
    },
    {
      id: 5,
      description: 'Product description 5',
      cost: 536.25,
      image: null,
      shops: [
        {
          idShop: 1,
          shopPrice: 5.99,
          description: 'Green Valley Market',
        },
      ],
    },
  ];

  products$: Observable<Product[]>;
  loading$: Observable<boolean>;
  error$: Observable<string | null>;


  constructor(
    private store: Store
  ) {
    this.products$ = this.store.select(selectAllProducts);
    this.loading$ = this.store.select(selectLoading);
    this.error$ = this.store.select(selectError);
  }

  ngOnInit() {
    console.log('Dispatching loadProducts action');
    this.store.dispatch(loadProducts());
  }

}
