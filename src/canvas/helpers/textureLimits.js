// Texture sizing helpers used before an R3F <Canvas> exists, where the three.js
// renderer (and its `capabilities`) is not yet available.

let cachedMaxTextureSize = null;

/**
 * Reads GL_MAX_TEXTURE_SIZE from a throwaway context. Cached, because creating
 * and dropping contexts is not free and the answer never changes for a GPU.
 * Returns 0 when WebGL is unavailable, which callers treat as "unknown".
 */
export function getMaxTextureSize() {
  if (cachedMaxTextureSize !== null) return cachedMaxTextureSize;
  if (typeof document === 'undefined') return 0;

  const probe = document.createElement('canvas');
  const gl = probe.getContext('webgl2') || probe.getContext('webgl');

  if (!gl) {
    cachedMaxTextureSize = 0;
    return cachedMaxTextureSize;
  }

  cachedMaxTextureSize = gl.getParameter(gl.MAX_TEXTURE_SIZE);
  gl.getExtension('WEBGL_lose_context')?.loseContext();

  return cachedMaxTextureSize;
}

/**
 * Reduces a requested capture scale until neither dimension of the resulting
 * bitmap exceeds the GPU's texture limit. Oversized textures fail to upload and
 * render black rather than throwing, so this has to be checked up front.
 */
export function resolveCaptureScale({ requested, width, height }) {
  const maxTextureSize = getMaxTextureSize();
  const longestEdge = Math.max(width, height);

  if (!maxTextureSize || !longestEdge) {
    return { scale: requested, maxTextureSize, clamped: false };
  }

  const limit = maxTextureSize / longestEdge;
  if (requested <= limit) {
    return { scale: requested, maxTextureSize, clamped: false };
  }

  // Round down to two decimals so the result is comfortably inside the limit.
  const scale = Math.max(0.25, Math.floor(limit * 100) / 100);
  return { scale, maxTextureSize, clamped: true };
}

/**
 * Device pixel ratio, floored at 1 and capped so a tall page capture stays a
 * sane size on 3x phones.
 */
export function clampedDevicePixelRatio(max = 3) {
  if (typeof window === 'undefined') return 1;
  return Math.min(max, Math.max(1, window.devicePixelRatio || 1));
}
