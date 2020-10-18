import { Select, Value } from 'baseui/select';
import { H5 } from 'baseui/typography';
import React, { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import superagent from 'superagent';
import { MonthData } from 'unity-publisher-api';
import { getMonths } from '../api';
import { MonthlySalesOverview } from './pages/overview/MonthlySalesOverview';

interface FormData {
    email: string;
    password: string;
}

function Overview() {
    const { register, handleSubmit } = useForm<FormData>();
    const [authenticated, setAuthenticated] = useState(false);
    const [months, setMonths] = useState<MonthData[]>([]);
    const [selectedMonth, setSelectedMonth] = useState<Value>([]);

    useEffect(() => {
        superagent.get('/api/isAuthenticated')
            .then(res => {
                setAuthenticated(res.body);
            });
    }, []);

    const onSubmit = (data: FormData) => {
        superagent.post('/api/authenticate')
            .send(data)
            .then(() => {
                setAuthenticated(true);
            });
    };

    const fetchMonths = () => {
        getMonths().then(setMonths);
    };

    const setMonth = (monthValue: Value) => {
        setSelectedMonth(monthValue);
    }

    const selectedMonthValue = () => {
        if (selectedMonth?.length > 0) {
            return selectedMonth[0].id;
        }
        return null;
    };

    useEffect(() => {
        if (authenticated) {
            fetchMonths();
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
                                            style: ({ $theme }) => {
                                                return {
                                                    fontSize: $theme.typography.HeadingXSmall.fontSize,
                                                    fontWeight: $theme.typography.HeadingXSmall.fontWeight
                                                }
                                            }
                                        }
                                    }}
                                />
                            </div>
                        </div>
                    </h2>
                </div>

                {selectedMonthValue()
                    ? <MonthlySalesOverview month={selectedMonthValue() as string} />
                    : <div></div>
                }
            </div>
        );
    }

}

export default Overview;
