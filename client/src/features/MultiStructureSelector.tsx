import React from 'react';
import { MultiSelectSelector } from '../components';

interface MultiStructureSelectorProps {
  selectedStructures?: string[];
  onStructuresChange?: (structures: string[]) => void;
}

const MultiStructureSelector: React.FC<MultiStructureSelectorProps> = ({
  selectedStructures = [],
  onStructuresChange,
}) => {
  const structures = [
    { id: 'wood', label: '木造', value: 'wood' },
    { id: 'rc', label: 'RC', value: 'rc' },
    { id: 'src', label: 'SRC', value: 'src' },
  ];

  return (
    <MultiSelectSelector
      title="構造"
      options={structures}
      selectedValues={selectedStructures}
      onValuesChange={onStructuresChange}
      gridCols="grid-cols-3"
    />
  );
};

export default MultiStructureSelector;
