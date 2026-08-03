uniform float uCurvature;
uniform float uCurveStart;

varying vec2 vUv;
varying float vCurve;

void main() {
  vUv = uv;
  vec3 pos = position;

  // Same drum idea as full-page cylinder-scroll, but on one image plane:
  // edges stay at z = 0, centre bulges toward the camera.
  float d = abs(uv.y - 0.5) * 2.0;
  float t = smoothstep(uCurveStart, 1.0, d);
  pos.z += (1.0 - t * t) * uCurvature;
  vCurve = t;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
