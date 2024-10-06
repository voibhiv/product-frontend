import { IPaginate } from '../../../interfaces/paginate.interface';

export interface IGetPaginateProducts extends IPaginate {
  code?: number;
  description?: string;
  cost?: number;
  shopPrice?: number;
}
