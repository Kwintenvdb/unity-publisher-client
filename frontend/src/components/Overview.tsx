import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { SalesDto } from '../../../shared';
import { Card } from './common/Card';
import { MonthData } from 'unity-publisher-api';
import { formatCurrency } from '../utils/formatCurrency';
import { MonthlySalesChart } from './MonthlySalesChart';
import { MonthlySalesTable } from './pages/overview/MonthlySalesTable';
import { Select, Value } from 'baseui/select';
import { H1, H2, H3, H4, H5, H6 } from 'baseui/typography';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();
    const [authenticated, setAuthenticated] = useState(false);
    const [months, setMonths] = useState<MonthData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<Value>([]);
    const [sales, setSales] = useState<SalesDto[]>([]);

    useEffect(() => {
        superagent.get('/api/isAuthenticated')
            .then(res => {
                setAuthenticated(res.body.isAuthenticated);
            });
    }, []);

    const onSubmit = (data: FormData) => {
        superagent.post('/api/authenticate')
            .send(data)
            .then(() => {
                setAuthenticated(true);
            });
    };

    const getMonths: () => Promise<MonthData[]> = () => {
        return superagent.get('/api/months')
            .then(res => {
                const m = res.body;
                // TODO map to value options here already
                setMonths(m);
                // setMonth(m[0].value);
                return res.body;
            });
    };

    const setMonth = (monthValue: Value) => {
        setSelectedMonth(monthValue);
        getSales(monthValue[0].id as string);
    }

    const getSales = (month: string) => {
        return superagent.get('/api/sales/' + month)
            .then(res => {
                setSales(res.body);
            });
    };

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

    useEffect(() => {
        if (authenticated) {
            getMonths();
        }
    }, [authenticated]);

    if (!authenticated) {
        return (
            <div>
                <p>Log in</p>
                <form onSubmit={handleSubmit(onSubmit)}>
                    <input name="email" type="email" ref={register} />
                    <input name="password" type="password" ref={register} />
                    <button type="submit">Submit</button>
                </form>
            </div>
        );
    } else {
        return (
            <div>
                <div className="mt-4 mb-4">
                    <h2 className="font-semibold">
                        <div className="flex items-baseline">
                            <H5 className="mr-4">Asset sales for</H5>
                            <div className="w-56">
                                <Select
                                    value={selectedMonth}
                                    onChange={e => setMonth(e.value)}
                                    options={months.map(m => ({ id: m.value, label: m.name }))}
                                    maxDropdownHeight="300px"
                                    clearable={false}
                                    overrides={{
                                        SingleValue: {
                                            style: {
                                                fontWeight: 500
                                            }
                                        }
                                    }}
                                />
                            </div>

                        </div>

                    </h2>
                </div>

                <div className="flex space-x-4">
                    <div className="flex-1">
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
                            <Card title="Sales">
                                <div className="mb-4">
                                    <MonthlySalesTable sales={sales}></MonthlySalesTable>
                                </div>
                                <h3 className="font-semibold">{totalNumSales()} total sales</h3>
                            </Card>
                        </div>
                    </div>

                    <div className="flex-1">
                        <Card title="Sales Ratio">
                            {sales && <MonthlySalesChart sales={sales}></MonthlySalesChart>}
                        </Card>
                        {/* <SalesChart></SalesChart> */}
                    </div>
                </div>

            </div>
        );
    }

}

export default Overview;
