import { Product } from '../../../interfaces/product.interface';

export interface IGetProductResponse {
  statusCode: number;
  data: Product[];
  message: string;
}
