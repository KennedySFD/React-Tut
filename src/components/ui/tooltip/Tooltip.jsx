'use client';

import { useEffect, useId, useRef, useState } from 'react';
import { useRevealMotion } from '@/hooks/useRevealMotion';
import { Bubble, TooltipAnchor, TooltipWrapper } from './Tooltip.style';

/**
 * Tooltip — a short label shown on hover or keyboard focus.
 *
 * @param {React.ReactNode} content - the tooltip text
 * @param {'top'|'bottom'|'left'|'right'} placement
 * @param {number} delay - milliseconds before it appears on hover
 *
 * Shows on focus as well as hover, and hides on Escape, so it is reachable
 * by keyboard rather than mouse-only.
 */
export default function Tooltip({
  content,
  placement = 'top',
  delay = 150,
  children,
  className,
}) {
  const [visible, setVisible] = useState(false);
  const timeoutRef = useRef(null);
  const tooltipId = useId();
  const bubbleRef = useRevealMotion({ distance: 'tooltip', active: visible });

  const show = (immediate = false) => {
    window.clearTimeout(timeoutRef.current);

    if (immediate || delay === 0) {
      setVisible(true);
      return;
    }
    timeoutRef.current = window.setTimeout(() => setVisible(true), delay);
  };

  const hide = () => {
    window.clearTimeout(timeoutRef.current);
    setVisible(false);
  };

  // Never leave a pending timer behind on unmount
  useEffect(() => () => window.clearTimeout(timeoutRef.current), []);

  const handleKeyDown = (event) => {
    if (event.key === 'Escape') hide();
  };

  if (!content) return children;

  return (
    <TooltipWrapper
      className={className}
      onMouseEnter={() => show()}
      onMouseLeave={hide}
      /* focus appears immediately — a keyboard user has already committed */
      onFocus={() => show(true)}
      onBlur={hide}
      onKeyDown={handleKeyDown}
      aria-describedby={visible ? tooltipId : undefined}
    >
      {children}
      {visible && (
        <TooltipAnchor $placement={placement}>
          <Bubble ref={bubbleRef} id={tooltipId} role="tooltip">
            {content}
          </Bubble>
        </TooltipAnchor>
      )}
    </TooltipWrapper>
  );
}
