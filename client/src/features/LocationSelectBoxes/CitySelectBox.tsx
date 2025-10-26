// src/features/location/CitySelectBox.tsx
import React from 'react';
import styles from '../../styles/pages/Top.module.css';
import { City } from '../hooks/useCities';

interface CitySelectBoxProps {
  cities: City[];
  value?: string;
  onCityChange: (value: string) => void;
  disabled?: boolean;
}

const CitySelectBox: React.FC<CitySelectBoxProps> = ({
  cities,
  value = '',
  onCityChange,
  disabled = false,
}) => (
  <div className={styles.selectRow}>
    <label className={styles.selectLabel}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onCityChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">市区町村を選択</option>
        {cities.map((c) => (
          <option key={c.id} value={c.id}>
            {c.name}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default CitySelectBox;
