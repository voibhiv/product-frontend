import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
} from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shops/selector';
import { map, Observable } from 'rxjs';
import { IShopList } from '../../interfaces/shop-list.interface';
import { DropdownModule } from 'primeng/dropdown';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  FormsModule,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { InputTextModule } from 'primeng/inputtext';
import { DialogModule } from 'primeng/dialog';
import { ButtonModule } from 'primeng/button';
import { IDialogShop } from '../../interfaces/dialog-shop.interface';
import { NgxMaskDirective } from 'ngx-mask';

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
    NgxMaskDirective
  ],
  templateUrl: './dialog-shops.component.html',
  styleUrl: './dialog-shops.component.scss',
})
export class DialogShopsComponent implements OnChanges {
  isSaved: boolean = false;
  shops$: Observable<IShopList[]>;
  selectedShop?: IShopList;
  @Input() display: boolean = false;
  @Output() closedModal = new EventEmitter<null | IDialogShop>();

  dialogForm = new FormGroup({
    selectedShop: new FormControl<IShopList | null>(null, [
      Validators.required,
      this.validateSelectedShop,
    ]),
    shopPrice: new FormControl<number | null>(null, [
      Validators.required,
      Validators.pattern(/^\d{1,13}(\.\d{1,3})?$/),
    ]),
  });

  validateSelectedShop(control: AbstractControl): ValidationErrors | null {
    const value = control.value;
    return value ? null : { emptyShop: true };
  }

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

  ngOnChanges(changes: SimpleChanges): void {
    if (changes['display'] && changes['display'].currentValue) {
      this.initializeForm();
    }
  }

  initializeForm() {
    this.dialogForm.reset();
    this.selectedShop = {} as IShopList;
    this.isSaved = false;
  }

  onClose() {
    if (!this.isSaved) {
      this.closedModal.emit(null);
    }
  }

  onSave() {
    if (this.dialogForm.invalid) {
      this.dialogForm.markAllAsTouched();
      return;
    }

    this.isSaved = true;
    if (this.dialogForm.valid) {
      const formValue = this.dialogForm.value;
      this.closedModal.emit(formValue as IDialogShop);
    }
  }
}
