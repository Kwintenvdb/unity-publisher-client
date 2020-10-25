import React, { useEffect, useRef } from 'react';
import { Card } from 'src/components/common/Card';
import { Chart, ChartDataSets } from 'chart.js';
import { useQuery } from 'react-query';
import { getAllSales } from 'src/api/sales';
import { SalesDto } from '@shared/SalesDto';
import { formatCurrency } from 'src/utils/formatCurrency';
import { useStyletron } from 'baseui';

export function OverallSales() {
    const { data: allSales } = useQuery('allSales', getAllSales);
    const [css, theme] = useStyletron();
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        let chart: Chart;

        if (canvasRef && allSales) {
            const canvasCtx = canvasRef.current;
            if (!canvasCtx) return;

            console.log('CREATING CHART');

            const months = Array.from(new Set(allSales.map(s => s.month))).sort();

            const grossByPackageAndMonth = (pkg: string, month: string): number => {
                const s = allSales.filter(sale => sale.month === month && sale.package === pkg);
                const totalGross = s.reduce((sum: number, value: SalesDto) => {
                    return sum + value.gross;
                }, 0);
                return totalGross;
            }

            const getDatasets = (): ChartDataSets[] => {
                const packages = Array.from(new Set(allSales.map(s => s.package)));
                const datasets: ChartDataSets[] = packages.map((pkg) => {
                    return {
                        fill: false,
                        lineTension: 0.3,
                        label: pkg,
                        data: months.map(month => grossByPackageAndMonth(pkg, month))//,
                        // backgroundColor: colors[index]
                    }
                });

                // function sumArrays(...arrays: number[]) {
                // const n = arrays.reduce((max, xs) => Math.max(max, xs.length), 0);
                // const result = Array.from({ length: n });
                // return result.map((_, i) => arrays.map(xs => xs[i] || 0).reduce((sum, x) => sum + x, 0));
                // }

                const grossPerMonth = datasets.map(d => d.data) as number[][];
                const cumulativeGrossData = grossPerMonth.reduce((a: number[], b) => a.map((c, i) => c + b[i]));
                const cumulativeDataset: ChartDataSets = {
                    fill: false,
                    type: 'bar',
                    label: 'Cumulative Gross',
                    backgroundColor: theme.colors.backgroundLightAccent,
                    borderColor: theme.colors.accent,
                    borderWidth: 1,
                    // lineTension: 0,
                    data: cumulativeGrossData
                };
                return datasets.concat(cumulativeDataset);
            }

            new Chart(canvasCtx, {
                type: 'line',
                data: {
                    datasets: getDatasets(),
                    labels: months
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                callback: (value) => {
                                    return formatCurrency(value as number);
                                }
                            }
                        }]
                    },
                    plugins: {
                        colorschemes: {
                            scheme: 'tableau.Tableau10'
                        }
                    },
                    animation: {
                        duration: 0
                    }
                }
            });
        }

        return function cleanup() {
            chart?.destroy();
        }
    }, [canvasRef, allSales, theme]);

    return (
        <div className="mt-5">
            <Card title="Sales Over Time">
                <canvas ref={canvasRef} height="200" width="400"></canvas>
            </Card>
        </div>
    );
}