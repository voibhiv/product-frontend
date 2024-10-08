import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { IGetPaginateProducts } from './interfaces/get-paginate-products.interface';
import { IGetProductResponse } from './interfaces/product-get.response.interface';
import { IDeleteProductResponse } from './interfaces/product-delete.response.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductsPaginate(
    request: IGetPaginateProducts,
  ): Observable<IGetProductResponse> {
    const { page, pageSize, description, code, cost, shopPrice } = request;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (code) params = params.set('id', code.toString());
    if (description) params = params.set('description', description.toString());
    if (cost) params = params.set('cost', cost.toString());
    if (shopPrice) params = params.set('shopPrice', shopPrice.toString());

    return this.http.get<IGetProductResponse>(`${this.apiUrl}/product`, {
      params,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete<IDeleteProductResponse>(
      `${this.apiUrl}/product/${id}`,
    );
  }

  createProduct() {
    
  }

}
