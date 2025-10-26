import React from 'react';
import PrimaryButton from '../../components/common/PrimaryButton';
import useHousePrice from '../hooks/useHousePrice';

interface SearchButtonProps {
  houseType: string;
  layoutType: string;
  prefecture: string;
  city: string;
  station: string;
}

const SearchButton: React.FC<SearchButtonProps> = ({
  houseType,
  layoutType,
  prefecture,
  city,
  station,
}) => {
  const { fetchHousePrice } = useHousePrice();

  const handleClick = () => {
    fetchHousePrice({
      houseType,
      layoutType,
      prefecture,
      city,
      station,
    });
  };
  return <PrimaryButton text={'追加'} onClick={handleClick} />;
};

export default SearchButton;
