import { SalesDto } from '@shared/SalesDto';
import { getRequest } from './request';

export const getSales = (month: string) => getRequest<SalesDto[]>('/sales/' + month);
