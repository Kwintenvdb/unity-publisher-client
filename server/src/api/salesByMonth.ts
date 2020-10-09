import { MonthData } from "unity-publisher-api/dist/api/models/monthData";
import { SalesData } from "unity-publisher-api/dist/api/models/salesData";

export interface SalesByMonth {
    month: MonthData;
    sales: SalesData[];
}
