/**
 * Production configuration
 * Build optimization constants and production-specific settings
 */

export const productionConfig = {
  // Build optimization
  build: {
    // Chunk splitting strategy
    chunkSizeLimit: 244, // KB
    manualChunks: {
      vendor: ['react', 'react-dom'],
      router: ['react-router-dom'],
      animations: ['framer-motion', 'gsap'],
    },
  },

  // Performance targets
  performance: {
    // Core Web Vitals targets
    targets: {
      LCP: 2500, // Largest Contentful Paint (ms)
      FID: 100, // First Input Delay (ms)
      CLS: 0.1, // Cumulative Layout Shift
      FCP: 1800, // First Contentful Paint (ms)
      TTI: 3800, // Time to Interactive (ms)
      TBT: 200, // Total Blocking Time (ms)
    },
    // Resource budgets
    budgets: {
      javascript: 200, // KB total
      css: 50, // KB total
      images: 500, // KB total
      fonts: 100, // KB total
    },
  },

  // CDN configuration
  cdn: {
    enabled: true,
    // Asset optimization
    images: {
      formats: ['webp', 'avif'],
      quality: 85,
      lazy: true,
    },
    // Cache strategies
    cache: {
      static: 'public, max-age=31536000, immutable',
      dynamic: 'public, max-age=3600',
      api: 'no-cache',
    },
  },

  // Monitoring
  monitoring: {
    // Error tracking
    errors: {
      enabled: true,
      sampleRate: 1.0,
      ignorePatterns: [
        /ResizeObserver loop limit exceeded/,
        /Non-Error promise rejection captured/,
      ],
    },
    // Performance monitoring
    performance: {
      enabled: true,
      sampleRate: 0.1, // 10% sampling
    },
  },

  // Feature flags
  features: {
    // Animation optimizations
    animations: {
      reducedMotion: true,
      respectPrefersReducedMotion: true,
      disableParallax: false,
    },
    // Resource loading
    loading: {
      prefetch: true,
      preload: true,
      lazy: true,
    },
  },

  // Security headers
  security: {
    headers: {
      'X-Content-Type-Options': 'nosniff',
      'X-Frame-Options': 'DENY',
      'X-XSS-Protection': '1; mode=block',
      'Referrer-Policy': 'strict-origin-when-cross-origin',
    },
  },

  // Environment-specific settings
  environment: {
    isProduction: import.meta.env.PROD,
    isDevelopment: import.meta.env.DEV,
    isTest: import.meta.env.MODE === 'test',
  },
} as const

export type ProductionConfig = typeof productionConfig
