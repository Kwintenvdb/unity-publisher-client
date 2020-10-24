import { getRequest, postRequest } from './request';

export const isSubscribedToEmailAlerts = () => getRequest<boolean>('/email/isSubscribed');
export const subscribeToEmailAlerts = (email: string) => postRequest('/email/subscribe', { email });
export const unsubscribeFromEmailAlerts = (email: string) => postRequest('/email/unsubscribe', { email });
