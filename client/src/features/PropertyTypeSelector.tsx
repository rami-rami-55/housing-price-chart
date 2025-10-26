import React from 'react';
import { MultiSelectSelector } from '../components';

interface MultiPropertyTypeSelectorProps {
  selectedTypes?: string[];
  onTypesChange?: (types: string[]) => void;
}

const MultiPropertyTypeSelector: React.FC<MultiPropertyTypeSelectorProps> = ({
  selectedTypes = [],
  onTypesChange,
}) => {
  const propertyTypes = [
    { id: 'mansion', label: 'マンション', value: 'mansion' },
    { id: 'house', label: '戸建て', value: 'house' },
    { id: 'land', label: '土地', value: 'land' },
  ];

  return (
    <MultiSelectSelector
      title="物件の種類"
      options={propertyTypes}
      selectedValues={selectedTypes}
      onValuesChange={onTypesChange}
      gridCols="grid-cols-1"
      buttonClassName="text-left px-4"
    />
  );
};

export default MultiPropertyTypeSelector;
