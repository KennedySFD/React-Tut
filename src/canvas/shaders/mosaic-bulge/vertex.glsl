uniform float uHover;
uniform float uWarpStrength;
uniform float uPixelCount;
uniform float uMosaicRadius;
uniform float uCubeDepth;
uniform vec2 uMouse;

varying vec2 vUv;
varying float vHoverMask;
varying vec2 vCellUv;

void main() {
  vUv = uv;

  float pixels = max(uPixelCount, 2.0);
  vec2 cell = floor(uv * pixels);
  vec2 cellCenter = (cell + 0.5) / pixels;
  vCellUv = fract(uv * pixels);

  float dist = length(cellCenter - uMouse);
  float mask =
    (1.0 - smoothstep(0.0, max(uMosaicRadius, 0.001), dist)) * uHover;
  vHoverMask = mask;

  vec3 pos = position;

  // Collapse toward the cell centre so each tile reads as a hard "cube" face.
  // Keep this moderate so high pixelCount can still read as fine tiles.
  vec2 cellLocal = cellCenter - 0.5;
  pos.xy = mix(pos.xy, cellLocal, mask * 0.78);

  // Push the mosaic cubes toward the camera (local z; mesh scale.z stays 1).
  float bulge =
    mask * uCubeDepth * (0.65 + 0.35 * uWarpStrength);
  pos.z += bulge;

  gl_Position = projectionMatrix * modelViewMatrix * vec4(pos, 1.0);
}
