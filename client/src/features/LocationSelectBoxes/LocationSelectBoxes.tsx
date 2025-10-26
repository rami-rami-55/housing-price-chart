import React, { Dispatch, SetStateAction } from 'react';
import styles from '../../styles/pages/Top.module.css';
import { useCities } from '../hooks/useCities';
import { useStations } from '../hooks/useStations';
import CitySelectBox from './CitySelectBox';
import PrefectureSelectBox from './PrefectureSelectBox';
import StationSelectBox from './StationSelectBox';

type LocationSelectBoxesProps = {
  prefecture: string;
  setPrefecture: Dispatch<SetStateAction<string>>;
  city: string;
  setCity: Dispatch<SetStateAction<string>>;
  station: string;
  setStation: Dispatch<SetStateAction<string>>;
};

const LocationSelectBoxes: React.FC<LocationSelectBoxesProps> = ({
  prefecture,
  setPrefecture,
  city,
  setCity,
  station,
  setStation,
}) => {
  const { cities, loading: loadingCity } = useCities(prefecture);
  const { stations, loading: loadingStation } = useStations(city);

  const handlePrefectureChange = (value: string) => {
    setPrefecture(value);
    setCity('');
    setStation('');
  };

  const handleCityChange = (value: string) => {
    setCity(value);
    setStation('');
  };

  const handleStationChange = (value: string) => {
    setStation(value);
  };

  return (
    <div>
      <h4 className={styles.sectionTitle}>地域</h4>
      <PrefectureSelectBox onPrefectureChange={handlePrefectureChange} />
      <CitySelectBox
        cities={cities}
        value={city}
        onCityChange={handleCityChange}
        disabled={!prefecture || loadingCity}
      />
      <StationSelectBox
        stations={stations}
        value={station}
        onStationChange={handleStationChange}
        disabled={!prefecture || !city || loadingStation}
      />
    </div>
  );
};

export default LocationSelectBoxes;
