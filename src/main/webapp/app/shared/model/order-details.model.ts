import { IProduct } from 'app/shared/model/product.model';
import { IOrder } from 'app/shared/model/order.model';
import { OrderDetailStatus } from 'app/shared/model/enumerations/order-detail-status.model';

export interface IOrderDetails {
  id?: number;
  quantity?: number | null;
  price?: number | null;
  status?: OrderDetailStatus | null;
  product?: IProduct | null;
  order?: IOrder | null;
}

export const defaultValue: Readonly<IOrderDetails> = {};
