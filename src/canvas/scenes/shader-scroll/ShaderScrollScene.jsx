'use client';

import { useRef, useState, useEffect, useMemo, useCallback } from 'react';
import { Canvas, useThree } from '@react-three/fiber';
import * as THREE from 'three';
import { folder, useControls, Leva } from 'leva';
import { bezier } from '@leva-ui/plugin-bezier';
import Lenis from 'lenis';
import styled from 'styled-components';
import ScrollPlane from '@/canvas/components/scroll-plane';
import MediaPlanesLab from '@/canvas/components/media-planes-lab';
import MosaicPlanesLab from '@/canvas/components/mosaic-planes-lab';
import CylinderImagesLab from '@/canvas/components/cylinder-images-lab';
import BurnCarousel from '@/canvas/components/burn-carousel';
import CubeLab from '@/canvas/components/cube-lab';
import { resolveCaptureScale, clampedDevicePixelRatio } from '@/canvas/helpers';

const CAMERA_POS = 600;
// Leva slider max. Effective scale is still clamped in resolveCaptureScale()
// to GL_MAX_TEXTURE_SIZE × page size (tall captures often can't reach 10).
const MAX_CAPTURE_SCALE = 10;
const calcFov = (camZ) =>
  2 * Math.atan(window.innerHeight / 2 / camZ) * (180 / Math.PI);

function CameraSetup() {
  const { camera } = useThree();

  useEffect(() => {
    const update = () => {
      camera.position.z = CAMERA_POS;
      camera.fov = calcFov(CAMERA_POS);
      camera.updateProjectionMatrix();
    };
    update();
    window.addEventListener('resize', update);
    return () => window.removeEventListener('resize', update);
  }, [camera]);

  return null;
}

const CanvasLayer = styled.div`
  position: fixed;
  inset: 0;
  /* behind = under DOM (media-planes hero overlay). front = over DOM images. */
  z-index: ${({ $stack }) => ($stack === 'behind' ? 0 : 2)};
  pointer-events: none;

  & > div,
  & canvas {
    pointer-events: none !important;
  }
`;

const Spacer = styled.div`
  position: relative;
  z-index: 1;
  pointer-events: none;
`;

/**
 * ShaderScroll lab shell.
 *
 * - `cylinder` — Architecture B: html2canvas full-page drum.
 * - `cylinder-images` — Architecture A + drum bend on `[data-canvas]` images only.
 * - `cylinder-horizontal` — Architecture A horizontal drum on a 20-image strip.
 * - `media-planes` — Architecture A: hover bulge / dispersion on images.
 * - `mosaic` — Architecture A: hover bulge + pixel mosaic cubes (no dispersion).
 * - `burn-carousel` — full-bleed slides with paper-burn wipe.
 * - `cube` — minimal white cube + lights (R3F hello-world).
 */
