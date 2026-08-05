import * as THREE from 'three';

export interface ViewportDimensions {
  width: number;
  height: number;
  aspect: number;
}

export function getViewportDimensions(
  renderer: THREE.WebGLRenderer
): ViewportDimensions {
  const width = renderer.domElement.clientWidth;
  const height = renderer.domElement.clientHeight;
  const aspect = width / height;

  return { width, height, aspect };
}

export function screenToWorld(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
): THREE.Vector3 {
  const dimensions = getViewportDimensions(renderer);
  
  const ndc = new THREE.Vector2(
    (screenX / dimensions.width) * 2 - 1,
    -(screenY / dimensions.height) * 2 + 1
  );

  if (camera instanceof THREE.PerspectiveCamera) {
    const vector = new THREE.Vector3(ndc.x, ndc.y, 0.5);
    vector.unproject(camera);
    const dir = vector.sub(camera.position).normalize();
    const distance = -camera.position.z / dir.z;
    const pos = camera.position.clone().add(dir.multiplyScalar(distance));
    return pos;
  } else if (camera instanceof THREE.OrthographicCamera) {
    const vector = new THREE.Vector3(ndc.x, ndc.y, 0.5);
    vector.unproject(camera);
    return vector;
  }

  return new THREE.Vector3();
}

export function worldToScreen(
  worldPosition: THREE.Vector3,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
): THREE.Vector2 {
  const dimensions = getViewportDimensions(renderer);
  
  const vector = worldPosition.clone();
  vector.project(camera);

  return new THREE.Vector2(
    (vector.x * 0.5 + 0.5) * dimensions.width,
    (-(vector.y * 0.5) + 0.5) * dimensions.height
  );
}

export function createRaycaster(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer
): THREE.Raycaster {
  const dimensions = getViewportDimensions(renderer);
  
  const ndc = new THREE.Vector2(
    (screenX / dimensions.width) * 2 - 1,
    -(screenY / dimensions.height) * 2 + 1
  );

  const raycaster = new THREE.Raycaster();
  raycaster.setFromCamera(ndc, camera);

  return raycaster;
}

export function raycast(
  screenX: number,
  screenY: number,
  camera: THREE.Camera,
  renderer: THREE.WebGLRenderer,
  objects: THREE.Object3D[]
): THREE.Intersection[] {
  const raycaster = createRaycaster(screenX, screenY, camera, renderer);
  return raycaster.intersectObjects(objects, true);
}

export function getFrustumPlanes(camera: THREE.Camera): THREE.Plane[] {
  const frustum = new THREE.Frustum();
  const projScreenMatrix = new THREE.Matrix4();
  
  projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  
  frustum.setFromProjectionMatrix(projScreenMatrix);
  
  return frustum.planes;
}

export function isObjectInView(
  object: THREE.Object3D,
  camera: THREE.Camera
): boolean {
  const frustum = new THREE.Frustum();
  const projScreenMatrix = new THREE.Matrix4();
  
  projScreenMatrix.multiplyMatrices(
    camera.projectionMatrix,
    camera.matrixWorldInverse
  );
  
  frustum.setFromProjectionMatrix(projScreenMatrix);
  
  return frustum.intersectsObject(object);
}

export function getVisibleHeightAtZDepth(
  depth: number,
  camera: THREE.PerspectiveCamera
): number {
  const cameraOffset = camera.position.z;
  if (depth < cameraOffset) {
    depth -= cameraOffset;
  } else {
    depth += cameraOffset;
  }
  
  const vFOV = camera.fov * Math.PI / 180;
  return 2 * Math.tan(vFOV / 2) * Math.abs(depth);
}

export function getVisibleWidthAtZDepth(
  depth: number,
  camera: THREE.PerspectiveCamera
): number {
  const height = getVisibleHeightAtZDepth(depth, camera);
  return height * camera.aspect;
}
