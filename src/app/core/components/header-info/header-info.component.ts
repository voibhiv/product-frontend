import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { filter, Observable } from 'rxjs';
import { NavigationProductRegister } from '../../interfaces/navigation-product-register.interface';
import { HeaderActionService } from '../../services/header/header.service';
import { Product } from '../../interfaces/product.interface';
import { Store } from '@ngrx/store';
import { selectProductCreated } from '../../store/products/selector';

@Component({
  selector: 'app-header-info',
  standalone: true,
  imports: [ToolbarModule, ButtonModule, ButtonModule, InputTextModule],
  templateUrl: './header-info.component.html',
  styleUrl: './header-info.component.scss',
})
export class HeaderInfoComponent implements OnInit {
  title: string = 'Cadastro de Produtos';
  showHeader: boolean = false;
  hasProduct: boolean = false;
  isRegister: boolean = false;
  public productCreated$!: Observable<Product | null>;

  constructor(
    private router: Router,
    private headerActionService: HeaderActionService,
    private store: Store,
  ) {
    this.productCreated$ = this.store.select(selectProductCreated);
  }

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePropertiesBasedOnRoute();
      });

    this.productCreated$.subscribe((value) => {
      if (value) {
        this.hasProduct = true;
        this.isRegister = true;
      }
    });
  }

  updatePropertiesBasedOnRoute() {
    const currentRoute = this.router.url;
    const currentState = this.router.lastSuccessfulNavigation?.extras
      .state as NavigationProductRegister;

    this.hasProduct = !!(currentState?.product ?? null);

    if (currentRoute.includes('produto/cadastro')) {
      this.title = 'Cadastro de Produto';
      this.showHeader = true;
      this.isRegister = true;
    } else if (currentRoute.includes('produto')) {
      this.title = 'Consulta de Produtos';
      this.showHeader = true;
      this.isRegister = false;
    } else {
      this.showHeader = false;
      this.isRegister = false;
    }
  }

  redirectToRegister() {
    this.router.navigate(['/produto/cadastro'], {
      state: { product: null },
    });
  }

  onSave() {
    this.headerActionService.emitAction('save');
  }

  onDelete() {
    this.headerActionService.emitAction('delete');
  }

  onUpdate() {
    this.headerActionService.emitAction('update');
  }
}
