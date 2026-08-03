uniform sampler2D uTexture;
uniform float uScrollProgress;
uniform float uContentRatio;
uniform float uOverscan;
uniform float uShading;
uniform float uOutputEncode;

varying vec2 vUv;
varying float vCurve;

vec3 linearToSRGB(vec3 c) {
  return mix(
    pow(c, vec3(0.41666)) * 1.055 - vec3(0.055),
    c * 12.92,
    step(c, vec3(0.0031308))
  );
}

void main() {
  // Fraction of the full-page texture spanned by the plane.
  float span = uOverscan / uContentRatio;

  // Top of the scroll window, as a fraction of total content.
  float offset = uScrollProgress * (1.0 - 1.0 / uContentRatio);

  // The plane is taller than the viewport, so shift back by half the excess
  // to keep the viewport centred within it.
  float bleed = (uOverscan - 1.0) / (2.0 * uContentRatio);

  float y = offset - bleed + (1.0 - vUv.y) * span;

  if (y < 0.0 || y > 1.0) discard;

  vec4 texColor = texture2D(uTexture, vec2(vUv.x, 1.0 - y));

  // Geometry alone reads poorly on a white page, so darken the surface as it
  // curves away from the camera. This is what makes the drum shape legible.
  float shade = 1.0 - vCurve * uShading;

  vec3 rgb = texColor.rgb * shade;

  // This is a raw ShaderMaterial, so three.js injects no output colour-space
  // conversion. With uOutputEncode at 0 the sampled sRGB values pass straight
  // through unchanged, which is the historical behaviour. Set it to 1 only when
  // the texture is tagged SRGBColorSpace — then sampling decodes to linear, the
  // shading multiply happens in linear light, and we re-encode here.
  rgb = mix(rgb, linearToSRGB(rgb), uOutputEncode);

  gl_FragColor = vec4(rgb, texColor.a);
}
