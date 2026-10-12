'use client';

import styles from './ShaderTest.module.scss';

/**
 * Architecture A lab: one photo on top, a second underneath, revealed by a
 * drifting cloud mask that follows the cursor. `data-reveal-src` is the
 * image hiding below — the DOM `<img>` itself is hidden once its plane mounts.
 */
export default function ShaderTestCloudReveal() {
  return (
    <div className={styles.mediaPage}>
      <section className={styles.heroStage}>
        <img className={styles.fullBleedHero}
          data-canvas
          data-reveal-src="https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=2400&q=80"
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=2400&q=80"
          alt="Tropical beach at golden hour"
        />
      </section>
    </div>
  );
}
