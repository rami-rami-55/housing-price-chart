import React from 'react';
import { ComparisonArea } from '../types/estate';

interface ComparisonAreaListProps {
  comparisonAreas: ComparisonArea[];
  onToggleAreaSelection: (areaId: string) => void;
  onRemoveArea: (areaId: string) => void;
  getColorHex: (colorName: string) => string;
}

const ComparisonAreaList: React.FC<ComparisonAreaListProps> = ({
  comparisonAreas,
  onToggleAreaSelection,
  onRemoveArea,
  getColorHex,
}) => {
  const formatConditionText = (area: ComparisonArea) => {
    const conditions = [];

    if (area.propertyType) conditions.push(area.propertyType);
    if (area.propertyStatus) conditions.push(area.propertyStatus);
    if (area.structure) conditions.push(area.structure);
    if (area.layouts && area.layouts.length > 0) {
      conditions.push(area.layouts.join('/'));
    }

    return conditions.filter(Boolean).join('・');
  };

  const formatDuration = (area: ComparisonArea) => {
    if (area.startYear && area.endYear) {
      return `(${area.startYear}年〜${area.endYear}年)`;
    }
    return '';
  };

  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">比較エリア一覧</h2>
      <p className="text-sm text-gray-500 mb-3">クリックでグラフ表示をON/OFF</p>
      <div className="space-y-3">
        {comparisonAreas.map((area) => (
          <div
            key={area.id}
            className={`flex items-center justify-between p-3 rounded-xl shadow-sm border-2 transition cursor-pointer ${
              area.selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
            onClick={() => onToggleAreaSelection(area.id)}
          >
            <div className="flex items-center w-full" data-action="toggle">
              <span
                className="w-3 h-3 rounded-full mr-3 flex-shrink-0"
                style={{
                  backgroundColor: getColorHex(area.color),
                  border: `1px solid ${getColorHex(area.color)}`,
                }}
              />
              <div className="flex-grow min-w-0">
                <span className="font-medium text-gray-700 block truncate">{area.name}</span>
                <div className="text-xs text-gray-500 truncate mt-0.5">
                  <span>{formatConditionText(area)}</span>
                  {formatDuration(area) && (
                    <span className="ml-2 text-gray-400">{formatDuration(area)}</span>
                  )}
                </div>
              </div>
              <span
                className={`ml-3 text-xs flex-shrink-0 ${
                  area.selected ? 'text-blue-600' : 'text-gray-500'
                }`}
              >
                {area.selected ? '表示中' : '非表示'}
              </span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveArea(area.id);
              }}
              className="p-1 rounded-full text-gray-500 hover:bg-red-200 hover:text-red-600 transition ml-2 flex-shrink-0"
              title="比較対象から除外"
            >
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonAreaList;
