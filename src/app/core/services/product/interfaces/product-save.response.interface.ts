import { Product } from '../../../interfaces/product.interface';

export interface ISaveProductResponse {
  statusCode: number;
  data: {
    product: Product;
    count: number;
  };
  message: string;
}
