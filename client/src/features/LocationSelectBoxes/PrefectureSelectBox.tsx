import React from 'react';
import { prefectures } from '../../components/options/prefectures';
import styles from '../../styles/pages/Top.module.css';

interface PrefectureSelectBoxProps {
  onPrefectureChange: (value: string) => void;
}

const PrefectureSelectBox: React.FC<PrefectureSelectBoxProps> = ({ onPrefectureChange }) => (
  <div className={styles.selectRow}>
    <label className={styles.selectLabel}>
      <select className={styles.select} onChange={(e) => onPrefectureChange(e.target.value)}>
        <option value="">都道府県を選択</option>
        {prefectures.map((p) => (
          <option key={p.id} value={p.id}>
            {p.name}
          </option>
        ))}
      </select>
    </label>
  </div>
);

export default PrefectureSelectBox;
