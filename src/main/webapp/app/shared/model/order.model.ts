import dayjs from 'dayjs';
import { IOrderDetails } from 'app/shared/model/order-details.model';
import { IUser } from 'app/shared/model/user.model';

export interface IOrder {
  id?: number;
  dateTime?: string | null;
  totalPrice?: number | null;
  deliveryAddress?: string | null;
  note?: string | null;
  status?: boolean | null;
  orderDetails?: IOrderDetails[] | null;
  user?: IUser | null;
}

export const defaultValue: Readonly<IOrder> = {
  status: false,
};
