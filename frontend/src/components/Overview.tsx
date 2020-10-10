import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { SalesDto } from '../../../shared';
import { Card } from './common/Card';
import { MonthData } from 'unity-publisher-api';
import SalesChart from './SalesChart';
import { formatCurrency } from '../utils/formatCurrency';

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
                <button onClick={getAllSales}>Get all sales</button>

                <div className="flex space-x-4">
                    <div className="flex-1">
                        <div className="mt-4 mb-4">
                            <h2 className="font-semibold">
                                <span className="mr-1">Asset sales for </span>
                                <span>
                                    <select onChange={e => setMonth(e.target.value)} className="font-semibold">
                                        {months.map(month =>
                                            <option key={month.value} value={month.value}>{month.name}</option>
                                        )}
                                    </select>
                                </span>
                            </h2>
                        </div>

                        <div className="mb-4">
                            <Card accent>
                                <div className="text-white">
                                    <h2 className="mb-2">Revenue</h2>
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
                                </div>
                            </Card>
                        </div>

                        <div>
                            <Card>
                                <h2 className="mb-2 text-gray-600">Sales</h2>
                                <table className="mb-2">
                                    <thead>
                                        <tr>
                                            <th>Package</th>
                                            <th>Sales</th>
                                            <th>Price</th>
                                            <th>Gross</th>
                                        </tr>
                                    </thead>
                                    <tbody>
                                        {sales && sales.map((sale, index) =>
                                            <tr key={index}>
                                                <td><a href={sale.packageUrl}>{sale.package}</a></td>
                                                <td>{sale.numSales}</td>
                                                <td>{formatCurrency(sale.price)}</td>
                                                <td>{formatCurrency(sale.gross)}</td>
                                            </tr>
                                        )}
                                    </tbody>
                                </table>

                                <h3 className="font-semibold">{totalNumSales()} total sales</h3>
                            </Card>
                        </div>
                    </div>

                    <div className="flex-1">
                        <h2 className="font-semibold">Total sales</h2>
                        <SalesChart></SalesChart>
                    </div>
                </div>

            </div>
        );
    }

}

export default Overview;
