uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform float uProgress;
uniform float uTime;
uniform float uNoiseScale;
uniform float uNoiseStrength;
uniform float uEdgeWidth;
uniform float uEdgeSharpness;
uniform float uEmber;

varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float valueNoise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  f = f * f * (3.0 - 2.0 * f);
  float a = hash(i);
  float b = hash(i + vec2(1.0, 0.0));
  float c = hash(i + vec2(0.0, 1.0));
  float d = hash(i + vec2(1.0, 1.0));
  return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * valueNoise(p);
    p = p * 2.05 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

// Push a 0–1 smoothstep toward a harder step. sharpness 1 ≈ soft, 8+ ≈ crisp.
float harden(float t, float sharpness) {
  float s = max(sharpness, 0.5);
  // Symmetric contrast around 0.5 without blowing out AA entirely.
  float x = clamp(t, 0.0, 1.0);
  return pow(x, s) / (pow(x, s) + pow(1.0 - x, s));
}

void main() {
  vec2 uv = vUv;
  vec3 colorB = texture2D(uTextureB, uv).rgb;

  // Idle / finished: show the next slide cleanly — no residual top-edge ash/ember.
  if (uProgress >= 0.999) {
    gl_FragColor = vec4(colorB, 1.0);
    return;
  }

  vec3 colorA = texture2D(uTextureA, uv).rgb;

  // Burn map: low at the bottom so a "lighter underneath" eats upward.
  float n = fbm(uv * uNoiseScale + vec2(uTime * 0.05, uTime * 0.08));
  float map = uv.y * (1.0 - uNoiseStrength) + n * uNoiseStrength;

  // Overshoot slightly so the last flecks clear before progress hits 1.
  float progress = clamp(uProgress, 0.0, 1.0) * 1.12;
  float sharpness = max(uEdgeSharpness, 0.5);
  // Sharper → thinner soft band for the same edgeWidth.
  float soft = max(uEdgeWidth / sharpness, 0.00015);

  // showNext = 1 where the paper has burned through (map below the front).
  float rawEdge = smoothstep(progress - soft, progress + soft, map);
  float showNext = 1.0 - harden(rawEdge, sharpness);

  vec3 color = mix(colorA, colorB, showNext);

  // Thin char / optional ember along the front (tracks the sharpened soft width).
  float front = 1.0 - smoothstep(0.0, soft * 1.6, abs(map - progress));
  front = harden(front, mix(1.0, sharpness * 0.65, 0.85));
  float frontGate = 1.0 - smoothstep(0.9, 0.985, uProgress);
  front *= frontGate;

  vec3 ember = vec3(1.0, 0.42, 0.06) * front * uEmber;
  vec3 ash = vec3(0.05, 0.03, 0.02) * front * 0.45;
  color += ember;
  color = mix(color, color - ash, showNext * front);

  // Heat darkening just above the front (still on A) — also narrowed by soft.
  float heat = smoothstep(progress, progress + soft * 2.0, map);
  heat *= 1.0 - smoothstep(progress + soft * 2.0, progress + soft * 4.0, map);
  heat *= frontGate;
  color *= 1.0 - heat * 0.18 * (1.0 - showNext);

  gl_FragColor = vec4(color, 1.0);
}
