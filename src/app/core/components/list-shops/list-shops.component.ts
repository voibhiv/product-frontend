import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Shop } from '../../interfaces/shops.interface';
import { RippleModule } from 'primeng/ripple';
import { TableModule } from 'primeng/table';
import { ButtonModule } from 'primeng/button';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-list-shops',
  standalone: true,
  imports: [RippleModule, TableModule, ButtonModule, CommonModule],
  templateUrl: './list-shops.component.html',
  styleUrl: './list-shops.component.scss',
})
export class ListShopsComponent {
  @Input() product!: Product | null;
  @Output() addPriceEmitter = new EventEmitter();
  @Output() editPriceEmitter = new EventEmitter<Shop>();
  @Output() deletePriceEmitter = new EventEmitter<Shop>();

  openDialogEmitter() {
    this.addPriceEmitter.emit();
  }

  editShop(shop: Shop) {
    this.editPriceEmitter.emit(shop);
  }

  deleteShop(shop: Shop) {
    this.deletePriceEmitter.emit(shop);
  }
}
