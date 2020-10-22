import { ReviewData } from 'unity-publisher-api';
import { getRequest } from './request';

export const getReviews = () => getRequest<ReviewData[]>('/reviews');
