'use client';

import { Button } from '@/components/ui';
import styles from './DisplayBoxPlay.module.scss';

const BOX_COLORS = ['#3B82F6', '#10B981', '#F59E0B'];

export default function DisplayBoxPlay() {
  return (
    <div className={styles.wrapper}>
      <h2 className={styles.heading}>Display Box Play</h2>
      <div className={styles.row}>
        <div className={styles.box} style={{ background: BOX_COLORS[0] }}>Box 1</div>
        <div className={styles.box} style={{ background: BOX_COLORS[1] }}>Box 2</div>
        <div className={styles.box} style={{ background: BOX_COLORS[2] }}>Box 3</div>
      </div>
      <Button variant="primary">Click me</Button>
    </div>
  );
}
