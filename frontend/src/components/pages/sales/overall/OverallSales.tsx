import React, { useEffect, useRef } from 'react';
import { Card } from 'src/components/common/Card';
import { Chart } from 'chart.js';

export function OverallSales() {
    const canvasRef = useRef<HTMLCanvasElement>(null);

    useEffect(() => {
        if (canvasRef) {
            const canvasCtx = canvasRef.current;
            if (!canvasCtx) return;

            new Chart(canvasCtx, {
                type: 'line',
                data: {
                    datasets: [{
                        data: [1, 5, 3, 0, 4]
                    }],
                    labels: ['Jan', 'Feb', 'Mar', 'Apr', 'Jun']
                }
            });
        }
    }, [canvasRef]);

    return (
        <div className="mt-5">
            <Card title="Sales Over Time">
                <canvas ref={canvasRef} height="200" width="400"></canvas>
            </Card>
        </div>
    );
}