'use client';

import { vertexShader, fragmentShader } from '@/canvas/shaders/button-glow';

/**
 * A single-quad WebGL renderer for one control.
 *
 * Deliberately not react-three-fiber. A control needs one triangle and six
 * uniforms, where R3F brings a scene graph, a render loop and — the reason
 * this exists — a canvas sized by ResizeObserver. Here the size is read
 * straight off the host element every frame, so there is no measurement to
 * arrive late or not at all, and three.js stays out of the bundle of the
 * most-used component in the library.
 *
 * The caller owns the animation values: `stateRef.current` is a plain object
 * GSAP tweens, and each frame copies it into uniforms.
 */

/** `rgb()` / `rgba()` token → the 0–1 triple GL wants. Alpha is the layer's job. */
function parseColor(value, fallback = [1, 1, 1]) {
  const match = /rgba?\(\s*([\d.]+)[,\s]+([\d.]+)[,\s]+([\d.]+)/i.exec(
    value ?? ''
  );
  if (!match) return fallback;
  return [
    Number(match[1]) / 255,
    Number(match[2]) / 255,
    Number(match[3]) / 255,
  ];
}

function compile(gl, type, source) {
  const shader = gl.createShader(type);
  gl.shaderSource(shader, source);
  gl.compileShader(shader);

  if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
    const log = gl.getShaderInfoLog(shader);
    gl.deleteShader(shader);
    throw new Error(log || 'shader failed to compile');
  }
  return shader;
}

const UNIFORM_NAMES = [
  'uTime',
  'uHover',
  'uPress',
  'uPointer',
  'uAspect',
  'uGlow',
  'uTintA',
  'uTintB',
  'uTintC',
];

/**
 * @param {HTMLCanvasElement} canvas
 * @param {{host: HTMLElement, stateRef: {current: object}, tints: object, glow: number}} options
 * @returns {{start: Function, stop: Function, destroy: Function}|null}
 *   null when WebGL is unavailable — the caller simply renders no layer.
 */
export function createButtonGlowRenderer(canvas, options) {
  const gl = canvas.getContext('webgl', {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    // The shader writes colour already multiplied by alpha, which is what
    // lets a glow composite over the button without darkening its edges.
    premultipliedAlpha: true,
    powerPreference: 'low-power',
  });

  if (!gl) return null;

  let program;
  try {
    const vs = compile(gl, gl.VERTEX_SHADER, vertexShader);
    const fs = compile(
      gl,
      gl.FRAGMENT_SHADER,
      `precision mediump float;\n${fragmentShader}`
    );

    program = gl.createProgram();
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    gl.deleteShader(vs);
    gl.deleteShader(fs);

    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      throw new Error(gl.getProgramInfoLog(program) || 'program failed to link');
    }
  } catch (error) {
    if (process.env.NODE_ENV === 'development') {
      console.error('[buttonGlow]', error.message);
    }
    return null;
  }

  gl.useProgram(program);

  const buffer = gl.createBuffer();
  gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  );

  const position = gl.getAttribLocation(program, 'aPosition');
  gl.enableVertexAttribArray(position);
  gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

  const u = Object.fromEntries(
    UNIFORM_NAMES.map((name) => [name, gl.getUniformLocation(program, name)])
  );

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE_MINUS_SRC_ALPHA);
  gl.clearColor(0, 0, 0, 0);

  let current = options;
  let frame = null;
  let last = 0;
  let time = 0;
  let width = 0;
  let height = 0;

  const sync = () => {
    const rect = current.host.getBoundingClientRect();
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    const w = Math.max(Math.round(rect.width * dpr), 1);
    const h = Math.max(Math.round(rect.height * dpr), 1);

    if (w !== width || h !== height) {
      width = w;
      height = h;
      canvas.width = w;
      canvas.height = h;
      gl.viewport(0, 0, w, h);
    }
  };

  const draw = (now) => {
    frame = requestAnimationFrame(draw);

    const delta = last ? Math.min((now - last) / 1000, 0.1) : 0;
    last = now;
    time += delta;

    sync();

    const state = current.stateRef.current;
    const tints = current.tints;

    gl.uniform1f(u.uTime, time);
    gl.uniform1f(u.uHover, state.hover);
    gl.uniform1f(u.uPress, state.press);
    gl.uniform2f(u.uPointer, state.x, state.y);
    gl.uniform1f(u.uAspect, height > 0 ? width / height : 1);
    gl.uniform1f(u.uGlow, current.glow);
    gl.uniform3fv(u.uTintA, parseColor(tints.a));
    gl.uniform3fv(u.uTintB, parseColor(tints.b));
    gl.uniform3fv(u.uTintC, parseColor(tints.c));

    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.drawArrays(gl.TRIANGLES, 0, 3);
  };

  return {
    start() {
      if (frame === null) {
        last = 0;
        frame = requestAnimationFrame(draw);
      }
    },
    stop() {
      if (frame !== null) {
        cancelAnimationFrame(frame);
        frame = null;
      }
    },
    destroy() {
      this.stop();
      gl.deleteBuffer(buffer);
      gl.deleteProgram(program);
      // Hand the context back rather than waiting for GC; a page of controls
      // would otherwise sit on more of them than the browser allows.
      gl.getExtension('WEBGL_lose_context')?.loseContext();
    },
  };
}

export default createButtonGlowRenderer;
