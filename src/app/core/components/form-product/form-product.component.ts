import { Component, EventEmitter, Output } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { InputTextModule } from 'primeng/inputtext';
import { ButtonModule } from 'primeng/button';
import { IGetPaginateProducts } from '../../services/product/interfaces/get-paginate-products.interface';
import { NgxMaskDirective, provideNgxMask } from 'ngx-mask';

@Component({
  selector: 'app-form-product',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    ButtonModule,
    NgxMaskDirective,
  ],
  templateUrl: './form-product.component.html',
  styleUrls: ['./form-product.component.scss'],
  providers: [provideNgxMask()],
})
export class FormProductComponent {
  @Output() requestForm = new EventEmitter<
    Omit<IGetPaginateProducts, 'page' | 'pageSize'>
  >();

  productSearchForm = new FormGroup({
    code: new FormControl<number | null>(null, [Validators.pattern(/^\d+$/)]),
    description: new FormControl(''),
    cost: new FormControl<number | null>(null, [
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
    shopPrice: new FormControl<number | null>(null, [
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
  });

  onSearch() {
    if (this.productSearchForm.valid) {
      const formValue = this.productSearchForm.value;
      this.requestForm.emit({
        code: formValue.code ?? undefined,
        description: formValue.description ?? undefined,
        cost: formValue.cost ?? undefined,
        shopPrice: formValue.shopPrice ?? undefined,
      });
    }
  }

  resetFilters() {
    this.productSearchForm.reset({
      code: null,
      description: '',
      cost: null,
      shopPrice: null,
    });
  }
}
