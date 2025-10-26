import React from 'react';
import { ChartType } from '../types/estate';

interface ChartTypeSelectorProps {
  chartType: ChartType;
  onChartTypeChange: (type: ChartType) => void;
}

const ChartTypeSelector: React.FC<ChartTypeSelectorProps> = ({ chartType, onChartTypeChange }) => {
  return (
    <div className="flex space-x-4 mb-4">
      <button
        onClick={() => onChartTypeChange('price')}
        className={`px-6 py-2 font-semibold rounded-xl shadow-md transition ${
          chartType === 'price'
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-white text-gray-700 hover:bg-gray-200'
        }`}
      >
        取引価格の時系列推移
      </button>
      <button
        onClick={() => onChartTypeChange('unit_price')}
        className={`px-6 py-2 font-semibold rounded-xl shadow-md transition ${
          chartType === 'unit_price'
            ? 'bg-blue-500 text-white hover:bg-blue-600'
            : 'bg-white text-gray-700 hover:bg-gray-200'
        }`}
      >
        単価の時系列推移
      </button>
    </div>
  );
};

export default ChartTypeSelector;
