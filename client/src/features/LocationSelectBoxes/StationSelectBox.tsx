// src/features/location/StationSelectBox.tsx
import React from 'react';
import styles from '../../styles/pages/Top.module.css';
import { Station } from '../hooks/useStations';

interface StationSelectBoxProps {
  stations: Station[];
  value?: string;
  onStationChange: (value: string) => void;
  disabled?: boolean;
}

const StationSelectBox: React.FC<StationSelectBoxProps> = ({
  stations,
  value = '',
  onStationChange,
  disabled = false,
}) => (
  <div className={styles.selectRow}>
    <label className={styles.selectLabel}>
      <select
        className={styles.select}
        value={value}
        onChange={(e) => onStationChange(e.target.value)}
        disabled={disabled}
      >
        <option value="">最寄り駅を選択</option>
        {stations.map((s) => (
          <option key={s.id} value={s.id}>
            {s.name}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default StationSelectBox;
