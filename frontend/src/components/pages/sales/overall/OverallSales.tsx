import React, { useEffect, useRef } from 'react';
import { Card } from 'src/components/common/Card';
import { Chart, ChartDataSets } from 'chart.js';
import { useQuery } from 'react-query';
import { getAllSales } from 'src/api/sales';
import { SalesDto } from '@shared/SalesDto';
import { formatCurrency } from 'src/utils/formatCurrency';
import { useStyletron } from 'baseui';
import { H3 } from 'baseui/typography';

export function OverallSales() {
    const { data: allSales } = useQuery('allSales', getAllSales);
    const [, theme] = useStyletron();
    const canvasRef = useRef<HTMLCanvasElement>(null);
    const months = Array.from(new Set(allSales?.map(s => s.month))).sort();

    const salesGross = (sales: SalesDto[] | undefined) => {
        return sales?.reduce((sum: number, value: SalesDto) => sum + value.gross, 0) ?? 0;
    };

    const salesTotalGross = () => {
        return salesGross(allSales);
    };

    const salesTotalNet = () => {
        return salesTotalGross() * 0.7;
    }

    const averageGrossLastYear = () => {
        if (!allSales) return 0;

        const last12Months = months.slice(-12);
        const salesLastYear = last12Months.flatMap(month => {
            return allSales.filter(sale => sale.month === month);
        });
        return salesGross(salesLastYear) / last12Months.length;
    };

    const averageNetLastYear = () => {
        return averageGrossLastYear() * 0.7;
    }

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
                        data: months.map(month => grossByPackageAndMonth(pkg, month))
                    }
                });

                const grossPerMonth = datasets.map(d => d.data) as number[][];
                const cumulativeGrossData = grossPerMonth.reduce((a: number[], b) => a.map((c, i) => c + b[i]));
                const cumulativeDataset: ChartDataSets = {
                    fill: false,
                    type: 'bar',
                    label: 'Cumulative Gross',
                    backgroundColor: theme.colors.backgroundLightAccent,
                    borderColor: theme.colors.accent,
                    borderWidth: 1,
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
            <div className="mb-6">
                <div className="grid xl:grid-cols-2 gap-6">
                    <Card title="All Time Revenue">
                        <div className="flex">
                            <div className="w-1/2">
                                <H3 color="contentAccent">
                                    {formatCurrency(salesTotalGross())}
                                    <span className="text-lg font-normal ml-1"> gross</span>
                                </H3>
                            </div>
                            <div className="w-1/2">
                                <H3 color="contentPositive">
                                    {formatCurrency(salesTotalNet())}
                                    <span className="text-lg font-normal ml-1"> net</span>
                                </H3>
                            </div>
                        </div>
                    </Card>

                    <Card title="Avg. Monthly Revenue in the Last Year">
                        <div className="flex">
                            <div className="w-1/2">
                                <H3 color="contentAccent">
                                    {formatCurrency(averageGrossLastYear())}
                                    <span className="text-lg font-normal ml-1"> gross</span>
                                </H3>
                            </div>
                            <div className="w-1/2">
                                <H3 color="contentPositive">
                                    {formatCurrency(averageNetLastYear())}
                                    <span className="text-lg font-normal ml-1"> net</span>
                                </H3>
                            </div>
                        </div>
                    </Card>
                </div>
            </div>
            <Card title="Sales Over Time">
                <canvas ref={canvasRef} height="200" width="400"></canvas>
            </Card>
        </div>
    );
}