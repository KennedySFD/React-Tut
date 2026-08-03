/**
 * Evaluate a CSS-style cubic-bezier at time t ∈ [0, 1].
 * Works from Leva bezier values even when `.evaluate` is missing after folder remounts.
 */

function calcBezier(t, a1, a2) {
  return ((1 - 3 * a2 + 3 * a1) * t + (3 * a2 - 6 * a1)) * t * t + 3 * a1 * t;
}

function solveTForX(x, x1, x2) {
  let a = 0;
  let b = 1;
  let t = x;
  for (let i = 0; i < 20; i += 1) {
    const xEst = calcBezier(t, x1, x2);
    if (Math.abs(xEst - x) < 1e-6) return t;
    if (xEst < x) a = t;
    else b = t;
    t = (a + b) / 2;
  }
  return t;
}

/** Pull [x1, y1, x2, y2] from a Leva bezier value (array or {x1,y1,x2,y2}). */
export function getBezierHandles(curve) {
  if (!curve) return [0, 0, 1, 1];
  if (Array.isArray(curve) && curve.length >= 4) {
    return [
      Number(curve[0]),
      Number(curve[1]),
      Number(curve[2]),
      Number(curve[3]),
    ];
  }
  if (
    typeof curve === 'object' &&
    'x1' in curve &&
    'y1' in curve &&
    'x2' in curve &&
    'y2' in curve
  ) {
    return [curve.x1, curve.y1, curve.x2, curve.y2].map(Number);
  }
  return [0, 0, 1, 1];
}

export function evaluateBezier(curve, t) {
  const x = Math.min(1, Math.max(0, t));
  if (x === 0 || x === 1) return x;

  if (typeof curve?.evaluate === 'function') {
    const y = curve.evaluate(x);
    if (Number.isFinite(y)) return Math.min(1, Math.max(0, y));
  }

  const [x1, y1, x2, y2] = getBezierHandles(curve);
  if (x1 === y1 && x2 === y2) return x;

  const tParam = solveTForX(x, x1, x2);
  return Math.min(1, Math.max(0, calcBezier(tParam, y1, y2)));
}
