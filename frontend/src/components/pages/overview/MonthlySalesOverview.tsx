import { SalesDto } from '@shared/SalesDto';
import { Skeleton } from 'baseui/skeleton';
import { H5 } from 'baseui/typography';
import React from 'react';
import { useQuery } from 'react-query';
import { getSales } from 'src/api/sales';
import { Card } from 'src/components/common/Card';
import { formatCurrency } from 'src/utils/formatCurrency';
import { MonthlySalesChart } from './MonthlySalesChart';
import { MonthlySalesTable } from './MonthlySalesTable';

type Props = {
    month: string;
};

export function MonthlySalesOverview({ month }: Props) {
    const { data: sales } = useQuery(['sales', month], () => getSales(month));

    function salesTotalGross(): number {
        if (sales)
            return sales.reduce((sum: number, value: SalesDto) => sum + value.gross, 0);
        else return 0;
    };

    function salesTotalNet(): number {
        return salesTotalGross() * 0.7;
    }

    function totalNumSales(): number {
        if (sales)
            return sales?.reduce((num: number, value: SalesDto) => num + value.numSales, 0);
        else return 0;
    }

    return (
        !sales
            ? <Skeleton width="100%" height="100px" rows={4} animation />
            : <div>
                <div className="grid lg:grid-cols-5 md:grid-cols-1 gap-4">
                    <div className="col-span-3">
                        <Card title="Sales">
                            <div className="mb-4">
                                <MonthlySalesTable sales={sales}></MonthlySalesTable>
                            </div>
                            <H5>{totalNumSales()} total sales</H5>
                        </Card>
                    </div>

                    <div className="col-span-2">
                        <div className="mb-4">
                            <Card title="Revenue">
                                <div className="flex">
                                    <div className="w-1/2">
                                        <h1 className="text-3xl font-bold">
                                            {formatCurrency(salesTotalGross())}
                                            <span className="text-lg font-normal ml-1"> gross</span>
                                        </h1>
                                    </div>
                                    <div className="w-1/2">
                                        <h1 className="text-3xl font-bold">
                                            {formatCurrency(salesTotalNet())}
                                            <span className="text-lg font-normal ml-1"> net</span>
                                        </h1>
                                    </div>
                                </div>
                            </Card>
                        </div>

                        <div>
                            <Card title="Sales Ratio">
                                {sales && <MonthlySalesChart sales={sales}></MonthlySalesChart>}
                            </Card>
                        </div>
                    </div>
                </div>
            </div>
    );
}
