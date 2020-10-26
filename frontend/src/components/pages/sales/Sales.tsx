import React, { useState } from 'react';
import { Tabs, Tab } from 'baseui/tabs-motion';
import { MonthlyTab } from './monthly/MonthlyTab';
import { OverallSales } from './overall/OverallSales';

export function Sales() {
    const [activeKey, setActiveKey] = useState(0);

    return (
        <Tabs
            activeKey={activeKey}
            onChange={({ activeKey }) => {
                setActiveKey(Number(activeKey));
            }}
            fill="fixed"
            activateOnFocus
            overrides={{
                TabHighlight: {
                    style: ({ $theme }) => {
                        return {
                            backgroundColor: $theme.colors.accent,
                            bottom: '1px',
                            height: '4px'
                        };
                    }
                },
                TabBorder: {
                    style: {
                        height: '4px'
                    }
                }
            }}
        >
            <Tab overrides={{ TabPanel: { props: { $pad: false } } }} title="Monthly Sales"><MonthlyTab /></Tab>
            <Tab overrides={{ TabPanel: { props: { $pad: false } } }} title="All Time Sales"><OverallSales /></Tab>
        </Tabs>
    );
}
