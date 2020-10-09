import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { MonthData } from 'unity-publisher-api/dist/api/models/monthData';
import { SalesData } from 'unity-publisher-api/dist/api/models/salesData';
import { SalesDto } from '../../../shared';

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

    function formatRevenue(revenue: number): string {
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

                <div>
                    <select onChange={e => setMonth(e.target.value)}>
                        {months.map(month =>
                            <option key={month.value} value={month.value}>{month.name}</option>
                        )}
                    </select>

                    Selected month: {selectedMonth}
                </div>

                <div>
                    <h2>Sales total gross: {formatRevenue(salesTotalGross())}</h2>
                    <h2>Sales total net: {formatRevenue(salesTotalNet())}</h2>
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
                                    <td>{sale.package}</td>
                                    <td>{sale.numSales}</td>
                                    <td>{sale.gross}</td>
                                </tr>
                            )}
                        </tbody>
                    </table>

                </div>
            </div>
        );
    }

}

export default Overview;
