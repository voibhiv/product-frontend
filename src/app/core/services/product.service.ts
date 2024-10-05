import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../environments/environment';
import { Product } from '../interfaces/product.interface';
import { Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductsPaginate(): Observable<Product[]> {
    console.log("chamando service");
    return this.http.get<Product[]>(`${this.apiUrl}/products`);
  }
}