import React, { useState } from 'react';

interface LocationSelectorProps {
  selectedPrefecture?: string;
  selectedCity?: string;
  selectedStation?: string;
  onPrefectureChange?: (prefecture: string) => void;
  onCityChange?: (city: string) => void;
  onStationChange?: (station: string) => void;
}

const LocationSelector: React.FC<LocationSelectorProps> = ({
  selectedPrefecture = '',
  selectedCity = '',
  selectedStation = '',
  onPrefectureChange,
  onCityChange,
  onStationChange,
}) => {
  const [prefecture, setPrefecture] = useState(selectedPrefecture);
  const [city, setCity] = useState(selectedCity);
  const [station, setStation] = useState(selectedStation);

  const handlePrefectureChange = (value: string) => {
    setPrefecture(value);
    onPrefectureChange?.(value);
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    onCityChange?.(value);
  };

  const handleStationChange = (value: string) => {
    setStation(value);
    onStationChange?.(value);
  };

  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">地域</h2>
      <div className="space-y-2">
        <select
          value={prefecture}
          onChange={(e) => handlePrefectureChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">都道府県を選択</option>
          <option value="tokyo">東京都</option>
          <option value="kanagawa">神奈川県</option>
          <option value="osaka">大阪府</option>
        </select>
        <select
          value={city}
          onChange={(e) => handleCityChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">市区町村を選択</option>
          <option value="setagaya">世田谷区</option>
          <option value="shibuya">渋谷区</option>
          <option value="shinjuku">新宿区</option>
        </select>
        <select
          value={station}
          onChange={(e) => handleStationChange(e.target.value)}
          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        >
          <option value="">最寄り駅を選択</option>
          <option value="shibuya">渋谷駅</option>
          <option value="shinjuku">新宿駅</option>
          <option value="ikebukuro">池袋駅</option>
        </select>
      </div>
    </div>
  );
};

export default LocationSelector;
