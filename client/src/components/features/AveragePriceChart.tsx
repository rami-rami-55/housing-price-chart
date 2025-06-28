import { Chart, useChart } from '@chakra-ui/charts';
import { CartesianGrid, Line, LineChart, Tooltip, XAxis, YAxis } from 'recharts';
import styled from 'styled-components';

export const AveragePriceChart = () => {
  const chart = useChart({
    data: [
      { price: 3000, year: '2014' },
      { price: 3200, year: '2016' },
      { price: 3500, year: '2018' },
      { price: 3800, year: '2020' },
      { price: 4000, year: '2022' },
      { price: 4500, year: '2024' },
      { price: 5000, year: '2026' },
      { price: 5500, year: '2028' },
      { price: 6000, year: '2024' },
    ],
    series: [
      {
        name: 'price',
        color: 'blue.500',
        label: '平均価格（万円）',
      },
    ],
  });

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

  return (
    <ChartContainer>
      <TitleStyle>平均価格チャート</TitleStyle>
      <Chart.Root maxH="sm" chart={chart}>
        <LineChart
          data={chart.data}
          margin={{
            top: 20,
            right: 30,
            left: 20,
            bottom: 20,
          }}
        >
          <CartesianGrid stroke={chart.color('border')} vertical={false} />
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
          <Tooltip animationDuration={100} cursor={false} content={<Chart.Tooltip />} />
          {chart.series.map((item) => (
            <Line
              key={item.name}
              isAnimationActive={false}
              dataKey={chart.key(item.name)}
              stroke={chart.color(item.color)}
              strokeWidth={2}
              dot={false}
            />
          ))}
        </LineChart>
      </Chart.Root>
    </ChartContainer>
  );
};
