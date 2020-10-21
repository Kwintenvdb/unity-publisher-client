import { Select, Value } from 'baseui/select';
import { H5 } from 'baseui/typography';
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import { getMonths } from '../api';
import { MonthlySalesOverview } from './pages/overview/MonthlySalesOverview';

export function Overview() {
    // TODO transform months data in getter function
    const { data: months } = useQuery('months', getMonths);
    const [selectedMonth, setSelectedMonth] = useState<Value>([]);

    const monthsOptions: Value | undefined = months?.map(m => ({ id: m.value, label: m.name }));
    if (monthsOptions && selectedMonth.length === 0) {
        setSelectedMonth([monthsOptions[0]]);
    }

    const setMonth = (monthValue: Value) => {
        setSelectedMonth(monthValue);
    }

    const selectedMonthValue = () => {
        if (selectedMonth?.length > 0) {
            return selectedMonth[0].id;
        }
        return null;
    };

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
                                options={monthsOptions}
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
