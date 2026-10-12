'use client';

import styles from './ShaderTest.module.scss';

/** Architecture A lab: hover bulge + mosaic cubes — full-bleed city, no copy. */
export default function ShaderTestMosaic() {
  return (
    <div className={styles.mediaPage}>
      <section className={styles.heroStage}>
        <img className={styles.fullBleedHero}
          data-canvas
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=2400&q=80"
          alt="City street at night"
        />
      </section>
    </div>
  );
}
