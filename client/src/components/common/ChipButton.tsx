import React from 'react';
import styles from '../../styles/components/ChipButton.module.css';

interface ChipButtonProps {
  label: string;
  selected?: boolean;
  onClick?: () => void;
}

const ChipButton: React.FC<ChipButtonProps> = ({ label, selected = false, onClick }) => {
  return (
    <button
      type="button"
      className={selected ? `${styles.chip} ${styles.selected}` : styles.chip}
      onClick={onClick}
    >
      <span className={styles.chipText}>{label}</span>
    </button>
  );
};

export default ChipButton;
