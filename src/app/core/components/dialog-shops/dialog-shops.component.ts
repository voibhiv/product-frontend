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
import { map, Observable, take } from 'rxjs';
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
import { MessageService } from 'primeng/api';
import { RippleModule } from 'primeng/ripple';
import { ToastModule } from 'primeng/toast';
import { Product } from '../../interfaces/product.interface';
import { Shop } from '../../interfaces/shops.interface';

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
    NgxMaskDirective,
    ToastModule,
    RippleModule,
  ],
  providers: [MessageService],
  templateUrl: './dialog-shops.component.html',
  styleUrl: './dialog-shops.component.scss',
})
export class DialogShopsComponent implements OnChanges {
  isSaved: boolean = false;
  shops$: Observable<IShopList[]>;
  selectedShop?: IShopList;
  @Input() display: boolean = false;
  @Input() product!: Product;
  @Input() shopData: Shop | null = null;
  @Output() closedModal = new EventEmitter<null | IDialogShop>();
  @Output() closedModalEdit = new EventEmitter<null | IDialogShop>();

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

  constructor(
    private store: Store,
    private messageService: MessageService,
  ) {
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

    if (changes['shopData'] && this.shopData) {
      const { idShop, shopPrice } = this.shopData;

      this.shops$.pipe(take(1)).subscribe((shops) => {
        const matchingShop = shops.find(
          (shop) =>
            shop.id === idShop &&
            shop.description === this.shopData?.description,
        );

        if (matchingShop) {
          this.dialogForm.patchValue({
            selectedShop: matchingShop,
            shopPrice: shopPrice,
          });

          this.dialogForm.get('selectedShop')?.disable();
        }
      });
    }
  }

  initializeForm() {
    this.dialogForm.reset();
    this.selectedShop = {} as IShopList;
    this.isSaved = false;
    this.dialogForm.get('selectedShop')?.enable();
  }

  onClose() {
    if (!this.isSaved) {
      this.closedModal.emit(null);
    }
  }

  onSave(isEdit: boolean = false) {
    if (this.dialogForm.invalid) {
      this.dialogForm.markAllAsTouched();
      this.messageService.add({
        severity: 'error',
        summary: 'Formulário Inválido',
        detail:
          'Um ou mais campos obrigatórios não foram preenchidos corretamente!',
      });
      return;
    }

    const formValue = this.dialogForm.getRawValue();

    if (!isEdit) {
      const hasShopRegistered = this.product.shops.some(
        (shop) => shop.idShop === formValue.selectedShop?.id,
      );

      if (hasShopRegistered) {
        this.messageService.add({
          severity: 'error',
          summary: 'Preço já cadastrado',
          detail:
            'Não é permitido mais que um preço de venda para a mesma loja',
        });
        return;
      }

      this.closedModal.emit(formValue as IDialogShop);
    }

    this.closedModalEdit.emit(formValue as IDialogShop);

    this.isSaved = true;
  }
}
