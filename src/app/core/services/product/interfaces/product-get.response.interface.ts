import { Product } from '../../../interfaces/product.interface';

export interface IGetProductResponse {
  statusCode: number;
  data: {
    products: Product[];
    count: number;
  };
  message: string;
}
