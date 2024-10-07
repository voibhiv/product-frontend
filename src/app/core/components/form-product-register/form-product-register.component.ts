import { Component } from '@angular/core';
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

@Component({
  selector: 'app-form-product-register',
  standalone: true,
  imports: [
    ReactiveFormsModule,
    InputTextModule,
    NgxMaskDirective,
    FileUploadModule,
    CommonModule
  ],
  templateUrl: './form-product-register.component.html',
  styleUrl: './form-product-register.component.scss',
})
export class FormProductRegisterComponent {
  uploadedFiles: any[] = [];

  productSaveForm = new FormGroup({
    code: new FormControl<number | null>(null, [Validators.pattern(/^\d+$/)]),
    description: new FormControl(''),
    cost: new FormControl<number | null>(null, [
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
    shopPrice: new FormControl<number | null>(null, [
      Validators.pattern(/^(?!.*[a-zA-Z])(?:\d{1,13}|\d{1,12}(?:\.\d{1,3})?)$/),
    ]),
  });

  onUpload(event: UploadEvent) {
    console.log("event upload", event);
  }
}
