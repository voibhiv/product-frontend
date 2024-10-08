import { IGetAllShops } from './get-all-shops.interface';

export interface IGetShopResponse {
  statusCode: number;
  data: IGetAllShops[];
  message: string;
}
