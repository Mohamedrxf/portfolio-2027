import * as THREE from 'three';
import { dampVector } from '@/lib/three';
import type { SkillNode } from './SkillNode';

export class GalaxyCamera {
  private camera: THREE.PerspectiveCamera;
  private basePosition: THREE.Vector3;
  private targetPosition: THREE.Vector3;
  private baseLookAt: THREE.Vector3;
  private targetLookAt: THREE.Vector3;
  private currentLookAt: THREE.Vector3;
  private autoRotate: boolean = false;
  private autoRotateSpeed: number = 0.1;
  private focusNode: SkillNode | null = null;
  private prefersReducedMotion: boolean = false;

  constructor(camera: THREE.PerspectiveCamera) {
    this.camera = camera;
    this.basePosition = camera.position.clone();
    this.targetPosition = camera.position.clone();
    this.baseLookAt = new THREE.Vector3(0, 0, 0);
    this.targetLookAt = new THREE.Vector3(0, 0, 0);
    this.currentLookAt = new THREE.Vector3(0, 0, 0);
    
    this.checkReducedMotion();
  }

  public update(delta: number, time: number): void {
    // Auto rotation
    if (this.autoRotate && !this.focusNode && !this.prefersReducedMotion) {
      const angle = time * this.autoRotateSpeed;
      const radius = this.basePosition.length();
      this.targetPosition.x = Math.sin(angle) * radius;
      this.targetPosition.z = Math.cos(angle) * radius;
    }

    // Smooth camera movement
    dampVector(
      this.camera.position,
      this.targetPosition,
      2,
      delta,
      this.camera.position
    );

    // Smooth look at
    dampVector(
      this.currentLookAt,
      this.targetLookAt,
      2,
      delta,
      this.currentLookAt
    );

    this.camera.lookAt(this.currentLookAt);
  }

  public focusOnNode(node: SkillNode): void {
    this.focusNode = node;
    
    // Calculate target position near the node
    const offset = new THREE.Vector3(0, 2, 6);
    this.targetPosition.copy(node.mesh.position).add(offset);
    this.targetLookAt.copy(node.mesh.position);
  }

  public resetCamera(): void {
    this.focusNode = null;
    this.targetPosition.copy(this.basePosition);
    this.targetLookAt.copy(this.baseLookAt);
  }

  public setAutoRotate(enabled: boolean): void {
    this.autoRotate = enabled && !this.prefersReducedMotion;
  }

  public setAutoRotateSpeed(speed: number): void {
    this.autoRotateSpeed = speed;
  }

  public isFocusing(): boolean {
    return this.focusNode !== null;
  }

  private checkReducedMotion(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    }
  }

  public dispose(): void {
    // Camera is managed externally, just reset state
    this.focusNode = null;
    this.autoRotate = false;
  }
}