import { getRequest } from "./request";

export const isAuthenticated = () => getRequest<boolean>('/isAuthenticated');
