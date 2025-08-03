import { useEffect, useState } from 'react';
import { LineChart, Line, XAxis, YAxis, ResponsiveContainer } from 'recharts';

interface BrainWaveData {
  time: number;
  value: number;
  alpha: number;
  beta: number;
  theta: number;
  delta: number;
}

export const BrainWaveChart = () => {
  const [data, setData] = useState<BrainWaveData[]>([]);

  useEffect(() => {
    const interval = setInterval(() => {
      const now = Date.now();
      const newPoint: BrainWaveData = {
        time: now,
        value: Math.sin(now / 200) * 50 + Math.random() * 20 - 10,
        alpha: Math.sin(now / 300) * 30 + Math.random() * 15,
        beta: Math.sin(now / 150) * 40 + Math.random() * 20,
        theta: Math.sin(now / 400) * 25 + Math.random() * 12,
        delta: Math.sin(now / 500) * 35 + Math.random() * 18,
      };

      setData(prev => {
        const updated = [...prev, newPoint];
        return updated.slice(-50); // Keep last 50 points
      });
    }, 100);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="h-64 w-full bg-medical-surface border border-medical-border rounded-lg p-4">
      <div className="h-full">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <XAxis 
              dataKey="time" 
              type="number" 
              scale="time" 
              domain={['dataMin', 'dataMax']}
              hide
            />
            <YAxis hide />
            <Line 
              type="monotone" 
              dataKey="value" 
              stroke="hsl(var(--chart-primary))" 
              strokeWidth={2}
              dot={false}
              isAnimationActive={false}
            />
            <Line 
              type="monotone" 
              dataKey="alpha" 
              stroke="hsl(var(--status-healthy))" 
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
              opacity={0.7}
            />
            <Line 
              type="monotone" 
              dataKey="beta" 
              stroke="hsl(var(--status-warning))" 
              strokeWidth={1}
              dot={false}
              isAnimationActive={false}
              opacity={0.7}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="absolute top-2 left-4">
        <div className="flex items-center gap-4 text-xs">
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-chart-primary rounded-full"></div>
            <span className="text-foreground">Main Signal</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-status-healthy rounded-full"></div>
            <span className="text-foreground">Alpha</span>
          </div>
          <div className="flex items-center gap-1">
            <div className="w-2 h-2 bg-status-warning rounded-full"></div>
            <span className="text-foreground">Beta</span>
          </div>
        </div>
      </div>
    </div>
  );
};