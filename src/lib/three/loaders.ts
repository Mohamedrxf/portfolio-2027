import * as THREE from 'three';
import { GLTFLoader } from 'three-stdlib';
import { DRACOLoader } from 'three-stdlib';
import { RGBELoader } from 'three-stdlib';

const textureCache = new Map<string, THREE.Texture>();
const gltfCache = new Map<string, unknown>();
const hdrCache = new Map<string, THREE.DataTexture>();

let dracoLoader: DRACOLoader | null = null;
let loadingManager: THREE.LoadingManager | null = null;

export interface LoadersConfig {
  dracoPath?: string;
  onProgress?: (progress: number) => void;
  onError?: (error: Error) => void;
}

export function getLoadingManager(config?: LoadersConfig): THREE.LoadingManager {
  if (!loadingManager) {
    loadingManager = new THREE.LoadingManager();

    if (config?.onProgress) {
      loadingManager.onProgress = (_url, loaded, total) => {
        const progress = loaded / total;
        config.onProgress?.(progress);
      };
    }

    if (config?.onError) {
      loadingManager.onError = (url) => {
        config.onError?.(new Error(`Failed to load ${url}`));
      };
    }
  }

  return loadingManager;
}

export function getTextureLoader(): THREE.TextureLoader {
  return new THREE.TextureLoader(getLoadingManager());
}

export function getGLTFLoader(config?: LoadersConfig): GLTFLoader {
  const loader = new GLTFLoader(getLoadingManager(config));

  if (config?.dracoPath) {
    if (!dracoLoader) {
      dracoLoader = new DRACOLoader();
      dracoLoader.setDecoderPath(config.dracoPath);
    }
    loader.setDRACOLoader(dracoLoader);
  }

  return loader;
}

export function getRGBELoader(): RGBELoader {
  return new RGBELoader(getLoadingManager());
}

export function getCubeTextureLoader(): THREE.CubeTextureLoader {
  return new THREE.CubeTextureLoader(getLoadingManager());
}

export async function loadTexture(
  url: string,
  useCache: boolean = true
): Promise<THREE.Texture> {
  if (useCache && textureCache.has(url)) {
    return textureCache.get(url)!;
  }

  const loader = getTextureLoader();
  const texture = await new Promise<THREE.Texture>((resolve, reject) => {
    loader.load(
      url,
      (loadedTexture) => resolve(loadedTexture),
      undefined,
      reject
    );
  });

  if (useCache) {
    textureCache.set(url, texture);
  }

  return texture;
}

export async function loadGLTF(
  url: string,
  useCache: boolean = true,
  config?: LoadersConfig
): Promise<unknown> {
  if (useCache && gltfCache.has(url)) {
    return gltfCache.get(url)!;
  }

  const loader = getGLTFLoader(config);
  const gltf = await new Promise<unknown>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

  if (useCache) {
    gltfCache.set(url, gltf);
  }

  return gltf;
}

export async function loadHDR(
  url: string,
  useCache: boolean = true
): Promise<THREE.DataTexture> {
  if (useCache && hdrCache.has(url)) {
    return hdrCache.get(url)!;
  }

  const loader = getRGBELoader();
  const texture = await new Promise<THREE.DataTexture>((resolve, reject) => {
    loader.load(url, resolve, undefined, reject);
  });

  if (useCache) {
    hdrCache.set(url, texture);
  }

  return texture;
}

export async function loadCubeTexture(
  urls: string[],
  useCache: boolean = true
): Promise<THREE.CubeTexture> {
  const cacheKey = urls.join(',');

  if (useCache && textureCache.has(cacheKey)) {
    return textureCache.get(cacheKey) as THREE.CubeTexture;
  }

  const loader = getCubeTextureLoader();
  const texture = await new Promise<THREE.CubeTexture>((resolve, reject) => {
    loader.load(urls, resolve, undefined, reject);
  });

  if (useCache) {
    textureCache.set(cacheKey, texture);
  }

  return texture;
}

export function clearTextureCache(): void {
  textureCache.forEach((texture) => {
    texture.dispose();
  });
  textureCache.clear();
}

export function clearGLTFCache(): void {
  gltfCache.clear();
}

export function clearHDRCache(): void {
  hdrCache.forEach((texture) => {
    texture.dispose();
  });
  hdrCache.clear();
}

export function clearAllCaches(): void {
  clearTextureCache();
  clearGLTFCache();
  clearHDRCache();
}

export function disposeLoaders(): void {
  if (dracoLoader) {
    dracoLoader.dispose();
    dracoLoader = null;
  }

  if (loadingManager) {
    loadingManager = null;
  }

  clearAllCaches();
}
