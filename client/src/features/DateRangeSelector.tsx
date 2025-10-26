import React, { useState } from 'react';

interface DateRangeSelectorProps {
  startYear?: string;
  endYear?: string;
  onStartYearChange?: (year: string) => void;
  onEndYearChange?: (year: string) => void;
}

const DateRangeSelector: React.FC<DateRangeSelectorProps> = ({
  startYear = '2024',
  endYear = '2024',
  onStartYearChange,
  onEndYearChange,
}) => {
  const [start, setStart] = useState(startYear);
  const [end, setEnd] = useState(endYear);

  const years = ['2020', '2021', '2022', '2023', '2024'];

  const handleStartYearChange = (year: string) => {
    setStart(year);
    onStartYearChange?.(year);
  };

  const handleEndYearChange = (year: string) => {
    setEnd(year);
    onEndYearChange?.(year);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">集計期間</h2>
      <div className="flex space-x-2 items-center">
        <select
          value={start}
          onChange={(e) => handleStartYearChange(e.target.value)}
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {years.map((year) => (
            <option key={`start-${year}`} value={year}>
              {year}年
            </option>
          ))}
        </select>
        <span className="text-gray-600">〜</span>
        <select
          value={end}
          onChange={(e) => handleEndYearChange(e.target.value)}
          className="w-1/2 px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          {years.map((year) => (
            <option key={`end-${year}`} value={year}>
              {year}年
            </option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default DateRangeSelector;
