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
  return (
    <div className="mt-8 pt-6 border-t border-gray-200">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">比較エリア一覧</h2>
      <p className="text-sm text-gray-500 mb-3">クリックでグラフ表示をON/OFF</p>
      <div className="space-y-3">
        {comparisonAreas.map((area) => (
          <div
            key={area.id}
            className={`flex items-center justify-between p-3 rounded-lg border-2 transition cursor-pointer ${
              area.selected ? 'border-blue-400 bg-blue-50' : 'border-gray-200 bg-gray-50 opacity-60'
            }`}
            onClick={() => onToggleAreaSelection(area.id)}
          >
            <div className="flex items-center">
              <div
                className="w-3 h-3 rounded-full mr-3"
                style={{
                  backgroundColor: getColorHex(area.color),
                  border: `1px solid ${getColorHex(area.color)}`,
                }}
              />
              <span className="font-medium text-gray-700 truncate">{area.name}</span>
            </div>
            <button
              onClick={(e) => {
                e.stopPropagation();
                onRemoveArea(area.id);
              }}
              className="text-red-500 hover:text-red-700 ml-2"
            >
              ×
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparisonAreaList;
