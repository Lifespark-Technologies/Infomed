import React from 'react';
import styles from './Header.module.css';

export default () => {
  return (
    <header className={styles.header}>
      <div>ICULive</div>
      <nav>
        <ul className={styles.navList}>
          <li>Home</li>
          <li>Hospitals</li>
          <li>Contact</li>
        </ul>
      </nav>
    </header>
  );
};