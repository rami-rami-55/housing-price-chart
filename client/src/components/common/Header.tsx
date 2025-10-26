import React from 'react';
import styles from '../../styles/components/Header.module.css';

const Header: React.FC = () => (
  <header className={styles.header}>
    <div className={styles.left}>
      <div className={styles.logo}>
        <h2 className={styles.title}>不動産価格比較サイト</h2>
      </div>
    </div>
  </header>
);

export default Header;
