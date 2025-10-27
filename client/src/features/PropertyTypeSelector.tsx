import React from 'react';
import { SingleSelectSelector } from '../components';

interface PropertyTypeSelectorProps {
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  selectedType,
  onTypeChange,
}) => {
  const propertyTypes = [
    { id: 'mansion', label: 'マンション', value: 'mansion' },
    { id: 'house', label: '戸建て', value: 'house' },
    { id: 'land', label: '土地', value: 'land' },
  ];

  return (
    <SingleSelectSelector
      title="物件の種類"
      options={propertyTypes}
      selectedValue={selectedType}
      onValueChange={onTypeChange}
      gridCols="grid-cols-1"
      buttonClassName="text-left px-4"
    />
  );
};

export default PropertyTypeSelector;
