import * as THREE from 'three';

export function degreesToRadians(degrees: number): number {
  return degrees * (Math.PI / 180);
}

export function radiansToDegrees(radians: number): number {
  return radians * (180 / Math.PI);
}

export function lerp(start: number, end: number, alpha: number): number {
  return start + (end - start) * alpha;
}

export function clampValue(value: number, min: number, max: number): number {
  return Math.max(min, Math.min(max, value));
}

export function mapRange(
  value: number,
  inMin: number,
  inMax: number,
  outMin: number,
  outMax: number
): number {
  return ((value - inMin) * (outMax - outMin)) / (inMax - inMin) + outMin;
}

export function smoothstep(edge0: number, edge1: number, x: number): number {
  const t = clampValue((x - edge0) / (edge1 - edge0), 0, 1);
  return t * t * (3 - 2 * t);
}

export function damp(
  current: number,
  target: number,
  smoothing: number,
  delta: number
): number {
  return lerp(current, target, 1 - Math.exp(-smoothing * delta));
}

export function dampVector(
  current: THREE.Vector3,
  target: THREE.Vector3,
  smoothing: number,
  delta: number,
  result: THREE.Vector3
): THREE.Vector3 {
  result.x = damp(current.x, target.x, smoothing, delta);
  result.y = damp(current.y, target.y, smoothing, delta);
  result.z = damp(current.z, target.z, smoothing, delta);
  return result;
}

export function randomRange(min: number, max: number): number {
  return Math.random() * (max - min) + min;
}

export function randomIntRange(min: number, max: number): number {
  return Math.floor(randomRange(min, max + 1));
}

export function randomVector3(min: number, max: number): THREE.Vector3 {
  return new THREE.Vector3(
    randomRange(min, max),
    randomRange(min, max),
    randomRange(min, max)
  );
}

export function distanceSquared(v1: THREE.Vector3, v2: THREE.Vector3): number {
  const dx = v1.x - v2.x;
  const dy = v1.y - v2.y;
  const dz = v1.z - v2.z;
  return dx * dx + dy * dy + dz * dz;
}

export function normalizeAngle(angle: number): number {
  while (angle > Math.PI) angle -= 2 * Math.PI;
  while (angle < -Math.PI) angle += 2 * Math.PI;
  return angle;
}

export function angleDifference(a1: number, a2: number): number {
  const diff = a2 - a1;
  return normalizeAngle(diff);
}
