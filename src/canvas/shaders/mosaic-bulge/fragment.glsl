uniform sampler2D uTexture;
uniform float uHover;
uniform float uHoverBrighten;
uniform float uWarpStrength;
uniform float uPixelCount;
uniform float uMosaicRadius;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vHoverMask;
varying vec2 vCellUv;

float cellHash(vec2 cell) {
  return fract(sin(dot(cell, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;

  // Soft lens bulge toward the cursor (same family as media-warp).
  float mouseDist = length(uv - uMouse);
  float softMask =
    (1.0 - smoothstep(0.0, max(uMosaicRadius * 1.15, 0.001), mouseDist)) *
    uHover;
  vec2 hoverPull = (uv - uMouse) * softMask * 0.10 * uWarpStrength;
  uv -= hoverPull;

  // Mask from the fragment (stable) + vertex extrusion mask.
  float fragMask =
    (1.0 - smoothstep(0.0, max(uMosaicRadius, 0.001), mouseDist)) * uHover;
  float mask = max(vHoverMask, fragMask);

  // Continuous UV inside the cell — used for borders. Do this BEFORE snap.
  float pixels = max(uPixelCount, 2.0);
  vec2 cellId = floor(uv * pixels);
  vec2 cellUv = fract(uv * pixels);

  // Photoshop-style pixelate under the hover.
  vec2 mosaicUv = (cellId + 0.5) / pixels;
  vec2 sampleUv = mix(uv, mosaicUv, clamp(mask * 1.15, 0.0, 1.0));
  sampleUv = clamp(sampleUv, 0.0, 1.0);

  vec4 color = texture2D(uTexture, sampleUv);

  // Flat sky/walls fuse into one blob because every tile is the same colour.
  // Per-cell tint + grid lines keep small tiles readable on uniform areas.
  float noise = cellHash(cellId);
  color.rgb *= mix(1.0, 0.88 + 0.24 * noise, mask);

  float edge = min(
    min(cellUv.x, 1.0 - cellUv.x),
    min(cellUv.y, 1.0 - cellUv.y)
  );
  float line = 1.0 - smoothstep(0.0, 0.07, edge);
  color.rgb *= 1.0 - line * 0.35 * mask;

  // Cheap cube face shading from cell UV (lit from top-left).
  float bevel =
    smoothstep(0.0, 0.2, cellUv.x) * smoothstep(0.0, 0.2, cellUv.y);
  float shade = mix(1.0, 0.78 + 0.22 * bevel, mask);
  color.rgb *= shade;

  color.rgb += softMask * uHoverBrighten;

  gl_FragColor = color;
}
