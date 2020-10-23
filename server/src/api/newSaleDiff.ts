import { MonthData } from 'unity-publisher-api';

export type NewSaleDiffsByMonth = {
    month: MonthData;
};

export type NewSaleDiff = {
    packageName: string;
    numNewSales: number;
};
