'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { useTheme } from '@/theme/ThemeProvider';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture } from '@/theme/motion';
import { createButtonGlowRenderer } from '@/canvas/renderers/buttonGlowRenderer';
import styles from './Button.module.scss';

/** Long enough for the release tween and a ripple already in flight to finish. */
const TEARDOWN_DELAY_MS =
  (gesture.release.duration + gesture.sheen.duration) * 1000 + 120;

/**
 * The WebGL layer of the interactive treatment.
 *
 * It sits in the same stack as the keyline and the sheen — `z-index: -1`
 * inside the control's isolation context — so it paints over the variant
 * colour and under the label, and the label stays real text.
 *
 * Nothing here invents a duration: hover, release and the press ripple all
 * run on the gesture tokens, so this moves in time with the lift and the
 * sheen it sits beneath. The surface is only alive while the control is being
 * touched, so a page of buttons never holds a page of GL contexts.
 */
export default function ButtonGlowLayer({ hostRef, glow = 0.55 }) {
  const theme = useTheme();
  const [live, setLive] = useState(false);
  const canvasRef = useRef(null);
  const rendererRef = useRef(null);
  const stateRef = useRef({ hover: 0, press: 0, x: 0.5, y: 0.5 });
  const teardownRef = useRef(null);

  const cancelTeardown = useCallback(() => {
    if (teardownRef.current) {
      clearTimeout(teardownRef.current);
      teardownRef.current = null;
    }
  }, []);

  useEffect(() => {
    const host = hostRef?.current;
    if (!host || prefersReducedMotion()) return undefined;

    const state = stateRef.current;

    const readPointer = (event) => {
      const rect = host.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) return;
      state.x = (event.clientX - rect.left) / rect.width;
      state.y = 1 - (event.clientY - rect.top) / rect.height;
    };

    const onEnter = (event) => {
      cancelTeardown();
      readPointer(event);
      setLive(true);
      gsap.to(state, {
        hover: 1,
        duration: gesture.hover.duration,
        ease: gesture.hover.ease,
      });
    };

    const onMove = (event) => {
      readPointer(event);
    };

    const onLeave = () => {
      gsap.to(state, {
        hover: 0,
        duration: gesture.release.duration,
        ease: gesture.release.ease,
      });
      cancelTeardown();
      teardownRef.current = setTimeout(() => {
        state.press = 0;
        setLive(false);
      }, TEARDOWN_DELAY_MS);
    };

    const onDown = (event) => {
      readPointer(event);
      // One ring of light leaving the point of contact, on the sheen curve
      // the surface highlight already travels on.
      gsap.fromTo(
        state,
        { press: 0 },
        {
          press: 1,
          duration: gesture.sheen.duration,
          ease: gesture.sheen.ease,
          overwrite: true,
        }
      );
    };

    host.addEventListener('pointerenter', onEnter);
    host.addEventListener('pointermove', onMove);
    host.addEventListener('pointerleave', onLeave);
    host.addEventListener('pointerdown', onDown);

    return () => {
      host.removeEventListener('pointerenter', onEnter);
      host.removeEventListener('pointermove', onMove);
      host.removeEventListener('pointerleave', onLeave);
      host.removeEventListener('pointerdown', onDown);
      gsap.killTweensOf(state);
      cancelTeardown();
    };
  }, [hostRef, cancelTeardown]);

  // The GL context lives exactly as long as the canvas is on screen.
  useEffect(() => {
    const canvas = canvasRef.current;
    const host = hostRef?.current;
    if (!live || !canvas || !host) return undefined;

    const dispersion = theme.semantic.colors.dispersion;

    const renderer = createButtonGlowRenderer(canvas, {
      host,
      stateRef,
      tints: {
        a: dispersion.cyan,
        b: dispersion.violet,
        c: dispersion.rose,
      },
      glow,
    });

    if (!renderer) return undefined;

    rendererRef.current = renderer;
    renderer.start();

    return () => {
      rendererRef.current = null;
      renderer.destroy();
    };
  }, [live, hostRef, glow, theme]);

  useEffect(() => cancelTeardown, [cancelTeardown]);

  if (!live) return null;

  return (
    <span className={styles.glowSurface} aria-hidden>
      <canvas ref={canvasRef} className={styles.glowCanvas} />
    </span>
  );
}
