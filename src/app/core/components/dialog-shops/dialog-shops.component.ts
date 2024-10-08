import { Component, OnInit } from '@angular/core';
import { Store } from '@ngrx/store';
import { selectAllShops } from '../../store/shops/selector';
import { Observable } from 'rxjs';
import { IShopList } from '../../interfaces/shop-list.interface';

@Component({
  selector: 'app-dialog-shops',
  standalone: true,
  imports: [],
  templateUrl: './dialog-shops.component.html',
  styleUrl: './dialog-shops.component.scss',
})
export class DialogShopsComponent implements OnInit {
  shops$: Observable<IShopList[]>;

  constructor(private store: Store) {
    this.shops$ = this.store.select(selectAllShops);
  }

  ngOnInit(): void {
    this.shops$.subscribe((value) => console.log('agora -> ', value));
  }
}
