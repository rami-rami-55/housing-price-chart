import React, { useState } from 'react';
import { ButtonGrid, SelectorBase } from '../components';

interface PropertyStatusSelectorProps {
  selectedStatus?: string;
  onStatusChange?: (status: string) => void;
}

const PropertyStatusSelector: React.FC<PropertyStatusSelectorProps> = ({
  selectedStatus = 'new',
  onStatusChange,
}) => {
  const [selected, setSelected] = useState(selectedStatus);

  const statusOptions = [
    { id: 'new', label: '新品', value: 'new' },
    { id: 'used', label: '中古', value: 'used' },
  ];

  const handleStatusClick = (status: string) => {
    setSelected(status);
    onStatusChange?.(status);
  };

  return (
    <SelectorBase title="物件の状態">
      <ButtonGrid
        options={statusOptions}
        selectedValue={selected}
        onValueChange={handleStatusClick}
        gridCols="grid-cols-2"
      />
    </SelectorBase>
  );
};

export default PropertyStatusSelector;
