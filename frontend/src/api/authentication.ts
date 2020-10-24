import { getRequest, postRequest } from './request';

export type AuthCredentials = {
    email: string;
    password: string;
};

export const isAuthenticated = () => getRequest<boolean>('/isAuthenticated');
export const authenticate = (credentials: AuthCredentials) => postRequest('/authenticate', credentials);
export const logout = () => postRequest<void>('/logout');
