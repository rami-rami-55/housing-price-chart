import React, { useState } from 'react';
import Header from '../components/common/Header';
import AveragePriceChart from '../features/AveragePriceChart/AveragePriceChart';
import HouseTypeButtons from '../features/HouseTypeButtons/HouseTypeButtons';
import LayoutTypeButtons from '../features/LayoutTypeButtons/LayoutTypeButtons';
import LocationSelectBoxes from '../features/LocationSelectBoxes/LocationSelectBoxes';
import SearchButton from '../features/SearchButton.tsx/SearchButton';
import styles from '../styles/pages/Top.module.css';

export const Top: React.FC = () => {
  const [houseType, setHouseType] = useState<string>('');
  const [layoutType, setLayoutType] = useState<string>('');
  const [prefecture, setPrefecture] = useState<string>('');
  const [city, setCity] = useState<string>('');
  const [station, setStation] = useState<string>('');

  return (
    <div className={styles.root}>
      <div className={styles.layoutContainer}>
        <Header />
        <div className={styles.centerArea}>
          <div className={styles.contentContainer}>
            <HouseTypeButtons houseType={houseType} setHouseType={setHouseType} />
            <LayoutTypeButtons layoutType={layoutType} setLayoutType={setLayoutType} />
            <LocationSelectBoxes
              prefecture={prefecture}
              setPrefecture={setPrefecture}
              city={city}
              setCity={setCity}
              station={station}
              setStation={setStation}
            />
            <SearchButton
              houseType={houseType}
              layoutType={layoutType}
              prefecture={prefecture}
              city={city}
              station={station}
            />
            <AveragePriceChart />
          </div>
        </div>
      </div>
    </div>
  );
};
export default Top;
