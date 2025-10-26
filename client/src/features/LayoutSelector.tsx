import React from 'react';
import { MultiSelectSelector } from '../components';

interface MultiLayoutSelectorProps {
  selectedLayouts?: string[];
  onLayoutsChange?: (layouts: string[]) => void;
}

const MultiLayoutSelector: React.FC<MultiLayoutSelectorProps> = ({
  selectedLayouts = [],
  onLayoutsChange,
}) => {
  const layouts = [
    { id: '1R_1K', label: '1R / 1K', value: '1R_1K' },
    { id: '1DK', label: '1DK', value: '1DK' },
    { id: '1LDK', label: '1LDK', value: '1LDK' },
    { id: '2K', label: '2K', value: '2K' },
    { id: '2DK', label: '2DK', value: '2DK' },
    { id: '2LDK', label: '2LDK', value: '2LDK' },
    { id: '3K', label: '3K', value: '3K' },
    { id: '3DK', label: '3DK', value: '3DK' },
    { id: '3LDK', label: '3LDK', value: '3LDK' },
    { id: '4K', label: '4K', value: '4K' },
    { id: '4DK', label: '4DK', value: '4DK' },
    { id: '4LDK', label: '4LDK', value: '4LDK' },
  ];

  return (
    <MultiSelectSelector
      title="レイアウト"
      options={layouts}
      selectedValues={selectedLayouts}
      onValuesChange={onLayoutsChange}
      gridCols="grid-cols-3"
      buttonClassName="text-sm px-2"
    />
  );
};

export default MultiLayoutSelector;
