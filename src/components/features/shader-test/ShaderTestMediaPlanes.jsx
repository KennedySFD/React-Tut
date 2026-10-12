'use client';

import styles from './ShaderTest.module.scss';

/** Architecture A lab: 100vh hero with DOM copy overlaid on a tracked plane. */
export default function ShaderTestMediaPlanes() {
  return (
    <div className={styles.mediaPage}>
      <section className={styles.heroStage}>
        <img className={styles.fullBleedHero}
          data-canvas
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=2400&q=80"
          alt="Abstract mathematical wireframe forms"
        />

        <div className={styles.heroOverlay}>
          <h1 className={styles.title}>Why separate the copy?</h1>
          <p className={styles.body}>
            If type lived inside the texture, hover warps and chromatic split
            would smear the letters. Keeping the headline and body in the DOM
            means they stay sharp and selectable while the plane underneath does
            the shader work.
          </p>
        </div>
      </section>
    </div>
  );
}
