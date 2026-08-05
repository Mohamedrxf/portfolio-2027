import * as THREE from 'three';
import { damp } from '@/lib/three/utils/math';
import { worldToScreen } from '@/lib/three';
import type { SkillNode } from './SkillNode';

export interface SkillLabel {
  node: SkillNode;
  element: HTMLDivElement;
  visible: boolean;
  opacity: number;
}

export class SkillLabels {
  private labels: Map<string, SkillLabel> = new Map();
  private container: HTMLElement;
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private deviceType: 'desktop' | 'tablet' | 'mobile';

  constructor(container: HTMLElement, camera: THREE.Camera, renderer: THREE.WebGLRenderer) {
    this.container = container;
    this.camera = camera;
    this.renderer = renderer;
    this.deviceType = this.detectDeviceType();
  }

  public addLabel(node: SkillNode): void {
    const element = document.createElement('div');
    element.className = 'skill-label';
    element.style.cssText = `
      position: absolute;
      pointer-events: none;
      font-size: 12px;
      font-weight: 500;
      color: white;
      padding: 4px 8px;
      background: rgba(0, 0, 0, 0.7);
      border-radius: 4px;
      white-space: nowrap;
      opacity: 0;
      transition: opacity 0.2s ease;
      z-index: 10;
    `;
    element.textContent = node.skill.name;
    
    // Add badge if available
    if (node.skill.badge) {
      const badge = document.createElement('span');
      badge.textContent = ` ${node.skill.badge}`;
      badge.style.cssText = `
        background: linear-gradient(135deg, #f59e0b, #d97706);
        padding: 2px 6px;
        border-radius: 3px;
        font-size: 10px;
        margin-left: 4px;
      `;
      element.appendChild(badge);
    }

    this.container.appendChild(element);

    this.labels.set(node.skill.id, {
      node,
      element,
      visible: false,
      opacity: 0,
    });
  }

  public removeLabel(skillId: string): void {
    const label = this.labels.get(skillId);
    if (label) {
      this.container.removeChild(label.element);
      this.labels.delete(skillId);
    }
  }

  public update(delta: number): void {
    this.labels.forEach((label) => {
      const shouldShow = this.shouldShowLabel(label.node);
      const targetOpacity = shouldShow ? 1 : 0;
      
      label.opacity = damp(label.opacity, targetOpacity, 5, delta);
      label.element.style.opacity = label.opacity.toString();

      if (label.opacity > 0.01) {
        this.updateLabelPosition(label);
      }
    });
  }

  public showLabel(skillId: string): void {
    const label = this.labels.get(skillId);
    if (label) {
      label.visible = true;
    }
  }

  public hideLabel(skillId: string): void {
    const label = this.labels.get(skillId);
    if (label) {
      label.visible = false;
    }
  }

  public showAllLabels(): void {
    this.labels.forEach((label) => {
      label.visible = true;
    });
  }

  public hideAllLabels(): void {
    this.labels.forEach((label) => {
      label.visible = false;
    });
  }

  public updateDeviceType(): void {
    this.deviceType = this.detectDeviceType();
  }

  private shouldShowLabel(node: SkillNode): boolean {
    // Always show on desktop when hovered or selected
    if (this.deviceType === 'desktop') {
      return node.isHovered || node.isSelected;
    }
    
    // On mobile/tablet, only show when selected
    return node.isSelected;
  }

  private updateLabelPosition(label: SkillLabel): void {
    const screenPosition = worldToScreen(
      label.node.mesh.position,
      this.camera,
      this.renderer
    );

    const x = screenPosition.x;
    const y = screenPosition.y;

    label.element.style.transform = `translate(${x}px, ${y - 30}px)`;
  }

  private detectDeviceType(): 'desktop' | 'tablet' | 'mobile' {
    const width = window.innerWidth;
    if (width < 768) return 'mobile';
    if (width < 1024) return 'tablet';
    return 'desktop';
  }

  public dispose(): void {
    this.labels.forEach((label) => {
      this.container.removeChild(label.element);
    });
    this.labels.clear();
  }
}