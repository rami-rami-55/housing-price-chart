import React from 'react';

interface SelectorBaseProps {
  title: string;
  children: React.ReactNode;
}

const SelectorBase: React.FC<SelectorBaseProps> = ({ title, children }) => {
  return (
    <div>
      <h2 className="text-lg font-semibold text-gray-700 mb-2">{title}</h2>
      {children}
    </div>
  );
};

export default SelectorBase;
