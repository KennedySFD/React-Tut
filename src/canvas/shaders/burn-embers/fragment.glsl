varying float vAlpha;
varying float vHeat;

void main() {
  vec2 uv = gl_PointCoord - 0.5;
  float d = length(uv);

  // Hot core + wider glow halo.
  float core = 1.0 - smoothstep(0.0, 0.22, d);
  float glow = 1.0 - smoothstep(0.1, 0.5, d);
  float mask = max(core, glow * 0.85);
  if (mask <= 0.001) discard;

  vec3 hot = vec3(1.0, 0.95, 0.55);
  vec3 mid = vec3(1.0, 0.45, 0.08);
  vec3 cool = vec3(0.9, 0.12, 0.02);
  vec3 color = mix(cool, mid, clamp(vHeat, 0.0, 1.0));
  color = mix(color, hot, core * clamp(vHeat + 0.35, 0.0, 1.0));

  // Boost opacity — additive blend still needs a strong source.
  float alpha = clamp(vAlpha * mask * 1.85, 0.0, 1.0);
  gl_FragColor = vec4(color * (0.85 + core * 0.9), alpha);
}
