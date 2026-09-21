'use client';

import {
  MediaPage,
  HeroStage,
  FullBleedHero,
  HeroOverlay,
  Title,
  Body,
} from './ShaderTest.style';

/** Architecture A lab: 100vh hero with DOM copy overlaid on a tracked plane. */
export default function ShaderTestMediaPlanes() {
  return (
    <MediaPage>
      <HeroStage>
        <FullBleedHero
          data-canvas
          crossOrigin="anonymous"
          src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=2400&q=80"
          alt="Abstract mathematical wireframe forms"
        />

        <HeroOverlay>
          <Title>Why separate the copy?</Title>
          <Body>
            If type lived inside the texture, hover warps and chromatic split
            would smear the letters. Keeping the headline and body in the DOM
            means they stay sharp and selectable while the plane underneath does
            the shader work.
          </Body>
        </HeroOverlay>
      </HeroStage>
    </MediaPage>
  );
}
