uniform float uCurvature;
uniform float uCurveStart;
uniform float uHorizontal;

varying vec2 vUv;
varying float vCurve;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Vertical drum: bend along Y. Horizontal drum: bend along X.
  float axis = mix(uv.y, uv.x, step(0.5, uHorizontal));
  float d = abs(axis - 0.5) * 2.0;
  float t = smoothstep(uCurveStart, 1.0, d);
  pos.z += (1.0 - t * t) * uCurvature;
  vCurve = t;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
