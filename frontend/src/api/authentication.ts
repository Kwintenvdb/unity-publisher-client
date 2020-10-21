import { getRequest, postRequest } from "./request";

export const isAuthenticated = () => getRequest<boolean>('/isAuthenticated');
export const logout = () => postRequest<void>('/logout');
