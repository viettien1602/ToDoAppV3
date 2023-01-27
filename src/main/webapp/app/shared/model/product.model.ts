import dayjs from 'dayjs';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { ICategory } from 'app/shared/model/category.model';

export interface IProduct {
  id?: number;
  productName?: string;
  img?: string | null;
  price?: number | null;
  quantity?: number | null;
  importDate?: string | null;
  status?: boolean | null;
  orderDetails?: IOrderDetails[] | null;
  category?: ICategory | null;
}

export const defaultValue: Readonly<IProduct> = {
  status: false,
};
