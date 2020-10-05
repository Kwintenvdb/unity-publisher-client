import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { MonthData } from 'unity-publisher-api/dist/api/models/monthData';
import { SalesData } from 'unity-publisher-api/dist/api/models/salesData';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();
    const [authenticated, setAuthenticated] = useState(false);
    const [months, setMonths] = useState<MonthData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');
    const [sales, setSales] = useState<SalesData[]>();

    useEffect(() => {
        superagent.get('/api/isAuthenticated')
            .then(res => {
                setAuthenticated(res.body.isAuthenticated);
            });
    }, []);

    const onSubmit = (data: FormData) => {
        console.log(data);
        superagent.post('/api/authenticate')
            .send(data)
            .then(() => {
                setAuthenticated(true);
            });
    };

    const getMonths: () => Promise<MonthData[]> = () => {
        return superagent.get('/api/months')
            .then(res => {
                console.log(res.body);
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
                console.log(res.body);
                setSales(res.body);
            });
    };

    const getAllSales = () => {
        return superagent.get('/api/sales')
            .then(res => {
                console.log(res.body);
                setSales(res.body);
            });
    };

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
                <button onClick={getMonths}>Get months</button>
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
                    <p>Sales</p>
                    <table>
                        <thead>
                            <tr>
                                <th>Package</th>
                                <th>Sales</th>
                                <th>Gross</th>
                            </tr>
                        </thead>
                        <tbody>
                            {sales && sales.map(sale =>
                                <tr key={sale.packageName}>
                                    <td>{sale.packageName}</td>
                                    <td>{sale.sales}</td>
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
