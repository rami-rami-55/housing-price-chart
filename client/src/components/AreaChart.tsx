import React from 'react';
import {
  Area,
  AreaChart as ReAreaChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts';

interface Series {
  name: string;
  color: string;
}

interface ChartData {
  month: string;
  price: number;
  [key: string]: string | number;
}

interface AreaChartProps {
  data: ChartData[];
  series: Series[];
  period: string;
}

const AreaChart: React.FC<AreaChartProps> = ({ data, series, period }) => {
  // データの最大値を取得し、Y軸のスケールを調整
  const maxPrice = Math.max(...data.map((d) => d.price));

  return (
    <div style={{ maxHeight: '400px', width: '100%' }}>
      <ResponsiveContainer width="100%" height={300}>
        <ReAreaChart data={data} margin={{ bottom: 24, left: 24 }}>
          <XAxis
            dataKey="month"
            tickMargin={8}
            tickFormatter={(value: string) => value.slice(0, 3)}
            stroke="#CBD5E0"
          />
          <YAxis
            stroke="#CBD5E0"
            domain={[0, Math.ceil(maxPrice / 10) * 10]}
            tickFormatter={(value) => `${value}百万円`}
            label={{ value: '価格（百万円）', angle: -90, position: 'insideLeft', offset: 10 }}
          />
          <Tooltip cursor={false} animationDuration={100} formatter={(value) => `${value}百万円`} />
          {series.map((item) => (
            <Area
              type="natural"
              key={item.name}
              isAnimationActive={false}
              dataKey={item.name}
              fill={item.color}
              fillOpacity={0.2}
              stroke={item.color}
              stackId="a"
            />
          ))}
        </ReAreaChart>
      </ResponsiveContainer>
    </div>
  );
};

export default AreaChart;
