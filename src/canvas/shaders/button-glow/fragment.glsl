uniform float uTime;
uniform float uHover;
uniform float uPress;
uniform vec2 uPointer;
uniform float uAspect;
uniform float uGlow;
uniform vec3 uTintA;
uniform vec3 uTintB;
uniform vec3 uTintC;

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

// Three octaves, not five — this runs on a surface a few hundred pixels wide.
float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 3; i++) {
    v += a * valueNoise(p);
    p = p * 2.05 + vec2(17.3, 9.1);
    a *= 0.5;
  }
  return v;
}

void main() {
  vec2 uv = vUv;

  // Square space, so the pool stays round on a wide button.
  vec2 pos = vec2(uv.x * uAspect, uv.y);
  vec2 pointer = vec2(uPointer.x * uAspect, uPointer.y);
  float dist = distance(pos, pointer);

  // Slow caustic drift — the idle half of the effect, owned by uTime.
  float clouds = fbm(pos * 3.0 + vec2(uTime * 0.06, uTime * 0.04));
  float detail = fbm(pos * 6.0 - vec2(uTime * 0.05, uTime * 0.03));

  // Light pooling under the cursor.
  float pool = exp(-dist * 2.6) * uHover * (0.55 + 0.45 * clouds);

  // Press: a single ring of light leaving the point of contact. Reach scales
  // with the button so a wide one still gets crossed.
  float reach = max(uAspect, 1.0) * 0.75;
  float front = uPress * reach;
  float width = 0.06 + uPress * 0.10;
  float fromFront = dist - front;
  float ring = exp(-(fromFront * fromFront) / (width * width));
  float ripple = ring * (1.0 - uPress) * smoothstep(0.0, 0.08, uPress);

  // Iridescence borrowed from the keyline, so both layers split light the
  // same way and a rebrand moves them together.
  vec3 tint = mix(uTintA, uTintB, smoothstep(0.2, 0.8, clouds));
  tint = mix(tint, uTintC, smoothstep(0.35, 0.95, detail));

  float alpha = (pool * 0.55 + ripple * 0.5) * uGlow;

  // Fade before the edge, or the layer reads as a lit rectangle sitting on
  // the button rather than light inside it.
  vec2 edge = min(uv, 1.0 - uv);
  alpha *= smoothstep(0.0, 0.16, edge.x) * smoothstep(0.0, 0.32, edge.y);

  gl_FragColor = vec4(tint * alpha, alpha);
}
