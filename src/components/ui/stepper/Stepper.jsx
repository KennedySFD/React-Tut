'use client';

import { CheckIcon } from '@/components/icons';
import { cx } from '@/lib/cx';
import styles from './Stepper.module.scss';

const statusClass = {
  complete: styles.complete,
  active: styles.active,
};

/**
 * Stepper
 *
 * Multi-step wizard indicator. Shows progress through a sequence of steps.
 *
 * @param {Array<{label: string}>} steps
 * @param {number} activeStep - 0-indexed current step
 */
export default function Stepper({ steps = [], activeStep = 0, className, ...props }) {
  return (
    <div className={cx(styles.root, className)} role="list" {...props}>
      {steps.map((step, i) => {
        const status = i < activeStep ? 'complete' : i === activeStep ? 'active' : 'upcoming';
        return (
          <div key={i} className={styles.item} role="listitem">
            {i < steps.length - 1 && (
              <div className={cx(styles.connector, i < activeStep && styles.complete)} />
            )}
            <div className={cx(styles.indicator, statusClass[status])}>
              {status === 'complete' ? <CheckIcon size="0.875rem" /> : i + 1}
            </div>
            <span className={cx(styles.label, statusClass[status])}>{step.label}</span>
          </div>
        );
      })}
    </div>
  );
}