export default function ShaderScrollScene({
  children,
  cylinderContent,
  cylinderImagesContent,
  cylinderHorizontalContent,
  mediaPlanesContent,
  mosaicContent,
  burnCarouselContent,
  cubeContent,
  captureScale = 1,
  anisotropy = false,
  mipmaps = false,
  srgb = false,
  qualityControls = false,
}) {
  const scrollRef = useRef(0);
  const scrollVelocityRef = useRef(0);
  const contentRef = useRef(null);
  const lenisRef = useRef(null);
  const textureRef = useRef(null);
  const architectureRef = useRef('cylinder');
  const cubeScrollLengthRef = useRef(3);
  const [contentEl, setContentEl] = useState(null);
  const [texture, setTexture] = useState(null);
  const [contentRatio, setContentRatio] = useState(4);
  const [mounted, setMounted] = useState(false);

  const {
    architecture,
    curvature,
    curveStart,
    scrollSpeed,
    shading,
    imageCurvature,
    imageCurveStart,
    imageShading,
    hCurvature,
    hCurveStart,
    hShading,
    warpStrength,
    hoverBrighten,
    dispersion,
    followSpeed,
    mosaicWarp,
    mosaicBrighten,
    mosaicFollow,
    pixelCount,
    mosaicRadius,
    cubeDepth,
    burnSpeed,
    burnNoiseScale,
    burnNoiseStrength,
    burnEdgeWidth,
    burnEdgeSharpness,
    burnEmber,
    burnEase,
    cubeLight,
    cubeAmbient,
    cubeRotate,
    cubeOrbitTurns,
    cubeOrbitRadius,
    cubeOrbitElevation,
    cubeScrollLength,
  } = useControls({
    architecture: {
      value: 'cylinder',
      options: {
        'Cylinder scroll (full page)': 'cylinder',
        'Cylinder on images': 'cylinder-images',
        'Cylinder horizontal (images)': 'cylinder-horizontal',
        'Media planes (hover)': 'media-planes',
        'Mosaic bulge (hover)': 'mosaic',
        'Burn carousel': 'burn-carousel',
        'Cube lab': 'cube',
      },
    },
    'Cylinder Scroll': folder(
      {
        curvature: { value: 160, min: 0, max: 400, step: 10 },
        curveStart: { value: 0.15, min: 0, max: 0.9, step: 0.01 },
        scrollSpeed: { value: 1.0, min: 0.5, max: 2.0, step: 0.1 },
        shading: { value: 0.85, min: 0, max: 1, step: 0.05 },
      },
      { render: (get) => get('architecture') === 'cylinder' }
    ),
    'Cylinder on images': folder(
      {
        imageCurvature: {
          value: 55,
          min: 0,
          max: 160,
          step: 1,
          label: 'curvature',
        },
        imageCurveStart: {
          value: 0.15,
          min: 0,
          max: 0.9,
          step: 0.01,
          label: 'curveStart',
        },
        imageShading: {
          value: 0.55,
          min: 0,
          max: 1,
          step: 0.05,
          label: 'shading',
        },
      },
      { render: (get) => get('architecture') === 'cylinder-images' }
    ),
    'Cylinder horizontal': folder(
      {
        hCurvature: {
          value: 70,
          min: 0,
          max: 200,
          step: 1,
          label: 'curvature',
        },
        hCurveStart: {
          value: 0.15,
          min: 0,
          max: 0.9,
          step: 0.01,
          label: 'curveStart',
        },
        hShading: {
          value: 0.55,
          min: 0,
          max: 1,
          step: 0.05,
          label: 'shading',
        },
      },
      { render: (get) => get('architecture') === 'cylinder-horizontal' }
    ),
    'Media Planes': folder(
      {
        warpStrength: { value: 1, min: 0, max: 2, step: 0.05 },
        hoverBrighten: { value: 0, min: 0, max: 0.4, step: 0.01 },
        dispersion: { value: 0, min: 0, max: 2, step: 0.05 },
        followSpeed: {
          value: 0.1,
          min: 0.02,
          max: 1,
          step: 0.01,
          label: 'followSpeed (lower = more lag)',
        },
      },
      { render: (get) => get('architecture') === 'media-planes' }
    ),
    'Mosaic Bulge': folder(
      {
        mosaicWarp: {
          value: 1,
          min: 0,
          max: 2,
          step: 0.05,
          label: 'warpStrength',
        },
        mosaicBrighten: {
          value: 0,
          min: 0,
          max: 0.4,
          step: 0.01,
          label: 'hoverBrighten',
        },
        mosaicFollow: {
          value: 0.1,
          min: 0.005,
          max: 1,
          step: 0.005,
          label: 'followSpeed (lower = more lag)',
        },
        pixelCount: {
          value: 64,
          min: 12,
          max: 500,
          step: 1,
          label: 'pixelCount (higher = smaller tiles)',
        },
        mosaicRadius: {
          value: 0.35,
          min: 0.08,
          max: 0.8,
          step: 0.01,
          label: 'mosaicRadius',
        },
        cubeDepth: {
          value: 36,
          min: 0,
          max: 120,
          step: 1,
          label: 'cubeDepth (toward camera)',
        },
      },
      { render: (get) => get('architecture') === 'mosaic' }
    ),
    'Burn Carousel': folder(
      {
        burnSpeed: {
          value: 1,
          min: 0.25,
          max: 2.5,
          step: 0.05,
          label: 'burnSpeed',
        },
        burnNoiseScale: {
          value: 4.5,
          min: 1.5,
          max: 10,
          step: 0.1,
          label: 'noiseScale',
        },
        burnNoiseStrength: {
          value: 0.55,
          min: 0.15,
          max: 0.9,
          step: 0.01,
          label: 'noiseStrength',
        },
        burnEdgeWidth: {
          value: 0.03,
          min: 0.005,
          max: 0.18,
          step: 0.005,
          label: 'edgeWidth',
        },
        burnEdgeSharpness: {
          value: 5,
          min: 1,
          max: 12,
          step: 0.25,
          label: 'edgeSharpness',
        },
        burnEmber: {
          value: 0,
          min: 0,
          max: 2.5,
          step: 0.05,
          label: 'shaderEmber (optional)',
        },
      },
      { render: (get) => get('architecture') === 'burn-carousel' }
    ),
    // Sibling folder (not nested): nested bezier was losing `.evaluate` / not
    // updating reliably, so easing looked like a no-op.
    'Burn Easing': folder(
      {
        burnEase: bezier({
          handles: 'in-out-cubic',
          graph: true,
        }),
      },
      { render: (get) => get('architecture') === 'burn-carousel' }
    ),
    'Cube lab': folder(
      {
        cubeLight: {
          value: 1.2,
          min: 0,
          max: 3,
          step: 0.05,
          label: 'directionalLight',
        },
        cubeAmbient: {
          value: 0.45,
          min: 0,
          max: 1.5,
          step: 0.05,
          label: 'ambientLight',
        },
        cubeRotate: {
          value: false,
          label: 'autoRotate (cube)',
        },
        cubeOrbitTurns: {
          value: 1,
          min: 0.25,
          max: 3,
          step: 0.25,
          label: 'orbitTurns (scroll)',
        },
        cubeOrbitRadius: {
          value: 600,
          min: 300,
          max: 1200,
          step: 10,
          label: 'orbitRadius',
        },
        cubeOrbitElevation: {
          value: 80,
          min: -200,
          max: 400,
          step: 10,
          label: 'orbitElevation',
        },
        cubeScrollLength: {
          value: 3,
          min: 1,
          max: 8,
          step: 0.5,
          label: 'scrollLength (vh×)',
        },
      },
      { render: (get) => get('architecture') === 'cube' }
    ),
  });

  const isFullPageCylinder = architecture === 'cylinder';
  const isCylinderImages = architecture === 'cylinder-images';
  const isCylinderHorizontal = architecture === 'cylinder-horizontal';
  const isMediaPlanes = architecture === 'media-planes';
  const isMosaic = architecture === 'mosaic';
  const isBurnCarousel = architecture === 'burn-carousel';
  const isCubeLab = architecture === 'cube';
  const isDomOverlay =
    isCylinderImages ||
    isCylinderHorizontal ||
    isMediaPlanes ||
    isMosaic ||
    isBurnCarousel ||
    isCubeLab;
  // Behind: media-planes / cube (DOM scrolls over). Front: photos / burn.
  // Burn controls portal to document.body above the canvas.
  const canvasStack = isMediaPlanes || isCubeLab ? 'behind' : 'front';

  architectureRef.current = architecture;
  cubeScrollLengthRef.current = cubeScrollLength;

  const cylinderNode = cylinderContent ?? children;
  const cylinderImagesNode = cylinderImagesContent ?? children;
  const cylinderHorizontalNode = cylinderHorizontalContent ?? children;
  const mediaNode = mediaPlanesContent ?? children;
  const mosaicNode = mosaicContent ?? mediaPlanesContent ?? children;
  const burnNode = burnCarouselContent ?? children;
  const cubeNode = cubeContent ?? null;

  const activeContent = isCubeLab
    ? cubeNode
    : isBurnCarousel
      ? burnNode
      : isMosaic
        ? mosaicNode
        : isMediaPlanes
          ? mediaNode
          : isCylinderHorizontal
            ? cylinderHorizontalNode
            : isCylinderImages
              ? cylinderImagesNode
              : cylinderNode;

  const [initialCaptureScale] = useState(() =>
    captureScale === 'device'
      ? clampedDevicePixelRatio(MAX_CAPTURE_SCALE)
      : captureScale
  );

  const qualitySchema = useMemo(
    () =>
      qualityControls
        ? {
            captureScale: {
              value: initialCaptureScale,
              min: 1,
              max: MAX_CAPTURE_SCALE,
              step: 1,
              render: (get) => get('architecture') === 'cylinder',
            },
            anisotropy: {
              value: anisotropy,
              render: (get) => get('architecture') === 'cylinder',
            },
            mipmaps: {
              value: mipmaps,
              render: (get) => get('architecture') === 'cylinder',
            },
            srgb: {
              value: srgb,
              render: (get) => get('architecture') === 'cylinder',
            },
          }
        : {},
    [qualityControls, initialCaptureScale, anisotropy, mipmaps, srgb]
  );

  const quality = useControls('Texture Quality', qualitySchema);

  const activeCaptureScale = quality.captureScale ?? initialCaptureScale;
  const activeAnisotropy = quality.anisotropy ?? anisotropy;
  const activeMipmaps = quality.mipmaps ?? mipmaps;
  const activeSrgb = quality.srgb ?? srgb;

  const setContentNode = useCallback((node) => {
    contentRef.current = node;
    setContentEl(node);
  }, []);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    if (!mounted) return undefined;

    // Horizontal mode needs the gallery DOM; wait until contentEl exists.
    if (isCylinderHorizontal && !contentEl) return undefined;

    let wrapper;
    let content;
    if (isCylinderHorizontal) {
      wrapper = contentEl.querySelector('[data-horizontal-scroll]');
      content = contentEl.querySelector('[data-horizontal-scroll-content]');
      if (!wrapper || !content) return undefined;
    }

    const lenis = new Lenis({
      lerp: 0.1,
      smoothWheel: true,
      ...(isCylinderHorizontal
        ? {
            wrapper,
            content,
            orientation: 'horizontal',
            // Vertical wheel / trackpad still drives the sideways strip.
            gestureOrientation: 'vertical',
            // Listen on window so wheel works through the fixed WebGL layer
            // (canvas uses pointer-events: none).
            eventsTarget: typeof window !== 'undefined' ? window : wrapper,
          }
        : {
            orientation: 'vertical',
            gestureOrientation: 'vertical',
          }),
    });
    lenisRef.current = lenis;

    const onScroll = () => {
      scrollVelocityRef.current = lenis.velocity;

      if (architectureRef.current === 'cube') {
        const orbitPx = window.innerHeight * cubeScrollLengthRef.current;
        scrollRef.current =
          orbitPx > 0 ? Math.min(1, window.scrollY / orbitPx) : 1;
        return;
      }

      if (architectureRef.current === 'cylinder-horizontal' && wrapper) {
        const max = wrapper.scrollWidth - wrapper.clientWidth;
        if (max > 0) scrollRef.current = wrapper.scrollLeft / max;
        return;
      }

      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (max > 0) scrollRef.current = window.scrollY / max;
    };

    lenis.on('scroll', onScroll);

    let rafId;
    const raf = (time) => {
      lenis.raf(time);
      rafId = requestAnimationFrame(raf);
    };
    rafId = requestAnimationFrame(raf);

    // Recalc after layout / late image decode.
    const resizeTwice = () => {
      lenis.resize();
      onScroll();
    };
    const rafResize = requestAnimationFrame(resizeTwice);
    const timeoutResize = window.setTimeout(resizeTwice, 400);

    return () => {
      cancelAnimationFrame(rafId);
      cancelAnimationFrame(rafResize);
      window.clearTimeout(timeoutResize);
      lenisRef.current = null;
      lenis.destroy();
    };
  }, [mounted, isCylinderHorizontal, contentEl]);

  // Keep the document itself from fighting the inner horizontal scroller.
  useEffect(() => {
    if (!isCylinderHorizontal) return undefined;

    const html = document.documentElement;
    const body = document.body;
    const prev = {
      htmlOverflowX: html.style.overflowX,
      htmlOverflowY: html.style.overflowY,
      bodyOverflowX: body.style.overflowX,
      bodyOverflowY: body.style.overflowY,
    };

    html.style.overflowX = 'hidden';
    html.style.overflowY = 'hidden';
    body.style.overflowX = 'hidden';
    body.style.overflowY = 'hidden';
    window.scrollTo(0, 0);

    return () => {
      html.style.overflowX = prev.htmlOverflowX;
      html.style.overflowY = prev.htmlOverflowY;
      body.style.overflowX = prev.bodyOverflowX;
      body.style.overflowY = prev.bodyOverflowY;
    };
  }, [isCylinderHorizontal]);

  // Lenis caches document height. When we swap architectures or images finish
  // loading, the page grows but scroll would stop short unless we resize.
  useEffect(() => {
    const lenis = lenisRef.current;
    if (!lenis || !contentEl) return undefined;

    const refreshScrollBounds = () => {
      lenis.resize();
    };

    refreshScrollBounds();

    const observer = new ResizeObserver(refreshScrollBounds);
    observer.observe(contentEl);

    const images = Array.from(contentEl.querySelectorAll('img'));
    images.forEach((img) => {
      img.addEventListener('load', refreshScrollBounds);
      img.addEventListener('error', refreshScrollBounds);
    });

    window.addEventListener('resize', refreshScrollBounds);

    // One more pass after layout/paint (fonts, late image decode).
    const rafId = requestAnimationFrame(refreshScrollBounds);
    const timeoutId = window.setTimeout(refreshScrollBounds, 400);

    return () => {
      cancelAnimationFrame(rafId);
      window.clearTimeout(timeoutId);
      observer.disconnect();
      images.forEach((img) => {
        img.removeEventListener('load', refreshScrollBounds);
        img.removeEventListener('error', refreshScrollBounds);
      });
      window.removeEventListener('resize', refreshScrollBounds);
    };
  }, [contentEl, architecture]);

  // Cube lab spacer lives outside the content node — refresh Lenis when it changes.
  useEffect(() => {
    if (!isCubeLab) return;
    const id = requestAnimationFrame(() => {
      lenisRef.current?.resize();
    });
    scrollRef.current = 0;
    window.scrollTo(0, 0);
    return () => cancelAnimationFrame(id);
  }, [isCubeLab, cubeScrollLength]);

  const capture = useCallback(async () => {
    if (!contentRef.current || !isFullPageCylinder) return;
    const el = contentRef.current;

    const images = el.querySelectorAll('img');
    await Promise.all(
      Array.from(images).map((img) =>
        img.complete
          ? Promise.resolve()
          : new Promise((r) => {
              img.onload = r;
              img.onerror = r;
            })
      )
    );
    await new Promise((r) => setTimeout(r, 300));

    const contentHeight = el.scrollHeight;

    const { scale, maxTextureSize, clamped } = resolveCaptureScale({
      requested: activeCaptureScale,
      width: el.scrollWidth,
      height: contentHeight,
    });

    const html2canvas = (await import('html2canvas')).default;
    const canvas = await html2canvas(el, {
      backgroundColor: '#ffffff',
      scale,
      useCORS: true,
      logging: false,
    });

    if (process.env.NODE_ENV === 'development') {
      window.__captureCanvas = canvas;
      window.__shaderScrollStats = {
        requestedScale: activeCaptureScale,
        appliedScale: scale,
        clampedToTextureLimit: clamped,
        maxTextureSize,
        cssSize: [el.scrollWidth, contentHeight],
        textureSize: [canvas.width, canvas.height],
        approxTextureBytes: canvas.width * canvas.height * 4,
      };
      console.info('[ShaderScrollScene] capture', window.__shaderScrollStats);
    }

    const tex = new THREE.CanvasTexture(canvas);
    tex.needsUpdate = true;

    textureRef.current?.dispose();
    textureRef.current = tex;

    setContentRatio(contentHeight / window.innerHeight);
    setTexture(tex);
  }, [activeCaptureScale, isFullPageCylinder]);

  useEffect(() => {
    if (!mounted) return undefined;

    if (!isFullPageCylinder) {
      textureRef.current?.dispose();
      textureRef.current = null;
      setTexture(null);
      return undefined;
    }

    capture();
    return undefined;
  }, [mounted, capture, isFullPageCylinder]);

  useEffect(
    () => () => {
      textureRef.current?.dispose();
    },
    []
  );

  if (!mounted) return null;

  return (
    <>
      <Leva collapsed={false} />

      <div
        ref={setContentNode}
        style={
          isDomOverlay
            ? {
                position: 'relative',
                zIndex: 1,
                width: '100%',
                minHeight: isCylinderHorizontal ? '100vh' : undefined,
                background:
                  isMediaPlanes ||
                  isMosaic ||
                  isBurnCarousel ||
                  isCubeLab ||
                  isCylinderHorizontal
                    ? 'transparent'
                    : '#ffffff',
              }
            : {
                position: 'absolute',
                left: 0,
                top: 0,
                width: '100%',
                zIndex: -1,
                pointerEvents: 'none',
              }
        }
      >
        {isCubeLab && (
          // Sticky full-viewport stage: orbit scrub finishes before the article
          // can enter the frame (parent = scrub distance + 100vh).
          <div
            aria-hidden
            data-cube-orbit
            style={{
              height: `calc(${cubeScrollLength * 100}vh + 100vh)`,
              width: '100%',
              pointerEvents: 'none',
            }}
          >
            <div
              style={{
                position: 'sticky',
                top: 0,
                height: '100vh',
                width: '100%',
              }}
            />
          </div>
        )}
        {activeContent}
      </div>

      <CanvasLayer $stack={canvasStack}>
        <Canvas
          key={architecture}
          dpr={[1, 2]}
          gl={{
            antialias: true,
            alpha: isDomOverlay && !isCubeLab,
            powerPreference: 'high-performance',
          }}
          camera={{ near: 10, far: 2000, position: [0, 0, CAMERA_POS] }}
          onCreated={({ gl, camera }) => {
            if (isCubeLab) {
              gl.setClearColor('#1a1a1a', 1);
            } else if (isDomOverlay) {
              gl.setClearColor(0x000000, 0);
            } else {
              gl.setClearColor('#111111');
            }
            camera.fov = calcFov(CAMERA_POS);
            camera.updateProjectionMatrix();
          }}
        >
          {!isCubeLab && <CameraSetup />}
          {isCubeLab && (
            <CubeLab
              scrollProgressRef={scrollRef}
              lightIntensity={cubeLight}
              ambientIntensity={cubeAmbient}
              autoRotate={cubeRotate}
              orbitRadius={cubeOrbitRadius}
              orbitTurns={cubeOrbitTurns}
              orbitElevation={cubeOrbitElevation}
            />
          )}
          {isMediaPlanes && (
            <MediaPlanesLab
              root={contentEl}
              warpStrength={warpStrength}
              hoverBrighten={hoverBrighten}
              dispersion={dispersion}
              followSpeed={followSpeed}
            />
          )}
          {isMosaic && (
            <MosaicPlanesLab
              root={contentEl}
              warpStrength={mosaicWarp}
              hoverBrighten={mosaicBrighten}
              followSpeed={mosaicFollow}
              pixelCount={pixelCount}
              mosaicRadius={mosaicRadius}
              cubeDepth={cubeDepth}
            />
          )}
          {isBurnCarousel && (
            <BurnCarousel
              burnSpeed={burnSpeed}
              noiseScale={burnNoiseScale}
              noiseStrength={burnNoiseStrength}
              edgeWidth={burnEdgeWidth}
              edgeSharpness={burnEdgeSharpness}
              ember={burnEmber}
              easeCurve={burnEase ?? [0.65, 0.05, 0.36, 1]}
            />
          )}
          {isCylinderImages && (
            <CylinderImagesLab
              root={contentEl}
              curvature={imageCurvature}
              curveStart={imageCurveStart}
              shading={imageShading}
            />
          )}
          {isCylinderHorizontal && (
            <CylinderImagesLab
              root={contentEl}
              curvature={hCurvature}
              curveStart={hCurveStart}
              shading={hShading}
              horizontal
            />
          )}
          {isFullPageCylinder && texture && (
            <ScrollPlane
              texture={texture}
              scrollProgressRef={scrollRef}
              contentRatio={contentRatio}
              curvature={curvature}
              curveStart={curveStart}
              scrollSpeed={scrollSpeed}
              shading={shading}
              anisotropy={activeAnisotropy}
              mipmaps={activeMipmaps}
              srgb={activeSrgb}
            />
          )}
        </Canvas>
      </CanvasLayer>

      {isFullPageCylinder && (
        <Spacer style={{ height: `${contentRatio * 100}vh` }} />
      )}
    </>
  );
}
