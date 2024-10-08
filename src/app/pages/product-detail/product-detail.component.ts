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
import { BehaviorSubject, Observable, Subscription } from 'rxjs';
import { ConfirmationService, MessageService } from 'primeng/api';
import { ToastModule } from 'primeng/toast';
import { RippleModule } from 'primeng/ripple';
import { ButtonModule } from 'primeng/button';
import { Store } from '@ngrx/store';
import { ICreateProduct } from '../../core/services/product/interfaces/create-product.request';
import {
  createProduct,
  deleteProduct,
  updateProduct,
} from '../../core/store/products/action';
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import {
  selectProductCreated,
  selectProductUpdated,
} from '../../core/store/products/selector';

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
    ToastModule,
    RippleModule,
    ButtonModule,
    ConfirmDialogModule,
  ],
  providers: [DialogService, MessageService, ConfirmationService],
  templateUrl: './product-detail.component.html',
  styleUrl: './product-detail.component.scss',
})
export class ProductDetailComponent implements OnInit {
  @ViewChild(FormProductRegisterComponent)
  formProductRegisterComponent!: FormProductRegisterComponent;
  uploadedFiles: any[] = [];
  ref: DynamicDialogRef | undefined;
  openModal: boolean = false;
  public product!: Product;
  public product$ = new BehaviorSubject<Product | null>(null);
  private actionSubscription: Subscription | undefined;
  public shopData: Shop | null = null;
  public productCreated$!: Observable<Product | null>;
  public productUpdated$!: Observable<Product | null>;
  isCreate: boolean = false;

  constructor(
    private router: Router,
    public dialogService: DialogService,
    private headerActionService: HeaderActionService,
    private messageService: MessageService,
    private store: Store,
    private confirmationService: ConfirmationService,
  ) {
    this.productCreated$ = this.store.select(selectProductCreated);
    this.productUpdated$ = this.store.select(selectProductUpdated);
  }

