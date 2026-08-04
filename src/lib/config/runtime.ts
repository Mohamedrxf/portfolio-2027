/**
 * Runtime configuration helpers
 * Runtime environment detection and configuration utilities
 */

export interface RuntimeConfig {
  isBrowser: boolean
  isServer: boolean
  isDevelopment: boolean
  isProduction: boolean
  isTest: boolean
  supports: {
    intersectionObserver: boolean
    resizeObserver: boolean
    localStorage: boolean
    sessionStorage: boolean
    webWorkers: boolean
    serviceWorkers: boolean
    webGL: boolean
    webGL2: boolean
  }
  performance: {
    memory: boolean
    navigationTiming: boolean
    resourceTiming: boolean
    paintTiming: boolean
  }
  device: {
    isMobile: boolean
    isTablet: boolean
    isDesktop: boolean
    touchSupported: boolean
  }
}

class RuntimeConfigManager {
  private config: RuntimeConfig

  constructor() {
    this.config = this.detectRuntimeConfig()
  }

  private detectRuntimeConfig(): RuntimeConfig {
    const isBrowser = typeof window !== 'undefined'
    const isServer = !isBrowser
    const isDevelopment = import.meta.env.DEV
    const isProduction = import.meta.env.PROD
    const isTest = import.meta.env.MODE === 'test'

    return {
      isBrowser,
      isServer,
      isDevelopment,
      isProduction,
      isTest,
      supports: this.detectSupport(),
      performance: this.detectPerformance(),
      device: this.detectDevice(),
    }
  }

  private detectSupport() {
    const isBrowser = typeof window !== 'undefined'

    return {
      intersectionObserver: isBrowser && 'IntersectionObserver' in window,
      resizeObserver: isBrowser && 'ResizeObserver' in window,
      localStorage: this.checkStorage('localStorage'),
      sessionStorage: this.checkStorage('sessionStorage'),
      webWorkers: isBrowser && 'Worker' in window,
      serviceWorkers: isBrowser && 'serviceWorker' in navigator,
      webGL: this.checkWebGL(1),
      webGL2: this.checkWebGL(2),
    }
  }

  private checkStorage(type: 'localStorage' | 'sessionStorage'): boolean {
    try {
      if (typeof window === 'undefined') return false
      const storage = window[type]
      const testKey = '__storage_test__'
      storage.setItem(testKey, 'test')
      storage.removeItem(testKey)
      return true
    } catch {
      return false
    }
  }

  private checkWebGL(version: 1 | 2): boolean {
    if (typeof window === 'undefined') return false

    try {
      const canvas = document.createElement('canvas')
      const gl = canvas.getContext(
        version === 2 ? 'webgl2' : 'webgl'
      ) as WebGLRenderingContext | null
      return gl !== null
    } catch {
      return false
    }
  }

  private detectPerformance() {
    const isBrowser = typeof window !== 'undefined'

    return {
      memory: isBrowser && 'memory' in performance,
      navigationTiming: isBrowser && 'performance' in window,
      resourceTiming:
        isBrowser && 'PerformanceResourceTiming' in window,
      paintTiming: isBrowser && 'PerformancePaintTiming' in window,
    }
  }

  private detectDevice() {
    const isBrowser = typeof window !== 'undefined'
    const userAgent = isBrowser ? navigator.userAgent : ''
    const maxTouchPoints = isBrowser ? navigator.maxTouchPoints || 0 : 0

    const isMobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent
      ) || maxTouchPoints > 0
    const isTablet =
      /iPad|Android(?!.*Mobile)|Tablet/i.test(userAgent) ||
      (maxTouchPoints > 0 && window.innerWidth >= 768)
    const isDesktop = !isMobile && !isTablet
    const touchSupported = maxTouchPoints > 0

    return {
      isMobile,
      isTablet,
      isDesktop,
      touchSupported,
    }
  }

  getConfig(): RuntimeConfig {
    return { ...this.config }
  }

  get(key: keyof RuntimeConfig): RuntimeConfig[keyof RuntimeConfig] {
    return this.config[key]
  }

  isSupported(feature: keyof RuntimeConfig['supports']): boolean {
    return this.config.supports[feature]
  }

  hasPerformanceAPI(
    api: keyof RuntimeConfig['performance']
  ): boolean {
    return this.config.performance[api]
  }
}

const runtimeConfig = new RuntimeConfigManager()

export { RuntimeConfigManager }
export const getRuntimeConfig = () => runtimeConfig.getConfig()
export const isBrowser = () => runtimeConfig.get('isBrowser')
export const isServer = () => runtimeConfig.get('isServer')
export const isDevelopment = () => runtimeConfig.get('isDevelopment')
export const isProduction = () => runtimeConfig.get('isProduction')
export const isTest = () => runtimeConfig.get('isTest')
