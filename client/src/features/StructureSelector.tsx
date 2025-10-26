import React, { useState } from 'react';
import { ButtonGrid, SelectorBase } from '../components';

interface StructureSelectorProps {
  selectedStructure?: string;
  onStructureChange?: (structure: string) => void;
}

const StructureSelector: React.FC<StructureSelectorProps> = ({
  selectedStructure = 'wood',
  onStructureChange,
}) => {
  const [selected, setSelected] = useState(selectedStructure);

  const structures = [
    { id: 'wood', label: '木造', value: 'wood' },
    { id: 'rc', label: 'RC', value: 'rc' },
    { id: 'src', label: 'SRC', value: 'src' },
  ];

  const handleStructureClick = (structure: string) => {
    setSelected(structure);
    onStructureChange?.(structure);
  };

  return (
    <SelectorBase title="構造">
      <ButtonGrid
        options={structures}
        selectedValue={selected}
        onValueChange={handleStructureClick}
        gridCols="grid-cols-3"
      />
    </SelectorBase>
  );
};

export default StructureSelector;
