import { PackageData } from 'unity-publisher-api';
import { getRequest } from "./request";

export const getPackages = () => getRequest<PackageData[]>('/packages');
