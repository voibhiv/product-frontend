import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { Observable, of } from 'rxjs';
import { IGetPaginateProducts } from './interfaces/get-paginate-products.interface';
import { IGetProductResponse } from './interfaces/product-get.response.interface';

@Injectable({ providedIn: 'root' })
export class ProductService {
  private apiUrl = environment.apiUrl;

  constructor(private http: HttpClient) {}

  getProductsPaginate(request: IGetPaginateProducts): Observable<IGetProductResponse> {
    const { page, pageSize, description } = request;
    let params = new HttpParams()
      .set('page', page.toString())
      .set('pageSize', pageSize.toString());

    if (description) {
      params.set('description', description.toString());
    }

    console.log('chamando service');
    return this.http.get<IGetProductResponse>(`${this.apiUrl}/product`, {
      params,
    });
  }
}
