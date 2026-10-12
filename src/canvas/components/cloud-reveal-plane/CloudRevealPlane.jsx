'use client';

import { useEffect, useRef, useState } from 'react';
import { useFrame, extend } from '@react-three/fiber';
import * as THREE from 'three';
import CloudRevealMaterial, {
  TRAIL_LENGTH,
  DROP_COUNT,
} from '@/canvas/shaders/cloud-reveal';

extend({ CloudRevealMaterial });

// How often a cursor position is pushed into the trail. 16 samples at 24Hz
// ≈ 0.65s of path — long enough that a circling cursor leaves an arc.
const TRAIL_SAMPLE_INTERVAL = 1 / 24;
// The reveal should open promptly when you move again; only the disappear is
// meant to be slow, so fading in stays fixed and short.
const FADE_IN_TIME = 0.35;
// A pebble lands once the cursor has covered this much ground, so drops space
// themselves along the path instead of piling up under a twitching cursor.
const DROP_SPACING = 0.07;
const DROP_MIN_GAP = 0.05;
const DROP_LIFE = 2.6;
// Path length the trail spans at drag 1, in the shader's square space.
const TRAIL_MAX_LENGTH = 0.9;
// Cursor speed (uv/second) that earns the full trail length.
const SPEED_FOR_FULL_TRAIL = 1.2;

const loadTexture = (src) =>
  new Promise((resolve) => {
    const loader = new THREE.TextureLoader();
    loader.crossOrigin = 'anonymous';
    loader.load(
      src,
      (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.minFilter = THREE.LinearFilter;
        tex.magFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        resolve(tex);
      },
      undefined,
      () => resolve(null)
    );
  });

const textureAspect = (tex) => {
  const image = tex?.image;
  if (!image?.width || !image?.height) return 1;
  return image.width / image.height;
};

/**
 * Tracked plane that swaps one photo for another under the cursor through a
 * drifting cloud mask. `element` is the visible (top) image; the revealed
 * image comes from its `data-reveal-src` attribute.
 *
 * With `idleFade` on, the reveal closes again whenever the cursor rests, so
 * the top image goes solid until the next movement.
 */
