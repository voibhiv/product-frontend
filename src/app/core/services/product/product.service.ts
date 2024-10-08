import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { IGetPaginateProducts } from './interfaces/get-paginate-products.interface';
import { IGetProductResponse } from './interfaces/product-get.response.interface';
import { IDeleteProductResponse } from './interfaces/product-delete.response.interface';
import { Product } from '../../interfaces/product.interface';
import { ICreateProduct } from './interfaces/create-product.request';
import { ISaveProductResponse } from './interfaces/product-save.response.interface';

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
    if (shopPrice) params = params.set('salePrice', shopPrice.toString());

    return this.http.get<IGetProductResponse>(`${this.apiUrl}/product`, {
      params,
    });
  }

  deleteProduct(id: number) {
    return this.http.delete<IDeleteProductResponse>(
      `${this.apiUrl}/product/${id}`,
    );
  }

  createProduct(request: ICreateProduct): Observable<ISaveProductResponse> {
    const formData = new FormData();

    if (request.file) {
      formData.append('file', request.file);
    }

    if (request.description) {
      formData.append('description', request.description);
    }

    if (request.cost) {
      formData.append('cost', request.cost.toString());
    }

    if (request.shops && request.shops.length > 0) {
      formData.append('shops', JSON.stringify(request.shops));
    }

    return this.http.post<ISaveProductResponse>(
      `${this.apiUrl}/product/`,
      formData,
    );
  }

  updateProduct(
    request: ICreateProduct,
    id: number,
  ): Observable<ISaveProductResponse> {
    const formData = new FormData();

    if (request.file) {
      formData.append('file', request.file);
    }

    if (request.description) {
      formData.append('description', request.description);
    }

    if (request.cost) {
      formData.append('cost', request.cost.toString());
    }

    if (request.shops && request.shops.length > 0) {
      formData.append('shops', JSON.stringify(request.shops));
    }

    return this.http.put<ISaveProductResponse>(
      `${this.apiUrl}/product/${id}`,
      formData,
    );
  }
}
