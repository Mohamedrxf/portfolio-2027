# State Management Architecture Documentation

**Version:** 1.0  
**Date:** August 1, 2026  
**Project:** Portfolio 2027

---

## Table of Contents

1. [Overview](#overview)
2. [State Management Philosophy](#state-management-philosophy)
3. [Context Architecture](#context-architecture)
4. [Local State Management](#local-state-management)
5. [State Persistence Strategy](#state-persistence-strategy)
6. [State Update Patterns](#state-update-patterns)
7. [Performance Considerations](#performance-considerations)
8. [State Management Summary](#state-management-summary)

---

## Overview

The portfolio uses a lightweight, context-based state management approach. Given the application's scope (a personal portfolio), external state management libraries (Redux, Zustand, Jotai) are unnecessary. React Context combined with React 19's built-in state management features provides a simple, performant solution.

### State Management Goals

1. **Simplicity:** Easy to understand and maintain
2. **Performance:** Minimize unnecessary re-renders
3. **Type Safety:** Full TypeScript support
4. **Scalability:** Easy to add new state as needed
5. **Predictability:** Clear data flow and state updates

### Technology Stack

| Technology | Purpose |
|------------|---------|
| React Context | Global state management |
| React useState | Local component state |
| React useReducer | Complex local state |
| Custom Hooks | Reusable state logic |
| localStorage | Persistence |
| React 19 Features | Concurrent rendering, automatic batching |

---

## State Management Philosophy

### Principles

1. **Minimal Global State**
   - Only state that truly needs to be global is placed in context
   - Prefer local state over global state
   - Co-locate state with where it's used

2. **Co-location**
   - State is kept as close to where it's used as possible
   - Related state is grouped together
   - State and UI are in the same file when appropriate

3. **Immutability**
   - All state updates are immutable (enforced by React)
   - Never mutate state directly
   - Use spread operator or create new objects

4. **Type Safety**
   - All state is strongly typed with TypeScript
   - Interfaces define state shapes
   - Type checking at compile time

5. **Performance**
   - Contexts are split by concern to minimize re-renders
   - Memoization used where appropriate
   - Unnecessary state updates avoided

6. **Single Source of Truth**
   - Each piece of data has a single source
   - Derived state is computed, not stored
   - No duplicate state

---

## Context Architecture

### Context Providers Hierarchy

```
App
├── ThemeProvider
│   └── AnimationProvider
│       └── ScrollProvider
│           └── Router
```

### Hierarchy Rationale

Contexts are nested from least specific to most specific:

1. **ThemeProvider** - Affects entire application (colors, styles)
2. **AnimationProvider** - Affects most components (animations, motion)
3. **ScrollProvider** - Affects route-level components (scroll-driven effects)

This nesting ensures that:
- Context values are available to all child components
- More specific contexts can access less specific contexts
- Re-renders are minimized by splitting concerns

---

### ThemeContext

#### Purpose

Manage theme state (dark/light mode) and system preference detection.

#### Implementation

```typescript
// src/context/ThemeContext.tsx

import { createContext, useContext, useState, useEffect } from 'react'

interface ThemeState {
  theme: 'dark' | 'light' | 'system'
  setTheme: (theme: 'dark' | 'light' | 'system') => void
  effectiveTheme: 'dark' | 'light'
}

interface ThemeContextValue extends ThemeState {
  isDark: boolean
}

const ThemeContext = createContext<ThemeContextValue | undefined>(undefined)

export function ThemeProvider({ children }: { children: ReactNode }) {
  const [theme, setTheme] = useState<'dark' | 'light' | 'system'>('system')
  const [effectiveTheme, setEffectiveTheme] = useState<'dark' | 'light'>('dark')
  
  // Resolve system preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
    const handleChange = (e: MediaQueryListEvent) => {
      if (theme === 'system') {
        setEffectiveTheme(e.matches ? 'dark' : 'light')
      }
    }
    
    // Initial resolution
    setEffectiveTheme(mediaQuery.matches ? 'dark' : 'light')
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [theme])
  
  // Persist to localStorage
  useEffect(() => {
    const saved = localStorage.getItem('theme') as 'dark' | 'light' | 'system'
    if (saved) setTheme(saved)
  }, [])
  
  useEffect(() => {
    localStorage.setItem('theme', theme)
  }, [theme])
  
  // Apply theme to document
  useEffect(() => {
    document.documentElement.setAttribute('data-theme', effectiveTheme)
  }, [effectiveTheme])
  
  const value: ThemeContextValue = {
    theme,
    setTheme,
    effectiveTheme,
    isDark: effectiveTheme === 'dark'
  }
  
  return <ThemeContext.Provider value={value}>{children}</ThemeContext.Provider>
}

export function useTheme() {
  const context = useContext(ThemeContext)
  if (!context) throw new Error('useTheme must be used within ThemeProvider')
  return context
}
```

#### State Schema

```typescript
interface ThemeState {
  theme: 'dark' | 'light' | 'system'      // User preference
  effectiveTheme: 'dark' | 'light'        // Resolved theme
  isDark: boolean                         // Convenience flag
}
```

#### State Values

| State | Type | Description |
|-------|------|-------------|
| `theme` | `'dark' \| 'light' \| 'system'` | User's theme preference |
| `effectiveTheme` | `'dark' \| 'light'` | Actual theme applied (resolved from system if theme is 'system') |
| `isDark` | `boolean` | Convenience flag, true if effectiveTheme is 'dark' |

#### Actions

| Action | Parameters | Description |
|--------|------------|-------------|
| `setTheme` | `theme: 'dark' \| 'light' \| 'system'` | Update theme preference |

#### Persistence

- **Storage:** localStorage
- **Key:** `'theme'`
- **Format:** JSON string
- **Default:** `'system'`

#### System Preference Detection

```typescript
// Detect system color scheme preference
const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)')
const prefersDark = mediaQuery.matches

// Listen for changes
mediaQuery.addEventListener('change', (e) => {
  const newPrefersDark = e.matches
  // Update effectiveTheme if theme is 'system'
})
```

#### Usage Example

```typescript
// In a component
import { useTheme } from '../context/ThemeContext'

export function ThemeToggle() {
  const { theme, setTheme, isDark } = useTheme()
  
  return (
    <button onClick={() => setTheme(isDark ? 'light' : 'dark')}>
      {isDark ? '☀️' : '🌙'}
    </button>
  )
}
```

---

### AnimationContext

#### Purpose

Manage animation preferences and performance settings.

#### Implementation

```typescript
// src/context/AnimationContext.tsx

import { createContext, useContext, useState, useEffect } from 'react'

interface AnimationState {
  reducedMotion: boolean
  animationsEnabled: boolean
  animationQuality: 'high' | 'low'
  setAnimationsEnabled: (enabled: boolean) => void
  setAnimationQuality: (quality: 'high' | 'low') => void
}

const AnimationContext = createContext<AnimationState | undefined>(undefined)

export function AnimationProvider({ children }: { children: ReactNode }) {
  const [animationsEnabled, setAnimationsEnabled] = useState(true)
  const [animationQuality, setAnimationQuality] = useState<'high' | 'low'>('high')
  const [reducedMotion, setReducedMotion] = useState(false)
  
  // Detect reduced motion preference
  useEffect(() => {
    const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
    setReducedMotion(mediaQuery.matches)
    
    const handleChange = (e: MediaQueryListEvent) => {
      setReducedMotion(e.matches)
    }
    
    mediaQuery.addEventListener('change', handleChange)
    return () => mediaQuery.removeEventListener('change', handleChange)
  }, [])
  
  // Persist settings
  useEffect(() => {
    const saved = localStorage.getItem('animationSettings')
    if (saved) {
      const settings = JSON.parse(saved)
      setAnimationsEnabled(settings.enabled ?? true)
      setAnimationQuality(settings.quality ?? 'high')
    }
  }, [])
  
  useEffect(() => {
    localStorage.setItem('animationSettings', JSON.stringify({
      enabled: animationsEnabled,
      quality: animationQuality
    }))
  }, [animationsEnabled, animationQuality])
  
  const value: AnimationState = {
    reducedMotion,
    animationsEnabled: animationsEnabled && !reducedMotion,
    animationQuality,
    setAnimationsEnabled,
    setAnimationQuality
  }
  
  return <AnimationContext.Provider value={value}>{children}</AnimationContext.Provider>
}

export function useAnimation() {
  const context = useContext(AnimationContext)
  if (!context) throw new Error('useAnimation must be used within AnimationProvider')
  return context
}
```

#### State Schema

```typescript
interface AnimationState {
  reducedMotion: boolean              // System preference (read-only)
  animationsEnabled: boolean          // Master toggle (respects reducedMotion)
  animationQuality: 'high' | 'low'    // Performance setting
}
```

#### State Values

| State | Type | Description | Read-Only |
|-------|------|-------------|-----------|
| `reducedMotion` | `boolean` | System prefers reduced motion | Yes |
| `animationsEnabled` | `boolean` | Animations enabled (respects reducedMotion) | No |
| `animationQuality` | `'high' \| 'low'` | Animation quality setting | No |

#### Actions

| Action | Parameters | Description |
|--------|------------|-------------|
| `setAnimationsEnabled` | `enabled: boolean` | Enable/disable animations |
| `setAnimationQuality` | `quality: 'high' \| 'low'` | Set animation quality |

#### Persistence

- **Storage:** localStorage
- **Key:** `'animationSettings'`
- **Format:** JSON string
- **Default:** `{ enabled: true, quality: 'high' }`

#### Reduced Motion Detection

```typescript
// Detect prefers-reduced-motion
const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)')
const prefersReducedMotion = mediaQuery.matches

// When reducedMotion is true, animationsEnabled is forced to false
const effectiveAnimationsEnabled = animationsEnabled && !reducedMotion
```

#### Usage Example

```typescript
// In an animation component
import { useAnimation } from '../context/AnimationContext'

export function AnimatedComponent() {
  const { animationsEnabled, animationQuality } = useAnimation()
  
  if (!animationsEnabled) {
    return <StaticComponent />
  }
  
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: animationQuality === 'high' ? 0.5 : 0.2 }}
    >
      {/* Content */}
    </motion.div>
  )
}
```

---

### ScrollContext

#### Purpose

Manage scroll state and Lenis smooth scrolling instance.

#### Implementation

```typescript
// src/context/ScrollContext.tsx

import { createContext, useContext, useState, useEffect, useRef } from 'react'
import Lenis from '@studio-freight/lenis'

interface ScrollState {
  scrollY: number
  scrollDirection: 'up' | 'down'
  scrollProgress: number
  isScrolling: boolean
  lenis: Lenis | null
  scrollTo: (y: number) => void
  scrollToTop: () => void
}

const ScrollContext = createContext<ScrollState | undefined>(undefined)

export function ScrollProvider({ children }: { children: ReactNode }) {
  const [scrollY, setScrollY] = useState(0)
  const [scrollDirection, setScrollDirection] = useState<'up' | 'down'>('down')
  const [scrollProgress, setScrollProgress] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)
  const [lenis, setLenis] = useState<Lenis | null>(null)
  const scrollTimeoutRef = useRef<NodeJS.Timeout>()
  
  // Initialize Lenis
  useEffect(() => {
    const lenisInstance = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      smooth: true
    })
    
    setLenis(lenisInstance)
    
    const raf = (time: number) => {
      lenisInstance.raf(time)
      requestAnimationFrame(raf)
    }
    
    requestAnimationFrame(raf)
    
    return () => {
      lenisInstance.destroy()
    }
  }, [])
  
  // Track scroll position
  useEffect(() => {
    if (!lenis) return
    
    const onScroll = () => {
      const currentY = lenis.scroll
      const direction = currentY > scrollY ? 'down' : 'up'
      const progress = currentY / (lenis.limit - window.innerHeight)
      
      setScrollY(currentY)
      setScrollDirection(direction)
      setScrollProgress(Math.min(1, Math.max(0, progress)))
      setIsScrolling(true)
      
      // Clear previous timeout
      if (scrollTimeoutRef.current) {
        clearTimeout(scrollTimeoutRef.current)
      }
      
      // Set isScrolling to false after 150ms of no scroll
      scrollTimeoutRef.current = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }
    
    lenis.on('scroll', onScroll)
    
    return () => {
      lenis.off('scroll', onScroll)
    }
  }, [lenis, scrollY])
  
  const scrollTo = (y: number) => {
    lenis?.scrollTo(y)
  }
  
  const scrollToTop = () => {
    lenis?.scrollTo(0)
  }
  
  const value: ScrollState = {
    scrollY,
    scrollDirection,
    scrollProgress,
    isScrolling,
    lenis,
    scrollTo,
    scrollToTop
  }
  
  return <ScrollContext.Provider value={value}>{children}</ScrollContext.Provider>
}

export function useScroll() {
  const context = useContext(ScrollContext)
  if (!context) throw new Error('useScroll must be used within ScrollProvider')
  return context
}
```

#### State Schema

```typescript
interface ScrollState {
  scrollY: number                    // Current scroll position in pixels
  scrollDirection: 'up' | 'down'    // Current scroll direction
  scrollProgress: number             // Scroll progress from 0 to 1
  isScrolling: boolean               // User is actively scrolling
  lenis: Lenis | null                // Lenis smooth scroll instance
}
```

#### State Values

| State | Type | Description | Range |
|-------|------|-------------|-------|
| `scrollY` | `number` | Current scroll position | 0 to document height |
| `scrollDirection` | `'up' \| 'down'` | Current scroll direction | - |
| `scrollProgress` | `number` | Scroll progress ratio | 0 to 1 |
| `isScrolling` | `boolean` | User is actively scrolling | - |
| `lenis` | `Lenis \| null` | Lenis instance | - |

#### Actions

| Action | Parameters | Description |
|--------|------------|-------------|
| `scrollTo` | `y: number` | Scroll to specific Y position |
| `scrollToTop` | - | Scroll to top of page |

#### Persistence

- **Storage:** None (ephemeral state)
- **Reason:** Scroll position is reset on navigation

#### Lenis Configuration

```typescript
const lenisConfig = {
  duration: 1.2,                          // Scroll duration in seconds
  easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)), // Easing function
  smooth: true,                           // Enable smooth scrolling
  // ... other options
}
```

#### Usage Example

```typescript
// In a component
import { useScroll } from '../context/ScrollContext'

export function ScrollProgress() {
  const { scrollProgress } = useScroll()
  
  return (
    <div className="scroll-progress">
      <div 
        className="progress-bar"
        style={{ width: `${scrollProgress * 100}%` }}
      />
    </div>
  )
}
```

---

## Local State Management

### Component-Level State

State that is local to a component and doesn't need to be shared:

| Component | State | Purpose |
|-----------|-------|---------|
| `Navigation` | `isMobileMenuOpen` | Mobile menu toggle |
| `Modal` | `isOpen` | Modal open/close state |
| `ContactForm` | `formData` | Form input values |
| `ContactForm` | `isSubmitting` | Form submission state |
| `ProjectsPage` | `selectedFilter` | Project category filter |
| `ProjectsPage` | `searchQuery` | Project search query |
| `ProjectModal` | `selectedProject` | Currently viewed project |

---

### State Management Patterns

#### Pattern 1: useState for Simple State

**Use Case:** Simple boolean, string, or number state

```typescript
const [isOpen, setIsOpen] = useState(false)
const [count, setCount] = useState(0)
const [name, setName] = useState('')
```

**Example:**
```typescript
export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  
  return (
    <>
      <button onClick={() => setIsOpen(!isOpen)}>
        {isOpen ? 'Close' : 'Menu'}
      </button>
      {isOpen && <MenuItems />}
    </>
  )
}
```

---

#### Pattern 2: useReducer for Complex State

**Use Case:** Complex state with multiple related values and actions

```typescript
interface FormState {
  name: string
  email: string
  subject: string
  message: string
  errors: Record<string, string>
}

type FormAction = 
  | { type: 'SET_FIELD'; field: string; value: string }
  | { type: 'SET_ERROR'; field: string; error: string }
  | { type: 'CLEAR_ERRORS' }

const initialState: FormState = {
  name: '',
  email: '',
  subject: '',
  message: '',
  errors: {}
}

function formReducer(state: FormState, action: FormAction): FormState {
  switch (action.type) {
    case 'SET_FIELD':
      return { ...state, [action.field]: action.value }
    case 'SET_ERROR':
      return { ...state, errors: { ...state.errors, [action.field]: action.error } }
    case 'CLEAR_ERRORS':
      return { ...state, errors: {} }
    default:
      return state
  }
}

export function ContactForm() {
  const [formState, dispatch] = useReducer(formReducer, initialState)
  
  const handleSubmit = (e: FormEvent) => {
    e.preventDefault()
    // Validation and submission
  }
  
  return (
    <form onSubmit={handleSubmit}>
      <input
        value={formState.name}
        onChange={(e) => dispatch({ type: 'SET_FIELD', field: 'name', value: e.target.value })}
      />
      {/* ... other fields */}
    </form>
  )
}
```

---

#### Pattern 3: Custom Hooks for Reusable State Logic

**Use Case:** State logic that needs to be reused across components

```typescript
// src/hooks/useIntersectionObserver.ts
export function useIntersectionObserver(options?: IntersectionObserverInit) {
  const [isIntersecting, setIsIntersecting] = useState(false)
  const ref = useRef<HTMLElement>(null)
  
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      setIsIntersecting(entry.isIntersecting)
    }, options)
    
    if (ref.current) observer.observe(ref.current)
    
    return () => observer.disconnect()
  }, [options])
  
  return [ref, isIntersecting] as const
}

// Usage
export function Component() {
  const [ref, isIntersecting] = useIntersectionObserver({ threshold: 0.5 })
  
  return (
    <div ref={ref} className={isIntersecting ? 'visible' : 'hidden'}>
      Content
    </div>
  )
}
```

---

#### Pattern 4: useRef for Mutable Values

**Use Case:** Values that persist across renders but don't trigger re-renders

```typescript
export function Component() {
  const intervalRef = useRef<NodeJS.Timeout>()
  const previousValueRef = useRef<string>()
  
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      // ...
    }, 1000)
    
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current)
      }
    }
  }, [])
  
  return <div>Content</div>
}
```

---

## State Persistence Strategy

### Persistence Layers

| State | Persistence Method | Trigger | Duration |
|-------|-------------------|---------|----------|
| Theme preference | localStorage | Theme change | Permanent |
| Animation settings | localStorage | Settings change | Permanent |
| Form data | sessionStorage (optional) | Form input | Session |
| Scroll position | Session history API | Route change | Session |

---

### localStorage Implementation

#### Theme Persistence

```typescript
// Save theme preference
useEffect(() => {
  localStorage.setItem('theme', theme)
}, [theme])

// Load theme preference
useEffect(() => {
  const saved = localStorage.getItem('theme')
  if (saved) setTheme(saved as 'dark' | 'light' | 'system')
}, [])
```

#### Animation Settings Persistence

```typescript
// Save animation settings
useEffect(() => {
  localStorage.setItem('animationSettings', JSON.stringify({
    enabled: animationsEnabled,
    quality: animationQuality
  }))
}, [animationsEnabled, animationQuality])

// Load animation settings
useEffect(() => {
  const saved = localStorage.getItem('animationSettings')
  if (saved) {
    const settings = JSON.parse(saved)
    setAnimationsEnabled(settings.enabled ?? true)
    setAnimationQuality(settings.quality ?? 'high')
  }
}, [])
```

---

### Generic Persistence Hook

```typescript
function usePersistedState<T>(key: string, initialValue: T) {
  const [state, setState] = useState<T>(() => {
    const saved = localStorage.getItem(key)
    return saved ? JSON.parse(saved) : initialValue
  })
  
  useEffect(() => {
    localStorage.setItem(key, JSON.stringify(state))
  }, [key, state])
  
  return [state, setState] as const
}

// Usage
const [theme, setTheme] = usePersistedState('theme', 'system')
```

---

### Session Storage (Future)

```typescript
// Form draft persistence
function useFormDraft<T>(key: string) {
  const [draft, setDraft] = useState<T>(() => {
    const saved = sessionStorage.getItem(key)
    return saved ? JSON.parse(saved) : {}
  })
  
  useEffect(() => {
    sessionStorage.setItem(key, JSON.stringify(draft))
  }, [key, draft])
  
  const clearDraft = () => {
    sessionStorage.removeItem(key)
    setDraft({} as T)
  }
  
  return [draft, setDraft, clearDraft] as const
}
```

---

## State Update Patterns

### Immutable Updates

All state updates are immutable. For complex objects:

```typescript
// Good: Immutable update
setUser(prev => ({ ...prev, name: newName }))

// Bad: Mutation
user.name = newName
setUser(user)
```

#### Object Updates

```typescript
// Update nested object
setState(prev => ({
  ...prev,
  nested: {
    ...prev.nested,
    value: newValue
  }
}))
```

#### Array Updates

```typescript
// Add item
setState(prev => [...prev, newItem])

// Remove item
setState(prev => prev.filter(item => item.id !== id))

// Update item
setState(prev => prev.map(item => 
  item.id === id ? { ...item, ...updates } : item
))
```

---

### Batched Updates

React 18+ automatically batches state updates. For explicit batching:

```typescript
import { unstable_batchedUpdates } from 'react-dom'

unstable_batchedUpdates(() => {
  setState1(value1)
  setState2(value2)
  setState3(value3)
})
```

---

### Derived State

Avoid storing derived state. Compute it from source state:

```typescript
// Good: Derived state
const fullName = `${firstName} ${lastName}`
const isAdult = age >= 18
const filteredItems = items.filter(item => item.active)

// Bad: Storing derived state
const [fullName, setFullName] = useState('')
useEffect(() => {
  setFullName(`${firstName} ${lastName}`)
}, [firstName, lastName])
```

---

### State Update Timing

#### Immediate Updates

```typescript
// State updates immediately
const [count, setCount] = useState(0)
setCount(count + 1) // Updates on next render
```

#### Functional Updates

```typescript
// Functional updates when new state depends on old state
const [count, setCount] = useState(0)
setCount(prev => prev + 1) // Safest for dependent updates
```

---

## Performance Considerations

### Context Optimization

#### Problem: Context Updates Cause Re-renders

When a context value updates, all consuming components re-render.

#### Solution 1: Split Contexts by Concern

Already implemented:
- ThemeContext
- AnimationContext
- ScrollContext

Each context manages a specific concern, minimizing unnecessary re-renders.

#### Solution 2: Memoize Context Value

```typescript
const value = useMemo(() => ({
  theme,
  setTheme,
  effectiveTheme,
  isDark
}), [theme, effectiveTheme])
```

#### Solution 3: Selective Consumption

```typescript
// Consume only what's needed
const { theme } = useTheme()
// instead of
const { theme, setTheme, effectiveTheme, isDark } = useTheme()
```

---

### Re-render Optimization

#### Pattern 1: React.memo for Expensive Components

```typescript
const ExpensiveComponent = React.memo(function ExpensiveComponent({ data }) {
  // Expensive computation
  return <div>{/* ... */}</div>
})
```

#### Pattern 2: useCallback for Event Handlers

```typescript
const handleClick = useCallback(() => {
  // Handler logic
}, [dependency])
```

#### Pattern 3: useMemo for Expensive Computations

```typescript
const sortedData = useMemo(() => {
  return data.sort((a, b) => a.value - b.value)
}, [data])
```

---

### Performance Monitoring

```typescript
// Monitor re-renders
useEffect(() => {
  console.log('Component re-rendered')
})

// Monitor context updates
useEffect(() => {
  console.log('Context updated:', theme)
}, [theme])
```

---

## State Management Summary

### State Management Decision Matrix

| Concern | Solution | Rationale |
|---------|----------|-----------|
| Global theme | ThemeContext | Affects entire app, needs persistence |
| Animation settings | AnimationContext | Affects multiple components, needs persistence |
| Scroll state | ScrollContext | Needed across components for scroll-driven effects |
| Form state | Local useState | Scoped to form component |
| Filter state | Local useState | Scoped to specific page |
| Modal state | Local useState | Scoped to modal component |

### Key Principles

1. **Prefer local state over global state**
   - Only use context when state truly needs to be global
   - Keep state as close to where it's used as possible

2. **Use context only when state truly needs to be global**
   - Theme, animation settings, scroll state are good candidates
   - Form data, filters, modal state are not

3. **Split contexts by concern to minimize re-renders**
   - One context per concern
   - Avoid monolithic context

4. **Persist meaningful user preferences**
   - Theme, animation settings
   - Not temporary state like scroll position

5. **Keep state simple and predictable**
   - Immutable updates
   - Derived state, not stored state
   - Clear data flow

### State Flow Diagram

```
User Action
    ↓
Event Handler
    ↓
State Update (setState / dispatch)
    ↓
Re-render
    ↓
UI Update
```

### Performance Targets

| Metric | Target | Strategy |
|--------|--------|----------|
| Context Re-renders | Minimize | Split contexts, memoize values |
| Component Re-renders | Minimize | React.memo, useCallback, useMemo |
| State Updates | Batch when possible | React 18 automatic batching |
| Derived State | Compute on render | Don't store derived state |

---

## Conclusion

The state management architecture provides a simple, performant, and type-safe approach to managing application state. Key features include:

- **Lightweight:** No external state management libraries needed
- **Type Safe:** Full TypeScript coverage
- **Performant:** Minimized re-renders through context splitting
- **Persistent:** User preferences saved to localStorage
- **Predictable:** Clear data flow and state update patterns
- **Scalable:** Easy to add new state as needed

The architecture is designed to scale with the application, supporting future enhancements such as additional contexts, more complex state management patterns, and server state integration.

---

**Document Version:** 1.0  
**Last Updated:** August 1, 2026  
**Next Review:** After Phase 2 completion
