import {
  Component,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
} from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { NgxMaskDirective } from 'ngx-mask';
import { InputTextModule } from 'primeng/inputtext';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { Product } from '../../interfaces/product.interface';

@Component({
  selector: 'app-form-product-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    NgxMaskDirective,
    FileUploadModule,
    CommonModule,
  ],
  templateUrl: './form-product-register.component.html',
  styleUrl: './form-product-register.component.scss',
})
export class FormProductRegisterComponent implements OnInit, OnChanges {
  @Input() product!: Product | null;
  uploadedFiles: any[] = [];

  productSaveForm = new FormGroup({
    code: new FormControl<number | null>({ value: null, disabled: true }, [
      Validators.pattern(/^\d+$/),
    ]),
    description: new FormControl('', [
      Validators.required,
      Validators.maxLength(60),
    ]),
    cost: new FormControl<number | null>(null, [
      Validators.pattern(/^\d{1,13}(\.\d{1,3})?$/),
    ]),
  });

  ngOnInit(): void {
    this.patchFormValues();
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes['product']) {
      this.patchFormValues();
    }
  }

  getFormGroup() {
    return this.productSaveForm;
  }

  patchFormValues() {
    this.productSaveForm.patchValue({
      code: this.product?.id,
      cost: Number(this.product?.cost),
      description: this.product?.description,
    });
  }

  markAllAsTouched() {
    this.productSaveForm.markAllAsTouched();
  }
}
