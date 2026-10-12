'use client';

import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { cx } from '@/lib/cx';
import styles from './Card.module.scss';

/**
 * Card — a surface for grouping related content.
 *
 * @param {'elevated'|'outlined'|'filled'|'glass'} variant
 * @param {'sm'|'md'|'lg'} padding
 * @param {boolean} interactive - adds hover lift, active press and focus ring;
 *                                renders as a <button> unless `as` says otherwise
 * @param {string} image     - hero image URL, rendered above the body
 * @param {string} imageAlt  - alt text for the hero image
 * @param {string} title
 * @param {string} description
 * @param {React.ReactNode} footer
 *
 * States (interactive only): hover, active, focus-visible.
 *
 * Motion: uses the `surface` amplitude — a larger lift and a gentler press
 * than a Button, on the identical curve.
 */
export default function Card({
  variant = 'elevated',
  padding = 'md',
  interactive = false,
  image,
  imageAlt = '',
  title,
  description,
  footer,
  as,
  className,
  children,
  ...props
}) {
  const Tag = as ?? (interactive ? 'button' : 'div');
  const { ref, handlers } = useInteractiveMotion({
    preset: 'surface',
    disabled: !interactive,
  });

  return (
    <Tag
      ref={ref}
      type={Tag === 'button' ? 'button' : undefined}
      className={cx(
        styles.root,
        styles[variant] || styles.elevated,
        styles[padding] || styles.md,
        interactive && styles.interactive,
        className,
      )}
      {...(interactive ? handlers : {})}
      {...props}
    >
      {image && <img className={styles.image} src={image} alt={imageAlt} loading="lazy" />}
      {title && <h3 className={styles.title}>{title}</h3>}
      {description && <p className={styles.description}>{description}</p>}
      {children}
      {footer && <div className={styles.footer}>{footer}</div>}
    </Tag>
  );
}
