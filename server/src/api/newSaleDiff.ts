import { MonthData } from 'unity-publisher-api';

export type NewSaleDiffsByMonth = {
    month: MonthData;
    newSales: NewSaleDiff[];
};

export type NewSaleDiff = {
    packageName: string;
    numNewSales: number;
    previousGross: number;
    newGross: number;
};
