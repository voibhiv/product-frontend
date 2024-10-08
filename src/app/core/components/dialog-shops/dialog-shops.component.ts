import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shops/selector';
import { map, Observable } from 'rxjs';
import { IShopList } from '../../interfaces/shop-list.interface';
import { DropdownModule } from 'primeng/dropdown';
import {
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IDialogShop } from '../../interfaces/dialog-shop.interface';

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
  isSaved: boolean = false;
  shops$: Observable<IShopList[]>;
  selectedShop?: IShopList;
  @Input() display: boolean = false;
  @Output() closedModal = new EventEmitter<null | IDialogShop>();

  dialogForm = new FormGroup({
    selectedShop: new FormControl<IShopList>(
      {} as IShopList,
      Validators.required,
    ),
    shopPrice: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
  });

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
    this.isSaved = false;
  }

  onClose() {
    if (!this.isSaved) {
      this.closedModal.emit(null);
    }
  }

  onSave() {
    this.isSaved = true;
    if (this.dialogForm.valid) {
      const formValue = this.dialogForm.value;
      console.log("aqui => ", formValue);
      this.closedModal.emit(formValue as IDialogShop);
    }
  }
}