  ngOnInit(): void {
    this.productCreated$.subscribe((value) => {
      if (value) {
        this.isCreate = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Produto cadastrado com sucesso!',
          detail: 'Produto foi cadastrado com sucesso sem interferências',
        });
        if (value.id) {
          this.product.id = value.id;
        }
        this.product$.next(value);
      }
    });

    this.productUpdated$.subscribe((value) => {
      if (value) {
        this.isCreate = false;
        this.messageService.add({
          severity: 'success',
          summary: 'Produto atualizado com sucesso!',
          detail: 'Produto foi atualizado com sucesso sem interferências',
        });
      }
    });

    this.actionSubscription = this.headerActionService.action$.subscribe(
      (action) => {
        switch (action) {
          case 'save':
            this.createProductFn();
            break;
          case 'update':
            this.updateProductFn();
            break;
          case 'delete':
            this.deletedProductFn();
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
      this.isCreate = true;
      this.product = {
        description: '',
        image: null,
        shops: [] as Shop[],
      } as Product;
      this.product$.next(this.product);
      return;
    }

    this.isCreate = false;

    this.product = JSON.parse(JSON.stringify(product));

    this.product$.next(this.product);

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
    const fileExtension = file.name.split('.').pop()?.toLowerCase();
    if (fileExtension === 'jpg' || fileExtension === 'png') {
      const objectURL = URL.createObjectURL(file);
      this.uploadedFiles.push({ file, objectURL });
    } else {
      this.showInvalidFileMessage(file.name);
      this.onClear();
    }
  }

  showInvalidFileMessage(fileName: string) {
    console.warn(
      `${fileName} não é um formato válido. tente novamente com .jpg ou .png.`,
    );
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

  openDialogAddPrice(shop?: Shop) {
    if (shop) {
      this.shopData = shop;
    }
    this.openModal = true;
  }

  deleteShopFromObject(shop: Shop) {
    if (this.product && this.product.shops) {
      const shopIndex = this.product.shops.findIndex(
        (existingShop) => existingShop.idShop === shop.idShop,
      );

      if (shopIndex !== -1) {
        this.product.shops.splice(shopIndex, 1);
      }
    }
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
    this.shopData = null;
  }

  dialogClosedEdit(data: IDialogShop | null) {
    if (data) {
      const shopIndex = this.product.shops.findIndex(
        (shop) => shop.idShop === data.selectedShop.id,
      );

      if (shopIndex !== -1) {
        this.product.shops[shopIndex].shopPrice = data.shopPrice;
      }
    }
    this.openModal = false;
    this.shopData = null;
  }

  ngOnDestroy(): void {
    if (this.actionSubscription) {
      this.actionSubscription.unsubscribe();
    }
  }

  createProductFn() {
    if (this.formProductRegisterComponent) {
      const formGroup = this.formProductRegisterComponent.getFormGroup();
      const shopsValid = Boolean(this.product?.shops.length);

      if (!formGroup.valid) {
        this.formProductRegisterComponent.markAllAsTouched();
        this.messageService.add({
          severity: 'error',
          summary: 'Formulário Inválido',
          detail:
            'O formulário enviado é inválido, verifique e tente novamente!',
        });
        return;
      }

      if (!shopsValid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Formulário Inválido',
          detail: 'O produto deve ter ao menos um preço cadastrado!',
        });
        return;
      }

      let requestToCreateProduct: ICreateProduct = {} as ICreateProduct;

      if (formGroup.value.cost) {
        requestToCreateProduct.cost = formGroup.value.cost;
      }

      if (formGroup.value.description) {
        requestToCreateProduct.description = formGroup.value.description;
      }

      if (this.uploadedFiles.length) {
        const file = this.uploadedFiles[0].file;
        requestToCreateProduct.file = file;
      }

      if (this.product.shops) {
        requestToCreateProduct.shops = this.product.shops.map((shop) => {
          return {
            idShop: shop.idShop,
            shopPrice: shop.shopPrice,
          };
        });
      }

      this.store.dispatch(createProduct(requestToCreateProduct));
    }
  }

  updateProductFn() {
    if (this.formProductRegisterComponent) {
      const formGroup = this.formProductRegisterComponent.getFormGroup();
      const shopsValid = Boolean(this.product?.shops.length);

      if (!formGroup.valid) {
        this.formProductRegisterComponent.markAllAsTouched();
        this.messageService.add({
          severity: 'error',
          summary: 'Formulário Inválido',
          detail:
            'O formulário enviado é inválido, verifique e tente novamente!',
        });
        return;
      }

      if (!shopsValid) {
        this.messageService.add({
          severity: 'error',
          summary: 'Formulário Inválido',
          detail: 'O produto deve ter ao menos um preço cadastrado!',
        });
        return;
      }

      let requestToCreateProduct: ICreateProduct = {} as ICreateProduct;

      if (formGroup.value.cost) {
        requestToCreateProduct.cost = formGroup.value.cost;
      }

      if (formGroup.value.description) {
        requestToCreateProduct.description = formGroup.value.description;
      }

      if (this.uploadedFiles.length) {
        const file = this.uploadedFiles[0].file;
        requestToCreateProduct.file = file;
      }

      if (this.product.shops) {
        requestToCreateProduct.shops = this.product.shops.map((shop) => {
          return {
            idShop: shop.idShop,
            shopPrice: shop.shopPrice,
          };
        });
      }

      this.store.dispatch(
        updateProduct({ request: requestToCreateProduct, id: this.product.id }),
      );
    }
  }

  deletedProductFn() {
    this.confirmationService.confirm({
      message: `Tem certeza que deseja excluir este produto?`,
      header: 'Excluir produto',
      icon: 'pi pi-info-circle',
      acceptLabel: 'Sim',
      rejectLabel: 'Não',
      acceptButtonStyleClass: 'p-button-danger p-button-text',
      rejectButtonStyleClass: 'p-button-text p-button-text',
      accept: () => {
        this.deleteProduct();
      },
    });
  }

  deleteProduct() {
    this.store.dispatch(deleteProduct({ id: this.product.id }));
    this.router.navigate(['/produto']);
  }
}
