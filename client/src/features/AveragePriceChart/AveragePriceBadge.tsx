import React from 'react';
import styles from '../../styles/features/AveragePriceBadge.module.css';

interface Badge {
  color: string;
  label: string;
  price: string;
}

interface AveragePriceBadgeProps {
  badges: Badge[];
}

const AveragePriceBadge: React.FC<AveragePriceBadgeProps> = ({ badges }) => (
  <div className={styles.container}>
    {badges.map((badge) => (
      <div className={styles.badge} key={badge.label}>
        <span className={styles.dot} style={{ background: badge.color }}></span>
        <div>
          <p className={styles.label}>{badge.label}</p>
          <p className={styles.price}>{badge.price}</p>
        </div>
      </div>
    ))}
  </div>
);

export default AveragePriceBadge;
