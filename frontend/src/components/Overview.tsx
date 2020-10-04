import React, { useEffect, useState } from 'react';
import superagent from 'superagent';
import { useForm } from 'react-hook-form';
import { MonthData } from 'unity-publisher-api/dist/api/models/monthData';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();
    const [authenticated, setAuthenticated] = useState(false);
    const [months, setMonths] = useState<MonthData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<string>('');

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
                setSelectedMonth(m[0].value);
                return res.body;
            });
    };

    const getSales = () => {
        return superagent.get('/api/sales/' + selectedMonth)
            .then(res => {
                console.log(res.body);
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
                <button onClick={getSales}>Get sales</button>

                <div>
                    <select onChange={e => setSelectedMonth(e.target.value)}>
                        {months.map(month =>
                            <option key={month.value} value={month.value}>{month.name}</option>
                        )}
                    </select>

                    Selected month: {selectedMonth}
                </div>
            </div>
        );
    }

}

export default Overview;
