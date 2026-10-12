'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import styles from './ShaderTest.module.scss';

/** Full-bleed burn carousel shell; controls portal above the WebGL canvas. */
export default function ShaderTestBurnCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const controls = (
    <div className={styles.carouselControls}>
      <button className={styles.carouselButton} type="button" data-carousel="prev" aria-label="Previous slide">
        Prev
      </button>
      <div className={styles.carouselDots}>
        <button className={styles.carouselDot} type="button" data-carousel-to="0" aria-label="Slide 1" />
        <button className={styles.carouselDot} type="button" data-carousel-to="1" aria-label="Slide 2" />
        <button className={styles.carouselDot} type="button" data-carousel-to="2" aria-label="Slide 3" />
      </div>
      <button className={styles.carouselButton} type="button" data-carousel="next" aria-label="Next slide">
        Next
      </button>
    </div>
  );

  return (
    <div className={styles.mediaPage}>
      <section className={styles.heroStage} />
      {mounted ? createPortal(controls, document.body) : null}
    </div>
  );
}
