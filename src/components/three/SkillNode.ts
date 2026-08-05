import * as THREE from 'three';
import { damp, randomRange } from '@/lib/three/utils/math';
import type { Skill } from '@/data/skills';

export interface SkillNodeConfig {
  skill: Skill;
  position: THREE.Vector3;
  categoryColor: string;
  baseSize: number;
}

export class SkillNode {
  public mesh: THREE.Mesh;
  public glowMesh: THREE.Mesh;
  public skill: Skill;
  public basePosition: THREE.Vector3;
  public categoryColor: string;
  public baseSize: number;
  
  private animationOffset: THREE.Vector3;
  private rotationSpeed: THREE.Vector3;
  public isHovered: boolean = false;
  public isSelected: boolean = false;
  private currentScale: number = 1;
  private currentOpacity: number = 1;

  constructor(config: SkillNodeConfig) {
    this.skill = config.skill;
    this.basePosition = config.position.clone();
    this.categoryColor = config.categoryColor;
    this.baseSize = config.baseSize;
    
    // Animation properties
    this.animationOffset = new THREE.Vector3(
      randomRange(-1, 1),
      randomRange(-1, 1),
      randomRange(-1, 1)
    );
    this.rotationSpeed = new THREE.Vector3(
      randomRange(-0.5, 0.5),
      randomRange(-0.5, 0.5),
      randomRange(-0.5, 0.5)
    );

    // Create main mesh
    const geometry = new THREE.SphereGeometry(this.baseSize, 32, 32);
    const material = new THREE.MeshStandardMaterial({
      color: new THREE.Color(this.categoryColor),
      metalness: 0.3,
      roughness: 0.7,
      emissive: new THREE.Color(this.categoryColor),
      emissiveIntensity: 0.1,
    });
    this.mesh = new THREE.Mesh(geometry, material);
    this.mesh.position.copy(this.basePosition);
    this.mesh.userData = { skillId: this.skill.id, skillNode: this };

    // Create glow mesh
    const glowGeometry = new THREE.SphereGeometry(this.baseSize * 1.5, 32, 32);
    const glowMaterial = new THREE.MeshBasicMaterial({
      color: new THREE.Color(this.categoryColor),
      transparent: true,
      opacity: 0,
    });
    this.glowMesh = new THREE.Mesh(glowGeometry, glowMaterial);
    this.glowMesh.position.copy(this.basePosition);
  }

  public update(time: number, delta: number): void {
    // Floating motion
    const floatOffset = Math.sin(time * 0.5 + this.animationOffset.x) * 0.3;
    const floatY = this.basePosition.y + floatOffset;
    
    // Smooth position update
    this.mesh.position.y = damp(this.mesh.position.y, floatY, 3, delta);
    this.glowMesh.position.y = damp(this.glowMesh.position.y, floatY, 3, delta);

    // Subtle rotation
    this.mesh.rotation.x += this.rotationSpeed.x * delta;
    this.mesh.rotation.y += this.rotationSpeed.y * delta;
    this.glowMesh.rotation.x += this.rotationSpeed.x * delta;
    this.glowMesh.rotation.y += this.rotationSpeed.y * delta;

    // Scale based on state
    const targetScale = this.isSelected ? 1.3 : this.isHovered ? 1.15 : 1;
    this.currentScale = damp(this.currentScale, targetScale, 5, delta);
    this.mesh.scale.setScalar(this.currentScale);
    this.glowMesh.scale.setScalar(this.currentScale);

    // Glow opacity based on state
    const targetOpacity = this.isSelected ? 0.4 : this.isHovered ? 0.2 : 0;
    this.currentOpacity = damp(this.currentOpacity, targetOpacity, 5, delta);
    (this.glowMesh.material as THREE.MeshBasicMaterial).opacity = this.currentOpacity;

    // Emissive intensity
    const targetEmissive = this.isSelected ? 0.5 : this.isHovered ? 0.3 : 0.1;
    (this.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity = damp(
      (this.mesh.material as THREE.MeshStandardMaterial).emissiveIntensity,
      targetEmissive,
      5,
      delta
    );
  }

  public setHovered(hovered: boolean): void {
    this.isHovered = hovered;
  }

  public setSelected(selected: boolean): void {
    this.isSelected = selected;
  }

  public setOpacity(opacity: number): void {
    const material = this.mesh.material as THREE.MeshStandardMaterial;
    material.opacity = opacity;
    material.transparent = opacity < 1;
  }

  public dispose(): void {
    this.mesh.geometry.dispose();
    (this.mesh.material as THREE.MeshStandardMaterial).dispose();
    this.glowMesh.geometry.dispose();
    (this.glowMesh.material as THREE.MeshBasicMaterial).dispose();
  }
}