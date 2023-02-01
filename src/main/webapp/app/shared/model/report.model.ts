import dayjs from 'dayjs';

export interface IReport {
  id?: number;
  reportTime?: string | null;
  totalTurnover?: number | null;
  status?: boolean | null;
}

export const defaultValue: Readonly<IReport> = {
  status: false,
};
