import { MonthData } from 'unity-publisher-api';
import { getRequest } from './request';

export const getMonths = () => getRequest<MonthData[]>('/months');
