import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

interface ChartData {
  price: number;
  year: string;
}

interface ChartSeries {
  name: string;
  color: string;
  label: string;
}

export const AveragePriceChart = () => {
  const data: ChartData[] = [
    { price: 3000, year: '2014' },
    { price: 3200, year: '2016' },
    { price: 3500, year: '2018' },
    { price: 3800, year: '2020' },
    { price: 4000, year: '2022' },
    { price: 4500, year: '2024' },
    { price: 5000, year: '2026' },
    { price: 5500, year: '2028' },
    { price: 6000, year: '2024' },
  ];

  const series: ChartSeries[] = [
    {
      name: 'price',
      color: '#3182CE', // blue.500 in Chakra UI
      label: '平均価格（万円）',
    },
  ];

  const ChartContainer = styled.div`
    width: 100%;
    background-color: #f9f9f9;
    margin-bottom: 40px;
    margin-top: 48px;
    margin-bottom: 24px;
  `;

  const TitleStyle = styled.div`
    font-size: 24px;
    font-weight: bold;
    margin: 16px;
  `;

  const CustomTooltip = ({ active, payload, label }: any) => {
    if (active && payload && payload.length) {
      return (
        <div style={{ 
          backgroundColor: 'white', 
          padding: '10px',
          border: '1px solid #ccc',
          borderRadius: '4px'
        }}>
          <p>{`年: ${label}`}</p>
          <p>{`価格: ${payload[0].value}万円`}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <ChartContainer>
      <TitleStyle>平均価格チャート</TitleStyle>
      <div style={{ height: '400px' }}>
        <LineChart
          width={800}
          height={400}
          data={data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke="#E2E8F0" vertical={false} />
          <XAxis
            dataKey="year"
            label={{
              value: '取引年',
              position: 'bottom',
              offset: 0,
            }}
          />
          <YAxis
            label={{
              value: '平均価格（万円）',
              angle: -90,
              position: 'left',
              offset: 0,
            }}
          />
          <Tooltip animationDuration={100} cursor={false} content={<CustomTooltip />} />
          {series.map((item: ChartSeries) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey="price"
              stroke={item.color}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </div>
    </ChartContainer>
  );
};
