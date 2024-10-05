import { Component, Input } from '@angular/core';
import { Product } from '../../interfaces/product.interface';
import { CommonModule } from '@angular/common';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { RippleModule } from 'primeng/ripple';
import { BufferToImagePipe } from '../../shared/pipes/buffer-to-image.pipe';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [
    RippleModule,
    TableModule,
    ButtonModule,
    CommonModule,
    BufferToImagePipe,
  ],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  @Input() products!: Product[];

  expandedRows: { [key: string]: boolean } = {};

  editProduct(product: Product) {
    console.log('editting -> ', product);
  }

  deleteProduct(product: Product) {
    console.log('deleting -> ', product);
  }

  expandAll() {
    this.expandedRows = this.products.reduce(
      (acc, p) => {
        acc[p.id] = true;
        return acc;
      },
      {} as { [key: string]: boolean },
    );
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
