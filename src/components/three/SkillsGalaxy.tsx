import { useEffect, useRef, useState } from 'react';
import * as THREE from 'three';
import { useThree, useAnimationFrame } from '@/lib/three';
import { useSkills } from '@/hooks';
import { SkillNode } from './SkillNode';
import { SkillConnections } from './SkillConnections';
import { SkillLabels } from './SkillLabels';
import { GalaxyCamera } from './GalaxyCamera';
import { GalaxyInteraction } from './GalaxyInteraction';
import { GalaxyControls } from './GalaxyControls';
import type { Skill } from '@/data/skills';

// Category colors (defined outside component to avoid recreation)
const categoryColors: Record<string, string> = {
  'Programming': '#3b82f6',
  'Frontend': '#10b981',
  'Backend': '#f59e0b',
  'Cloud & DevOps': '#8b5cf6',
  'Networking': '#ef4444',
  'AI & Security': '#ec4899',
  'Development Tools': '#06b6d4',
};

interface SkillsGalaxyProps {
  className?: string;
  onSkillSelect?: (skill: Skill | null) => void;
  onSkillHover?: (skill: Skill | null) => void;
}

export const SkillsGalaxy = ({ className = '', onSkillSelect, onSkillHover }: SkillsGalaxyProps) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const labelsContainerRef = useRef<HTMLDivElement>(null);
  const { skills, skillCategories } = useSkills();
  
  const [deviceType, setDeviceType] = useState<'desktop' | 'tablet' | 'mobile'>('desktop');
  
  // Refs for Three.js objects
  const nodesRef = useRef<SkillNode[]>([]);
  const connectionsRef = useRef<SkillConnections | null>(null);
  const labelsRef = useRef<SkillLabels | null>(null);
  const galaxyCameraRef = useRef<GalaxyCamera | null>(null);
  const interactionRef = useRef<GalaxyInteraction | null>(null);
  const controlsRef = useRef<GalaxyControls | null>(null);

  // Use existing Three.js infrastructure
  const { renderer, scene, camera, resize } = useThree({
    canvas: canvasRef as React.RefObject<HTMLCanvasElement>,
    enableControls: false,
    cameraType: 'perspective',
    rendererConfig: {
      antialias: true,
      alpha: true,
      powerPreference: 'high-performance',
    },
    sceneConfig: {
      background: new THREE.Color(0x0a0a0f),
    },
    cameraConfig: {
      position: new THREE.Vector3(0, 5, 15),
      fov: 60,
      near: 0.1,
      far: 1000,
    },
  });

  // Detect device type
  useEffect(() => {
    const detectDevice = () => {
      const width = window.innerWidth;
      if (width < 768) setDeviceType('mobile');
      else if (width < 1024) setDeviceType('tablet');
      else setDeviceType('desktop');
    };

    detectDevice();
    window.addEventListener('resize', detectDevice);
    return () => window.removeEventListener('resize', detectDevice);
  }, []);

  // Initialize galaxy
  useEffect(() => {
    if (!scene || !camera || !canvasRef.current || !labelsContainerRef.current) return;

    // Setup lighting
    const ambientLight = new THREE.AmbientLight(0xffffff, 0.4);
    scene.add(ambientLight);

    const directionalLight = new THREE.DirectionalLight(0xffffff, 0.8);
    directionalLight.position.set(10, 20, 10);
    scene.add(directionalLight);

    const pointLight = new THREE.PointLight(0x6366f1, 0.5, 50);
    pointLight.position.set(0, 10, 0);
    scene.add(pointLight);

    // Create galaxy camera
    const galaxyCamera = new GalaxyCamera(camera as THREE.PerspectiveCamera);
    galaxyCamera.setAutoRotate(true);
    galaxyCamera.setAutoRotateSpeed(0.05);
    galaxyCameraRef.current = galaxyCamera;

    // Create labels
    const labels = new SkillLabels(labelsContainerRef.current, camera, renderer!);
    labelsRef.current = labels;

    // Create connections
    const connections = new SkillConnections(scene);
    connectionsRef.current = connections;

    // Create skill nodes with galaxy layout
    const nodes: SkillNode[] = [];
    const categoryRegions = calculateCategoryRegions(skillCategories.length);

    skillCategories.forEach((category, categoryIndex) => {
      const categorySkills = skills.filter(s => s.category === category.name);
      const region = categoryRegions[categoryIndex];
      const color = categoryColors[category.name] || '#6366f1';

      categorySkills.forEach((skill, skillIndex) => {
        const position = calculateSkillPosition(skill, skillIndex, categorySkills.length, region);
        const baseSize = calculateSkillSize(skill.level);

        const node = new SkillNode({
          skill,
          position,
          categoryColor: color,
          baseSize,
        });

        scene.add(node.mesh);
        scene.add(node.glowMesh);
        labels.addLabel(node);
        nodes.push(node);
      });
    });

    nodesRef.current = nodes;

    // Create connections within categories
    nodes.forEach((node) => {
      const categoryNodes = nodes.filter(n => n.skill.category === node.skill.category);
      connections.createConnectionsForCategory(categoryNodes, scene, deviceType);
    });

    // Setup interaction
    const interaction = new GalaxyInteraction({
      camera,
      renderer: renderer!,
      nodes,
      galaxyCamera,
      labels,
      connections,
      onNodeHover: (skillId) => {
        const skill = skills.find(s => s.id === skillId);
        onSkillHover?.(skill || null);
      },
      onNodeSelect: (skillId) => {
        const skill = skills.find(s => s.id === skillId);
        onSkillSelect?.(skill || null);
      },
    });
    interaction.attach(canvasRef.current);
    interactionRef.current = interaction;

    // Setup controls
    const controls = new GalaxyControls({
      camera: galaxyCamera,
      interaction,
      labels,
    });
    controlsRef.current = controls;

    // Cleanup
    return () => {
      controls.dispose();
      interaction.dispose();
      labels.dispose();
      connections.dispose(scene);
      galaxyCamera.dispose();

      nodes.forEach((node) => {
        scene.remove(node.mesh);
        scene.remove(node.glowMesh);
        node.dispose();
      });

      scene.remove(ambientLight);
      scene.remove(directionalLight);
      scene.remove(pointLight);

      ambientLight.dispose();
      directionalLight.dispose();
      pointLight.dispose();

      nodesRef.current = [];
    };
  }, [scene, camera, renderer, skills, skillCategories, deviceType, onSkillSelect, onSkillHover]);

  // Animation loop
  useAnimationFrame({
    callback: (delta) => {
      const time = performance.now() / 1000;

      // Update nodes
      nodesRef.current.forEach((node) => {
        node.update(time, delta);
      });

      // Update connections
      connectionsRef.current?.updateConnections(delta);

      // Update labels
      labelsRef.current?.update(delta);

      // Update camera
      galaxyCameraRef.current?.update(delta, time);

      // Render
      renderer?.render(scene!, camera!);
    },
    enabled: true,
  });

  // Handle resize
  useEffect(() => {
    const handleResize = () => {
      const width = canvasRef.current?.clientWidth || 0;
      const height = canvasRef.current?.clientHeight || 0;
      resize(width, height);
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [resize]);

  return (
    <div className={`relative w-full h-full ${className}`}>
      <canvas
        ref={canvasRef}
        className="w-full h-full block"
        style={{ touchAction: deviceType === 'mobile' ? 'auto' : 'none' }}
      />
      <div
        ref={labelsContainerRef}
        className="absolute inset-0 pointer-events-none overflow-hidden"
        style={{ touchAction: deviceType === 'mobile' ? 'auto' : 'none' }}
      />
    </div>
  );
};

// Helper functions for galaxy layout
function calculateCategoryRegions(count: number) {
  const radius = 8;
  const regions: Array<{ center: THREE.Vector3; radius: number }> = [];

  for (let i = 0; i < count; i++) {
    const angle = (i / count) * Math.PI * 2;
    const x = Math.cos(angle) * radius;
    const z = Math.sin(angle) * radius;
    regions.push({
      center: new THREE.Vector3(x, 0, z),
      radius: 4,
    });
  }

  return regions;
}

function calculateSkillPosition(
  _skill: Skill,
  index: number,
  total: number,
  region: { center: THREE.Vector3; radius: number }
): THREE.Vector3 {
  const angle = (index / total) * Math.PI * 2;
  const distance = (index / total) * region.radius;
  
  const x = region.center.x + Math.cos(angle) * distance;
  const y = (Math.random() - 0.5) * 2;
  const z = region.center.z + Math.sin(angle) * distance;

  return new THREE.Vector3(x, y, z);
}

function calculateSkillSize(level: number): number {
  return 0.3 + (level / 5) * 0.4;
}