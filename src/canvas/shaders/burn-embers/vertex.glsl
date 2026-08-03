attribute float aAge;
attribute float aLife;
attribute float aSize;
attribute float aHeat;

uniform float uPixelRatio;
uniform float uMaxSize;

varying float vAlpha;
varying float vHeat;

void main() {
  // Dead slots must not draw at all (avoids lingering additive flecks).
  if (aLife <= 0.001) {
    vAlpha = 0.0;
    vHeat = 0.0;
    gl_PointSize = 0.0;
    gl_Position = vec4(2.0, 2.0, 2.0, 1.0);
    return;
  }

  float life = max(aLife, 0.0001);
  float t = clamp(aAge / life, 0.0, 1.0);

  // Stay bright longer, then fade.
  vAlpha = pow(1.0 - t, 0.65) * smoothstep(0.0, 0.08, t);
  vHeat = aHeat;

  vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);

  // Camera sits ~600 units back; the usual 300 attenuation makes sparks
  // sub-pixel. Scale up so embers read clearly on this stage.
  float size = aSize * (1.0 - t * 0.55) * uMaxSize;
  float atten = 2400.0 / max(-mvPosition.z, 40.0);
  gl_PointSize = max(size * uPixelRatio * atten, 6.0);

  gl_Position = projectionMatrix * mvPosition;
}
