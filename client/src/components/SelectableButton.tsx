import React from 'react';

interface SelectableButtonProps {
  id: string;
  label: string;
  value: string;
  isSelected: boolean;
  onClick: (value: string) => void;
  className?: string;
  variant?: 'single' | 'multiple';
}

const SelectableButton: React.FC<SelectableButtonProps> = ({
  id,
  label,
  value,
  isSelected,
  onClick,
  className = '',
  variant = 'single',
}) => {
  const getButtonStyles = () => {
    if (variant === 'multiple') {
      return isSelected
        ? 'bg-blue-500 text-white hover:bg-blue-600 border-2 border-blue-500'
        : 'bg-white text-gray-700 hover:bg-blue-50 border-2 border-gray-200 hover:border-blue-300';
    }

    return isSelected
      ? 'bg-blue-500 text-white hover:bg-blue-600'
      : 'bg-gray-100 text-gray-700 hover:bg-gray-200';
  };

  return (
    <button
      key={id}
      onClick={() => onClick(value)}
      className={`px-3 py-2 text-center rounded-lg transition ${getButtonStyles()} ${className}`}
    >
      {label}
    </button>
  );
};

export default SelectableButton;
