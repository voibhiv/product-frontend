import { Component, OnInit, ViewChild } from '@angular/core';
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
import { IDialogShop } from '../../core/interfaces/dialog-shop.interface';
import { Shop } from '../../core/interfaces/shops.interface';
import { HeaderActionService } from '../../core/services/header/header.service';
import { Subscription } from 'rxjs';

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
  @ViewChild(FormProductRegisterComponent)
  formProductRegisterComponent!: FormProductRegisterComponent;
  uploadedFiles: any[] = [];
  ref: DynamicDialogRef | undefined;
  openModal: boolean = false;
  public product!: Product | null;
  private actionSubscription: Subscription | undefined;

  constructor(
    private router: Router,
    public dialogService: DialogService,
    private headerActionService: HeaderActionService,
  ) {}

  ngOnInit(): void {
    this.actionSubscription = this.headerActionService.action$.subscribe(
      (action) => {
        switch (action) {
          case 'save':
            this.createProduct();
            break;
          case 'delete':
            console.log('edited');
            break;
        }
      },
    );

    const currentState = this.router.lastSuccessfulNavigation?.extras
      .state as NavigationProductRegister;

    this.setProduct(currentState?.product ?? null);
  }

  setProduct(product: Product | null) {
    if (!product) {
      this.product = {
        description: '',
        image: null,
        shops: [] as Shop[],
      } as Product;
      return;
    }

    this.product = JSON.parse(JSON.stringify(product));

    if (this.product?.image) {
      this.setImageDefault(this.product.image);
    }
  }

  onUpload(event: UploadEvent) {
    console.log('event upload', event);
  }

  onSelect(event: any) {
    this.onClear();
    console.log(event);
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
  }

  addShopToProduct(data: IDialogShop) {
    if (this.product) {
      this.product.shops = this.product.shops || [];
      this.product.shops.push({
        idShop: data.selectedShop?.id,
        description: data.selectedShop?.description,
        shopPrice: data.shopPrice,
      });
    }
  }

  dialogClosed(data: IDialogShop | null) {
    if (data) {
      this.addShopToProduct(data);
    }
    this.openModal = false;
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  createProduct() {
    if (this.formProductRegisterComponent) {
      const formGroup = this.formProductRegisterComponent.getFormGroup();
      if (formGroup.valid) {
        console.log('Form values:', formGroup.value);
      } else {
        console.log('Formulário inválido');
      }
    }
  }
}