export default function CloudRevealPlane({
  element,
  radius = 0.35,
  edgeSoftness = 0.12,
  cloudScale = 4.5,
  turbulence = 0.18,
  cloudSpeed = 0.6,
  detail = 0.6,
  edgeGlow = 0.15,
  drag = 0.55,
  trailTaper = 1.2,
  followSpeed = 0.12,
  ripple = 0.5,
  rippleScale = 38,
  rippleSpeed = 3,
  idleFade = true,
  idleDelay = 0.35,
  idleFadeTime = 2.5,
}) {
  const meshRef = useRef();
  const hoverRef = useRef(0);
  const insideRef = useRef(false);
  const lastMoveRef = useRef(0);
  const mouseTargetRef = useRef(new THREE.Vector2(0.5, 0.5));
  const mouseSmoothRef = useRef(new THREE.Vector2(0.5, 0.5));
  const dropsRef = useRef(
    Array.from({ length: DROP_COUNT }, () => ({
      x: 0,
      y: 0,
      age: 0,
      strength: 0,
    }))
  );
  const dropCursorRef = useRef(0);
  const prevSmoothRef = useRef(new THREE.Vector2(0.5, 0.5));
  const activityRef = useRef(0);
  const lastDropPosRef = useRef(new THREE.Vector2(0.5, 0.5));
  const dropGapRef = useRef(0);
  const sampleClockRef = useRef(0);
  const resetTrailRef = useRef(true);
  const timeRef = useRef(0);
  const [textures, setTextures] = useState(null);

  useEffect(() => {
    if (!element) return undefined;

    const srcA = element.currentSrc || element.src;
    const srcB = element.dataset.revealSrc;
    if (!srcA || !srcB) return undefined;

    let cancelled = false;

    Promise.all([loadTexture(srcA), loadTexture(srcB)]).then(([a, b]) => {
      if (cancelled || !a || !b) {
        a?.dispose();
        b?.dispose();
        return;
      }
      setTextures({ a, b, aspectA: textureAspect(a), aspectB: textureAspect(b) });
    });

    return () => {
      cancelled = true;
    };
  }, [element]);

  useEffect(
    () => () => {
      textures?.a.dispose();
      textures?.b.dispose();
    },
    [textures]
  );

  useEffect(() => {
    if (!element) return undefined;

    const previousOpacity = element.style.opacity;
    const previousTransition = element.style.transition;
    element.style.opacity = '0';
    element.style.transition = 'none';

    const onPointerMove = (event) => {
      const rect = element.getBoundingClientRect();
      if (rect.width <= 0 || rect.height <= 0) {
        insideRef.current = false;
        return;
      }

      const x = event.clientX;
      const y = event.clientY;
      const inside =
        x >= rect.left && x <= rect.right && y >= rect.top && y <= rect.bottom;

      const wasOutside = !insideRef.current;
      insideRef.current = inside;

      if (inside) {
        mouseTargetRef.current.set(
          (x - rect.left) / rect.width,
          1 - (y - rect.top) / rect.height
        );
        // pointermove only fires on actual movement, so its timestamp is the
        // idle clock the fade-when-idle option counts from.
        lastMoveRef.current = performance.now();
        // Snap on entry, otherwise the cloud slides in from wherever the
        // cursor left the plane last time — and the trail would draw a line
        // across the plane from that stale position.
        if (wasOutside) {
          mouseSmoothRef.current.copy(mouseTargetRef.current);
          resetTrailRef.current = true;
        }
      }
    };

    const onPointerLeaveWindow = () => {
      insideRef.current = false;
    };

    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('blur', onPointerLeaveWindow);

    return () => {
      element.style.opacity = previousOpacity;
      element.style.transition = previousTransition;
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('blur', onPointerLeaveWindow);
    };
  }, [element]);

  useFrame((_, delta) => {
    const mesh = meshRef.current;
    if (!mesh || !element) return;

    const rect = element.getBoundingClientRect();
    const width = Math.max(rect.width, 1);
    const height = Math.max(rect.height, 1);

    mesh.position.x = rect.left + width / 2 - window.innerWidth / 2;
    mesh.position.y = -(rect.top + height / 2 - window.innerHeight / 2);
    mesh.position.z = 0;
    mesh.scale.set(width, height, 1);

    const step = Math.min(delta, 0.1);
    timeRef.current += step;

    const idle =
      idleFade && performance.now() - lastMoveRef.current > idleDelay * 1000;
    const hoverTarget = insideRef.current && !idle ? 1 : 0;

    // Duration-based rather than a fixed lerp, so the disappear can be a long
    // calm fade while re-opening stays responsive.
    const fadeTime =
      hoverTarget > hoverRef.current
        ? FADE_IN_TIME
        : Math.max(idleFadeTime, 0.05);
    const travel = Math.sign(hoverTarget - hoverRef.current) * (step / fadeTime);
    hoverRef.current =
      Math.abs(hoverTarget - hoverRef.current) <= Math.abs(travel)
        ? hoverTarget
        : hoverRef.current + travel;
    const easedHover = THREE.MathUtils.smoothstep(hoverRef.current, 0, 1);

    // How far the smoothed cursor still trails the real one — a stand-in for
    // speed, used to weight how hard each pebble lands.
    const lagX = mouseTargetRef.current.x - mouseSmoothRef.current.x;
    const lagY = mouseTargetRef.current.y - mouseSmoothRef.current.y;
    const travelSpeed = Math.hypot(lagX, lagY);

    const speed = THREE.MathUtils.clamp(followSpeed, 0.005, 1);
    mouseSmoothRef.current.x += lagX * speed;
    mouseSmoothRef.current.y += lagY * speed;

    // Trail length follows how fast the cursor is actually travelling, and
    // eases back to nothing when it stops — so the tail draws itself back
    // into the head puff instead of the tip stepping backwards as samples
    // age out of the buffer.
    const moved = prevSmoothRef.current.distanceTo(mouseSmoothRef.current);
    prevSmoothRef.current.copy(mouseSmoothRef.current);
    const activityTarget = THREE.MathUtils.clamp(
      moved / step / SPEED_FOR_FULL_TRAIL,
      0,
      1
    );
    const activityRate =
      activityTarget > activityRef.current ? 0.25 : 0.045;
    activityRef.current +=
      (activityTarget - activityRef.current) * activityRate;

    const u = mesh.material?.uniforms;
    if (!u) return;

    const set = (name, value) => {
      if (u[name]) u[name].value = value;
    };

    // Cursor path history: index 0 tracks the cursor every frame, the rest
    // shift along on a fixed clock so the trail covers the same span of time
    // whatever the frame rate.
    const trail = u.uTrail?.value;
    if (trail) {
      if (resetTrailRef.current) {
        trail.forEach((point) => point.copy(mouseSmoothRef.current));
        resetTrailRef.current = false;
        sampleClockRef.current = 0;
        lastDropPosRef.current.copy(mouseSmoothRef.current);
        prevSmoothRef.current.copy(mouseSmoothRef.current);
        activityRef.current = 0;
      }

      sampleClockRef.current += step;
      if (sampleClockRef.current >= TRAIL_SAMPLE_INTERVAL) {
        sampleClockRef.current %= TRAIL_SAMPLE_INTERVAL;
        for (let i = TRAIL_LENGTH - 1; i > 0; i -= 1) {
          trail[i].copy(trail[i - 1]);
        }
      }
      trail[0].copy(mouseSmoothRef.current);
    }

    // Pebble drops: age the live ones, and land a new one once the cursor has
    // moved far enough. Each stays put and keeps rippling after you pass.
    const drops = dropsRef.current;
    dropGapRef.current += step;

    const movedSinceDrop = lastDropPosRef.current.distanceTo(
      mouseSmoothRef.current
    );
    const canDrop =
      insideRef.current &&
      movedSinceDrop >= DROP_SPACING &&
      dropGapRef.current >= DROP_MIN_GAP;

    if (canDrop) {
      const slot = drops[dropCursorRef.current % DROP_COUNT];
      slot.x = mouseSmoothRef.current.x;
      slot.y = mouseSmoothRef.current.y;
      slot.age = 0;
      slot.strength = THREE.MathUtils.clamp(travelSpeed * 9, 0.25, 1);
      dropCursorRef.current += 1;
      dropGapRef.current = 0;
      lastDropPosRef.current.copy(mouseSmoothRef.current);
    }

    const dropUniform = u.uDrops?.value;
    drops.forEach((drop, index) => {
      if (drop.strength > 0) {
        drop.age += step;
        if (drop.age > DROP_LIFE) drop.strength = 0;
      }
      dropUniform?.[index]?.set(drop.x, drop.y, drop.age, drop.strength);
    });

    set('uHover', easedHover);
    set('uTime', timeRef.current);
    set('uPlaneAspect', width / height);
    set('uRadius', radius);
    set('uEdgeSoftness', edgeSoftness);
    set('uCloudScale', cloudScale);
    set('uTurbulence', turbulence);
    set('uCloudSpeed', cloudSpeed);
    set('uDetail', detail);
    set('uEdgeGlow', edgeGlow);
    set('uTrailReach', drag * TRAIL_MAX_LENGTH * activityRef.current);
    set('uTrailTaper', trailTaper);
    set('uRipple', ripple);
    set('uRippleScale', rippleScale);
    set('uRippleSpeed', rippleSpeed);
  });

  if (!textures) return null;

  return (
    <mesh ref={meshRef}>
      <planeGeometry args={[1, 1]} />
      <cloudRevealMaterial
        uTextureA={textures.a}
        uTextureB={textures.b}
        uAspectA={textures.aspectA}
        uAspectB={textures.aspectB}
        uHover={0}
        uTime={0}
        uRadius={radius}
        uEdgeSoftness={edgeSoftness}
        uCloudScale={cloudScale}
        uTurbulence={turbulence}
        uCloudSpeed={cloudSpeed}
        uDetail={detail}
        uEdgeGlow={edgeGlow}
        uTrailTaper={trailTaper}
        uRipple={ripple}
        uRippleScale={rippleScale}
        uRippleSpeed={rippleSpeed}
        depthWrite={false}
      />
    </mesh>
  );
}
