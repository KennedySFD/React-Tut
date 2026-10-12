attribute vec2 aPosition;

varying vec2 vUv;

void main() {
  // One oversized triangle covering clip space — no camera, no geometry.
  vUv = aPosition * 0.5 + 0.5;
  gl_Position = vec4(aPosition, 0.0, 1.0);
}
