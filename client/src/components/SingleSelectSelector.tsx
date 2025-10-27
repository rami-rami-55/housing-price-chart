import React from 'react';
import { ButtonGrid, SelectorBase } from '../components';

interface SingleSelectSelectorProps {
  title: string;
  options: Array<{ id: string; label: string; value: string }>;
  selectedValue?: string;
  onValueChange?: (value: string) => void;
  gridCols?: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  buttonClassName?: string;
}

const SingleSelectSelector: React.FC<SingleSelectSelectorProps> = ({
  title,
  options,
  selectedValue,
  onValueChange,
  gridCols = 'grid-cols-3',
  buttonClassName = '',
}) => {
  const handleButtonClick = (value: string) => {
    if (onValueChange) {
      // 同じ値をクリックした場合は選択解除
      if (selectedValue === value) {
        onValueChange('');
      } else {
        onValueChange(value);
      }
    }
  };

  return (
    <SelectorBase title={title}>
      <ButtonGrid
        options={options}
        selectedValue={selectedValue}
        onValueChange={handleButtonClick}
        gridCols={gridCols}
        buttonClassName={buttonClassName}
        variant="single"
      />
    </SelectorBase>
  );
};

export default SingleSelectSelector;
