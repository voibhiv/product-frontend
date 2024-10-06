import { Component, EventEmitter, Input, Output } from '@angular/core';
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
  @Input() countProducts!: number;
  @Input() loading!: boolean;
  @Output() paginateEvent = new EventEmitter<{
    page: number;
    pageSize: number;
  }>();

  rows: number = 5;
  first: number = 0;
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

  paginate(event: any) {
    const page = event.first / event.rows + 1;
    const pageSize = event.rows;
    this.first = event.first;

    this.paginateEvent.emit({ page, pageSize });
  }

  collapseAll() {
    this.expandedRows = {};
  }
}
