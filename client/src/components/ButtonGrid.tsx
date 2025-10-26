import React from 'react';
import SelectableButton from './SelectableButton';

interface ButtonOption {
  id: string;
  label: string;
  value: string;
}

interface ButtonGridProps {
  options: ButtonOption[];
  selectedValue?: string;
  selectedValues?: string[];
  onValueChange?: (value: string) => void;
  onValuesChange?: (values: string[]) => void;
  gridCols?: 'grid-cols-1' | 'grid-cols-2' | 'grid-cols-3' | 'grid-cols-4';
  buttonClassName?: string;
  variant?: 'single' | 'multiple';
}

const ButtonGrid: React.FC<ButtonGridProps> = ({
  options,
  selectedValue,
  selectedValues = [],
  onValueChange,
  onValuesChange,
  gridCols = 'grid-cols-3',
  buttonClassName = '',
  variant = 'single',
}) => {
  const handleClick = (value: string) => {
    if (variant === 'multiple') {
      const currentValues = selectedValues || [];
      const newValues = currentValues.includes(value)
        ? currentValues.filter((v) => v !== value)
        : [...currentValues, value];
      onValuesChange?.(newValues);
    } else {
      onValueChange?.(value);
    }
  };

  const isSelected = (value: string) => {
    if (variant === 'multiple') {
      return (selectedValues || []).includes(value);
    }
    return selectedValue === value;
  };

  return (
    <div className={`grid ${gridCols} gap-2`}>
      {options.map((option) => (
        <SelectableButton
          key={option.id}
          id={option.id}
          label={option.label}
          value={option.value}
          isSelected={isSelected(option.value)}
          onClick={handleClick}
          className={buttonClassName}
          variant={variant}
        />
      ))}
    </div>
  );
};

export default ButtonGrid;
