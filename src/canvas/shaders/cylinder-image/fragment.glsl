uniform sampler2D uTexture;
uniform float uShading;

varying vec2 vUv;
varying float vCurve;

void main() {
  vec4 texColor = texture2D(uTexture, vUv);

  // Darken as the surface curves away so the drum reads on bright photos.
  float shade = 1.0 - vCurve * uShading;
  gl_FragColor = vec4(texColor.rgb * shade, texColor.a);
}
