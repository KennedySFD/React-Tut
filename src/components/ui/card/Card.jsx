'use client';

import { useInteractiveMotion } from '@/hooks/useInteractiveMotion';
import { CardDescription, CardFooter, CardImage, CardTitle, StyledCard } from './Card.style';

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
  children,
  ...props
}) {
  const element = as ?? (interactive ? 'button' : 'div');
  const { ref, handlers } = useInteractiveMotion({
    preset: 'surface',
    disabled: !interactive,
  });

  return (
    <StyledCard
      ref={ref}
      as={element}
      type={element === 'button' ? 'button' : undefined}
      $variant={variant}
      $padding={padding}
      $interactive={interactive}
      {...(interactive ? handlers : {})}
      {...props}
    >
      {image && <CardImage src={image} alt={imageAlt} loading="lazy" />}
      {title && <CardTitle>{title}</CardTitle>}
      {description && <CardDescription>{description}</CardDescription>}
      {children}
      {footer && <CardFooter>{footer}</CardFooter>}
    </StyledCard>
  );
}
