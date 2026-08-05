import type { GalaxyCamera } from './GalaxyCamera';
import type { GalaxyInteraction } from './GalaxyInteraction';
import type { SkillLabels } from './SkillLabels';

export interface GalaxyControlsConfig {
  camera: GalaxyCamera;
  interaction: GalaxyInteraction;
  labels: SkillLabels;
}

export class GalaxyControls {
  private camera: GalaxyCamera;
  private interaction: GalaxyInteraction;
  private labels: SkillLabels;
  private prefersReducedMotion: boolean = false;
  private autoRotateEnabled: boolean = true;
  private boundHandleKeyDown: (event: KeyboardEvent) => void;
  private boundHandleResize: () => void;

  constructor(config: GalaxyControlsConfig) {
    this.camera = config.camera;
    this.interaction = config.interaction;
    this.labels = config.labels;
    
    this.boundHandleKeyDown = this.handleKeyDown.bind(this);
    this.boundHandleResize = this.handleResize.bind(this);
    
    this.checkReducedMotion();
    this.setupKeyboardListeners();
    this.setupResizeListener();
  }

  private checkReducedMotion(): void {
    if (typeof window !== 'undefined' && window.matchMedia) {
      this.prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
      
      // Disable auto-rotate if user prefers reduced motion
      if (this.prefersReducedMotion) {
        this.autoRotateEnabled = false;
        this.camera.setAutoRotate(false);
      }
    }
  }

  private setupKeyboardListeners(): void {
    if (typeof window !== 'undefined') {
      this.boundHandleKeyDown = this.handleKeyDown.bind(this);
      window.addEventListener('keydown', this.boundHandleKeyDown);
    }
  }

  private setupResizeListener(): void {
    if (typeof window !== 'undefined') {
      this.boundHandleResize = this.handleResize.bind(this);
      window.addEventListener('resize', this.boundHandleResize);
    }
  }

  private handleKeyDown(event: KeyboardEvent): void {
    this.interaction.handleKeyboard(event);
  }

  private handleResize(): void {
    this.labels.updateDeviceType();
  }

  public toggleAutoRotate(): void {
    if (!this.prefersReducedMotion) {
      this.autoRotateEnabled = !this.autoRotateEnabled;
      this.camera.setAutoRotate(this.autoRotateEnabled);
    }
  }

  public isAutoRotateEnabled(): boolean {
    return this.autoRotateEnabled;
  }

  public resetView(): void {
    this.camera.resetCamera();
  }

  public setAutoRotateSpeed(speed: number): void {
    this.camera.setAutoRotateSpeed(speed);
  }

  public dispose(): void {
    if (typeof window !== 'undefined') {
      window.removeEventListener('keydown', this.boundHandleKeyDown);
      window.removeEventListener('resize', this.boundHandleResize);
    }
  }
}