import * as THREE from 'three';
import { damp } from '@/lib/three/utils/math';
import type { SkillNode } from './SkillNode';

export interface SkillConnection {
  from: SkillNode;
  to: SkillNode;
  line: THREE.Line;
  opacity: number;
}

export class SkillConnections {
  private connections: Map<string, SkillConnection> = new Map();
  private maxConnections: number = 200;
  private connectionDistance: number = 8;

  constructor(_scene: THREE.Scene) {
    // Connections will be added dynamically
  }

  public addConnection(from: SkillNode, to: SkillNode, scene: THREE.Scene): void {
    const key = this.getConnectionKey(from.skill.id, to.skill.id);
    if (this.connections.has(key)) return;

    if (this.connections.size >= this.maxConnections) {
      this.removeOldestConnection(scene);
    }

    const material = new THREE.LineBasicMaterial({
      color: new THREE.Color(0x6366f1),
      transparent: true,
      opacity: 0.15,
    });

    const geometry = new THREE.BufferGeometry();
    const positions = new Float32Array(6);
    geometry.setAttribute('position', new THREE.BufferAttribute(positions, 3));
    
    const line = new THREE.Line(geometry, material);
    scene.add(line);

    this.connections.set(key, {
      from,
      to,
      line,
      opacity: 0.15,
    });
  }

  public removeConnection(skillId1: string, skillId2: string, scene: THREE.Scene): void {
    const key = this.getConnectionKey(skillId1, skillId2);
    const connection = this.connections.get(key);
    
    if (connection) {
      scene.remove(connection.line);
      connection.line.geometry.dispose();
      (connection.line.material as THREE.LineBasicMaterial).dispose();
      this.connections.delete(key);
    }
  }

  public updateConnections(delta: number): void {
    this.connections.forEach((connection) => {
      // Update line positions
      const positions = connection.line.geometry.attributes.position.array as Float32Array;
      
      positions[0] = connection.from.mesh.position.x;
      positions[1] = connection.from.mesh.position.y;
      positions[2] = connection.from.mesh.position.z;
      
      positions[3] = connection.to.mesh.position.x;
      positions[4] = connection.to.mesh.position.y;
      positions[5] = connection.to.mesh.position.z;
      
      connection.line.geometry.attributes.position.needsUpdate = true;

      // Update opacity based on node states
      const bothHighlighted = connection.from.isHovered || connection.from.isSelected || 
                              connection.to.isHovered || connection.to.isSelected;
      const targetOpacity = bothHighlighted ? 0.4 : 0.15;
      connection.opacity = damp(connection.opacity, targetOpacity, 3, delta);
      (connection.line.material as THREE.LineBasicMaterial).opacity = connection.opacity;
    });
  }

  public createConnectionsForCategory(
    nodes: SkillNode[],
    scene: THREE.Scene,
    deviceType: 'desktop' | 'tablet' | 'mobile'
  ): void {
    const maxPerDevice = deviceType === 'desktop' ? 200 : deviceType === 'tablet' ? 100 : 50;
    
    for (let i = 0; i < nodes.length; i++) {
      for (let j = i + 1; j < nodes.length; j++) {
        if (this.connections.size >= maxPerDevice) break;

        const nodeA = nodes[i];
        const nodeB = nodes[j];
        
        const distance = nodeA.basePosition.distanceTo(nodeB.basePosition);
        
        if (distance < this.connectionDistance) {
          this.addConnection(nodeA, nodeB, scene);
        }
      }
    }
  }

  public clearConnections(scene: THREE.Scene): void {
    this.connections.forEach((connection) => {
      scene.remove(connection.line);
      connection.line.geometry.dispose();
      (connection.line.material as THREE.LineBasicMaterial).dispose();
    });
    this.connections.clear();
  }

  public highlightConnections(skillId: string, delta: number): void {
    this.connections.forEach((connection) => {
      const isConnected = connection.from.skill.id === skillId || connection.to.skill.id === skillId;
      const targetOpacity = isConnected ? 0.6 : 0.05;
      connection.opacity = damp(connection.opacity, targetOpacity, 5, delta);
      (connection.line.material as THREE.LineBasicMaterial).opacity = connection.opacity;
    });
  }

  public resetHighlights(delta: number): void {
    this.connections.forEach((connection) => {
      connection.opacity = damp(connection.opacity, 0.15, 3, delta);
      (connection.line.material as THREE.LineBasicMaterial).opacity = connection.opacity;
    });
  }

  private getConnectionKey(id1: string, id2: string): string {
    return [id1, id2].sort().join('-');
  }

  private removeOldestConnection(scene: THREE.Scene): void {
    const firstKey = this.connections.keys().next().value;
    if (firstKey) {
      const connection = this.connections.get(firstKey);
      if (connection) {
        scene.remove(connection.line);
        connection.line.geometry.dispose();
        (connection.line.material as THREE.LineBasicMaterial).dispose();
        this.connections.delete(firstKey);
      }
    }
  }

  public dispose(scene: THREE.Scene): void {
    this.clearConnections(scene);
  }
}