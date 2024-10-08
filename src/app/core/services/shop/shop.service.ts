import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { HttpClient } from '@angular/common/http';
import { IGetShopResponse } from './interfaces/shop-get.response.interface';

@Injectable({ providedIn: 'root' })
export class ShopService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getAllShops() {
    return this.http.get<IGetShopResponse>(`${this.apiUrl}/shop`);
  }
}
