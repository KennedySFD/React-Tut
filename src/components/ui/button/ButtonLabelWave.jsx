'use client';

import { useEffect, useRef } from 'react';
import gsap, { prefersReducedMotion } from '@/lib/gsap';
import { gesture, textWave } from '@/theme/motion';
import styles from './Button.module.scss';

/**
 * The label's own gesture: on hover each character lifts in turn, so the word
 * ripples left to right rather than moving as one block.
 *
 * It runs on the same hover and release gestures as the surface it sits on —
 * only the stagger is new — so the text arrives with the lift rather than
 * reading as a second, separate animation.
 *
 * The split is visual only. Assistive technology reads the intact string from
 * `LabelText` and never sees the per-character spans, which some screen
 * readers would otherwise announce one letter at a time.
 */
export default function ButtonLabelWave({ text, hostRef }) {
  const charsRef = useRef([]);

  useEffect(() => {
    const host = hostRef?.current;
    const chars = charsRef.current.filter(Boolean);
    if (!host || chars.length === 0 || prefersReducedMotion()) return undefined;

    const enter = () => {
      gsap.to(chars, {
        y: textWave.lift,
        duration: gesture.hover.duration,
        ease: gesture.hover.ease,
        stagger: textWave.each,
      });
    };

    const leave = () => {
      gsap.to(chars, {
        y: 0,
        duration: gesture.release.duration,
        ease: gesture.release.ease,
        stagger: textWave.each,
      });
    };

    host.addEventListener('pointerenter', enter);
    host.addEventListener('pointerleave', leave);

    return () => {
      host.removeEventListener('pointerenter', enter);
      host.removeEventListener('pointerleave', leave);
      gsap.killTweensOf(chars);
      gsap.set(chars, { y: 0 });
    };
  }, [hostRef, text]);

  return (
    <>
      <span className={styles.labelText}>{text}</span>
      <span aria-hidden="true">
        {Array.from(text).map((character, index) => (
          <span
            // The string is the identity here; characters repeat, so index is
            // the only stable key and the list is never reordered.
            key={`${character}-${index}`}
            className={styles.labelChar}
            ref={(node) => {
              charsRef.current[index] = node;
            }}
          >
            {character}
          </span>
        ))}
      </span>
    </>
  );
}
