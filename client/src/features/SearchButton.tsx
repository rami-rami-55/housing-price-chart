import React from 'react';

interface SearchButtonProps {
  onSearch: () => void;
}

const SearchButton: React.FC<SearchButtonProps> = ({ onSearch }) => {
  return (
    <div className="space-y-3">
      <button
        onClick={onSearch}
        className="w-full px-6 py-3 bg-blue-500 text-white font-semibold rounded-xl shadow-lg hover:bg-blue-600 transition"
      >
        条件を適用
      </button>
    </div>
  );
};

export default SearchButton;
