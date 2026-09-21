uniform sampler2D uTexture;
uniform float uHover;
uniform float uHoverBrighten;
uniform float uDispersion;
uniform float uWarpStrength;
uniform vec2 uMouse;

varying vec2 vUv;

void main() {
  vec2 uv = vUv;

  // Soft hover lens around the pointer (uMouse in 0–1 UV space).
  float mouseDist = length(uv - uMouse);
  float hoverMask = smoothstep(0.55, 0.0, mouseDist) * uHover;
  vec2 hoverPull = (uv - uMouse) * hoverMask * 0.12 * uWarpStrength;

  uv -= hoverPull;
  uv = clamp(uv, 0.0, 1.0);

  // Chromatic aberration: RGB split along the radial from the cursor.
  // Weighted toward the lens rim so the centre stays cleaner.
  vec2 fromMouse = uv - uMouse;
  float radial = length(fromMouse);
  vec2 dir = radial > 1e-4 ? fromMouse / radial : vec2(0.0);
  float rim = smoothstep(0.0, 0.18, mouseDist) * hoverMask;
  float split = rim * uDispersion * 0.02;

  float r = texture2D(uTexture, clamp(uv + dir * split, 0.0, 1.0)).r;
  float g = texture2D(uTexture, uv).g;
  float b = texture2D(uTexture, clamp(uv - dir * split, 0.0, 1.0)).b;
  vec4 color = vec4(r, g, b, 1.0);

  // Optional hover glow — strength comes from Leva (`hoverBrighten`).
  color.rgb += hoverMask * uHoverBrighten;

  gl_FragColor = color;
}
