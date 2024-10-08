import { Product } from '../../../interfaces/product.interface';

export interface ISaveProductResponse {
  statusCode: number;
  data: Product;
  message: string;
}
