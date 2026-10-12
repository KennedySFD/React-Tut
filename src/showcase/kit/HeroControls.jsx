'use client';

import Switch from '@/components/ui/switch';
import { cx } from '@/lib/cx';
import styles from './kit.module.scss';

/**
 * Builds the initial control values from a schema.
 *
 * A schema is a plain object declared by the story module:
 *
 *   export const heroControls = {
 *     variant: { type: 'select', options: ['primary', 'secondary'], default: 'primary' },
 *     disabled: { type: 'boolean', default: false },
 *   };
 *
 * Its keys are the props passed to the module's `Hero` component, so adding a
 * control is one line and needs no wiring.
 */
export function heroControlDefaults(schema) {
  return Object.fromEntries(
    Object.entries(schema ?? {}).map(([name, control]) => [name, control.default]),
  );
}

/**
 * The controls panel under the isolated component — Storybook's Controls
 * addon, reduced to the two input types this library actually needs.
 */
export default function HeroControls({ schema, values, onChange }) {
  const entries = Object.entries(schema ?? {});
  if (entries.length === 0) return null;

  return (
    <div className={styles.heroControlBar} role="group" aria-label="Component controls">
      {entries.map(([name, control]) => {
        const label = control.label ?? name;

        if (control.type === 'boolean') {
          return (
            <Switch
              key={name}
              size="sm"
              label={label}
              checked={Boolean(values[name])}
              onChange={(event) => onChange(name, event.target.checked)}
            />
          );
        }

        return (
          <div key={name} className={styles.controlGroup}>
            <span className={styles.controlLabel}>{label}</span>
            <div className={styles.segmented} role="group" aria-label={label}>
              {control.options.map((option) => {
                const active = values[name] === option;

                return (
                  <button
                    key={String(option)}
                    className={cx(styles.segmentedOption, active && styles.active)}
                    type="button"
                    aria-pressed={active}
                    onClick={() => onChange(name, option)}
                  >
                    {String(option)}
                  </button>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}
