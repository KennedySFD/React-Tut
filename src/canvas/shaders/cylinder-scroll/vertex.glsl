uniform float uCurvature;
uniform float uCurveStart;

varying vec2 vUv;
varying float vCurve;

void main() {
  vUv = uv;
  vec3 pos = position;

  // 0 at the vertical centre, 1 at the top and bottom edges.
  float d = abs(uv.y - 0.5) * 2.0;

  // Stay flat until uCurveStart, then ramp to full bend at the edge.
  float t = smoothstep(uCurveStart, 1.0, d);

  // Bulge the centre toward the camera while leaving the edges at z = 0.
  // Anchoring the edges keeps the plane's silhouette projecting exactly onto
  // the viewport border, so the surface always covers the screen no matter how
  // strong the curve gets. Pushing the edges back instead would pull them
  // inside the viewport and reveal the clear colour in the corners.
  pos.z += (1.0 - t * t) * uCurvature;

  // Hand the bend amount to the fragment stage for shading.
  vCurve = t;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
