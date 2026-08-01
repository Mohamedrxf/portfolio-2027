# Component Architecture Documentation

**Version:** 1.0  
**Date:** August 1, 2026  
**Project:** Portfolio 2027

---

## Table of Contents

1. [Overview](#overview)
2. [Component Hierarchy](#component-hierarchy)
3. [Layout Components](#layout-components)
4. [UI Components](#ui-components)
5. [Animation Components](#animation-components)
6. [Section Components](#section-components)
7. [Shared Components](#shared-components)
8. [Page Components](#page-components)
9. [Component Composition Patterns](#component-composition-patterns)
10. [Component Guidelines](#component-guidelines)

---

## Overview

The component architecture follows a hierarchical tree structure where the root `App` component is wrapped with context providers, which then renders the router. Each route composes layout components, which in turn compose page-specific components, sections, and UI elements.

### Component Design Principles

1. **Single Responsibility:** Each component has one clear purpose
2. **Reusability:** Components are designed to be reused across the application
3. **Composability:** Components can be combined to build complex UIs
4. **Type Safety:** All components have TypeScript prop interfaces
5. **Performance:** Components are optimized to minimize re-renders
6. **Accessibility:** Components are accessible by default
7. **Testability:** Components are easy to test in isolation

### Component Categories

Components are organized into six categories:

1. **Layout Components** - Structural components that wrap page content
2. **UI Components** - Generic, reusable UI elements
3. **Animation Components** - Components with complex animation logic
4. **Section Components** - Reusable page sections
5. **Shared Components** - Components shared across multiple pages
6. **Page Components** - Page-level components that represent routes

---

## Component Hierarchy

### Complete Component Tree

```
App (Root)
├── ThemeProvider
│   └── AnimationProvider
│       └── ScrollProvider (Lenis)
│           └── Router (React Router)
│               ├── Layout (Route Wrapper)
│               │   ├── Header
│               │   │   ├── Logo
│               │   │   ├── Navigation
│               │   │   │   ├── NavLink (Desktop)
│               │   │   │   └── MobileMenu
│               │   │   │       ├── MenuToggle
│               │   │   │       └── MobileNavLinks
│               │   │   ├── ThemeToggle
│               │   │   └── ScrollProgress
│               │   ├── PageTransition
│               │   │   └── [Page Component]
│               │   └── Footer
│               │       ├── SocialLinks
│               │       │   └── SocialLink (Multiple)
│               │       ├── QuickLinks
│               │       └── Copyright
│               │
│               └── Routes
│                   ├── Landing Route (/)
│                   │   └── Landing Page
│                   │       ├── Hero Section
│                   │       │   ├── HeroContent
│                   │       │   │   ├── TextReveal (Title)
│                   │       │   │   ├── TextReveal (Subtitle)
│                   │       │   │   ├── MagneticButton (CTA)
│                   │       │   │   └── MorphingShape (Background)
│                   │       │   └── HeroVisuals
│                   │       │       └── ParallaxSection
│                   │       ├── About Section (Preview)
│                   │       │   ├── SectionHeader
│                   │       │   ├── BioPreview
│                   │       │   └── Button (View All)
│                   │       ├── Skills Section (Preview)
│                   │       │   ├── SectionHeader
│                   │       │   ├── SkillsGrid
│                   │       │   │   └── SkillBar (Multiple)
│                   │       │   └── Button (View All)
│                   │       ├── Projects Section (Preview)
│                   │       │   ├── SectionHeader
│                   │       │   ├── FeaturedProjects
│                   │       │   │   └── ProjectCard (Multiple)
│                   │       │   └── Button (View All)
│                   │       ├── Experience Section (Preview)
│                   │       │   ├── SectionHeader
│                   │       │   ├── Timeline (Preview)
│                   │       │   │   └── TimelineItem (Featured)
│                   │       │   └── Button (View All)
│                   │       ├── Certifications Section (Preview)
│                   │       │   ├── SectionHeader
│                   │       │   ├── CertificationGrid (Preview)
│                   │       │   │   └── CertificationCard (Featured)
│                   │       │   └── Button (View All)
│                   │       └── Contact Section (Preview)
│                   │           ├── SectionHeader
│                   │           ├── ContactPreview
│                   │           └── Button (Get in Touch)
│                   │
│                   ├── About Route (/about)
│                   │   └── About Page
│                   │       ├── About Hero
│                   │       │   ├── HeroContent
│                   │       │   └── HeroVisuals
│                   │       ├── Bio Section
│                   │       │   ├── BioContent
│                   │       │   ├── BioImage
│                   │       │   └── StatsGrid
│                   │       │       └── StatCard (Multiple)
│                   │       ├── Values Section
│                   │       │   ├── ValuesGrid
│                   │       │   │   └── ValueCard (Multiple)
│                   │       │   └── PhilosophySection
│                   │       └── CTA Section
│                   │           └── MagneticButton
│                   │
│                   ├── Skills Route (/skills)
│                   │   └── Skills Page
│                   │       ├── Skills Hero
│                   │       │   ├── HeroContent
│                   │       │   └── SkillsOverview
│                   │       ├── Technical Skills
│                   │       │   ├── CategoryTabs
│                   │       │   └── SkillsGrid
│                   │       │       └── SkillBar (Multiple)
│                   │       ├── Soft Skills
│                   │       │   ├── SoftSkillsGrid
│                   │       │   │   └── SoftSkillCard (Multiple)
│                   │       │   └── SkillAssessment
│                   │       ├── Tools Section
│                   │       │   ├── ToolsGrid
│                   │       │   │   └── ToolCard (Multiple)
│                   │       │   └── ToolProficiency
│                   │       └── Learning Section
│                   │           ├── CurrentLearning
│                   │           └── LearningPath
│                   │
│                   ├── Projects Route (/projects)
│                   │   └── Projects Page
│                   │       ├── Projects Hero
│                   │       │   ├── HeroContent
│                   │       │   └── ProjectsStats
│                   │       ├── Filter Section
│                   │       │   ├── FilterTabs
│                   │       │   └── SearchBar
│                   │       ├── Featured Projects
│                   │       │   └── ProjectCard (Featured)
│                   │       ├── All Projects
│                   │       │   └── ProjectsGrid
│                   │       │       └── ProjectCard (All)
│                   │       └── Project Modal
│                   │           ├── Modal
│                   │           ├── ProjectDetails
│                   │           ├── ProjectGallery
│                   │           ├── ProjectTechStack
│                   │           │   └── Badge (Multiple)
│                   │           ├── ProjectLinks
│                   │           │   └── Button (Multiple)
│                   │           └── CloseButton
│                   │
│                   ├── Experience Route (/experience)
│                   │   └── Experience Page
│                   │       ├── Experience Hero
│                   │       │   ├── HeroContent
│                   │       │   └── ExperienceSummary
│                   │       ├── Timeline Section
│                   │       │   ├── TimelineControls
│                   │       │   │   ├── FilterButtons
│                   │       │   │   └── ViewToggle
│                   │       │   └── Timeline
│                   │       │       └── TimelineItem (Multiple)
│                   │       │           ├── ItemHeader
│                   │       │           ├── ItemContent
│                   │       │           ├── ItemAchievements
│                   │       │           │   └── AchievementBadge
│                   │       │           └── ItemTechStack
│                   │       │               └── Badge (Multiple)
│                   │       └── Skills Gained Section
│                   │           └── SkillsSummary
│                   │
│                   ├── Certifications Route (/certifications)
│                   │   └── Certifications Page
│                   │       ├── Certifications Hero
│                   │       │   ├── HeroContent
│                   │       │   └── CertificationsStats
│                   │       ├── Filter Section
│                   │       │   ├── CategoryFilter
│                   │       │   └── StatusFilter
│                   │       ├── Certification Grid
│                   │       │   └── CertificationCard (Multiple)
│                   │       │       ├── CardHeader
│                   │       │       ├── CardBody
│                   │       │       ├── CardMeta
│                   │       │       │   └── Badge (Multiple)
│                   │       │       └── CardActions
│                   │       │           └── Button (View Credential)
│                   │       └── Learning Path Section
│                   │           └── UpcomingCertifications
│                   │
│                   ├── Contact Route (/contact)
│                   │   └── Contact Page
│                   │       ├── Contact Hero
│                   │       │   ├── HeroContent
│                   │       │   └── ContactVisuals
│                   │       ├── Contact Form Section
│                   │       │   ├── ContactForm
│                   │       │   │   ├── FormField (Name)
│                   │       │   │   ├── FormField (Email)
│                   │       │   │   ├── FormField (Subject)
│                   │       │   │   ├── FormField (Message)
│                   │       │   │   ├── FormField (Recaptcha)
│                   │       │   │   └── SubmitButton
│                   │       │   └── FormSuccess
│                   │       ├── Contact Info Section
│                   │       │   ├── ContactMethods
│                   │       │   │   ├── ContactMethodCard (Email)
│                   │       │   │   ├── ContactMethodCard (Phone)
│                   │       │   │   └── ContactMethodCard (Location)
│                   │       │   └── SocialLinks
│                   │       │       └── SocialLink (Multiple)
│                   │       └── ResponseTime Section
│                   │           └── ResponseTimeCard
│                   │
│                   └── NotFound Route (/*)
│                       └── NotFound Page
│                           ├── NotFoundContent
│                           ├── NotFoundVisuals
│                           └── Button (Go Home)
│
└── CursorFollower (Global)
```

---

## Layout Components

Layout components provide the structural framework for the application. They wrap page content and ensure consistent layout across all pages.

### Header

**File:** `src/components/layout/Header.tsx`

**Purpose:** Site header with navigation, logo, theme toggle, and scroll progress indicator.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isSticky` | `boolean` | No | Whether header is sticky to top of viewport |

**Responsibilities:**
- Display logo/brand
- Render navigation menu
- Provide theme toggle button
- Show scroll progress indicator
- Handle mobile menu toggle
- Responsive design (desktop/mobile)

**Used By:** Layout component

**Child Components:**
- Logo
- Navigation
- ThemeToggle
- ScrollProgress

---

### Footer

**File:** `src/components/layout/Footer.tsx`

**Purpose:** Site footer with social links, quick links, and copyright information.

**Props:** None

**Responsibilities:**
- Display social media links
- Provide quick navigation links
- Show copyright information
- Display contact information
- Responsive design

**Used By:** Layout component

**Child Components:**
- SocialLinks
- QuickLinks
- Copyright

---

### Navigation

**File:** `src/components/layout/Navigation.tsx`

**Purpose:** Navigation menu for desktop and mobile.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `isMobile` | `boolean` | No | Whether to render mobile menu |

**Responsibilities:**
- Render navigation links
- Highlight active route
- Handle mobile menu toggle
- Animate menu transitions
- Keyboard navigation support

**Used By:** Header

**Child Components:**
- NavLink (Desktop)
- MobileMenu
  - MenuToggle
  - MobileNavLinks

---

### PageTransition

**File:** `src/components/layout/PageTransition.tsx`

**Purpose:** Wraps page content with transition animations.

**Props:**

| Prop | Type | Required | Description |
|------|------|----------|-------------|
| `children` | `ReactNode` | Yes | Page content to wrap |

**Responsibilities:**
- Animate page entrance
- Animate page exit
- Handle route transitions
- Respect reduced motion preference

**Used By:** Layout component

**Child Components:** None (wraps page content)

---

### ScrollProgress

**File:** `src/components/layout/ScrollProgress.tsx`

**Purpose:** Shows scroll progress indicator at top of page.

**Props:** None

**Responsibilities:**
- Track scroll position
- Display progress bar
- Animate progress updates
- Hide when at top of page

**Used By:** Header

**Child Components:** None

---

## UI Components

UI components are generic, reusable elements that can be used throughout the application.

### Button

**File:** `src/components/ui/Button.tsx`

**Purpose:** Reusable button with multiple variants and sizes.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'primary' \| 'secondary' \| 'ghost' \| 'outline'` | No | `'primary'` | Button style variant |
| `size` | `'sm' \| 'md' \| 'lg'` | No | `'md'` | Button size |
| `children` | `ReactNode` | Yes | - | Button content |
| `disabled` | `boolean` | No | `false` | Disable button |
| `loading` | `boolean` | No | `false` | Show loading state |
| `icon` | `ReactNode` | No | - | Optional icon |
| `iconPosition` | `'left' \| 'right'` | No | `'left'` | Icon position |
| `onClick` | `() => void` | No | - | Click handler |

**Responsibilities:**
- Render button with specified variant
- Handle click events
- Show loading state
- Support icons
- Accessibility (ARIA attributes)

**Used By:** All components

**Variants:**
- `primary` - Main action button, brand color
- `secondary` - Secondary action, neutral color
- `ghost` - Minimal styling, transparent background
- `outline` - Outlined button, transparent background

---

### Card

**File:** `src/components/ui/Card.tsx`

**Purpose:** Card container component for grouping related content.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'default' \| 'elevated' \| 'outlined'` | No | `'default'` | Card style variant |
| `children` | `ReactNode` | Yes | - | Card content |
| `hoverable` | `boolean` | No | `false` | Add hover effect |
| `onClick` | `() => void` | No | - | Click handler |

**Responsibilities:**
- Render card container
- Apply variant styling
- Handle hover effects
- Support click actions
- Accessibility (role, tabindex)

**Used By:** All components

**Variants:**
- `default` - Flat card with subtle border
- `elevated` - Card with shadow/depth
- `outlined` - Card with prominent border

---

### Badge

**File:** `src/components/ui/Badge.tsx`

**Purpose:** Badge/tag component for labels and categories.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `variant` | `'default' \| 'success' \| 'warning' \| 'error' \| 'info'` | No | `'default'` | Badge style variant |
| `size` | `'sm' \| 'md'` | No | `'md'` | Badge size |
| `children` | `ReactNode` | Yes | - | Badge content |
| `removable` | `boolean` | No | `false` | Show remove button |
| `onRemove` | `() => void` | No | - | Remove handler |

**Responsibilities:**
- Render badge with variant
- Display remove button if removable
- Handle remove action
- Accessibility (ARIA attributes)

**Used By:** ProjectCard, TimelineItem, CertificationCard

**Variants:**
- `default` - Neutral color
- `success` - Green for success states
- `warning` - Yellow/amber for warnings
- `error` - Red for errors
- `info` - Blue for information

---

### Modal

**File:** `src/components/ui/Modal.tsx`

**Purpose:** Modal dialog component for overlay content.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `isOpen` | `boolean` | Yes | - | Modal open state |
| `onClose` | `() => void` | Yes | - | Close handler |
| `title` | `string` | No | - | Modal title |
| `children` | `ReactNode` | Yes | - | Modal content |
| `size` | `'sm' \| 'md' \| 'lg' \| 'xl'` | No | `'md'` | Modal size |
| `closeOnOverlayClick` | `boolean` | No | `true` | Close on overlay click |
| `closeOnEscape` | `boolean` | No | `true` | Close on escape key |

**Responsibilities:**
- Render modal overlay
- Render modal content
- Handle close actions
- Trap focus within modal
- Accessibility (ARIA attributes, focus management)
- Animate open/close transitions

**Used By:** ProjectModal, ContactForm (success modal)

---

### Tooltip

**File:** `src/components/ui/Tooltip.tsx`

**Purpose:** Tooltip component for additional information on hover.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `content` | `string` | Yes | - | Tooltip content |
| `position` | `'top' \| 'bottom' \| 'left' \| 'right'` | No | `'top'` | Tooltip position |
| `children` | `ReactNode` | Yes | - | Trigger element |
| `delay` | `number` | No | `200` | Show delay in ms |

**Responsibilities:**
- Render tooltip on hover
- Position tooltip correctly
- Handle delay
- Accessibility (ARIA attributes)

**Used By:** Various components for additional context

---

### ScrollIndicator

**File:** `src/components/ui/ScrollIndicator.tsx`

**Purpose:** Scroll to top button indicator.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `threshold` | `number` | No | `300` | Scroll threshold to show |

**Responsibilities:**
- Show/hide based on scroll position
- Scroll to top on click
- Animate appearance
- Accessibility (ARIA label)

**Used By:** Layout (typically fixed in corner)

---

## Animation Components

Animation components contain complex animation logic using GSAP and Framer Motion.

### MagneticButton

**File:** `src/components/animations/MagneticButton.tsx`

**Purpose:** Button with magnetic mouse effect using GSAP.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Button content |
| `strength` | `number` | No | `0.5` | Magnetic strength (0-1) |
| `onClick` | `() => void` | No | - | Click handler |

**Responsibilities:**
- Track mouse position
- Animate button toward cursor
- Reset position on mouse leave
- Respect reduced motion preference
- Performance optimization (RAF)

**Library:** GSAP

**Used By:** Hero section, CTAs

---

### TextReveal

**File:** `src/components/animations/TextReveal.tsx`

**Purpose:** Text character-by-character reveal animation.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `text` | `string` | Yes | - | Text to reveal |
| `delay` | `number` | No | `0` | Start delay in seconds |
| `stagger` | `number` | No | `0.05` | Stagger between characters |
| `direction` | `'up' \| 'down' \| 'left' \| 'right'` | No | `'up'` | Reveal direction |

**Responsibilities:**
- Split text into characters
- Animate each character
- Support stagger timing
- Respect reduced motion preference
- Support custom directions

**Library:** GSAP

**Used By:** Hero titles, section headers

---

### ParallaxSection

**File:** `src/components/animations/ParallaxSection.tsx`

**Purpose:** Section with parallax scrolling effect.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `children` | `ReactNode` | Yes | - | Section content |
| `speed` | `number` | No | `0.5` | Parallax speed (0-1) |
| `offset` | `number` | No | `0` | Parallax offset |

**Responsibilities:**
- Track scroll position
- Apply parallax transform
- Optimize performance (will-change)
- Respect reduced motion preference

**Library:** GSAP ScrollTrigger

**Used By:** Hero section, visual elements

---

### CursorFollower

**File:** `src/components/animations/CursorFollower.tsx`

**Purpose:** Custom cursor that follows mouse movement.

**Props:** None (global component)

**Responsibilities:**
- Track mouse position
- Animate cursor movement
- Change cursor on hover over interactive elements
- Hide on touch devices
- Respect reduced motion preference
- Performance optimization (RAF)

**Library:** GSAP

**Used By:** Global (App level)

---

### MorphingShape

**File:** `src/components/animations/MorphingShape.tsx`

**Purpose:** SVG shape morphing animation.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `shapes` | `string[]` | Yes | - | SVG path shapes to morph between |
| `duration` | `number` | No | `2` | Morph duration in seconds |
| `loop` | `boolean` | No | `true` | Loop animation |

**Responsibilities:**
- Morph between SVG shapes
- Handle animation timing
- Support looping
- Respect reduced motion preference

**Library:** GSAP

**Used By:** Hero background, decorative elements

---

## Section Components

Section components are reusable page sections that can be composed to create pages.

### Hero

**File:** `src/components/sections/Hero.tsx`

**Purpose:** Hero section with parallax and animations.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `title` | `string` | Yes | - | Hero title |
| `subtitle` | `string` | Yes | - | Hero subtitle |
| `ctaText` | `string` | No | - | CTA button text |
| `ctaLink` | `string` | No | - | CTA link |
| `background` | `ReactNode` | No | - | Background element |

**Responsibilities:**
- Render hero content
- Apply text reveal animations
- Render parallax background
- Render CTA button
- Full viewport height

**Used By:** Landing page, inner pages

**Child Components:**
- HeroContent
  - TextReveal (title)
  - TextReveal (subtitle)
  - MagneticButton (CTA)
- HeroVisuals
  - ParallaxSection
  - MorphingShape

---

### AboutSection

**File:** `src/components/sections/AboutSection.tsx`

**Purpose:** About section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Render about content
- Show preview or full version
- Render "View All" button if preview

**Used By:** Landing page, About page

**Child Components:**
- SectionHeader
- BioPreview / BioContent
- Button (View All)

---

### SkillsSection

**File:** `src/components/sections/SkillsSection.tsx`

**Purpose:** Skills section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `skills` | `Skill[]` | Yes | - | Skills data |
| `limit` | `number` | No | `6` | Number of skills to show |
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Render skills grid
- Limit skills if preview
- Render "View All" button if preview

**Used By:** Landing page, Skills page

**Child Components:**
- SectionHeader
- SkillsGrid
  - SkillBar (Multiple)
- Button (View All)

---

### ProjectsSection

**File:** `src/components/sections/ProjectsSection.tsx`

**Purpose:** Projects section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `projects` | `Project[]` | Yes | - | Projects data |
| `featured` | `boolean` | No | `true` | Show only featured projects |
| `limit` | `number` | No | `3` | Number of projects to show |
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Filter projects if featured
- Limit projects if preview
- Render projects grid
- Render "View All" button if preview

**Used By:** Landing page, Projects page

**Child Components:**
- SectionHeader
- FeaturedProjects / ProjectsGrid
  - ProjectCard (Multiple)
- Button (View All)

---

### ExperienceSection

**File:** `src/components/sections/ExperienceSection.tsx`

**Purpose:** Experience section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `experience` | `Experience[]` | Yes | - | Experience data |
| `limit` | `number` | No | `2` | Number of items to show |
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Limit experience items if preview
- Render timeline
- Render "View All" button if preview

**Used By:** Landing page, Experience page

**Child Components:**
- SectionHeader
- Timeline (Preview)
  - TimelineItem (Featured)
- Button (View All)

---

### CertificationsSection

**File:** `src/components/sections/CertificationsSection.tsx`

**Purpose:** Certifications section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `certifications` | `Certification[]` | Yes | - | Certifications data |
| `limit` | `number` | No | `3` | Number to show |
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Limit certifications if preview
- Render certification grid
- Render "View All" button if preview

**Used By:** Landing page, Certifications page

**Child Components:**
- SectionHeader
- CertificationGrid (Preview)
  - CertificationCard (Featured)
- Button (View All)

---

### ContactSection

**File:** `src/components/sections/ContactSection.tsx`

**Purpose:** Contact section preview for landing page.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `preview` | `boolean` | No | `true` | Show preview or full content |

**Responsibilities:**
- Render contact preview
- Render "Get in Touch" button if preview

**Used By:** Landing page, Contact page

**Child Components:**
- SectionHeader
- ContactPreview
- Button (Get in Touch)

---

## Shared Components

Shared components are used across multiple pages or sections.

### SkillBar

**File:** `src/components/shared/SkillBar.tsx`

**Purpose:** Animated skill progress bar.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `skill` | `Skill` | Yes | - | Skill data |
| `level` | `number` | Yes | - | Skill level (0-100) |
| `animated` | `boolean` | No | `true` | Animate progress bar |

**Responsibilities:**
- Render skill name
- Render progress bar
- Animate progress on mount
- Show percentage

**Used By:** SkillsSection, Experience page

---

### TimelineItem

**File:** `src/components/shared/TimelineItem.tsx`

**Purpose:** Timeline entry component for experience.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `item` | `Experience` | Yes | - | Experience data |
| `index` | `number` | Yes | - | Item index for animation |

**Responsibilities:**
- Render experience details
- Render achievements
- Render tech stack badges
- Animate on scroll

**Used By:** ExperienceSection, Experience page

**Child Components:**
- ItemHeader
- ItemContent
- ItemAchievements
  - AchievementBadge
- ItemTechStack
  - Badge (Multiple)

---

### ProjectCard

**File:** `src/components/shared/ProjectCard.tsx`

**Purpose:** Project display card.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `project` | `Project` | Yes | - | Project data |
| `featured` | `boolean` | No | `false` | Featured styling |
| `onClick` | `() => void` | No | - | Click handler |

**Responsibilities:**
- Render project image
- Render project title and description
- Render tech stack badges
- Render links (live, repo)
- Handle click to open modal

**Used By:** ProjectsSection, Projects page

**Child Components:**
- CardHeader
- CardBody
- CardMeta
  - Badge (Multiple)
- CardActions
  - Button (Multiple)

---

### SocialLink

**File:** `src/components/shared/SocialLink.tsx`

**Purpose:** Social media link button.

**Props:**

| Prop | Type | Required | Default | Description |
|------|------|----------|---------|-------------|
| `platform` | `string` | Yes | - | Platform name |
| `url` | `string` | Yes | - | Profile URL |
| `icon` | `ReactNode` | Yes | - | Platform icon |
| `label` | `string` | No | - | Accessible label |

**Responsibilities:**
- Render platform icon
- Link to profile
- Open in new tab
- Accessibility (ARIA label)

**Used By:** Footer, Contact page

---

## Page Components

Page components represent routes in the application. They compose layout components, sections, and UI components.

### Landing

**File:** `src/pages/Landing.tsx`

**Purpose:** Landing page with one-page scroll layout.

**Route:** `/`

**Responsibilities:**
- Compose all preview sections
- Implement smooth scroll navigation
- Render hero section
- Render all section previews
- Handle scroll progress

**Child Components:**
- Hero
- AboutSection (preview)
- SkillsSection (preview)
- ProjectsSection (preview)
- ExperienceSection (preview)
- CertificationsSection (preview)
- ContactSection (preview)

---

### About

**File:** `src/pages/About.tsx`

**Purpose:** About page with full content.

**Route:** `/about`

**Responsibilities:**
- Render about hero
- Render full bio section
- Render values section
- Render CTA section

**Child Components:**
- AboutHero
- BioSection
- ValuesSection
- CTASection

---

### Skills

**File:** `src/pages/Skills.tsx`

**Purpose:** Skills page with full content.

**Route:** `/skills`

**Responsibilities:**
- Render skills hero
- Render technical skills
- Render soft skills
- Render tools section
- Render learning section

**Child Components:**
- SkillsHero
- TechnicalSkills
- SoftSkills
- ToolsSection
- LearningSection

---

### Projects

**File:** `src/pages/Projects.tsx`

**Purpose:** Projects page with filtering and modal.

**Route:** `/projects`

**Responsibilities:**
- Render projects hero
- Implement filter functionality
- Render featured projects
- Render all projects grid
- Handle project modal

**Child Components:**
- ProjectsHero
- FilterSection
- FeaturedProjects
- AllProjects
- ProjectModal

---

### Experience

**File:** `src/pages/Experience.tsx`

**Purpose:** Experience page with timeline.

**Route:** `/experience`

**Responsibilities:**
- Render experience hero
- Render full timeline
- Implement timeline filtering
- Render skills gained section

**Child Components:**
- ExperienceHero
- TimelineSection
- SkillsGainedSection

---

### Certifications

**File:** `src/pages/Certifications.tsx`

**Purpose:** Certifications page with filtering.

**Route:** `/certifications`

**Responsibilities:**
- Render certifications hero
- Implement filtering
- Render certification grid
- Render learning path section

**Child Components:**
- CertificationsHero
- FilterSection
- CertificationGrid
- LearningPathSection

---

### Contact

**File:** `src/pages/Contact.tsx`

**Purpose:** Contact page with form.

**Route:** `/contact`

**Responsibilities:**
- Render contact hero
- Render contact form
- Render contact information
- Handle form submission
- Show success/error states

**Child Components:**
- ContactHero
- ContactFormSection
- ContactInfoSection
- ResponseTimeSection

---

### NotFound

**File:** `src/pages/NotFound.tsx`

**Purpose:** 404 error page.

**Route:** `*`

**Responsibilities:**
- Render 404 message
- Provide navigation back to home
- Maintain site styling

**Child Components:**
- NotFoundContent
- NotFoundVisuals
- Button (Go Home)

---

## Component Composition Patterns

### Page Composition Pattern

Each page follows this composition structure:

```
Page Component
├── Hero Section (full viewport height)
├── Content Sections (scrollable)
└── CTA Section (optional)
```

**Example:**
```typescript
export function ProjectsPage() {
  return (
    <>
      <ProjectsHero />
      <FilterSection />
      <FeaturedProjects />
      <AllProjects />
      <CTASection />
    </>
  )
}
```

---

### Section Composition Pattern

Each section follows this composition structure:

```
Section Component
├── SectionHeader (title + subtitle + optional CTA)
├── SectionContent (main content)
└── SectionFooter (optional pagination or links)
```

**Example:**
```typescript
export function ProjectsSection({ projects, limit }) {
  return (
    <section>
      <SectionHeader title="Projects" subtitle="My work" />
      <SectionContent>
        {projects.slice(0, limit).map(project => (
          <ProjectCard key={project.id} project={project} />
        ))}
      </SectionContent>
      <SectionFooter>
        <Button to="/projects">View All</Button>
      </SectionFooter>
    </section>
  )
}
```

---

### Card Composition Pattern

Each card follows this composition structure:

```
Card Component
├── CardHeader (title + optional badge)
├── CardBody (main content)
├── CardMeta (metadata: date, tags, etc.)
└── CardActions (buttons, links)
```

**Example:**
```typescript
export function ProjectCard({ project }) {
  return (
    <Card>
      <CardHeader>
        <h3>{project.title}</h3>
        {project.featured && <Badge variant="info">Featured</Badge>}
      </CardHeader>
      <CardBody>
        <p>{project.description}</p>
      </CardBody>
      <CardMeta>
        {project.technologies.map(tech => (
          <Badge key={tech}>{tech}</Badge>
        ))}
      </CardMeta>
      <CardActions>
        <Button href={project.liveUrl}>View Live</Button>
        <Button href={project.repositoryUrl}>GitHub</Button>
      </CardActions>
    </Card>
  )
}
```

---

## Component Guidelines

### General Guidelines

1. **Single Responsibility:** Each component should have one clear purpose
2. **Props Interface:** Define TypeScript interfaces for all props
3. **Default Props:** Provide sensible defaults for optional props
4. **Destructuring:** Destructure props in component signature
5. **Naming:** Use descriptive, action-oriented names for handlers

### Component Structure

```typescript
// 1. Imports
import React from 'react'
import { motion } from 'framer-motion'

// 2. Types/Interfaces
interface ComponentProps {
  // prop definitions
}

// 3. Component
export function Component({ prop1, prop2 }: ComponentProps) {
  // 4. Hooks
  // 5. State
  // 6. Effects
  // 7. Handlers
  // 8. Render
  return (
    // JSX
  )
}
```

### Performance Guidelines

1. **React.memo:** Use for expensive components that re-render frequently
2. **useCallback:** Use for event handlers passed to children
3. **useMemo:** Use for expensive computations
4. **Code Splitting:** Use React.lazy for large components
5. **Avoid Inline Functions:** Define handlers outside render

### Accessibility Guidelines

1. **Semantic HTML:** Use appropriate HTML elements
2. **ARIA Attributes:** Add ARIA labels where needed
3. **Keyboard Navigation:** Ensure all interactive elements are keyboard accessible
4. **Focus Management:** Manage focus for modals and dynamic content
5. **Color Contrast:** Ensure sufficient color contrast

### Styling Guidelines

1. **Tailwind First:** Use Tailwind classes for styling
2. **Component Variants:** Use Tailwind variant patterns
3. **Responsive Design:** Use Tailwind responsive prefixes
4. **Custom CSS:** Only for complex animations or third-party integrations
5. **Theme Tokens:** Use CSS custom properties for theming

---

## Conclusion

The component architecture provides a clear, hierarchical structure for building the portfolio application. Components are organized by their role and responsibility, making the codebase maintainable and scalable.

The composition patterns ensure consistency across the application while allowing for flexibility in implementation. Guidelines for performance, accessibility, and styling ensure high-quality components.

---

**Document Version:** 1.0  
**Last Updated:** August 1, 2026  
**Next Review:** After Phase 3 completion
