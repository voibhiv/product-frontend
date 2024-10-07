import { Component, OnInit } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { ButtonModule } from 'primeng/button';
import { InputTextModule } from 'primeng/inputtext';
import { ToolbarModule } from 'primeng/toolbar';
import { filter } from 'rxjs';
import { NavigationProductRegister } from '../../interfaces/navigation-product-register.interface';

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

  constructor(private router: Router) {}

  ngOnInit() {
    this.router.events
      .pipe(filter((event) => event instanceof NavigationEnd))
      .subscribe(() => {
        this.updatePropertiesBasedOnRoute();
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
}
