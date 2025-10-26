import React, { useState } from 'react';
import { ButtonGrid, SelectorBase } from '../components';

interface MultiSelectSelectorProps {
  title: string;
  options: Array<{ id: string; label: string; value: string }>;
  selectedValues?: string[];
  onValuesChange?: (values: string[]) => void;
  gridCols?: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  buttonClassName?: string;
}

const MultiSelectSelector: React.FC<MultiSelectSelectorProps> = ({
  title,
  options,
  selectedValues = [],
  onValuesChange,
  gridCols = 'grid-cols-3',
  buttonClassName = '',
}) => {
  const [selected, setSelected] = useState<string[]>(selectedValues);

  const handleValuesChange = (values: string[]) => {
    setSelected(values);
    onValuesChange?.(values);
  };

  return (
    <SelectorBase title={title}>
      <ButtonGrid
        options={options}
        selectedValues={selected}
        onValuesChange={handleValuesChange}
        gridCols={gridCols}
        buttonClassName={buttonClassName}
        variant="multiple"
      />
    </SelectorBase>
  );
};

export default MultiSelectSelector;
