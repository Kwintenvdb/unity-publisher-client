import React, { useEffect, useRef, useState } from 'react';
import { Card } from './common/Card';
import superagent from 'superagent';
import { SalesDto } from '../../../shared';
import { Chart, ChartDataSets } from 'chart.js';
import { formatCurrency } from '../utils/formatCurrency';

export default function SalesChart() {
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const [sales, setSales] = useState<SalesDto[]>();


    const getAllSales = () => {
        return superagent.get('/api/sales')
            .then(res => {
                setSales(res.body);
            });
    };

    useEffect(() => {
        getAllSales();
    }, []);

    useEffect(() => {
        const chartCtx = canvasRef.current;

        if (chartCtx && sales && sales.length > 0) {
            const labels = Array.from(new Set(sales.map(s => s.month))).sort();

            const grossByPackageAndMonth = (pkg: string, month: string): number => {
                const s = sales.filter(sale => sale.month === month && sale.package === pkg);
                const totalGross = s.reduce((sum: number, value: SalesDto) => {
                    return sum + value.gross;
                }, 0);
                return totalGross;
            }

            const colors = ['red', 'blue', 'green', 'black', 'purple'];

            const getDatasets = (): ChartDataSets[] => {
                const packages = Array.from(new Set(sales.map(s => s.package)));
                return packages.map((pkg, index) => {
                    return {
                        label: pkg,
                        data: labels.map(l => grossByPackageAndMonth(pkg, l)),
                        backgroundColor: colors[index]
                    }
                });
            }

            const chart = new Chart(chartCtx, {
                type: 'bar',
                data: {
                    labels: labels,
                    datasets: getDatasets()
                },
                options: {
                    scales: {
                        yAxes: [{
                            stacked: true,
                            ticks: {
                                callback: (value, index, values) => {
                                    return formatCurrency(value as number);
                                }
                            }
                        }],
                        xAxes: [{
                            stacked: true
                        }]
                    }
                }
            });
        }
    }, [sales]);

    return (
        <Card>
            <canvas ref={canvasRef} height="400" width="400"></canvas>
        </Card>
    );
}
