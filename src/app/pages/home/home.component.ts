import { Component, OnInit } from '@angular/core';
import { Product } from '../../core/interfaces/product.interface';

import { ListProductsComponent } from '../../core/components/list-products/list-products.component';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, ListProductsComponent],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent implements OnInit {
  products: Product[] = [
    { id: 1, description: 'Product description 1', cost: 336.25, image: null },
    { id: 2, description: 'Product description 2', cost: 478.79, image: null },
    { id: 3, description: 'Product description 3', cost: 53.31, image: null },
    { id: 4, description: 'Product description 4', cost: 52.04, image: null },
    { id: 5, description: 'Product description 5', cost: 363.0, image: null },
    { id: 6, description: 'Product description 6', cost: 75.59, image: null },
    { id: 7, description: 'Product description 7', cost: 82.47, image: null },
    { id: 8, description: 'Product description 8', cost: 179.74, image: null },
    { id: 9, description: 'Product description 9', cost: 133.54, image: null },
    {
      id: 10,
      description: 'Product description 10',
      cost: 326.11,
      image: null,
    },
  ];

  constructor() {} // private productService: ProductService

  ngOnInit() {
    // this.productService.getProductsMini().then((data) => {
    //   this.products = data;
    // });
  }

  // getSeverity(status: string) {
  //   switch (status) {
  //     case 'INSTOCK':
  //       return 'success';
  //     case 'LOWSTOCK':
  //       return 'warning';
  //     case 'OUTOFSTOCK':
  //       return 'danger';
  //   }
  // }
}
