import React, { FunctionComponent, useEffect, useRef } from 'react';
import { SalesDto } from '@shared/SalesDto'
import { Chart } from 'chart.js';
import 'chartjs-plugin-colorschemes';
import { getDistinctElements } from '../utils/distinctElements';

type MonthlySalesChartProps = {
    sales: SalesDto[];
};

export const MonthlySalesChart: FunctionComponent<MonthlySalesChartProps> = ({ sales }) => {

    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        const canvasCtx = canvasRef.current;
        let chart: Chart;

        if (canvasCtx) {
            const packages = getDistinctElements(sales.map(s => s.package));
            const grossByPackage = packages.map(pkg => {
                const salesByPackage = sales.filter(s => s.package === pkg);
                return salesByPackage.reduce((sum, value) => sum + value.gross, 0);
            });

            console.log('creating chart');
            console.log(packages);
            console.log(grossByPackage);

            chart = new Chart(canvasCtx, {
                type: 'doughnut',
                data: {
                    labels: packages,
                    datasets: [{
                        data: grossByPackage
                    }]
                },
                options: {
                    plugins: {
                        colorschemes: {
                            scheme: 'office.Metro6'
                        }
                    }
                }
            });
        }

        return function cleanup() {
            chart?.destroy();
        }
    }, [sales, canvasRef]);

    return (
        <div className="p-4">
            <canvas ref={canvasRef} height="300" width="300"></canvas>
        </div>
    );
}