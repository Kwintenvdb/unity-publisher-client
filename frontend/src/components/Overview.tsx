import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { MonthData } from 'unity-publisher-api/dist/api/models/monthData';
import { SalesData } from 'unity-publisher-api/dist/api/models/salesData';
import { SalesDto } from '../../../shared';
import { Card } from './common/Card';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();
    const [authenticated, setAuthenticated] = useState(false);
    const [months, setMonths] = useState<MonthData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [sales, setSales] = useState<SalesDto[]>();

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
                setMonths(m);
                setMonth(m[0].value);
                return res.body;
            });
    };

    const setMonth = (month: string) => {
        setSelectedMonth(month);
        getSales(month);
    }

    const getSales = (month: string) => {
        return superagent.get('/api/sales/' + month)
            .then(res => {
                setSales(res.body);
            });
    };

    const getAllSales = () => {
        return superagent.get('/api/sales')
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

    function formatCurrency(revenue: number): string {
        const format = new Intl.NumberFormat(undefined, { style: 'currency', currency: 'USD' });
        return format.format(revenue);
    }

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
                <button onClick={getMonths} className="form-input">Get months</button>
                <button onClick={getAllSales}>Get all sales</button>

                <div className="mt-4 mb-4">
                    <h2 className="font-semibold">
                        <span className="mr-1">Asset sales for </span>
                        <span>
                            <select onChange={e => setMonth(e.target.value)}>
                                {months.map(month =>
                                    <option key={month.value} value={month.value}>{month.name}</option>
                                )}
                            </select>
                        </span>
                    </h2>
                </div>

                <div>
                    <div className="w-1/2 mb-4">
                        <Card>
                            <h2 className="text-gray-700 mb-2">Revenue</h2>
                            <div className="flex">
                                <div className="w-1/2">
                                    <h1 className="font-bold">{formatCurrency(salesTotalGross())}</h1>
                                    <p>gross</p>
                                </div>
                                <div className="w-1/2">
                                    <h1 className="font-bold">{formatCurrency(salesTotalNet())}</h1>
                                    <p>net</p>
                                </div>
                            </div>
                        </Card>
                    </div>

                    <div className="w-1/2">
                        <Card>
                            <table>
                                <thead>
                                    <tr>
                                        <th>Package</th>
                                        <th>Sales</th>
                                        <th>Gross</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {sales && sales.map((sale, index) =>
                                        <tr key={index}>
                                            <td><a href={sale.packageUrl}>{sale.package}</a></td>
                                            <td>{sale.numSales}</td>
                                            <td>{formatCurrency(sale.gross)}</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </Card>
                    </div>
                </div>
            </div>
        );
    }

}

export default Overview;
