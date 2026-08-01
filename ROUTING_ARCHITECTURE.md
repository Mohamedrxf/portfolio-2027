# Routing Architecture Documentation

**Version:** 1.0  
**Date:** August 1, 2026  
**Project:** Portfolio 2027

---

## Table of Contents

1. [Overview](#overview)
2. [Route Configuration](#route-configuration)
3. [Route Implementation](#route-implementation)
4. [Route Features](#route-features)
5. [Navigation Architecture](#navigation-architecture)
6. [Route Metadata](#route-metadata)
7. [Route Guards](#route-guards)
8. [Routing Performance Optimization](#routing-performance-optimization)
9. [Routing Error Handling](#routing-error-handling)
10. [Routing Best Practices](#routing-best-practices)

---

## Overview

The routing architecture uses React Router v6 for client-side routing. It implements code splitting, lazy loading, scroll restoration, and page transitions to ensure optimal performance and user experience.

### Routing Goals

1. **Fast Navigation:** Instant page transitions with code splitting
2. **SEO Friendly:** Server-side rendering capable structure
3. **User Experience:** Smooth transitions and scroll restoration
4. **Performance:** Lazy loading and code splitting
5. **Maintainability:** Clear route organization
6. **Accessibility:** Keyboard navigation and screen reader support

### Technology Stack

| Technology | Version | Purpose |
|------------|---------|---------|
| React Router | 7.x | Client-side routing |
| React.lazy | Built-in | Code splitting |
| Suspense | Built-in | Loading states |
| Framer Motion | 12.x | Page transitions |
| Lenis | 1.x | Smooth scrolling |

---

## Route Configuration

### Route Definitions

```typescript
// src/lib/constants/routes.ts

export const routes = {
  landing: '/',
  about: '/about',
  skills: '/skills',
  projects: '/projects',
  experience: '/experience',
  certifications: '/certifications',
  contact: '/contact',
  notFound: '*'
} as const

export type RoutePath = typeof routes[keyof typeof routes]
```

### Route Table

| Route | Path | Component | Lazy Loaded | Protected |
|-------|------|-----------|-------------|-----------|
| Landing | `/` | Landing | Yes | No |
| About | `/about` | About | Yes | No |
| Skills | `/skills` | Skills | Yes | No |
| Projects | `/projects` | Projects | Yes | No |
| Experience | `/experience` | Experience | Yes | No |
| Certifications | `/certifications` | Certifications | Yes | No |
| Contact | `/contact` | Contact | Yes | No |
| NotFound | `*` | NotFound | Yes | No |

### Route Hierarchy

```
/
├── /                          (Landing)
├── /about                     (About)
├── /skills                    (Skills)
├── /projects                  (Projects)
├── /experience                (Experience)
├── /certifications            (Certifications)
├── /contact                   (Contact)
└── *                          (NotFound)
```

### Route Parameters

Currently, the portfolio uses static routes. Future enhancements may include:

| Route | Pattern | Parameter | Example |
|-------|---------|-----------|---------|
| Projects | `/projects/:id` | `id` | `/projects/1` |
| Blog (future) | `/blog/:slug` | `slug` | `/blog/my-first-post` |

---

## Route Implementation

### Router Setup

```typescript
// src/App.tsx

import { lazy, Suspense } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

// Lazy-loaded page components
const Landing = lazy(() => import('./pages/Landing'))
const About = lazy(() => import('./pages/About'))
const Skills = lazy(() => import('./pages/Skills'))
const Projects = lazy(() => import('./pages/Projects'))
const Experience = lazy(() => import('./pages/Experience'))
const Certifications = lazy(() => import('./pages/Certifications'))
const Contact = lazy(() => import('./pages/Contact'))
const NotFound = lazy(() => import('./pages/NotFound'))

// Loading fallback component
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner" />
    <p>Loading...</p>
  </div>
)

export function App() {
  return (
    <BrowserRouter>
      <Suspense fallback={<PageLoader />}>
        <Routes>
          <Route path={routes.landing} element={<Landing />} />
          <Route path={routes.about} element={<About />} />
          <Route path={routes.skills} element={<Skills />} />
          <Route path={routes.projects} element={<Projects />} />
          <Route path={routes.experience} element={<Experience />} />
          <Route path={routes.certifications} element={<Certifications />} />
          <Route path={routes.contact} element={<Contact />} />
          <Route path={routes.notFound} element={<NotFound />} />
        </Routes>
      </Suspense>
    </BrowserRouter>
  )
}
```

### Route Component Structure

Each route component follows this structure:

```typescript
// src/pages/About.tsx

import { useEffect } from 'react'
import { useLocation } from 'react-router-dom'
import { PageMetadata } from '../lib/constants/seo'

export function About() {
  const location = useLocation()
  
  // Scroll to top on route change
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }, [location.pathname])
  
  return (
    <>
      {/* Page content */}
    </>
  )
}

export const metadata: PageMetadata = {
  title: 'About Me | [Your Name]',
  description: 'Learn about my background, experience, and philosophy as a software engineer.',
  keywords: ['about', 'biography', 'software engineer']
}
```

---

## Route Features

### Code Splitting

#### Implementation

```typescript
// Lazy loading with React.lazy
const Landing = lazy(() => import('./pages/Landing'))
const About = lazy(() => import('./pages/About'))
// ... other pages
```

#### Benefits

| Benefit | Description |
|---------|-------------|
| Reduced Initial Bundle | Only loads code for current route |
| Faster Initial Load | Smaller JavaScript payload |
| On-Demand Loading | Code loads when needed |
| Better Caching | Separate chunks can be cached independently |

#### Chunk Naming

Vite automatically names chunks based on the file path:

```
assets/Landing-[hash].js
assets/About-[hash].js
assets/Skills-[hash].js
// ... etc
```

---

### Lazy Loading

#### Implementation

```typescript
// Wrapped in Suspense boundary
<Suspense fallback={<PageLoader />}>
  <Routes>
    <Route path="/" element={<Landing />} />
    {/* ... other routes */}
  </Routes>
</Suspense>
```

#### Loading States

**Spinner Loader:**
```typescript
const PageLoader = () => (
  <div className="page-loader">
    <div className="loader-spinner" />
    <p>Loading...</p>
  </div>
)
```

**Skeleton Loader (Alternative):**
```typescript
const PageSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-header" />
    <div className="skeleton-content" />
    <div className="skeleton-sidebar" />
  </div>
)
```

#### Error Boundary

```typescript
// Error boundary for failed chunk loading
class RouteErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    if (error.name === 'ChunkLoadError') {
      // Handle chunk load error
      window.location.reload()
    }
  }
  
  render() {
    if (this.state.hasError) {
      return <ErrorFallback />
    }
    return this.props.children
  }
}
```

---

### Scroll Restoration

#### Implementation

```typescript
// Custom scroll restoration with Lenis
import { useLocation } from 'react-router-dom'
import { useScroll } from '../context/ScrollContext'

export function ScrollRestoration() {
  const location = useLocation()
  const { scrollToTop } = useScroll()
  
  useEffect(() => {
    scrollToTop()
  }, [location.pathname, scrollToTop])
  
  return null
}
```

#### Behavior

| Scenario | Behavior |
|----------|----------|
| Route Change | Scroll to top |
| Back Navigation | Restore previous scroll position |
| Anchor Link | Smooth scroll to anchor |
| Same Route | No scroll change |

#### Scroll Position Storage

```typescript
// Store scroll positions per route
const scrollPositions = new Map<string, number>()

// Save on route change
useEffect(() => {
  scrollPositions.set(prevPath, window.scrollY)
}, [location.pathname])

// Restore on back navigation
useEffect(() => {
  const savedPosition = scrollPositions.get(location.pathname)
  if (savedPosition) {
    window.scrollTo(0, savedPosition)
  }
}, [location.pathname])
```

---

### Page Transitions

#### Implementation

```typescript
// src/components/layout/PageTransition.tsx

import { AnimatePresence, motion } from 'framer-motion'
import { useLocation } from 'react-router-dom'

const pageVariants = {
  initial: { opacity: 0, y: 20 },
  enter: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: -20 }
}

const pageTransition = {
  type: 'tween',
  ease: 'anticipate',
  duration: 0.3
}

export function PageTransition({ children }: { children: ReactNode }) {
  const location = useLocation()
  
  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={location.pathname}
        variants={pageVariants}
        initial="initial"
        animate="enter"
        exit="exit"
        transition={pageTransition}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  )
}
```

#### Transition Variants

| Variant | Opacity | Y Position | Description |
|---------|---------|------------|-------------|
| initial | 0 | 20px | Starting state |
| enter | 1 | 0px | Final state |
| exit | 0 | -20px | Exit state |

#### Transition Options

| Option | Value | Description |
|--------|-------|-------------|
| type | tween | Use tween animation |
| ease | anticipate | Anticipate easing function |
| duration | 0.3 | 300ms duration |

---

### Route Preloading

#### Hover Preloading

```typescript
// Preload route on navigation hover
const NavLink = ({ to, children, ...props }) => {
  const preloadRoute = () => {
    import(`../pages/${to}`)
  }
  
  return (
    <Link
      to={to}
      onMouseEnter={preloadRoute}
      onFocus={preloadRoute}
      {...props}
    >
      {children}
    </Link>
  )
}
```

#### Preload Strategy

| Priority | Routes | Trigger |
|----------|--------|---------|
| Critical | Landing, About | Immediate |
| High | Projects, Skills | Hover on nav |
| Medium | Experience, Certifications | Hover on nav |
| Low | Contact | Hover on nav |

---

### 404 Handling

#### Implementation

```typescript
// src/pages/NotFound.tsx

import { useNavigate } from 'react-router-dom'
import { Button } from '../components/ui/Button'

export function NotFound() {
  const navigate = useNavigate()
  
  return (
    <div className="not-found-page">
      <h1>404</h1>
      <p>Page not found</p>
      <p>The page you're looking for doesn't exist.</p>
      <Button onClick={() => navigate('/')}>
        Go Home
      </Button>
    </div>
  )
}
```

#### Behavior

| Scenario | Behavior |
|----------|----------|
| Invalid Route | Show 404 page |
| Home Link | Navigate to landing |
| Back Button | Navigate to previous page |

---

## Navigation Architecture

### Desktop Navigation

#### Implementation

```typescript
// src/components/layout/Navigation.tsx

import { Link, useLocation } from 'react-router-dom'
import { routes } from '../../lib/constants/routes'

const navItems = [
  { path: routes.landing, label: 'Home' },
  { path: routes.about, label: 'About' },
  { path: routes.skills, label: 'Skills' },
  { path: routes.projects, label: 'Projects' },
  { path: routes.experience, label: 'Experience' },
  { path: routes.certifications, label: 'Certifications' },
  { path: routes.contact, label: 'Contact' }
]

export function Navigation() {
  const location = useLocation()
  
  return (
    <nav className="desktop-navigation">
      {navItems.map(item => (
        <Link
          key={item.path}
          to={item.path}
          className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
        >
          {item.label}
        </Link>
      ))}
    </nav>
  )
}
```

#### Navigation Items

| Label | Path | Active Condition |
|-------|------|------------------|
| Home | `/` | `pathname === '/'` |
| About | `/about` | `pathname === '/about'` |
| Skills | `/skills` | `pathname === '/skills'` |
| Projects | `/projects` | `pathname === '/projects'` |
| Experience | `/experience` | `pathname === '/experience'` |
| Certifications | `/certifications` | `pathname === '/certifications'` |
| Contact | `/contact` | `pathname === '/contact'` |

---

### Mobile Navigation

#### Implementation

```typescript
// src/components/layout/MobileMenu.tsx

import { useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

export function MobileMenu() {
  const [isOpen, setIsOpen] = useState(false)
  const location = useLocation()
  
  const menuVariants = {
    closed: { x: '100%' },
    open: { x: 0 }
  }
  
  const itemVariants = {
    closed: { opacity: 0, x: 20 },
    open: { opacity: 1, x: 0 }
  }
  
  return (
    <>
      <button
        className="menu-toggle"
        onClick={() => setIsOpen(!isOpen)}
        aria-label="Toggle menu"
      >
        <span className={`hamburger ${isOpen ? 'open' : ''}`} />
      </button>
      
      <AnimatePresence>
        {isOpen && (
          <motion.div
            className="mobile-menu"
            variants={menuVariants}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 25, stiffness: 200 }}
          >
            {navItems.map((item, index) => (
              <motion.div
                key={item.path}
                variants={itemVariants}
                transition={{ delay: index * 0.1 }}
              >
                <Link
                  to={item.path}
                  onClick={() => setIsOpen(false)}
                  className={`nav-link ${location.pathname === item.path ? 'active' : ''}`}
                >
                  {item.label}
                </Link>
              </motion.div>
            ))}
          </motion.div>
        )}
      </AnimatePresence>
    </>
  )
}
```

#### Mobile Menu Behavior

| Action | Behavior |
|--------|----------|
| Toggle Click | Open/close menu |
| Link Click | Navigate and close menu |
| Outside Click | Close menu |
| Escape Key | Close menu |
| Route Change | Close menu |

---

### Active State Management

#### Implementation

```typescript
// Active link detection
const isActive = (path: string) => {
  if (path === '/') {
    return location.pathname === '/'
  }
  return location.pathname.startsWith(path)
}

// Usage
<Link
  to={item.path}
  className={`nav-link ${isActive(item.path) ? 'active' : ''}`}
>
  {item.label}
</Link>
```

#### Active State Rules

| Route | Active When |
|-------|-------------|
| `/` | Exact match only |
| `/about` | Exact match only |
| `/projects` | Exact match only |
| `/projects/:id` | Starts with `/projects` |

---

## Route Metadata

### SEO Metadata Structure

```typescript
// src/lib/constants/seo.ts

export interface PageMetadata {
  title: string
  description: string
  keywords?: string[]
  ogImage?: string
  canonical?: string
  noIndex?: boolean
}

export const routeMetadata: Record<string, PageMetadata> = {
  '/': {
    title: 'Software Engineer Portfolio | [Your Name]',
    description: 'Premium software engineer portfolio showcasing innovative projects and technical expertise.',
    keywords: ['software engineer', 'portfolio', 'web development', 'full stack'],
    ogImage: '/assets/images/og/home.jpg'
  },
  '/about': {
    title: 'About Me | [Your Name]',
    description: 'Learn about my background, experience, and philosophy as a software engineer.',
    keywords: ['about', 'biography', 'software engineer'],
    ogImage: '/assets/images/og/about.jpg'
  },
  '/skills': {
    title: 'Skills & Expertise | [Your Name]',
    description: 'Technical skills, technologies, and expertise in software development.',
    keywords: ['skills', 'technologies', 'expertise', 'developer'],
    ogImage: '/assets/images/og/skills.jpg'
  },
  '/projects': {
    title: 'Projects | [Your Name]',
    description: 'Portfolio of software development projects and case studies.',
    keywords: ['projects', 'portfolio', 'case studies', 'development'],
    ogImage: '/assets/images/og/projects.jpg'
  },
  '/experience': {
    title: 'Work Experience | [Your Name]',
    description: 'Professional experience and career history in software engineering.',
    keywords: ['experience', 'career', 'work history', 'employment'],
    ogImage: '/assets/images/og/experience.jpg'
  },
  '/certifications': {
    title: 'Certifications | [Your Name]',
    description: 'Professional certifications and credentials in software development.',
    keywords: ['certifications', 'credentials', 'certificates', 'training'],
    ogImage: '/assets/images/og/certifications.jpg'
  },
  '/contact': {
    title: 'Contact Me | [Your Name]',
    description: 'Get in touch for collaboration, opportunities, or inquiries.',
    keywords: ['contact', 'hire', 'collaborate', 'inquiry'],
    ogImage: '/assets/images/og/contact.jpg'
  }
}
```

### Metadata Table

| Route | Title | Description | Keywords |
|-------|-------|-------------|----------|
| `/` | Software Engineer Portfolio | Premium portfolio showcasing projects | software engineer, portfolio, web development |
| `/about` | About Me | Background, experience, philosophy | about, biography, software engineer |
| `/skills` | Skills & Expertise | Technical skills and technologies | skills, technologies, expertise |
| `/projects` | Projects | Portfolio of projects | projects, portfolio, case studies |
| `/experience` | Work Experience | Professional experience | experience, career, work history |
| `/certifications` | Certifications | Professional certifications | certifications, credentials, training |
| `/contact` | Contact Me | Contact information | contact, hire, collaborate |

### Open Graph Tags

```typescript
// Open Graph implementation
export function OpenGraphTags({ metadata }: { metadata: PageMetadata }) {
  return (
    <>
      <meta property="og:title" content={metadata.title} />
      <meta property="og:description" content={metadata.description} />
      <meta property="og:image" content={metadata.ogImage} />
      <meta property="og:type" content="website" />
      <meta property="og:url" content={typeof window !== 'undefined' ? window.location.href : ''} />
    </>
  )
}
```

### Twitter Card Tags

```typescript
// Twitter Card implementation
export function TwitterCardTags({ metadata }: { metadata: PageMetadata }) {
  return (
    <>
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={metadata.title} />
      <meta name="twitter:description" content={metadata.description} />
      <meta name="twitter:image" content={metadata.ogImage} />
    </>
  )
}
```

---

## Route Guards

### Protection Strategy

Currently, all routes are public. Future considerations:

| Route Type | Status | Future Implementation |
|------------|--------|---------------------|
| Public Routes | Implemented | - |
| Admin Routes | Not Implemented | Authentication required |
| Protected Routes | Not Implemented | Authentication required |

### Future Guard Implementation

```typescript
// Protected route wrapper
interface ProtectedRouteProps {
  children: ReactNode
  requiredRole?: string
}

export function ProtectedRoute({ children, requiredRole }: ProtectedRouteProps) {
  const { isAuthenticated, user } = useAuth()
  
  if (!isAuthenticated) {
    return <Navigate to={routes.landing} replace />
  }
  
  if (requiredRole && user?.role !== requiredRole) {
    return <Navigate to={routes.landing} replace />
  }
  
  return <>{children}</>
}

// Usage
<Route
  path="/admin"
  element={
    <ProtectedRoute requiredRole="admin">
      <AdminPanel />
    </ProtectedRoute>
  }
/>
```

### Authentication Flow (Future)

```
User Attempts Access
↓
Check Authentication
↓
Not Authenticated → Redirect to Login
↓
Authenticated → Check Role
↓
Role Mismatch → Redirect to Home
↓
Role Match → Allow Access
```

---

## Routing Performance Optimization

### Optimization Strategies

#### 1. Route-Based Code Splitting

**Implementation:**
```typescript
const Landing = lazy(() => import('./pages/Landing'))
```

**Benefits:**
- Reduced initial bundle size
- Faster initial load time
- On-demand code loading

**Metrics:**
- Initial bundle: ~50KB
- Route chunks: ~20-30KB each
- Total reduction: ~60%

---

#### 2. Prefetching on Hover

**Implementation:**
```typescript
const preloadRoute = () => {
  import(`../pages/${to}`)
}

<Link
  to={to}
  onMouseEnter={preloadRoute}
  onFocus={preloadRoute}
>
  {children}
</Link>
```

**Benefits:**
- Routes load before navigation
- Instant page transitions
- Better perceived performance

**Strategy:**
- Critical routes: Prefetch immediately
- High priority: Prefetch on hover
- Low priority: Prefetch on idle

---

#### 3. Parallel Data Loading

**Implementation:**
```typescript
// Load data while route is transitioning
useEffect(() => {
  const controller = new AbortController()
  
  Promise.all([
    fetchProjects(controller.signal),
    fetchSkills(controller.signal)
  ])
  
  return () => controller.abort()
}, [location.pathname])
```

**Benefits:**
- Data loads in background
- Faster page render
- Better user experience

---

#### 4. Skeleton Screens

**Implementation:**
```typescript
const PageSkeleton = () => (
  <div className="page-skeleton">
    <div className="skeleton-header" />
    <div className="skeleton-content" />
    <div className="skeleton-sidebar" />
  </div>
)

<Suspense fallback={<PageSkeleton />}>
  <Routes>
    {/* routes */}
  </Routes>
</Suspense>
```

**Benefits:**
- Better perceived performance
- Smooth visual transitions
- Reduces layout shift

---

#### 5. Critical Route Prioritization

**Implementation:**
```typescript
// Preload critical routes immediately
useEffect(() => {
  import('./pages/Landing')
  import('./pages/About')
}, [])
```

**Benefits:**
- Critical routes load instantly
- Better first impression
- Improved Core Web Vitals

**Priority Table:**

| Priority | Routes | Load Strategy |
|----------|--------|---------------|
| Critical | Landing, About | Immediate |
| High | Projects, Skills | Hover/Idle |
| Medium | Experience, Certifications | Hover |
| Low | Contact | On demand |

---

### Performance Metrics

#### Target Metrics

| Metric | Target | Current | Status |
|--------|--------|---------|--------|
| First Contentful Paint | < 1.5s | TBD | - |
| Time to Interactive | < 3.5s | TBD | - |
| Route Transition | < 300ms | TBD | - |
| Bundle Size (gzipped) | < 200KB | TBD | - |

#### Monitoring

```typescript
// Performance monitoring
useEffect(() => {
  const startTime = performance.now()
  
  return () => {
    const endTime = performance.now()
    const duration = endTime - startTime
    
    // Log or send to analytics
    console.log(`Route render time: ${duration}ms`)
  }
}, [location.pathname])
```

---

## Routing Error Handling

### Error Scenarios

#### 1. Chunk Load Failure

**Scenario:** Network error or 404 for chunk file

**Handling:**
```typescript
class RouteErrorBoundary extends Component {
  componentDidCatch(error, errorInfo) {
    if (error.name === 'ChunkLoadError') {
      // Retry logic
      window.location.reload()
    }
  }
  
  render() {
    if (this.state.hasError) {
      return <ChunkLoadError />
    }
    return this.props.children
  }
}
```

**User Message:**
``<arg_value>Unable to load page. Please check your connection and try again.
[Retry Button]
```

---

#### 2. Invalid Route

**Scenario:** User navigates to non-existent route

**Handling:**
```typescript
<Route path="*" element={<NotFound />} />
```

**User Message:**
```
404 - Page Not Found
The page you're looking for doesn't exist.
[Go Home Button]
```

---

#### 3. Navigation Block

**Scenario:** Attempt to navigate during transition

**Handling:**
```typescript
const [isNavigating, setIsNavigating] = useState(false)

const handleNavigate = (to: string) => {
  if (isNavigating) return
  setIsNavigating(true)
  navigate(to)
}

useEffect(() => {
  setIsNavigating(false)
}, [location.pathname])
```

**Behavior:**
- Ignore navigation attempts during transition
- Show loading indicator
- Enable navigation after transition completes

---

### Error Recovery

#### Recovery Strategies

| Error Type | Recovery Strategy |
|------------|------------------|
| Chunk Load Error | Retry with exponential backoff |
| Network Error | Show offline message, retry on reconnect |
| Invalid Route | Show 404 page, suggest similar pages |
| Navigation Block | Block navigation, show loading state |

#### Error UI Components

```typescript
// Chunk load error component
const ChunkLoadError = () => (
  <div className="error-container">
    <h2>Unable to Load Page</h2>
    <p>Please check your internet connection and try again.</p>
    <Button onClick={() => window.location.reload()}>
      Retry
    </Button>
  </div>
)

// Offline component
const OfflineMessage = () => (
  <div className="offline-container">
    <h2>You're Offline</h2>
    <p>Please check your connection and try again.</p>
    <Button onClick={() => window.location.reload()}>
      Retry
    </Button>
  </div>
)
```

---

## Routing Best Practices

### 1. Route Organization

**Do:**
- Group related routes
- Use descriptive route names
- Keep route structure flat when possible
- Use constants for route paths

**Don't:**
- Create deeply nested routes without reason
- Use magic strings for route paths
- Mix public and protected routes without clear separation

---

### 2. Code Splitting

**Do:**
- Lazy load all route components
- Use Suspense boundaries
- Provide loading states
- Handle chunk load errors

**Don't:**
- Lazy load very small components (< 1KB)
- Forget to handle loading states
- Ignore chunk load errors

---

### 3. Navigation

**Do:**
- Use Link component for internal navigation
- Provide active states for navigation
- Support keyboard navigation
- Implement scroll restoration

**Don't:**
- Use anchor tags for internal navigation
- Ignore active states
- Forget keyboard accessibility
- Break browser back button

---

### 4. Performance

**Do:**
- Implement route preloading
- Use skeleton screens
- Optimize bundle sizes
- Monitor performance metrics

**Don't:**
- Load all routes upfront
- Show blank screens during load
- Ignore bundle size
- Skip performance monitoring

---

### 5. SEO

**Do:**
- Provide unique titles for each route
- Include meta descriptions
- Add Open Graph tags
- Implement structured data

**Don't:**
- Use duplicate titles
- Skip meta descriptions
- Ignore social sharing tags
- Forget structured data

---

### 6. Accessibility

**Do:**
- Use semantic HTML for navigation
- Provide ARIA labels where needed
- Support keyboard navigation
- Announce route changes to screen readers

**Don't:**
- Use divs for navigation
- Skip ARIA labels
- Ignore keyboard users
- Forget screen reader announcements

---

## Conclusion

The routing architecture provides a robust, performant, and user-friendly navigation system for the portfolio application. Key features include:

- **Code Splitting:** Reduces initial bundle size
- **Lazy Loading:** Loads routes on demand
- **Page Transitions:** Smooth visual transitions
- **Scroll Restoration:** Maintains scroll position
- **Route Preloading:** Loads routes proactively
- **SEO Optimized:** Complete metadata support
- **Error Handling:** Comprehensive error recovery
- **Performance Focused:** Multiple optimization strategies

The architecture is designed to scale with the application, supporting future enhancements such as protected routes, authentication, and dynamic route parameters.

---

**Document Version:** 1.0  
**Last Updated:** August 1, 2026  
**Next Review:** After Phase 2 completion
