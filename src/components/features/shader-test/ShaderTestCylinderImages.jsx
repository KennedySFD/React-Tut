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

/**
 * Architecture A + cylinder bend: real DOM copy, drum warp only on images.
 * Compare with "Cylinder scroll" (full-page capture) in Leva.
 */
export default function ShaderTestCylinderImages() {
  return (
    <Page>
      <Title>Cylinder on images only</Title>
      <Meta>Architecture A — bend the photos, keep the type as HTML</Meta>

      <LabNote>
        Scroll this page. Select any paragraph — it stays crisp. Only images
        marked <code>data-canvas</code> get the drum bend. Compare with{' '}
        <strong>Cylinder scroll (full page)</strong> where the whole article
        becomes one soft bitmap.
      </LabNote>

      <HeroImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=1200&q=80"
        alt="Earth at night from space"
      />

      <Body>
        This paragraph is real DOM. It is not inside a WebGL texture, so you can
        highlight it, copy it, and screen readers can still announce it. The
        hero above is the part that curves — a tracked plane that follows the
        image’s box as you scroll.
      </Body>

      <Body>
        That split is the whole point of Architecture A: the page stays a normal
        document, and WebGL is reserved for media that benefits from a shader.
      </Body>

      <Subheading>What you are comparing</Subheading>

      <Body>
        Full-page cylinder scroll runs html2canvas over everything, then warps
        that screenshot on one big mesh. Headings, body copy, and photos all
        become pixels in one tall texture. The drum looks dramatic, but type
        goes soft and you lose native selection.
      </Body>

      <Body>
        This mode uses the same drum idea in the vertex shader — edges anchored,
        centre bulging toward the camera — but only on each photo plane. Scroll
        still moves the real page; the planes simply follow{' '}
        <code>getBoundingClientRect()</code>.
      </Body>

      <InlineImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1635070041078-e363dbe005cb?w=1200&q=80"
        alt="Abstract mathematical wireframe forms"
      />

      <Subheading>Why the text never warps</Subheading>

      <Body>
        Uniforms like curvature and shading are written only into the image
        materials. The title, meta line, and these paragraphs never see those
        numbers. If type lived inside the capture texture, every bend would smear
        the letters.
      </Body>

      <Body>
        Try selecting this sentence while an image above or below is clearly
        curved. That contrast is what you want to feel when you flip back to
        full-page cylinder in Leva.
      </Body>

      <InlineImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1558618666-fcd25c85f82e?w=1200&q=80"
        alt="Soft abstract gradient mesh"
      />

      <Subheading>How the pieces fit together</Subheading>

      <Body>
        In the feature folder you define the article and point images at URLs. In
        the canvas layer, a small lab finds every <code>[data-canvas]</code> node,
        hides the DOM bitmap, and mounts a bent plane with the same photo as a
        texture.
      </Body>

      <Body>
        The shader folder holds the recipe: a vertex program that shapes the
        drum, and a fragment program that samples the texture and darkens the
        curve so the form reads on bright pictures.
      </Body>

      <InlineImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?w=1200&q=80"
        alt="Abstract fluid colour field"
      />

      <Subheading>Tuning the bend</Subheading>

      <Body>
        Open Leva → <strong>Cylinder on images</strong>. Raise curvature to push
        the centre of each photo toward you. Curve start keeps a flatter band in
        the middle before the edges fall away. Shading controls how hard the
        darkening follows the bend.
      </Body>

      <Body>
        Because each image is its own mesh, tall heroes and shorter inline
        frames can share the same controls without capturing the paragraphs
        between them.
      </Body>

      <Divider />

      <InlineImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1614850523459-c2f4c699c52e?w=1200&q=80"
        alt="Layered abstract light streaks"
      />

      <Subheading>When to prefer this over full-page capture</Subheading>

      <Body>
        Prefer image-only bends for articles, case studies, and marketing pages
        where people still need to read, select, and tap links. Keep full-page
        capture for short experimental demos where the entire surface is meant
        to feel like one physical object.
      </Body>

      <Body>
        You can still combine ideas later — for example a bent hero image with
        DOM type overlaid, or hover dispersion on cards — without ever putting
        body copy through html2canvas.
      </Body>

      <InlineImage
        data-canvas
        crossOrigin="anonymous"
        src="https://images.unsplash.com/photo-1620641788421-7a1c342ea42e?w=1200&q=80"
        alt="Iridescent abstract 3D shapes"
      />

      <Subheading>A quick checklist while you scroll</Subheading>

      <Body>
        One: can you select this text? Two: do only the photos curve? Three:
        when you switch to full-page cylinder, does the same story suddenly feel
        softer and less “webpage-like”? If yes, the comparison landed.
      </Body>

      <Body>
        That is enough content to scroll several images through the viewport.
        Watch each photo pick up the drum as it enters, sit more readable near
        the middle, and fall away again as it leaves — while the copy around it
        stays ordinary HTML the whole time.
      </Body>
    </Page>
  );
}
