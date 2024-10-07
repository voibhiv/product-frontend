import { Component, Input, OnInit } from '@angular/core';
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
export class FormProductRegisterComponent implements OnInit {
  @Input() product!: Product | null;
  uploadedFiles: any[] = [];

  productSaveForm = new FormGroup({
    code: new FormControl<number | null>({ value: null, disabled: true }, [
      Validators.pattern(/^\d+$/),
    ]),
    description: new FormControl(''),
    cost: new FormControl<number | null>(null, [
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
  });

  ngOnInit(): void {
    this.patchFormValues();
  }

  onUpload(event: UploadEvent) {
    console.log('event upload', event);
  }

  patchFormValues() {
    this.productSaveForm.patchValue({
      code: this.product?.id,
      cost: Number(this.product?.cost),
      description: this.product?.description,
    });
  }
}
