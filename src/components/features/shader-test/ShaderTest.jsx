'use client';

import {
  Page,
  Title,
  Meta,
  LabNote,
  HeroImage,
  Body,
  Subheading,
  InlineImage,
  Divider,
} from './ShaderTest.style';

/** Architecture B lab: full-page html2canvas cylinder scroll article. */
export default function ShaderTest() {
  return (
    <Page>
      <Title>The Future of Scroll Experiences</Title>
      <Meta>Published 31 July 2026 — 5 min read</Meta>

      <LabNote>
        Full-page cylinder (Architecture B): the whole article is captured into
        a texture and bent. Compare with <strong>Cylinder on images</strong> in
        Leva — same drum idea, but only photos bend and this text stays HTML.
      </LabNote>

      <HeroImage
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
        alt="Abstract digital landscape"
      />

      <Body>
        The way we consume content on the web is evolving. Traditional scrolling
        — where content moves linearly up and down — has remained largely
        unchanged since the early days of the internet. But what if scrolling
        could feel more physical, more immersive?
      </Body>

      <Body>
        WebGL shaders open up a world of possibilities for transforming how
        content enters and exits the viewport. Instead of flat, static pages, we
        can create experiences where content curves, folds, and flows like paper
        wrapped around a drum.
      </Body>

      <Subheading>What Are Shaders?</Subheading>

      <Body>
        Shaders are small programs that run on the GPU. They process every pixel
        on screen, every frame — typically 60 times per second. Unlike CSS
        animations, which are limited to transforms and opacity, shaders can
        distort geometry, blend textures, and simulate physical materials in
        real-time.
      </Body>

      <Body>
        There are two types: vertex shaders, which manipulate the position of
        points in 3D space, and fragment shaders, which determine the colour of
        each pixel. Together, they give you complete control over how content is
        rendered.
      </Body>

      <InlineImage
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80"
        alt="Abstract gradient mesh"
      />

      <Subheading>The Cylinder Scroll Effect</Subheading>

      <Body>
        One of the most compelling shader-driven interactions is the cylinder
        scroll. Content is mapped onto a curved surface — imagine wrapping a
        webpage around a wheel. As the user scrolls, content rotates in from one
        edge, sits flat and readable in the centre, then curves away on the
        opposite side.
      </Body>

      <Body>
        This creates a sense of physicality that flat scrolling simply cannot
        achieve. The user feels as though they are turning a page or spinning a
        carousel, rather than sliding a flat panel up and down.
      </Body>

      <Divider />

      <Subheading>The Canvas Approach</Subheading>

      <Body>
        To achieve this effect on the web, the entire page content is rendered
        into a WebGL canvas element. The HTML is captured as a texture, applied
        to a subdivided mesh, and a vertex shader bends the geometry based on
        scroll position. Libraries like Three.js and React Three Fiber make this
        accessible to frontend developers.
      </Body>

      <InlineImage
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
        alt="3D wireframe mesh"
      />

      <Subheading>Trade-offs and Considerations</Subheading>

      <Body>
        Once content lives inside a canvas, it is no longer native HTML. Text
        becomes unselectable, links require raycasting to detect clicks, and
        screen readers cannot parse the content. Hybrid approaches — where real
        HTML overlays the canvas for interactive elements — mitigate these issues
        but add complexity.
      </Body>

      <Body>
        Performance is another factor. Rendering an entire page through WebGL is
        GPU-intensive. Mobile devices, in particular, may struggle with complex
        shader effects at 60fps. Progressive enhancement — serving the shader
        experience only to capable devices — is considered best practice.
      </Body>

      <Divider />

      <Subheading>Looking Ahead</Subheading>

      <Body>
        As GPUs become more powerful and WebGPU matures as a successor to WebGL,
        shader-driven scroll experiences will become more accessible and
        performant. The line between a website and an interactive 3D environment
        will continue to blur — and the scroll will never be the same again.
      </Body>
    </Page>
  );
}
