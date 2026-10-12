// Trail sample count. Must match TRAIL_LENGTH in CloudRevealMaterial.jsx.
#define TRAIL 16
// Live pebble drops. Must match DROP_COUNT in CloudRevealMaterial.jsx.
#define DROPS 6

uniform sampler2D uTextureA;
uniform sampler2D uTextureB;
uniform vec2 uTrail[TRAIL];
// xy = impact point (uv), z = age in seconds, w = strength (0 = empty slot)
uniform vec4 uDrops[DROPS];
uniform float uHover;
uniform float uTime;
uniform float uPlaneAspect;
uniform float uAspectA;
uniform float uAspectB;
uniform float uRadius;
uniform float uEdgeSoftness;
uniform float uCloudScale;
uniform float uTurbulence;
uniform float uCloudSpeed;
uniform float uDetail;
uniform float uEdgeGlow;
uniform float uTrailReach;
uniform float uTrailTaper;
uniform float uRipple;
uniform float uRippleScale;
uniform float uRippleSpeed;

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

// object-fit: cover, in UV space — the two photos can differ in ratio and
// still line up with the DOM element they replace.
vec2 coverUv(vec2 uv, float planeAspect, float texAspect) {
  vec2 s = vec2(1.0);
  if (texAspect > planeAspect) {
    s.x = planeAspect / texAspect;
  } else {
    s.y = texAspect / planeAspect;
  }
  return (uv - 0.5) * s + 0.5;
}

// Trail points arrive in UV space; measure everything in a square space so
// the reveal stays circular on a wide plane instead of stretching.
vec2 toSquare(vec2 p) {
  return vec2(p.x * uPlaneAspect, p.y);
}

void main() {
  vec2 uv = vUv;

  vec2 pos = toSquare(uv);

  float hover = clamp(uHover, 0.0, 1.0);
  float edge = max(uEdgeSoftness, 0.001);

  // —— water: pebble drops ——
  // Each drop is pinned where it landed and its ring front travels outward,
  // widening and fading, so the surface keeps moving after the cursor has
  // gone — a stone in a pond rather than a wake dragged along behind you.
  vec2 disp = vec2(0.0);

  for (int i = 0; i < DROPS; i++) {
    vec4 drop = uDrops[i];
    if (drop.w <= 0.001) continue;

    vec2 delta = pos - toSquare(drop.xy);
    float dist = length(delta);
    if (dist < 0.0001) continue;

    float age = drop.z;
    float front = age * uRippleSpeed * 0.18;
    // The packet spreads as it travels, so late rings are broad and shallow.
    float width = 0.05 + age * 0.06;
    float fromFront = dist - front;
    float envelope = exp(-(fromFront * fromFront) / (width * width));
    float decay = exp(-age * 1.6) * drop.w;

    disp += (delta / dist) * sin(fromFront * uRippleScale) * envelope * decay;
  }

  // Back into UV space — x was scaled by the plane aspect on the way in.
  vec2 rippleUv = uv + (disp * uRipple * 0.03) / vec2(uPlaneAspect, 1.0);

  // —— cloud mask: a tapered tube along the cursor's recent path ——
  // Distance to the whole polyline, not just the latest point, so a circling
  // cursor leaves a curved opening instead of a straight smear.
  float reach = max(uTrailReach, 0.02);
  float taperPower = max(uTrailTaper, 0.05);
  // Hover 0 must reveal nothing, so park the radius behind the widest billow
  // the turbulence can carve rather than just scaling it to zero.
  float headRadius = mix(-(edge + uTurbulence), uRadius, hover);

  // The cursor always gets a full round puff. Leaving the head to the tube
  // alone means a short trail has to shed its whole radius inside one sample,
  // and that steep a cone cuts the puff off flat.
  float d = length(pos - toSquare(uTrail[0])) - headRadius;
  float headroom = 1.0;
  float run = 0.0;

  for (int i = 0; i < TRAIL - 1; i++) {
    vec2 a = toSquare(uTrail[i]);
    vec2 b = toSquare(uTrail[i + 1]);
    vec2 ab = b - a;
    float segLength = length(ab);
    float t = clamp(dot(pos - a, ab) / max(dot(ab, ab), 0.000001), 0.0, 1.0);
    vec2 proj = a + ab * t;

    // Measure along the path itself, not by sample index: a slow cursor lays
    // down a short trail, and the taper can never collapse inside one sample.
    float along = clamp((run + segLength * t) / reach, 0.0, 1.0);
    // Narrow continuously from the cursor to a point at the end of the
    // reach. A smoothstep here holds the head at full width for the first
    // stretch, which reads as a constant-width line instead of a tail.
    float taper = pow(1.0 - along, taperPower);
    // A spent taper has to leave the soft edge band outright. At zero radius
    // the tube is still a line sitting mid-band, which shows as a ghost of
    // the whole path instead of a tail that has retracted.
    float gate = hover * smoothstep(0.0, 0.06, taper);
    float r = mix(-(edge + uTurbulence), uRadius * taper, gate);

    float segment = length(pos - proj) - r;
    if (segment < d) {
      d = segment;
      headroom = taper;
    }

    run += segLength;
  }

  // Drifting cloud field: a slow base layer plus a finer layer for wisps.
  vec2 drift = vec2(uTime * uCloudSpeed * 0.06, uTime * uCloudSpeed * 0.035);
  vec2 noiseUv = pos * uCloudScale + drift;
  float clouds = fbm(noiseUv);
  float detail = fbm(noiseUv * 2.7 - drift * 1.6);
  clouds = mix(clouds, clouds * 0.55 + detail * 0.45, clamp(uDetail, 0.0, 1.0));

  // Push the front in and out along the noise — billows, not a hard tube.
  // Billow amplitude follows the taper too: at full strength the noise would
  // shred the thin end of the tail into specks instead of a fading point.
  float field = d + (clouds - 0.5) * uTurbulence * mix(0.3, 1.0, headroom);
  float mask = 1.0 - smoothstep(-edge, edge, field);

  vec3 colorA =
    texture2D(uTextureA, coverUv(rippleUv, uPlaneAspect, uAspectA)).rgb;
  vec3 colorB =
    texture2D(uTextureB, coverUv(rippleUv, uPlaneAspect, uAspectB)).rgb;

  vec3 color = mix(colorA, colorB, mask);

  // Lit vapour along the front: brightest where the cloud noise piles up.
  // Cap the band — tied only to edgeSoftness it floods the frame once the
  // mask goes soft, which reads as a white wash rather than a cloud rim.
  float rimWidth = min(edge * 0.9, 0.06);
  float rim = 1.0 - smoothstep(0.0, rimWidth, abs(field));
  rim *= rim;
  color += rim * uEdgeGlow * hover * (0.35 + 0.8 * clouds);

  gl_FragColor = vec4(color, 1.0);
}
