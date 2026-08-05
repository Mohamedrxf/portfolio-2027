import * as THREE from 'three';
import { createRaycaster } from '@/lib/three/utils/viewport';
import type { SkillNode } from './SkillNode';
import type { GalaxyCamera } from './GalaxyCamera';
import type { SkillLabels } from './SkillLabels';
import type { SkillConnections } from './SkillConnections';

export interface GalaxyInteractionConfig {
  camera: THREE.Camera;
  renderer: THREE.WebGLRenderer;
  nodes: SkillNode[];
  galaxyCamera: GalaxyCamera;
  labels: SkillLabels;
  connections: SkillConnections;
  onNodeHover?: (skillId: string | null) => void;
  onNodeSelect?: (skillId: string | null) => void;
}

export class GalaxyInteraction {
  private camera: THREE.Camera;
  private renderer: THREE.WebGLRenderer;
  private nodes: SkillNode[];
  private galaxyCamera: GalaxyCamera;
  private labels: SkillLabels;
  private connections: SkillConnections;
  private onNodeHover?: (skillId: string | null) => void;
  private onNodeSelect?: (skillId: string | null) => void;
  
  private hoveredNode: SkillNode | null = null;
  private selectedNode: SkillNode | null = null;
  private mousePosition: THREE.Vector2 = new THREE.Vector2();
  private canvas: HTMLElement | null = null;
  private boundHandleMouseMove: (event: MouseEvent) => void = () => {};
  private boundHandleClick: (event: MouseEvent) => void = () => {};
  private boundHandleMouseLeave: () => void = () => {};

  constructor(config: GalaxyInteractionConfig) {
    this.camera = config.camera;
    this.renderer = config.renderer;
    this.nodes = config.nodes;
    this.galaxyCamera = config.galaxyCamera;
    this.labels = config.labels;
    this.connections = config.connections;
    this.onNodeHover = config.onNodeHover;
    this.onNodeSelect = config.onNodeSelect;
  }

  public attach(canvas: HTMLElement): void {
    this.canvas = canvas;
    
    this.boundHandleMouseMove = this.handleMouseMove.bind(this);
    this.boundHandleClick = this.handleClick.bind(this);
    this.boundHandleMouseLeave = this.handleMouseLeave.bind(this);
    
    canvas.addEventListener('mousemove', this.boundHandleMouseMove);
    canvas.addEventListener('click', this.boundHandleClick);
    canvas.addEventListener('mouseleave', this.boundHandleMouseLeave);
  }

  public detach(): void {
    if (this.canvas) {
      this.canvas.removeEventListener('mousemove', this.boundHandleMouseMove);
      this.canvas.removeEventListener('click', this.boundHandleClick);
      this.canvas.removeEventListener('mouseleave', this.boundHandleMouseLeave);
      this.canvas = null;
    }
  }

  public updateNodes(nodes: SkillNode[]): void {
    this.nodes = nodes;
  }

  private handleMouseMove(event: MouseEvent): void {
    if (!this.canvas) return;

    const rect = this.canvas.getBoundingClientRect();
    this.mousePosition.x = event.clientX - rect.left;
    this.mousePosition.y = event.clientY - rect.top;

    this.checkHover();
  }

  private handleClick(_event: MouseEvent): void {
    if (this.hoveredNode) {
      this.selectNode(this.hoveredNode);
    } else {
      this.clearSelection();
    }
  }

  private handleMouseLeave(): void {
    this.clearHover();
  }

  private checkHover(): void {
    const raycaster = createRaycaster(
      this.mousePosition.x,
      this.mousePosition.y,
      this.camera,
      this.renderer
    );

    const meshes = this.nodes.map(node => node.mesh);
    const intersects = raycaster.intersectObjects(meshes);

    if (intersects.length > 0) {
      const intersectedMesh = intersects[0].object as THREE.Mesh;
      const node = this.nodes.find(n => n.mesh === intersectedMesh);
      
      if (node && node !== this.hoveredNode) {
        this.setHoveredNode(node);
      }
    } else if (this.hoveredNode) {
      this.clearHover();
    }
  }

  private setHoveredNode(node: SkillNode): void {
    // Clear previous hover
    if (this.hoveredNode) {
      this.hoveredNode.setHovered(false);
    }

    this.hoveredNode = node;
    this.hoveredNode.setHovered(true);
    this.labels.showLabel(node.skill.id);
    this.onNodeHover?.(node.skill.id);
  }

  private clearHover(): void {
    if (this.hoveredNode) {
      this.hoveredNode.setHovered(false);
      this.labels.hideLabel(this.hoveredNode.skill.id);
      this.onNodeHover?.(null);
      this.hoveredNode = null;
    }
  }

  private selectNode(node: SkillNode): void {
    // Clear previous selection
    if (this.selectedNode) {
      this.selectedNode.setSelected(false);
    }

    this.selectedNode = node;
    this.selectedNode.setSelected(true);
    this.labels.showLabel(node.skill.id);
    this.galaxyCamera.focusOnNode(node);
    this.connections.highlightConnections(node.skill.id, 0.016);
    this.onNodeSelect?.(node.skill.id);
  }

  private clearSelection(): void {
    if (this.selectedNode) {
      this.selectedNode.setSelected(false);
      this.labels.hideLabel(this.selectedNode.skill.id);
      this.selectedNode = null;
    }
    
    this.galaxyCamera.resetCamera();
    this.connections.resetHighlights(0.016);
    this.onNodeSelect?.(null);
  }

  public getSelectedNode(): SkillNode | null {
    return this.selectedNode;
  }

  public getHoveredNode(): SkillNode | null {
    return this.hoveredNode;
  }

  public handleKeyboard(event: KeyboardEvent): void {
    switch (event.key) {
      case 'ArrowUp':
      case 'ArrowDown':
      case 'ArrowLeft':
      case 'ArrowRight':
        this.navigateKeyboard(event.key);
        break;
      case 'Enter':
        if (this.hoveredNode) {
          this.selectNode(this.hoveredNode);
        }
        break;
      case 'Escape':
        this.clearSelection();
        break;
    }
  }

  private navigateKeyboard(direction: string): void {
    if (this.nodes.length === 0) return;

    const currentIndex = this.selectedNode 
      ? this.nodes.indexOf(this.selectedNode)
      : -1;

    let nextIndex: number;

    switch (direction) {
      case 'ArrowUp':
        nextIndex = currentIndex === -1 ? 0 : Math.max(0, currentIndex - 1);
        break;
      case 'ArrowDown':
        nextIndex = currentIndex === -1 ? 0 : Math.min(this.nodes.length - 1, currentIndex + 1);
        break;
      case 'ArrowLeft':
        nextIndex = currentIndex === -1 ? 0 : Math.max(0, currentIndex - 1);
        break;
      case 'ArrowRight':
        nextIndex = currentIndex === -1 ? 0 : Math.min(this.nodes.length - 1, currentIndex + 1);
        break;
      default:
        return;
    }

    if (nextIndex !== currentIndex && nextIndex >= 0 && nextIndex < this.nodes.length) {
      this.selectNode(this.nodes[nextIndex]);
    }
  }

  public dispose(): void {
    this.detach();
    this.clearHover();
    this.clearSelection();
  }
}