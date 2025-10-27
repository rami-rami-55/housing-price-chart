import React, { useState } from 'react';

interface LocationSelectorProps {
  selectedAreaName?: string;
  onAreaNameChange?: (areaName: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedAreaName = '',
  onAreaNameChange,
}) => {
  const [areaName, setAreaName] = useState(selectedAreaName);

  const handleAreaNameChange = (value: string) => {
    setAreaName(value);
    onAreaNameChange?.(value);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">最寄駅</h2>
      <p className="text-sm text-gray-500 mb-3">駅を抜いて入力してください</p>
      <input
        type="text"
        value={areaName}
        onChange={(e) => handleAreaNameChange(e.target.value)}
        placeholder="駅名を入力"
        className="w-full p-3 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500"
      />
    </div>
  );
};

export default LocationSelector;
