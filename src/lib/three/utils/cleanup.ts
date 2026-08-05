import * as THREE from 'three';

export function disposeGeometry(geometry: THREE.BufferGeometry | null): void {
  if (!geometry) return;
  geometry.dispose();
}

export function disposeMaterial(material: THREE.Material | null): void {
  if (!material) return;
  material.dispose();
}

export function disposeMaterials(materials: THREE.Material[] | null): void {
  if (!materials) return;
  materials.forEach((material) => {
    disposeMaterial(material);
  });
}

export function disposeTexture(texture: THREE.Texture | null): void {
  if (!texture) return;
  texture.dispose();
}

export function disposeObject3D(object: THREE.Object3D): void {
  if (!object) return;

  if (object instanceof THREE.Mesh) {
    disposeGeometry(object.geometry);
    disposeMaterial(object.material);
  }

  if (object instanceof THREE.Group) {
    object.children.forEach((child) => {
      disposeObject3D(child);
    });
  }
}

export function disposeScene(scene: THREE.Scene): void {
  scene.traverse((object) => {
    disposeObject3D(object);
  });
  scene.clear();
}

export function disposeRenderer(renderer: THREE.WebGLRenderer): void {
  renderer.dispose();
  renderer.forceContextLoss();
}

export function disposeRenderTarget(renderTarget: THREE.WebGLRenderTarget): void {
  renderTarget.dispose();
}

export function cleanArray(array: unknown[] | null): void {
  if (!array) return;
  array.length = 0;
}
