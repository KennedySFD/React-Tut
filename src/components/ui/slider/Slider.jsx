'use client';

import { useCallback, useRef } from 'react';
import { SliderRoot, LabelRow, SliderLabel, SliderValue, TrackWrap, Track, FilledTrack, Thumb } from './Slider.style';

/**
 * Slider
 *
 * A single-thumb range slider. Controlled via `value` + `onChange`.
 */
export default function Slider({
  value = 0,
  min = 0,
  max = 100,
  step = 1,
  label,
  showValue = true,
  disabled = false,
  onChange,
  ...props
}) {
  const trackRef = useRef(null);

  const pct = ((value - min) / (max - min)) * 100;

  const resolve = useCallback(
    (clientX) => {
      const rect = trackRef.current.getBoundingClientRect();
      const ratio = Math.min(Math.max((clientX - rect.left) / rect.width, 0), 1);
      const raw = min + ratio * (max - min);
      const stepped = Math.round(raw / step) * step;
      onChange?.(Math.min(Math.max(stepped, min), max));
    },
    [min, max, step, onChange],
  );

  const handlePointerDown = useCallback(
    (e) => {
      if (disabled) return;
      e.currentTarget.setPointerCapture(e.pointerId);
      resolve(e.clientX);
    },
    [disabled, resolve],
  );

  const handlePointerMove = useCallback(
    (e) => {
      if (disabled || !e.currentTarget.hasPointerCapture(e.pointerId)) return;
      resolve(e.clientX);
    },
    [disabled, resolve],
  );

  const handleKeyDown = useCallback(
    (e) => {
      if (disabled) return;
      let next = value;
      if (e.key === 'ArrowRight' || e.key === 'ArrowUp') next = Math.min(value + step, max);
      else if (e.key === 'ArrowLeft' || e.key === 'ArrowDown') next = Math.max(value - step, min);
      else if (e.key === 'Home') next = min;
      else if (e.key === 'End') next = max;
      else return;
      e.preventDefault();
      onChange?.(next);
    },
    [disabled, value, min, max, step, onChange],
  );

  return (
    <SliderRoot {...props}>
      {(label || showValue) && (
        <LabelRow>
          {label && <SliderLabel>{label}</SliderLabel>}
          {showValue && <SliderValue>{value}</SliderValue>}
        </LabelRow>
      )}
      <TrackWrap
        ref={trackRef}
        data-disabled={disabled || undefined}
        onPointerDown={handlePointerDown}
        onPointerMove={handlePointerMove}
      >
        <Track />
        <FilledTrack $pct={pct} />
        <Thumb
          $pct={pct}
          role="slider"
          tabIndex={disabled ? -1 : 0}
          aria-valuenow={value}
          aria-valuemin={min}
          aria-valuemax={max}
          aria-label={label || 'Slider'}
          onKeyDown={handleKeyDown}
        />
      </TrackWrap>
    </SliderRoot>
  );
}
