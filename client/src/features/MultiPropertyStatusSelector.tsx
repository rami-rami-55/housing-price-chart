import React from 'react';
import { MultiSelectSelector } from '../components';

interface MultiPropertyStatusSelectorProps {
  selectedStatuses?: string[];
  onStatusesChange?: (statuses: string[]) => void;
}

const MultiPropertyStatusSelector: React.FC<MultiPropertyStatusSelectorProps> = ({
  selectedStatuses = [],
  onStatusesChange,
}) => {
  const statusOptions = [
    { id: 'new', label: '新品', value: 'new' },
    { id: 'used', label: '中古', value: 'used' },
  ];

  return (
    <MultiSelectSelector
      title="物件の状態"
      options={statusOptions}
      selectedValues={selectedStatuses}
      onValuesChange={onStatusesChange}
      gridCols="grid-cols-2"
    />
  );
};

export default MultiPropertyStatusSelector;
