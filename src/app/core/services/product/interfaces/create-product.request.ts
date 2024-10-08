import { Product } from '../../../interfaces/product.interface';
import { IShopProductCreate } from './shop-product-create.interface';

export interface ICreateProduct
  extends Omit<Product, 'image' | 'id' | 'shops'> {
  file: File;
  shops: IShopProductCreate[];
  description: string;
  cost: number;
}
