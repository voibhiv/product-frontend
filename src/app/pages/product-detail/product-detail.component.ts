import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Product } from '../../core/interfaces/product.interface';
import { NavigationProductRegister } from '../../core/interfaces/navigation-product-register.interface';
import { FormProductRegisterComponent } from '../../core/components/form-product-register/form-product-register.component';
import { ListShopsComponent } from '../../core/components/list-shops/list-shops.component';
import { FileUploadModule, UploadEvent } from 'primeng/fileupload';
import { CommonModule } from '@angular/common';
import { BufferToImagePipe } from '../../core/shared/pipes/buffer-to-image.pipe';
import {
  DialogService,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { DialogShopsComponent } from '../../core/components/dialog-shops/dialog-shops.component';

@Component({
  selector: 'app-product-detail',
  standalone: true,
  imports: [
    FormProductRegisterComponent,
    ListShopsComponent,
    FileUploadModule,
    CommonModule,
    BufferToImagePipe,
    DynamicDialogModule,
    DialogShopsComponent,
  ],
  providers: [DialogService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  uploadedFiles: any[] = [];
  ref: DynamicDialogRef | undefined;
  openModal: boolean = false;
  public product!: Product | null;

  constructor(
    private router: Router,
    public dialogService: DialogService,
  ) {}

  ngOnInit(): void {
    const currentState = this.router.lastSuccessfulNavigation?.extras
      .state as NavigationProductRegister;

    this.setProduct(currentState?.product ?? null);
  }

  setProduct(product: Product | null) {
    this.product = product;
    if (this.product?.image) {
      this.setImageDefault(this.product.image);
    }
  }

  onUpload(event: UploadEvent) {
    console.log('event upload', event);
  }

  onSelect(event: any) {
    this.onClear();
    const file = event.files[0];
    const objectURL = URL.createObjectURL(file);
    this.uploadedFiles.push({ ...file, objectURL });
  }

  setImageDefault(imageBuffer: Buffer) {
    const blob = new Blob([imageBuffer]);
    const objectURL = URL.createObjectURL(blob);
    this.uploadedFiles.push({
      name: 'Uploaded Image',
      objectURL: objectURL,
      size: blob.size,
      buffer: imageBuffer,
    });
  }

  clearAndSetDefault() {
    this.onClear();
    if (this.product?.image) {
      this.setImageDefault(this.product.image);
    }
  }

  onClear() {
    this.uploadedFiles = [];
  }

  openDialogAddPrice() {
    this.openModal = true;
    //   width: '50vw',
    //   modal: true,
    //   style: { 'min-height': '600px' },
    //   data: {
    //     ...this.product?.shops,
    //   },
    //   breakpoints: {
    //     '960px': '75vw',
    //     '640px': '90vw',
    //   },
    // });
    // this.ref.onClose.subscribe((shop: Shop) => {
    //   if (shop) {
    //     console.log('tem produto');
    //   } else {
    //     console.log('nao tem produto');
    //   }
    // });
  }

  dialogClosed(data: any) {
    console.log(data);
    this.openModal = false;
  }
}
