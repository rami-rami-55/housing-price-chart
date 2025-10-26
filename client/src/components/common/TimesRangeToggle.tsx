import React from 'react';
import styles from '../../styles/components/TimesRangeToggle.module.css';

type ButtonProps = {
  period: string;
  setPeriod: (period: string) => void;
};

const periods = ['1年', '5年', '10年', '20年'];

const TimesRangeToggle: React.FC<ButtonProps> = ({ period, setPeriod }) => {
  return (
    <div className={styles.container}>
      {periods.map((p) => (
        <button
          key={p}
          className={period === p ? `${styles.button} ${styles.selected}` : styles.button}
          onClick={() => setPeriod(p)}
          type="button"
        >
          {p}
        </button>
      ))}
    </div>
  );
};

export default TimesRangeToggle;
