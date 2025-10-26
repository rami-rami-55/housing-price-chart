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
    <div className="space-y-3">
      <h2 className="text-lg font-semibold text-gray-700 mb-2">地域</h2>
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
