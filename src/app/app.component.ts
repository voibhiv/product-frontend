import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { PrimeNGConfig } from 'primeng/api';
import { HeaderInfoComponent } from './core/components/header-info/header-info.component';
import { Store } from '@ngrx/store';
import { loadShops } from './core/store/shops/action';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderInfoComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  title = 'product-frontend';

  constructor(
    private primengConfig: PrimeNGConfig,
    private store: Store,
  ) {}

  ngOnInit() {
    this.primengConfig.ripple = true;
    this.fetchShops();
  }

  fetchShops() {
    this.store.dispatch(loadShops());
  }
}
