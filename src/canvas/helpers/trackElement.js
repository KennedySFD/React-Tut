/**
 * Sizes and positions a 1×1 plane over a DOM element, in the pixel units of a
 * pixel-matched camera. Coordinates are relative to the canvas the plane is
 * drawn in, so the same plane works in a full-viewport canvas and in a small
 * one embedded in the page.
 *
 * @returns {{width: number, height: number}} the element's size in CSS pixels
 */
export function trackElement(mesh, element, canvas) {
  const rect = element.getBoundingClientRect();
  const frame = canvas.getBoundingClientRect();
  const width = Math.max(rect.width, 1);
  const height = Math.max(rect.height, 1);

  mesh.position.x = rect.left + width / 2 - (frame.left + frame.width / 2);
  mesh.position.y = -(rect.top + height / 2 - (frame.top + frame.height / 2));
  mesh.position.z = 0;
  mesh.scale.set(width, height, 1);

  return { width, height };
}
