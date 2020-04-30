import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <header className={styles.header}>
      <div>ICULive</div>
      <nav>
        <ul className={styles.navList}>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/hospitals">Hospitals</Link></li>
          <li><Link to="/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};