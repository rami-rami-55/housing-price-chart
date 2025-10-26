import React, { useState } from 'react';
import AreaChart from '../../components/common/AreaChart';
import TimesRangeToggle from '../../components/common/TimesRangeToggle';
import AverageChartHeader from './AverageChartHeader';
import AveragePriceBadge from './AveragePriceBadge';

const dataMap: { [key: string]: any[] } = {
  '1年': [
    { month: '1月', price: 520, windows: 186, mac: 80, linux: 120 },
    { month: '2月', price: 480, windows: 165, mac: 95, linux: 110 },
    { month: '3月', price: 500, windows: 190, mac: 87, linux: 125 },
    { month: '4月', price: 510, windows: 195, mac: 88, linux: 130 },
    { month: '5月', price: 495, windows: 182, mac: 98, linux: 122 },
    { month: '6月', price: 470, windows: 175, mac: 90, linux: 115 },
    { month: '7月', price: 480, windows: 180, mac: 86, linux: 124 },
    { month: '8月', price: 490, windows: 185, mac: 91, linux: 126 },
  ],
  '5年': [
    { month: '2019', price: 450, windows: 150, mac: 70, linux: 100 },
    { month: '2020', price: 470, windows: 160, mac: 75, linux: 110 },
    { month: '2021', price: 480, windows: 170, mac: 80, linux: 115 },
    { month: '2022', price: 500, windows: 180, mac: 85, linux: 120 },
    { month: '2023', price: 520, windows: 186, mac: 80, linux: 120 },
  ],
  // 必要に応じて10年・20年も追加
};

const series = [
  { name: 'windows', color: '#319795' },
  { name: 'mac', color: '#805AD5' },
  { name: 'linux', color: '#F6AD55' },
];

const AveragePriceChart: React.FC = () => {
  const [period, setPeriod] = useState('1年');

  return (
    <div className="mt-12">
      <AverageChartHeader />
      <div className="bg-white p-8 rounded-xl shadow-md">
        <div className="flex justify-between items-start mb-6">
          <div>
            <AveragePriceBadge
              badges={[
                { color: '#3b82f6', label: 'エリア A', price: '5,200万円' },
                { color: '#22c55e', label: 'エリア B', price: '4,800万円' },
                { color: '#eab308', label: 'エリア C', price: '4,500万円' },
              ]}
            />
          </div>
          <TimesRangeToggle period={period} setPeriod={setPeriod} />
        </div>
        <div className="h-80">
          <AreaChart data={dataMap[period]} series={series} period={period} />
        </div>
      </div>
    </div>
  );
};

export default AveragePriceChart;
