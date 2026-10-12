'use client';

import { useCallback, useState } from 'react';
import { cx } from '@/lib/cx';
import HeroControls, { heroControlDefaults } from './HeroControls';
import styles from './kit.module.scss';

function spacingStyle(token) {
  return token ? { gap: `var(--global-spacing-${token})` } : null;
}

export function DocColumn({ className, ...props }) {
  return <div className={cx(styles.docColumn, className)} {...props} />;
}

export function PageHead({ className, ...props }) {
  return <header className={cx(styles.pageHead, className)} {...props} />;
}

export function Eyebrow({ className, ...props }) {
  return <span className={cx(styles.eyebrow, className)} {...props} />;
}

export function PageTitle({ className, ...props }) {
  return <h1 className={cx(styles.pageTitle, className)} {...props} />;
}

export function PageSummary({ className, ...props }) {
  return <p className={cx(styles.pageSummary, className)} {...props} />;
}

export function StoryList({ className, ...props }) {
  return <div className={cx(styles.storyList, className)} {...props} />;
}

export function Row({ $gap, $align, className, style, ...props }) {
  return (
    <div
      className={cx(styles.row, className)}
      style={{
        ...spacingStyle($gap),
        ...($align ? { alignItems: $align } : null),
        ...style,
      }}
      {...props}
    />
  );
}

export function Stack({ $gap, $align, className, style, ...props }) {
  return (
    <div
      className={cx(styles.stack, className)}
      style={{
        ...spacingStyle($gap),
        ...($align ? { alignItems: $align } : null),
        ...style,
      }}
      {...props}
    />
  );
}

export function Grid({ $gap, $min, className, style, ...props }) {
  return (
    <div
      className={cx(styles.grid, className)}
      style={{
        ...spacingStyle($gap),
        ...($min
          ? { gridTemplateColumns: `repeat(auto-fit, minmax(${$min}, 1fr))` }
          : null),
        ...style,
      }}
      {...props}
    />
  );
}

export function StateCell({ className, ...props }) {
  return <div className={cx(styles.stateCell, className)} {...props} />;
}

export function StateName({ className, ...props }) {
  return <span className={cx(styles.stateName, className)} {...props} />;
}

export function Hint({ className, ...props }) {
  return <p className={cx(styles.hint, className)} {...props} />;
}

/**
 * The isolation stage at the top of every component page.
 *
 * One instance of the component, centred, filling the viewport, with a
 * controls panel beneath it — so it can be looked at on its own while a
 * design is being worked on, flipped between its states, and hovered and
 * clicked to see them for real. Everything else sits below the fold.
 *
 * The stage owns the control values and passes them straight to the
 * component as props, which is why a story module's `heroControls` keys must
 * match its `Hero` props.
 *
 * @param {string} name - component name, from the registry
 * @param {object} controls - the control schema, see HeroControls
 * @param {React.ComponentType} component - the module's Hero component
 * @param {'default'|'glass'} surface
 */
export function Hero({ name, controls, component: Subject, surface = 'default', wide = false }) {
  const [values, setValues] = useState(() => heroControlDefaults(controls));

  const handleChange = useCallback((key, value) => {
    setValues((current) => ({ ...current, [key]: value }));
  }, []);

  return (
    <section
      className={cx(styles.heroStage, surface === 'glass' && styles.glassHeroStage)}
      aria-label={`${name} in isolation`}
    >
      <span className={styles.heroName}>{name}</span>

      <div className={cx(styles.heroSubject, wide && styles.wide)}>
        {Subject ? <Subject {...values} /> : null}
      </div>

      <HeroControls schema={controls} values={values} onChange={handleChange} />

      <span className={styles.heroScrollCue} aria-hidden="true">Variants and props below ↓</span>
    </section>
  );
}

/**
 * One story: a titled, isolated canvas.
 *
 * @param {string} title
 * @param {string} description
 * @param {'default'|'sunken'|'glass'} surface - the canvas backdrop
 * @param {'default'|'none'} padding
 * @param {boolean} clip - clip overflow (for backdrops that must not bleed)
 */
export function Story({
  title,
  description,
  surface = 'default',
  padding = 'default',
  clip = false,
  id,
  children,
}) {
  const glass = surface === 'glass';

  return (
    <section className={styles.storyBlock} id={id}>
      {(title || description) && (
        <div className={styles.storyHead}>
          {title && <h2 className={styles.storyTitle}>{title}</h2>}
          {description && <p className={styles.storyDescription}>{description}</p>}
        </div>
      )}

      <div
        className={cx(
          styles.canvas,
          glass && styles.glassCanvas,
          surface === 'sunken' && styles.sunken,
          padding === 'none' && styles.paddingNone,
          (clip || glass) && styles.clip,
        )}
      >
        {children}
      </div>
    </section>
  );
}

/**
 * The component's API, rendered from a plain array so each story file keeps
 * its props documented next to its examples.
 *
 * @param {{name, type, default?, description}[]} rows
 */
export function PropsTable({ rows = [] }) {
  if (rows.length === 0) return null;

  return (
    <section className={styles.storyBlock} id="props">
      <div className={styles.storyHead}>
        <h2 className={styles.storyTitle}>Props</h2>
        <p className={styles.storyDescription}>
          Standard DOM props are forwarded to the underlying element.
        </p>
      </div>

      <div className={styles.tableWrap}>
        <table className={styles.table}>
          <thead>
            <tr>
              <th scope="col">Prop</th>
              <th scope="col">Type</th>
              <th scope="col">Default</th>
              <th scope="col">Description</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((row) => (
              <tr key={row.name}>
                <td>
                  <code className={styles.propName}>{row.name}</code>
                </td>
                <td>
                  <code className={styles.propType}>{row.type}</code>
                </td>
                <td>{row.default ? <code className={styles.propDefault}>{row.default}</code> : '—'}</td>
                <td>{row.description}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  );
}
