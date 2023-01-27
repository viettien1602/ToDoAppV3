import { IProduct } from 'app/shared/model/product.model';

export interface ICategory {
  id?: number;
  categoryName?: string;
  products?: IProduct[] | null;
}

export const defaultValue: Readonly<ICategory> = {};
