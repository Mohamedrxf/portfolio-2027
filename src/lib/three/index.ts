export { createRenderer, type RendererConfig, type RendererResult } from './renderer';
export { createScene, type SceneConfig, type SceneResult } from './scene';
export {
  createPerspectiveCamera,
  createOrthographicCamera,
  calculateResponsiveFOV,
  type PerspectiveCameraConfig,
  type OrthographicCameraConfig,
  type CameraResult,
} from './camera';
export {
  createAmbientLight,
  createDirectionalLight,
  createHemisphereLight,
  createPointLight,
  createSpotLight,
  createRectAreaLight,
  type AmbientLightConfig,
  type DirectionalLightConfig,
  type HemisphereLightConfig,
  type PointLightConfig,
  type SpotLightConfig,
  type RectAreaLightConfig,
} from './lights';
export {
  getLoadingManager,
  getTextureLoader,
  getGLTFLoader,
  getRGBELoader,
  getCubeTextureLoader,
  loadTexture,
  loadGLTF,
  loadHDR,
  loadCubeTexture,
  clearTextureCache,
  clearGLTFCache,
  clearHDRCache,
  clearAllCaches,
  disposeLoaders,
  type LoadersConfig,
} from './loaders';
export {
  createEnvironment,
  createSkybox,
  applyEnvironmentPreset,
  createGradientBackground,
  disposeEnvironment,
  type EnvironmentPreset,
  type EnvironmentConfig,
  type EnvironmentResult,
} from './environment';
export {
  createOrbitControls,
  type OrbitControlsConfig,
  type ControlsResult,
} from './controls';
export { useThree, type UseThreeConfig, type UseThreeResult } from './hooks/useThree';
export { useResize, type UseResizeConfig } from './hooks/useResize';
export { useAnimationFrame, type UseAnimationFrameConfig } from './hooks/useAnimationFrame';
export {
  disposeGeometry,
  disposeMaterial,
  disposeMaterials,
  disposeTexture,
  disposeObject3D,
  disposeScene,
  disposeRenderer,
  disposeRenderTarget,
  cleanArray,
} from './utils/cleanup';
export {
  degreesToRadians,
  radiansToDegrees,
  lerp,
  clampValue,
  mapRange,
  smoothstep,
  damp,
  dampVector,
  randomRange,
  randomIntRange,
  randomVector3,
  distanceSquared,
  normalizeAngle,
  angleDifference,
} from './utils/math';
export {
  getViewportDimensions,
  screenToWorld,
  worldToScreen,
  createRaycaster,
  raycast,
  getFrustumPlanes,
  isObjectInView,
  getVisibleHeightAtZDepth,
  getVisibleWidthAtZDepth,
  type ViewportDimensions,
} from './utils/viewport';
