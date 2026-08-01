# Folder Structure Documentation

**Version:** 1.0  
**Date:** August 1, 2026  
**Project:** Portfolio 2027

---

## Table of Contents

1. [Overview](#overview)
2. [Root Directory](#root-directory)
3. [Public Directory](#public-directory)
4. [Source Directory](#source-directory)
5. [Components Directory](#components-directory)
6. [Pages Directory](#pages-directory)
7. [Hooks Directory](#hooks-directory)
8. [Context Directory](#context-directory)
9. [Library Directory](#library-directory)
10. [Styles Directory](#styles-directory)
11. [Types Directory](#types-directory)
12. [Data Directory](#data-directory)
13. [File Naming Conventions](#file-naming-conventions)
14. [Import Organization](#import-organization)

---

## Overview

The folder structure is organized to promote scalability, maintainability, and clear separation of concerns. Each directory has a specific purpose, and files are organized by their function within the application.

### Design Principles

1. **Feature-Based Organization:** Related files are grouped together
2. **Separation of Concerns:** UI, logic, and data are separated
3. **Scalability:** Easy to add new features without restructuring
4. **Discoverability:** Easy to find files based on their purpose
5. **Consistency:** Consistent naming and organization patterns

---

## Root Directory

### Root Directory Structure

```
portfolio-2027/
├── public/                      # Static assets
├── src/                         # Application source code
├── .env.example                 # Environment variables template
├── .env.local                   # Local environment variables (gitignored)
├── .gitignore                   # Git ignore rules
├── index.html                   # HTML entry point
├── package.json                 # Project dependencies and scripts
├── tsconfig.json                # TypeScript configuration
├── tsconfig.node.json           # TypeScript config for Node.js scripts
├── vite.config.ts               # Vite build configuration
├── tailwind.config.js           # Tailwind CSS configuration
├── postcss.config.js            # PostCSS configuration
└── README.md                    # Project documentation
```

### Root File Descriptions

| File | Purpose |
|------|---------|
| `package.json` | Defines project dependencies, scripts, and metadata |
| `tsconfig.json` | TypeScript compiler configuration for the application |
| `tsconfig.node.json` | TypeScript configuration for Node.js scripts (Vite config) |
| `vite.config.ts` | Vite build tool configuration |
| `tailwind.config.js` | Tailwind CSS framework configuration |
| `postcss.config.js` | PostCSS configuration for CSS processing |
| `index.html` | HTML entry point for the application |
| `.gitignore` | Specifies files and directories to ignore in Git |
| `.env.example` | Template for environment variables (committed to repo) |
| `.env.local` | Local environment variables (not committed to repo) |
| `README.md` | Project documentation and setup instructions |

---

## Public Directory

### Public Directory Structure

```
public/
├── assets/                      # Static assets
│   ├── images/                  # Optimized images
│   │   ├── hero/                # Hero section images
│   │   │   ├── hero-background.jpg
│   │   │   └── hero-foreground.png
│   │   ├── projects/            # Project screenshots
│   │   │   ├── project1/
│   │   │   │   ├── hero.jpg
│   │   │   │   ├── screenshot-1.jpg
│   │   │   │   └── screenshot-2.jpg
│   │   │   ├── project2/
│   │   │   │   └── ...
│   │   │   └── project3/
│   │   │       └── ...
│   │   ├── about/               # About section images
│   │   │   ├── profile.jpg
│   │   │   └── workspace.jpg
│   │   └── icons/               # Custom SVG icons
│   │       ├── tech-icons.svg
│   │       └── brand-icons.svg
│   ├── fonts/                   # Local font files (if needed)
│   │   ├── space-grotesk/
│   │   │   ├── space-grotesk-regular.woff2
│   │   │   ├── space-grotesk-medium.woff2
│   │   │   └── space-grotesk-bold.woff2
│   │   ├── inter/
│   │   │   ├── inter-regular.woff2
│   │   │   ├── inter-medium.woff2
│   │   │   └── inter-bold.woff2
│   │   └── jetbrains-mono/
│   │       ├── jetbrains-mono-regular.woff2
│   │       └── jetbrains-mono-bold.woff2
│   └── favicon/                 # Favicon variants
│       ├── favicon.ico
│       ├── favicon-16x16.png
│       ├── favicon-32x32.png
│       ├── apple-touch-icon.png
│       └── favicon.svg
├── robots.txt                   # Search engine directives
└── sitemap.xml                  # Sitemap for SEO
```

### Public Directory Purpose

The `public/` directory contains static assets that are served directly by the web server without processing. These files are copied to the build output directory as-is.

### Image Organization

Images are organized by section:
- **hero/**: Images for the hero section
- **projects/**: Project screenshots, organized by project
- **about/**: Profile and workspace images
- **icons/**: Custom SVG icons (if not using React Icons)

### Image Guidelines

- Use WebP format for optimal compression
- Include responsive variants when necessary
- Optimize images before adding to the repository
- Use descriptive filenames
- Keep file sizes under 500KB per image

### Font Organization

Fonts are organized by font family:
- **space-grotesk/**: Display font files
- **inter/**: Body font files
- **jetbrains-mono/**: Monospace font files

### Font Guidelines

- Use WOFF2 format for best compression
- Include only necessary weights
- Consider using Google Fonts instead of local files
- Subset fonts to include only needed characters

### Favicon Guidelines

Include all favicon variants for maximum browser support:
- favicon.ico (legacy)
- favicon-16x16.png (small icon)
- favicon-32x32.png (standard icon)
- apple-touch-icon.png (iOS devices)
- favicon.svg (modern browsers)

---

## Source Directory

### Source Directory Structure

```
src/
├── components/                  # React components
├── pages/                       # Page-level components
├── hooks/                       # Custom React hooks
├── context/                     # React context providers
├── lib/                         # Utility libraries and configurations
├── styles/                      # Global styles and themes
├── types/                       # TypeScript type definitions
├── data/                        # Static data and content
├── App.tsx                      # Root application component
├── main.tsx                     # Application entry point
└── vite-env.d.ts                # Vite TypeScript declarations
```

### Source Directory Purpose

The `src/` directory contains all application source code. This separation allows build tools to process source files differently from static assets.

### Source File Descriptions

| File | Purpose |
|------|---------|
| `main.tsx` | Application entry point, mounts React app |
| `App.tsx` | Root application component with providers |
| `vite-env.d.ts` | Vite-specific TypeScript declarations |

---

## Components Directory

### Components Directory Structure

```
src/components/
├── layout/                      # Layout components
│   ├── Header.tsx               # Site header with navigation
│   ├── Footer.tsx               # Site footer with links
│   ├── Navigation.tsx           # Navigation menu component
│   ├── PageTransition.tsx       # Page transition wrapper
│   └── ScrollProgress.tsx       # Scroll progress indicator
├── ui/                          # Reusable UI components
│   ├── Button.tsx               # Button with variants
│   ├── Card.tsx                 # Card container component
│   ├── Badge.tsx                # Badge/tag component
│   ├── Modal.tsx                # Modal dialog component
│   ├── Tooltip.tsx              # Tooltip component
│   └── ScrollIndicator.tsx      # Scroll to top indicator
├── animations/                  # Animation-specific components
│   ├── MagneticButton.tsx       # Button with magnetic effect
│   ├── TextReveal.tsx           # Text reveal animation
│   ├── ParallaxSection.tsx      # Parallax scrolling section
│   ├── CursorFollower.tsx       # Custom cursor component
│   └── MorphingShape.tsx        # Morphing SVG shapes
├── sections/                    # Page section components
│   ├── Hero.tsx                # Hero section
│   ├── AboutSection.tsx        # About preview section
│   ├── SkillsSection.tsx       # Skills preview section
│   ├── ProjectsSection.tsx     # Projects preview section
│   ├── ExperienceSection.tsx   # Experience preview section
│   ├── CertificationsSection.tsx # Certifications preview
│   └── ContactSection.tsx      # Contact preview section
└── shared/                      # Shared/reusable components
    ├── SkillBar.tsx            # Animated skill progress bar
    ├── TimelineItem.tsx        # Timeline entry component
    ├── ProjectCard.tsx         # Project display card
    └── SocialLink.tsx          # Social media link button
```

### Components Organization Strategy

Components are organized by their role in the application:

#### Layout Components (`layout/`)
Structural components that wrap page content and provide consistent layout across all pages.

**Purpose:** Provide consistent page structure
**Used By:** All pages
**Examples:** Header, Footer, Navigation

#### UI Components (`ui/`)
Generic, reusable UI elements that can be used throughout the application.

**Purpose:** Provide reusable UI building blocks
**Used By:** Any component
**Examples:** Button, Card, Badge, Modal

#### Animation Components (`animations/`)
Components with complex animation logic that require special handling.

**Purpose:** Provide advanced animation effects
**Used By:** Hero sections, interactive elements
**Examples:** MagneticButton, TextReveal, ParallaxSection

#### Section Components (`sections/`)
Reusable page sections that can be composed to create pages.

**Purpose:** Provide pre-built page sections
**Used By:** Landing page, inner pages
**Examples:** Hero, AboutSection, SkillsSection

#### Shared Components (`shared/`)
Components that are shared across multiple pages or sections.

**Purpose:** Provide shared functionality
**Used By:** Multiple components
**Examples:** SkillBar, TimelineItem, ProjectCard

### Component File Guidelines

- Use PascalCase for component names
- One component per file
- Export components as default
- Include TypeScript interfaces for props
- Add JSDoc comments for complex components

---

## Pages Directory

### Pages Directory Structure

```
src/pages/
├── Landing.tsx                  # Landing page (one-page scroll)
├── About.tsx                    # About page
├── Skills.tsx                   # Skills page
├── Projects.tsx                 # Projects page
├── Experience.tsx               # Experience page
├── Certifications.tsx           # Certifications page
├── Contact.tsx                  # Contact page
└── NotFound.tsx                 # 404 error page
```

### Pages Directory Purpose

The `pages/` directory contains page-level components that represent routes in the application. Each page composes layout components, sections, and UI components to create a complete page experience.

### Page Component Guidelines

- Use PascalCase for page names
- Export pages as default for lazy loading
- Include SEO metadata
- Implement loading states
- Handle error states
- Include page transitions

### Page Component Structure

Each page component should follow this structure:

```typescript
// Page component structure
import { PageMetadata } from '../lib/constants/seo'

export function PageName() {
  return (
    <>
      {/* Page content */}
    </>
  )
}

export const metadata: PageMetadata = {
  title: 'Page Title',
  description: 'Page description',
  // ... other metadata
}
```

---

## Hooks Directory

### Hooks Directory Structure

```
src/hooks/
├── useTheme.ts                  # Theme management hook
├── useAnimation.ts             # Animation settings hook
├── useIntersectionObserver.ts  # Intersection observer hook
├── useMediaQuery.ts             # Media query hook
└── useSmoothScroll.ts           # Smooth scroll hook
```

### Hooks Directory Purpose

The `hooks/` directory contains custom React hooks that encapsulate reusable logic and state management. Hooks follow the single responsibility principle and can be used across multiple components.

### Hook Guidelines

- Prefix hook names with `use`
- One hook per file
- Export hooks as named exports
- Include TypeScript return types
- Add JSDoc comments for complex hooks
- Handle cleanup in useEffect

### Hook Categories

#### State Management Hooks
- `useTheme` - Theme state and toggling
- `useAnimation` - Animation settings

#### DOM Hooks
- `useIntersectionObserver` - Intersection Observer API
- `useMediaQuery` - Media query listening
- `useSmoothScroll` - Smooth scroll functionality

---

## Context Directory

### Context Directory Structure

```
src/context/
├── ThemeContext.tsx             # Theme provider (dark/light mode)
├── AnimationContext.tsx         # Animation settings provider
└── ScrollContext.tsx            # Scroll state provider
```

### Context Directory Purpose

The `context/` directory contains React Context providers for global state management. Contexts are separated by concern to avoid unnecessary re-renders and to keep state management focused.

### Context Guidelines

- Name contexts with `Context` suffix
- Export provider component and custom hook
- Include TypeScript interfaces for context value
- Add default values for context
- Document context usage
- Keep contexts focused on single concern

### Context Structure

Each context should follow this structure:

```typescript
// Context structure
import { createContext, useContext } from 'react'

interface ContextValue {
  // Context value type
}

const Context = createContext<ContextValue | undefined>(undefined)

export function Provider({ children }: { children: ReactNode }) {
  const value: ContextValue = {
    // Context value
  }
  
  return <Context.Provider value={value}>{children}</Context.Provider>
}

export function useContext() {
  const context = useContext(Context)
  if (!context) throw new Error('useContext must be used within Provider')
  return context
}
```

---

## Library Directory

### Library Directory Structure

```
src/lib/
├── animations/                  # Animation configurations
│   ├── gsap.ts                 # GSAP configuration and plugins
│   ├── framer.ts               # Framer Motion configurations
│   └── presets.ts              # Reusable animation presets
├── utils/                       # Utility functions
│   ├── cn.ts                   # Class name utility (clsx + tailwind-merge)
│   ├── scroll.ts               # Scroll-related utilities
│   └── validation.ts           # Form validation utilities
├── constants/                   # Application constants
│   ├── routes.ts               # Route definitions
│   ├── animations.ts           # Animation constants
│   └── seo.ts                  # SEO-related constants
└── api/                        # API layer (future)
    ├── client/
    │   ├── apiClient.ts
    │   ├── interceptors.ts
    │   └── config.ts
    ├── endpoints/
    │   ├── projects.ts
    │   ├── experience.ts
    │   ├── skills.ts
    │   ├── certifications.ts
    │   ├── contact.ts
    │   └── auth.ts
    ├── types/
    │   ├── requests.ts
    │   ├── responses.ts
    │   └── errors.ts
    ├── hooks/
    │   ├── useProjects.ts
    │   ├── useExperience.ts
    │   ├── useSkills.ts
    │   ├── useContact.ts
    │   └── useAuth.ts
    ├── utils/
    │   ├── validators.ts
    │   ├── transformers.ts
    │   └── normalizers.ts
    └── constants/
        ├── endpoints.ts
        └── cacheKeys.ts
```

### Library Directory Purpose

The `lib/` directory contains non-UI code that supports the application. This includes utilities, configurations, constants, and future API integration code.

### Library Subdirectories

#### Animations (`animations/`)
Animation library configurations and reusable animation presets.

**Purpose:** Centralize animation configuration
**Contents:** GSAP config, Framer Motion config, animation presets

#### Utils (`utils/`)
Pure utility functions with no side effects.

**Purpose:** Provide reusable utility functions
**Contents:** Class name utilities, scroll utilities, validation utilities

#### Constants (`constants/`)
Immutable application constants.

**Purpose:** Centralize constant values
**Contents:** Route definitions, animation constants, SEO constants

#### API (`api/`)
Future API layer for backend integration.

**Purpose:** Provide structured API client
**Contents:** API client, endpoints, types, hooks, utilities

### Library Guidelines

- Keep functions pure (no side effects)
- Use TypeScript for all exports
- Export constants as named exports
- Document complex utilities
- Keep API layer modular

---

## Styles Directory

### Styles Directory Structure

```
src/styles/
├── globals.css                  # Global CSS styles
├── themes/                      # Theme-specific styles
│   ├── dark.css                # Dark mode CSS variables
│   └── light.css               # Light mode CSS variables
└── animations.css              # Global animation styles
```

### Styles Directory Purpose

The `styles/` directory contains global styles and theme definitions. CSS variables are defined here to support theming without JavaScript overhead.

### Style File Guidelines

- Use CSS custom properties for theming
- Keep styles minimal (most styling via Tailwind)
- Organize by theme
- Include responsive breakpoints
- Add comments for complex styles

### Global CSS Structure

```css
/* globals.css */
@import './themes/dark.css';
@import './themes/light.css';
@import './animations.css';

/* Base styles */
@layer base {
  /* Base styles here */
}

/* Components */
@layer components {
  /* Component styles here */
}

/* Utilities */
@layer utilities {
  /* Utility styles here */
}
```

---

## Types Directory

### Types Directory Structure

```
src/types/
├── project.ts                   # Project-related types
├── experience.ts                # Experience-related types
├── skill.ts                     # Skill-related types
├── certification.ts             # Certification-related types
└── index.ts                     # Type exports
```

### Types Directory Purpose

The `types/` directory contains TypeScript type definitions and interfaces. Types are organized by domain and exported from a central index file for easy importing.

### Type Guidelines

- Use interfaces for object shapes
- Use types for unions, primitives, and utility types
- Export types from index.ts
- Use descriptive names
- Include JSDoc comments for complex types
- Keep types simple and focused

### Type Export Pattern

```typescript
// index.ts
export * from './project'
export * from './experience'
export * from './skill'
export * from './certification'
```

---

## Data Directory

### Data Directory Structure

```
src/data/
├── projects.ts                  # Projects data
├── experience.ts                # Work experience data
├── skills.ts                    # Skills data
├── certifications.ts            # Certifications data
└── social.ts                    # Social media links
```

### Data Directory Purpose

The `data/` directory contains static data and content. In a future iteration, this could be replaced with a CMS or API. Data is typed using the interfaces from the `types/` directory.

### Data Guidelines

- Use TypeScript interfaces from `types/` directory
- Export data as constants
- Keep data well-organized
- Use descriptive property names
- Include all necessary fields
- Consider future API integration

### Data File Structure

```typescript
// projects.ts
import { Project } from '../types/project'

export const projects: Project[] = [
  {
    id: '1',
    title: 'Project Name',
    // ... other fields
  },
  // ... more projects
]
```

---

## File Naming Conventions

### General Rules

- Use **PascalCase** for React components
- Use **camelCase** for utilities, hooks, and regular functions
- Use **kebab-case** for file names (except components)
- Use **UPPER_SNAKE_CASE** for constants
- Use **descriptive names** that indicate purpose

### File Name Examples

| Type | Example |
|------|---------|
| Component | `Button.tsx`, `ProjectCard.tsx` |
| Hook | `useTheme.ts`, `useAnimation.ts` |
| Utility | `cn.ts`, `scroll.ts` |
| Type | `project.ts`, `experience.ts` |
| Data | `projects.ts`, `skills.ts` |
| Style | `globals.css`, `dark.css` |
| Constant | `routes.ts`, `animations.ts` |

### Component File Names

Component files use PascalCase to match the component name:

```
Button.tsx          → Button component
ProjectCard.tsx     → ProjectCard component
Navigation.tsx      → Navigation component
```

### Hook File Names

Hook files use the `use` prefix followed by camelCase:

```
useTheme.ts         → useTheme hook
useAnimation.ts     → useAnimation hook
useMediaQuery.ts    → useMediaQuery hook
```

### Utility File Names

Utility files use camelCase describing their purpose:

```
cn.ts               → Class name utility
scroll.ts           → Scroll utilities
validation.ts       → Validation utilities
```

### Type File Names

Type files use singular nouns in camelCase:

```
project.ts          → Project types
experience.ts       → Experience types
skill.ts            → Skill types
```

---

## Import Organization

### Import Order

Imports should be organized in the following order:

1. External libraries (React, third-party packages)
2. Internal imports (from other project files)
3. Type imports
4. Styles (if CSS modules)
5. Relative imports (from same directory)

### Import Example

```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'
import gsap from 'gsap'

// 2. Internal imports
import { Button } from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'
import { projects } from '../data/projects'

// 3. Type imports
import type { Project } from '../types/project'

// 4. Styles (if using CSS modules)
// import styles from './Component.module.css'

// 5. Relative imports
import { localHelper } from './utils'
```

### Import Grouping

Group related imports together with blank lines between groups:

```typescript
// React imports
import React, { useState, useEffect } from 'react'

// Third-party libraries
import { motion } from 'framer-motion'
import gsap from 'gsap'

// Components
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

// Hooks
import { useTheme } from '../hooks/useTheme'
import { useAnimation } from '../hooks/useAnimation'

// Data
import { projects } from '../data/projects'

// Types
import type { Project } from '../types/project'
```

### Named vs Default Exports

**Default Exports:**
- React components
- Pages (for lazy loading)

**Named Exports:**
- Hooks
- Utilities
- Types
- Constants
- Data

---

## Directory Size Estimates

| Directory | Estimated Size | File Count |
|-----------|----------------|------------|
| `public/` | ~5 MB | ~30 |
| `src/components/` | ~500 KB | 27 |
| `src/pages/` | ~200 KB | 8 |
| `src/hooks/` | ~50 KB | 5 |
| `src/context/` | ~30 KB | 3 |
| `src/lib/` | ~100 KB | 15 |
| `src/styles/` | ~50 KB | 4 |
| `src/types/` | ~20 KB | 5 |
| `src/data/` | ~30 KB | 5 |
| **Total Source** | **~1 MB** | **~110** |

---

## File Count Summary

| Category | File Count |
|----------|------------|
| Public Assets | ~30 |
| Layout Components | 5 |
| UI Components | 6 |
| Animation Components | 5 |
| Section Components | 7 |
| Shared Components | 4 |
| Pages | 8 |
| Hooks | 5 |
| Context Providers | 3 |
| Library Files | 15 |
| Style Files | 4 |
| Type Definitions | 5 |
| Data Files | 5 |
| Configuration Files | 8 |
| **Total** | **~110 files** |

---

## Conclusion

This folder structure provides a solid foundation for building a scalable, maintainable portfolio application. The organization promotes clear separation of concerns, easy file discovery, and efficient development workflows.

The structure is designed to grow with the application, allowing for easy addition of new features without requiring significant restructuring.

---

**Document Version:** 1.0  
**Last Updated:** August 1, 2026  
**Next Review:** After Phase 1 completion
