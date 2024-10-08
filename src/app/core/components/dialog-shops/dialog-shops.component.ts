import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shops/selector';
import { map, Observable } from 'rxjs';
import { IShopList } from '../../interfaces/shop-list.interface';
import { DropdownModule } from 'primeng/dropdown';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';

@Component({
  selector: 'app-dialog-shops',
  standalone: true,
  imports: [
    DropdownModule,
    FormsModule,
    CommonModule,
    InputTextModule,
    ReactiveFormsModule,
    DialogModule,
    ButtonModule,
  ],
  templateUrl: './dialog-shops.component.html',
  styleUrl: './dialog-shops.component.scss',
})
export class DialogShopsComponent implements OnInit {
  shops$: Observable<IShopList[]>;
  selectedShop?: IShopList;
  @Input() display: boolean = false;
  @Output() closedModal = new EventEmitter<null | IShopList>();

  constructor(private store: Store) {
    this.shops$ = this.store.select(selectAllShops).pipe(
      map((shops) =>
        shops.map((shop) => ({
          ...shop,
          displayName: `${shop.id} - ${shop.description}`,
        })),
      ),
    );
  }

  ngOnInit(): void {
    this.shops$.subscribe((value) => console.log('agora -> ', value));
  }

  onClose() {
    this.closedModal.emit(null);
  }

  onSave() {}
}
