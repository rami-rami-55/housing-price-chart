import React, { useState } from 'react';

interface DurationSelectorProps {
  selectedDuration?: string;
  onDurationChange?: (duration: string) => void;
}

const DurationSelector: React.FC<DurationSelectorProps> = ({
  selectedDuration = '1',
  onDurationChange,
}) => {
  const [duration, setDuration] = useState(selectedDuration);

  const handleDurationChange = (newDuration: string) => {
    setDuration(newDuration);
    onDurationChange?.(newDuration);
  };

  return (
    <div className="flex items-center justify-end">
      <label htmlFor="select-duration" className="text-gray-700 font-semibold mr-4">
        集計期間:
      </label>
      <select
        id="select-duration"
        value={duration}
        onChange={(e) => handleDurationChange(e.target.value)}
        className="p-2 border border-gray-300 rounded-xl focus:border-blue-500 focus:ring-1 focus:ring-blue-500 shadow-sm"
      >
        <option value="1">直近1年</option>
        <option value="3">直近3年</option>
        <option value="5">直近5年</option>
      </select>
    </div>
  );
};

export default DurationSelector;
