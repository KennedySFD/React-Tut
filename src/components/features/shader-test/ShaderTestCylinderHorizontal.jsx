'use client';

import styled from 'styled-components';

/** Stable Unsplash set — 20 shots for a filmstrip row (no copy). */
const IMAGE_URLS = [
  'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=900&q=80',
  'https://images.unsplash.com/photo-1480714378408-67cf0d13bc1b?w=900&q=80',
  'https://images.unsplash.com/photo-1477959858617-67f85cf4f1df?w=900&q=80',
  'https://images.unsplash.com/photo-1469474968028-56623f02e42e?w=900&q=80',
  'https://images.unsplash.com/photo-1506905925346-21bda4d32df4?w=900&q=80',
  'https://images.unsplash.com/photo-1519681393784-d120267933ba?w=900&q=80',
  'https://images.unsplash.com/photo-1501785888041-af3ef285b470?w=900&q=80',
  'https://images.unsplash.com/photo-1470071459604-3b5ec3a7fe05?w=900&q=80',
  'https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=900&q=80',
  'https://images.unsplash.com/photo-1518837695005-2083093ee35b?w=900&q=80',
  'https://images.unsplash.com/photo-1507525428034-b723cf961d3e?w=900&q=80',
  'https://images.unsplash.com/photo-1476514525535-07fb3b4ae5f1?w=900&q=80',
  'https://images.unsplash.com/photo-1493246507139-91e8fad9978e?w=900&q=80',
  'https://images.unsplash.com/photo-1464822759023-fed622ff2c3b?w=900&q=80',
  'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?w=900&q=80',
  'https://images.unsplash.com/photo-1486325212027-8081e485255e?w=900&q=80',
  'https://images.unsplash.com/photo-1496568816309-51d7c20e3b21?w=900&q=80',
  'https://images.unsplash.com/photo-1514565131-fce0801e5785?w=900&q=80',
  'https://images.unsplash.com/photo-1528164344705-47542687000d?w=900&q=80',
  'https://images.unsplash.com/photo-1505765050516-f72dcac9c60e?w=900&q=80',
];

/**
 * Horizontal cylinder lab — images only.
 * Own overflow scroller (data attrs) so Lenis can drive X without fighting
 * document `max-width: 100vw` / `overflow-x: hidden`.
 */
export default function ShaderTestCylinderHorizontal() {
  return (
    <Viewport data-horizontal-scroll>
      <Strip data-horizontal-scroll-content>
        {IMAGE_URLS.map((src, index) => (
          <Shot
            key={`${index}-${src}`}
            data-canvas
            crossOrigin="anonymous"
            src={src}
            alt=""
            loading={index < 4 ? 'eager' : 'lazy'}
          />
        ))}
      </Strip>
    </Viewport>
  );
}

const Viewport = styled.div`
  width: 100%;
  height: 100vh;
  overflow-x: auto;
  overflow-y: hidden;
  overscroll-behavior: none;
  touch-action: pan-x;
  background: #0b0b0b;
  /* Hide native bar; Lenis smooths wheel. */
  scrollbar-width: none;
  &::-webkit-scrollbar {
    display: none;
  }
`;

const Strip = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  gap: clamp(0.75rem, 1.5vw, 1.5rem);
  box-sizing: border-box;
  width: max-content;
  min-height: 100%;
  padding: 0 clamp(8vw, 12vw, 16vw);
`;

const Shot = styled.img`
  flex: 0 0 auto;
  height: min(72vh, 680px);
  width: auto;
  aspect-ratio: 3 / 4;
  object-fit: cover;
  display: block;
  background: #1a1a1a;
`;
