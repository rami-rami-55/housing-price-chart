import React, { useState } from 'react';
import { ButtonGrid, SelectorBase } from '../components';

interface PropertyTypeSelectorProps {
  selectedType?: string;
  onTypeChange?: (type: string) => void;
}

const PropertyTypeSelector: React.FC<PropertyTypeSelectorProps> = ({
  selectedType = 'mansion',
  onTypeChange,
}) => {
  const [selected, setSelected] = useState(selectedType);

  const propertyTypes = [
    { id: 'mansion', label: 'マンション', value: 'mansion' },
    { id: 'house', label: '戸建て', value: 'house' },
    { id: 'land', label: '土地', value: 'land' },
  ];

  const handleTypeClick = (type: string) => {
    setSelected(type);
    onTypeChange?.(type);
  };

  return (
    <SelectorBase title="物件の種類">
      <ButtonGrid
        options={propertyTypes}
        selectedValue={selected}
        onValueChange={handleTypeClick}
        gridCols="grid-cols-1"
        buttonClassName="text-left px-4"
      />
    </SelectorBase>
  );
};

export default PropertyTypeSelector;
