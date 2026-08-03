'use client';

import { useEffect, useState } from 'react';
import { createPortal } from 'react-dom';
import {
  MediaPage,
  HeroStage,
  CarouselControls,
  CarouselButton,
  CarouselDots,
  CarouselDot,
} from './ShaderTest.style';

/** Full-bleed burn carousel shell; controls portal above the WebGL canvas. */
export default function ShaderTestBurnCarousel() {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const controls = (
    <CarouselControls>
      <CarouselButton type="button" data-carousel="prev" aria-label="Previous slide">
        Prev
      </CarouselButton>
      <CarouselDots>
        <CarouselDot type="button" data-carousel-to="0" aria-label="Slide 1" />
        <CarouselDot type="button" data-carousel-to="1" aria-label="Slide 2" />
        <CarouselDot type="button" data-carousel-to="2" aria-label="Slide 3" />
      </CarouselDots>
      <CarouselButton type="button" data-carousel="next" aria-label="Next slide">
        Next
      </CarouselButton>
    </CarouselControls>
  );

  return (
    <MediaPage>
      <HeroStage />
      {mounted ? createPortal(controls, document.body) : null}
    </MediaPage>
  );
}
