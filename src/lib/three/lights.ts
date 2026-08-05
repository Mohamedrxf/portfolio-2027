import * as THREE from 'three';
import { RectAreaLightUniformsLib } from 'three-stdlib';

let rectAreaLightInitialized = false;

export interface AmbientLightConfig {
  color?: THREE.Color | string;
  intensity?: number;
}

export interface DirectionalLightConfig {
  color?: THREE.Color | string;
  intensity?: number;
  position?: THREE.Vector3;
  castShadow?: boolean;
  shadowMapSize?: number;
  shadowCameraNear?: number;
  shadowCameraFar?: number;
  shadowCameraLeft?: number;
  shadowCameraRight?: number;
  shadowCameraTop?: number;
  shadowCameraBottom?: number;
}

export interface HemisphereLightConfig {
  skyColor?: THREE.Color | string;
  groundColor?: THREE.Color | string;
  intensity?: number;
  position?: THREE.Vector3;
}

export interface PointLightConfig {
  color?: THREE.Color | string;
  intensity?: number;
  distance?: number;
  decay?: number;
  position?: THREE.Vector3;
  castShadow?: boolean;
  shadowMapSize?: number;
}

export interface SpotLightConfig {
  color?: THREE.Color | string;
  intensity?: number;
  distance?: number;
  angle?: number;
  penumbra?: number;
  decay?: number;
  position?: THREE.Vector3;
  target?: THREE.Vector3;
  castShadow?: boolean;
  shadowMapSize?: number;
}

export interface RectAreaLightConfig {
  color?: THREE.Color | string;
  intensity?: number;
  width?: number;
  height?: number;
  position?: THREE.Vector3;
  lookAt?: THREE.Vector3;
}

const DEFAULT_AMBIENT_CONFIG: Required<AmbientLightConfig> = {
  color: new THREE.Color(0xffffff),
  intensity: 0.5,
};

const DEFAULT_DIRECTIONAL_CONFIG: Required<DirectionalLightConfig> = {
  color: new THREE.Color(0xffffff),
  intensity: 1,
  position: new THREE.Vector3(5, 10, 7.5),
  castShadow: true,
  shadowMapSize: 2048,
  shadowCameraNear: 0.5,
  shadowCameraFar: 500,
  shadowCameraLeft: -50,
  shadowCameraRight: 50,
  shadowCameraTop: 50,
  shadowCameraBottom: -50,
};

const DEFAULT_HEMISPHERE_CONFIG: Required<HemisphereLightConfig> = {
  skyColor: new THREE.Color(0xffffff),
  groundColor: new THREE.Color(0x444444),
  intensity: 0.6,
  position: new THREE.Vector3(0, 10, 0),
};

const DEFAULT_POINT_CONFIG: Required<PointLightConfig> = {
  color: new THREE.Color(0xffffff),
  intensity: 1,
  distance: 0,
  decay: 2,
  position: new THREE.Vector3(0, 5, 0),
  castShadow: false,
  shadowMapSize: 512,
};

const DEFAULT_SPOT_CONFIG: Required<SpotLightConfig> = {
  color: new THREE.Color(0xffffff),
  intensity: 1,
  distance: 0,
  angle: Math.PI / 6,
  penumbra: 0.5,
  decay: 2,
  position: new THREE.Vector3(0, 10, 0),
  target: new THREE.Vector3(0, 0, 0),
  castShadow: true,
  shadowMapSize: 1024,
};

const DEFAULT_RECT_AREA_CONFIG: Required<RectAreaLightConfig> = {
  color: new THREE.Color(0xffffff),
  intensity: 1,
  width: 10,
  height: 10,
  position: new THREE.Vector3(0, 5, 0),
  lookAt: new THREE.Vector3(0, 0, 0),
};

export function createAmbientLight(
  config: AmbientLightConfig = {}
): THREE.AmbientLight {
  const finalConfig = { ...DEFAULT_AMBIENT_CONFIG, ...config };

  const light = new THREE.AmbientLight(finalConfig.color, finalConfig.intensity);

  return light;
}

export function createDirectionalLight(
  config: DirectionalLightConfig = {}
): THREE.DirectionalLight {
  const finalConfig = { ...DEFAULT_DIRECTIONAL_CONFIG, ...config };

  const light = new THREE.DirectionalLight(finalConfig.color, finalConfig.intensity);
  light.position.copy(finalConfig.position);

  if (finalConfig.castShadow) {
    light.castShadow = true;
    light.shadow.mapSize.width = finalConfig.shadowMapSize;
    light.shadow.mapSize.height = finalConfig.shadowMapSize;
    light.shadow.camera.near = finalConfig.shadowCameraNear;
    light.shadow.camera.far = finalConfig.shadowCameraFar;
    light.shadow.camera.left = finalConfig.shadowCameraLeft;
    light.shadow.camera.right = finalConfig.shadowCameraRight;
    light.shadow.camera.top = finalConfig.shadowCameraTop;
    light.shadow.camera.bottom = finalConfig.shadowCameraBottom;
  }

  return light;
}

export function createHemisphereLight(
  config: HemisphereLightConfig = {}
): THREE.HemisphereLight {
  const finalConfig = { ...DEFAULT_HEMISPHERE_CONFIG, ...config };

  const light = new THREE.HemisphereLight(
    finalConfig.skyColor,
    finalConfig.groundColor,
    finalConfig.intensity
  );
  light.position.copy(finalConfig.position);

  return light;
}

export function createPointLight(
  config: PointLightConfig = {}
): THREE.PointLight {
  const finalConfig = { ...DEFAULT_POINT_CONFIG, ...config };

  const light = new THREE.PointLight(
    finalConfig.color,
    finalConfig.intensity,
    finalConfig.distance,
    finalConfig.decay
  );
  light.position.copy(finalConfig.position);

  if (finalConfig.castShadow) {
    light.castShadow = true;
    light.shadow.mapSize.width = finalConfig.shadowMapSize;
    light.shadow.mapSize.height = finalConfig.shadowMapSize;
  }

  return light;
}

export function createSpotLight(
  config: SpotLightConfig = {}
): THREE.SpotLight {
  const finalConfig = { ...DEFAULT_SPOT_CONFIG, ...config };

  const light = new THREE.SpotLight(
    finalConfig.color,
    finalConfig.intensity,
    finalConfig.distance,
    finalConfig.angle,
    finalConfig.penumbra,
    finalConfig.decay
  );
  light.position.copy(finalConfig.position);
  light.target.position.copy(finalConfig.target);

  if (finalConfig.castShadow) {
    light.castShadow = true;
    light.shadow.mapSize.width = finalConfig.shadowMapSize;
    light.shadow.mapSize.height = finalConfig.shadowMapSize;
  }

  return light;
}

export function createRectAreaLight(
  config: RectAreaLightConfig = {}
): THREE.RectAreaLight {
  if (!rectAreaLightInitialized) {
    RectAreaLightUniformsLib.init();
    rectAreaLightInitialized = true;
  }

  const finalConfig = { ...DEFAULT_RECT_AREA_CONFIG, ...config };

  const light = new THREE.RectAreaLight(
    finalConfig.color,
    finalConfig.intensity,
    finalConfig.width,
    finalConfig.height
  );
  light.position.copy(finalConfig.position);
  light.lookAt(finalConfig.lookAt);

  return light;
}
