/**
 * CPU mirror of paper-burn/fragment.glsl noise + burn map.
 * Keep in sync with the GLSL hash / valueNoise / fbm / map formula.
 */

export function hash(x, y) {
  const s = Math.sin(x * 127.1 + y * 311.7) * 43758.5453123;
  return s - Math.floor(s);
}

function valueNoise(x, y) {
  const ix = Math.floor(x);
  const iy = Math.floor(y);
  let fx = x - ix;
  let fy = y - iy;
  fx = fx * fx * (3 - 2 * fx);
  fy = fy * fy * (3 - 2 * fy);

  const a = hash(ix, iy);
  const b = hash(ix + 1, iy);
  const c = hash(ix, iy + 1);
  const d = hash(ix + 1, iy + 1);

  return a + (b - a) * fx + (c - a) * fy + (a - b - c + d) * fx * fy;
}

export function fbm(x, y) {
  let v = 0;
  let a = 0.5;
  let px = x;
  let py = y;

  for (let i = 0; i < 5; i += 1) {
    v += a * valueNoise(px, py);
    const nx = px * 2.05 + 17.3;
    const ny = py * 2.05 + 9.1;
    px = nx;
    py = ny;
    a *= 0.5;
  }

  return v;
}

function clamp(x, min, max) {
  return Math.min(max, Math.max(min, x));
}

/**
 * Same as GLSL:
 *   n = fbm(uv * uNoiseScale + vec2(uTime * 0.05, uTime * 0.08))
 *   map = uv.y * (1 - uNoiseStrength) + n * uNoiseStrength
 */
export function burnMap(u, v, time, noiseScale, noiseStrength) {
  const n = fbm(u * noiseScale + time * 0.05, v * noiseScale + time * 0.08);
  const ns = clamp(noiseStrength, 0, 1);
  return v * (1 - ns) + n * ns;
}

/** Progress overshoot used by the burn fragment shader. */
export function burnFront(progress) {
  return clamp(progress, 0, 1) * 1.12;
}

/**
 * Expected uv.y of the main advancing front (mean noise ≈ 0.5).
 * Used to ignore stray iso-contour islands when noiseStrength is high.
 */
export function expectedFrontV(progress, noiseStrength) {
  const front = burnFront(progress);
  const ns = clamp(noiseStrength, 0, 0.98);
  // front ≈ v*(1-ns) + 0.5*ns  →  v ≈ (front - 0.5*ns) / (1-ns)
  return clamp((front - 0.5 * ns) / (1 - ns), 0, 1);
}

/**
 * Half-height of the particle spawn band around the main front.
 * Grows a little with noise so the ribbon can still snake, but not sky-wide.
 */
export function frontBandHalf(noiseStrength, edgeWidth = 0.06) {
  const ns = clamp(noiseStrength, 0, 1);
  return clamp(0.07 + ns * 0.14 + edgeWidth * 1.5, 0.08, 0.28);
}

/**
 * Find uv.y on a column where burnMap ≈ front.
 * Prefers the crossing nearest `preferredV` and rejects hits outside `bandHalf`.
 * Returns -1 when no on-band contour hit exists.
 */
export function findFrontV(
  u,
  front,
  time,
  noiseScale,
  noiseStrength,
  preferredV = 0.5,
  bandHalf = 0.2,
  steps = 28
) {
  let prevV = 0;
  let prevMap = burnMap(u, 0, time, noiseScale, noiseStrength);

  let bestV = -1;
  let bestScore = Infinity;

  const consider = (v, mapErr) => {
    const dist = Math.abs(v - preferredV);
    if (dist > bandHalf) return;
    // Prefer near the main front; small map error as tie-breaker.
    const score = dist + mapErr * 0.35;
    if (score < bestScore) {
      bestScore = score;
      bestV = v;
    }
  };

  for (let s = 1; s <= steps; s += 1) {
    const v = s / steps;
    const map = burnMap(u, v, time, noiseScale, noiseStrength);
    const err = Math.abs(map - front);

    if ((prevMap - front) * (map - front) <= 0) {
      const denom = map - prevMap;
      const t = Math.abs(denom) < 1e-6 ? 0.5 : (front - prevMap) / denom;
      const hit = clamp(prevV + (v - prevV) * t, 0, 1);
      consider(hit, 0);
    } else if (err < 0.06) {
      // Near-miss samples inside the band (noisy map, no clean zero-cross).
      consider(v, err);
    }

    prevV = v;
    prevMap = map;
  }

  return bestV;
}
