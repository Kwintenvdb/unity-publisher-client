import React from 'react';
import { SalesDto } from '@shared/SalesDto';
import { StyledLink as Link } from 'baseui/link';
import {
    TableBuilder,
    TableBuilderColumn,
} from 'baseui/table-semantic';
import { formatCurrency } from '../../../utils/formatCurrency';
import { tableBuilderOverrides } from '../../../overrides/TableOverrides';

type Props = {
    sales: SalesDto[];
};

export function MonthlySalesTable({ sales }: Props) {
    return (
        <div>
            <TableBuilder data={sales} overrides={tableBuilderOverrides}>
                <TableBuilderColumn header="Package">
                    {row => <Link href={row.packageUrl}>{row.package}</Link>}
                </TableBuilderColumn>
                <TableBuilderColumn header="Sales" numeric>
                    {row => row.numSales}
                </TableBuilderColumn>
                <TableBuilderColumn header="Price" numeric>
                    {row => formatCurrency(row.price)}
                </TableBuilderColumn>
                <TableBuilderColumn header="Gross" numeric>
                    {row => formatCurrency(row.gross)}
                </TableBuilderColumn>
                <TableBuilderColumn header="Last Sale">
                    {row => row.lastSale}
                </TableBuilderColumn>
            </TableBuilder>
        </div>
    );
}