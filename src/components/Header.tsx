import React from 'react';
import styles from './Header.module.css';
import { Link } from 'react-router-dom';

export default () => {
  return (
    <header className={styles.header}>
      <div class={styles.nav}>ICULive</div>
      <nav>
        <ul className={styles.navList}>
          <li class={styles.nav}><Link to="/">Home</Link></li>
          <li class={styles.nav}><Link to="/hospitals">Hospitals</Link></li>
          <li class={styles.nav}><Link to="/">Contact</Link></li>
        </ul>
      </nav>
    </header>
  );
};