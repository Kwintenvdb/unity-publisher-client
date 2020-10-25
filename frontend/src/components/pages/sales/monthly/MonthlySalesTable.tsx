import React from 'react';
import { SalesDto } from '@shared/SalesDto';
import { StyledLink as Link } from 'baseui/link';
import {
    TableBuilder,
    TableBuilderColumn,
} from 'baseui/table-semantic';
import { formatCurrency } from 'src/utils/formatCurrency';
import { useTableBuilderOverrides } from 'src/overrides/TableOverrides';

type Props = {
    sales: SalesDto[];
};

export function MonthlySalesTable({ sales }: Props) {
    return (
        <div>
            <TableBuilder data={sales} overrides={useTableBuilderOverrides()}>
                <TableBuilderColumn header="Package">
                    {row => <Link href={row.packageUrl}>{row.package}</Link>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Sales">
                    {row => row.numSales}
                </TableBuilderColumn>
                <TableBuilderColumn header="Price">
                    {row => formatCurrency(row.price)}
                </TableBuilderColumn>
                <TableBuilderColumn header="Gross">
                    {row => formatCurrency(row.gross)}
                </TableBuilderColumn>
                <TableBuilderColumn header="Last Sale">
                    {row => row.lastSale}
                </TableBuilderColumn>
            </TableBuilder>
        </div>
    );
}