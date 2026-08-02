# Project Master Documentation

**Project:** Portfolio 2027  
**Version:** 1.0  
**Created:** August 1, 2026  
**Status:** Design Phase - Awaiting Implementation

---

## Purpose

This document contains the permanent project rules, guidelines, and standards that must be followed throughout the development lifecycle. All team members must read and understand these rules before making any changes to the codebase.

---

## Table of Contents

1. [Project Vision](#project-vision)
2. [Core Principles](#core-principles)
3. [Technology Standards](#technology-standards)
4. [Code Standards](#code-standards)
5. [Architecture Standards](#architecture-standards)
6. [Performance Standards](#performance-standards)
7. [Accessibility Standards](#accessibility-standards)
8. [Security Standards](#security-standards)
9. [Testing Standards](#testing-standards)
10. [Documentation Standards](#documentation-standards)
11. [Git Workflow](#git-workflow)
12. [Deployment Standards](#deployment-standards)

---

## Project Vision

Portfolio 2027 is a premium, production-ready Software Engineer portfolio that demonstrates high-quality software engineering practices. The portfolio must be:

- **Unique:** Not a generic template
- **Modern:** Using current best practices and technologies
- **Performant:** Optimized for speed and efficiency
- **Accessible:** Usable by everyone
- **Maintainable:** Easy to update and extend
- **Professional:** Production-ready quality

---

## Core Principles

### 1. Quality Over Speed

Never sacrifice quality for speed. It's better to take more time and do it right than to rush and create technical debt.

### 2. User Experience First

Every decision must consider the end-user experience. Performance, accessibility, and usability are not optional.

### 3. Simplicity

Keep things simple. Avoid over-engineering. Simple solutions are easier to maintain, debug, and understand.

### 4. Consistency

Maintain consistency across the codebase. Consistent naming, structure, and patterns make the codebase easier to navigate and maintain.

### 5. Type Safety

Leverage TypeScript's type system. Never use `any` unless absolutely necessary (and document why).

### 6. Performance First

Performance is a feature, not an afterthought. Consider performance implications in every decision.

### 7. Accessibility by Default

Build accessibility into the design from the start. Don't treat it as an add-on.

### 8. Security Conscious

Always consider security implications. Never expose secrets, always validate inputs, and follow security best practices.

---

## Technology Standards

### Approved Technologies

| Category | Technology | Version | Purpose |
|----------|-----------|---------|---------|
| Framework | React | 19 | UI Framework |
| Language | TypeScript | 5.x | Type Safety |
| Build Tool | Vite | 6.x | Build Tool & Dev Server |
| Styling | Tailwind CSS | 4.x | Styling |
| Animation | Framer Motion | 12.x | UI Animations |
| Animation | GSAP | 3.x | Advanced Animations |
| Smooth Scroll | Lenis | 1.x | Smooth Scrolling |
| Routing | React Router | 7.x | Client-Side Routing |
| Icons | React Icons | 5.x | Icon Library |

### Technology Addition Rules

1. **No new dependencies without approval**
2. **Must be necessary** - Only add if existing tools cannot solve the problem
3. **Must be well-maintained** - Check GitHub stars, recent commits, and community activity
4. **Must be performant** - No heavy libraries for simple tasks
5. **Must be secure** - Check for known vulnerabilities
6. **Document the reason** - Add a comment explaining why the dependency was added

### Dependency Version Rules

- **Use exact versions** in package.json (no caret or tilde ranges)
- **Check for updates monthly** - Review security updates and breaking changes
- **Test updates thoroughly** - Never update without testing
- **Document breaking changes** - Update documentation when dependencies change

---

## Code Standards

### File Naming

- **Components:** PascalCase (e.g., `Button.tsx`, `ProjectCard.tsx`)
- **Hooks:** camelCase with `use` prefix (e.g., `useTheme.ts`, `useAnimation.ts`)
- **Utilities:** camelCase (e.g., `cn.ts`, `scroll.ts`)
- **Types:** camelCase (e.g., `project.ts`, `experience.ts`)
- **Constants:** camelCase (e.g., `routes.ts`, `animations.ts`)
- **Styles:** kebab-case (e.g., `globals.css`, `dark.css`)

### Component Structure

Every component must follow this structure:

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

### TypeScript Rules

1. **No `any` types** - Use specific types or `unknown`
2. **Define interfaces for all props** - No anonymous prop types
3. **Use `readonly` for immutable data** - Prevent accidental mutations
4. **Use `const assertions** for literals** - More specific type inference
5. **Enable strict mode** - All TypeScript strict checks must be enabled
6. **No implicit any** - Set `noImplicitAny: true` in tsconfig

### React Rules

1. **Functional components only** - No class components
2. **Hooks at the top level** - Never call hooks inside loops or conditions
3. **Custom hooks for reusable logic** - Extract repeated logic into hooks
4. **Memoize expensive computations** - Use `useMemo` for heavy calculations
5. **Memoize callbacks** - Use `useCallback` for functions passed to children
6. **Keys on lists** - Always provide stable keys for mapped elements

### CSS/Tailwind Rules

1. **Tailwind first** - Use Tailwind classes for 95% of styling
2. **Custom CSS only when necessary** - For complex animations or third-party integrations
3. **Responsive design** - Use Tailwind responsive prefixes (sm:, md:, lg:, xl:)
4. **Theme tokens** - Use CSS custom properties for theming
5. **No inline styles** - Except for dynamic values
6. **Utility-first approach** - Avoid component classes when possible

### Import Order

Imports must be organized in this order:

1. External libraries (React, third-party packages)
2. Internal imports (from other project files)
3. Type imports
4. Styles (if CSS modules)
5. Relative imports (from same directory)

```typescript
// 1. External libraries
import React, { useState, useEffect } from 'react'
import { motion } from 'framer-motion'

// 2. Internal imports
import { Button } from '../components/ui/Button'
import { useTheme } from '../hooks/useTheme'

// 3. Type imports
import type { Project } from '../types/project'

// 4. Styles (if using CSS modules)
// import styles from './Component.module.css'

// 5. Relative imports
import { localHelper } from './utils'
```

---

## Architecture Standards

### Component Architecture

1. **Single Responsibility** - Each component has one clear purpose
2. **Composition over inheritance** - Build complex UIs from simple components
3. **Props down, events up** - Data flows down, actions flow up
4. **Presentational vs Container** - Separate UI from logic when appropriate
5. **Reusable components** - Build components that can be used in multiple contexts

### State Management

1. **Local state first** - Use useState/useReducer for component-local state
2. **Context for global state** - Only use Context for truly global state
3. **Split contexts by concern** - One context per domain (theme, animation, scroll)
4. **Avoid prop drilling** - Use Context instead of passing props through many levels
5. **No external state management** - Redux, Zustand, etc. are not needed for this project

### Routing

1. **Code splitting** - Use React.lazy for all route components
2. **Lazy loading** - Load routes on demand
3. **Scroll restoration** - Restore scroll position on navigation
4. **Page transitions** - Use Framer Motion for smooth transitions
5. **SEO metadata** - Include meta tags for all routes

### Data Flow

1. **Unidirectional flow** - Data flows from sources to components
2. **Single source of truth** - Each piece of data has one source
3. **Immutable updates** - Never mutate state directly
4. **Derived state** - Compute derived state, don't store it
5. **Type-safe data** - All data must be typed

---

## Performance Standards

### Performance Targets

| Metric | Target | Measurement |
|--------|--------|-------------|
| First Contentful Paint (FCP) | < 1.5s | Lighthouse |
| Largest Contentful Paint (LCP) | < 2.5s | Lighthouse |
| Time to Interactive (TTI) | < 3.5s | Lighthouse |
| Cumulative Layout Shift (CLS) | < 0.1 | Lighthouse |
| First Input Delay (FID) | < 100ms | Lighthouse |
| Bundle Size (gzipped) | < 200KB | Bundle analyzer |
| Time to First Byte (TTFB) | < 600ms | Lighthouse |

### Performance Rules

1. **Code splitting** - Split code by route and feature
2. **Lazy loading** - Lazy load images, components, and routes
3. **Image optimization** - Use WebP, responsive images, and lazy loading
4. **Animation performance** - Use transform and opacity only, respect reduced motion
5. **Bundle optimization** - Tree shake, minify, and compress
6. **Cache strategy** - Implement intelligent caching for API calls
7. **Monitor performance** - Use Lighthouse and Core Web Vitals

### Performance Testing

- Run Lighthouse audit before each deployment
- Monitor Core Web Vitals in production
- Test on slow 3G networks
- Test on low-end devices
- Profile bundle size regularly

---

## Accessibility Standards

### WCAG 2.1 Level AA Compliance

The portfolio must achieve WCAG 2.1 Level AA compliance.

### Accessibility Rules

1. **Semantic HTML** - Use proper HTML5 semantic elements
2. **ARIA labels** - Add ARIA labels where semantic HTML is insufficient
3. **Keyboard navigation** - All interactive elements must be keyboard accessible
4. **Focus indicators** - Visible focus indicators on all interactive elements
5. **Color contrast** - Minimum 4.5:1 contrast ratio for text
6. **Alt text** - Descriptive alt text for all images
7. **Screen reader support** - Test with NVDA, JAWS, and VoiceOver
8. **Reduced motion** - Respect prefers-reduced-motion media query
9. **Skip to content** - Include skip to content link
10. **Form labels** - All form inputs must have associated labels

### Accessibility Testing

- Test with screen readers
- Test keyboard-only navigation
- Test with color blindness simulators
- Run automated accessibility audits (axe-core)
- Test on mobile devices

---

## Security Standards

### Security Rules

1. **No secrets in code** - Never commit API keys, passwords, or tokens
2. **Environment variables** - Use environment variables for sensitive data
3. **Input validation** - Validate all user inputs on both client and server
4. **XSS prevention** - React's built-in XSS protection, no dangerouslySetInnerHTML
5. **HTTPS only** - Enforce HTTPS in production
6. **Security headers** - Implement security headers (CSP, X-Frame-Options, etc.)
7. **Dependency updates** - Keep dependencies updated to patch vulnerabilities
8. **Code reviews** - Security review for all changes

### Security Testing

- Run security audits on dependencies
- Test for XSS vulnerabilities
- Test for CSRF vulnerabilities
- Review security headers
- Monitor for security advisories

---

## Testing Standards

### Testing Strategy

1. **Unit tests** - Test individual functions and components in isolation
2. **Integration tests** - Test component interactions
3. **E2E tests** - Test critical user flows
4. **Visual regression tests** - Test UI consistency
5. **Performance tests** - Test performance metrics

### Testing Rules

1. **Test critical paths** - Focus on important user flows
2. **Test edge cases** - Test error states and edge cases
3. **Maintain tests** - Keep tests updated with code changes
4. **Fast tests** - Tests should run quickly
5. **Clear test names** - Test names should describe what they test

### Testing Tools

- **Unit tests:** Vitest
- **E2E tests:** Playwright
- **Visual tests:** Chromatic (optional)
- **Testing library:** React Testing Library

---

## Documentation Standards

### Documentation Requirements

1. **Code comments** - Comment complex logic, not obvious code
2. **JSDoc** - Use JSDoc for functions and complex types
3. **README** - Keep project README updated
4. **CHANGELOG** - Document all changes in CHANGELOG.md
5. **Architecture docs** - Keep architecture documentation updated
6. **API docs** - Document API endpoints (when implemented)

### Documentation Rules

1. **Write for humans** - Documentation should be clear and understandable
2. **Keep it current** - Update documentation when code changes
3. **Be concise** - Get to the point, avoid fluff
4. **Use examples** - Provide code examples for complex concepts
5. **Document decisions** - Document why, not just what

---

## Git Workflow

### Branch Strategy

- **main** - Production-ready code
- **develop** - Integration branch for features
- **feature/*** - Feature branches
- **bugfix/*** - Bug fix branches
- **hotfix/*** - Emergency fixes for production

### Commit Message Format

Follow the Conventional Commits specification:

```
<type>(<scope>): <subject>

<body>

<footer>
```

**Types:**
- `feat` - New feature
- `fix` - Bug fix
- `docs` - Documentation changes
- `style` - Code style changes (formatting, etc.)
- `refactor` - Code refactoring
- `perf` - Performance improvements
- `test` - Test changes
- `chore` - Build process or auxiliary tool changes

**Examples:**
```
feat(projects): add project filtering

Implement filtering by category and technology stack.
Added filter UI components and updated state management.

Closes #123
```

```
fix(theme): resolve theme flicker on load

Fixed initial theme flicker by preloading theme preference
from localStorage before render.
```

### Pull Request Rules

1. **Descriptive title** - PR title should describe the change
2. **Linked issues** - Reference related issues
3. **Clear description** - Explain what was changed and why
4. **Screenshots** - Include screenshots for UI changes
5. **Tests** - Include tests for new functionality
6. **No merge conflicts** - Resolve conflicts before submitting
7. **Passing CI** - All checks must pass
8. **Code review** - At least one approval required

### Git Rules

1. **Never commit to main directly** - Always use branches
2. **Small commits** - Keep commits focused and small
3. **Clean history** - Rebase feature branches before merging
4. **Meaningful messages** - Write clear, descriptive commit messages
5. **Update docs** - Update documentation with code changes

---

## Deployment Standards

### Deployment Process

1. **Run tests** - All tests must pass
2. **Build production** - Build for production
3. **Test production build** - Test the production build locally
4. **Deploy to staging** - Deploy to staging environment first
5. **Test staging** - Test on staging environment
6. **Deploy to production** - Deploy to production
7. **Monitor** - Monitor for errors and issues
8. **Rollback plan** - Have a rollback plan ready

### Deployment Rules

1. **Automated deployments** - Use CI/CD for deployments
2. **Environment variables** - Configure environment variables for each environment
3. **Database migrations** - Run migrations before deploying code
4. **Zero downtime** - Aim for zero-downtime deployments
5. **Rollback capability** - Must be able to rollback quickly
6. **Monitor health** - Monitor application health after deployment

### Deployment Checklist

- [ ] All tests passing
- [ ] Production build successful
- [ ] Environment variables configured
- [ ] Database migrations run
- [ ] Staging deployment tested
- [ ] Performance metrics checked
- [ ] Security review completed
- [ ] Documentation updated
- [ ] Rollback plan prepared

---

## Code Review Standards

### Review Guidelines

1. **Be constructive** - Provide helpful, constructive feedback
2. **Be respectful** - Respect the author's time and effort
3. **Focus on the code** - Review the code, not the person
4. **Explain why** - Explain the reasoning behind suggestions
5. **Approve when ready** - Don't delay approval unnecessarily

### Review Checklist

- [ ] Code follows project standards
- [ ] Code is readable and maintainable
- [ ] Code is performant
- [ ] Code is accessible
- [ ] Code is secure
- [ ] Tests are included
- [ ] Documentation is updated
- [ ] No unintended side effects

---

## Project Phases

### Phase 1: Project Setup & Foundation (Week 1)
- Initialize project
- Configure build tools
- Set up folder structure
- Install dependencies

### Phase 2: Core Systems (Week 2)
- Theme system
- Smooth scrolling
- Layout components
- Routing structure

### Phase 3: UI Component Library (Week 3)
- UI components
- Animation components
- Shared components

### Phase 4: Landing Page (Week 4)
- Hero section
- Section previews
- Animations

### Phase 5: Inner Pages (Week 5-6)
- About page
- Skills page
- Projects page
- Experience page
- Certifications page
- Contact page

### Phase 6: Content & Data (Week 7)
- Data structures
- Content population
- Placeholder assets

### Phase 7: Advanced Animations (Week 8)
- GSAP animations
- Page transitions
- Performance optimization

### Phase 8: SEO & Accessibility (Week 9)
- Meta tags
- Structured data
- Accessibility testing
- ARIA labels

### Phase 9: Performance Optimization (Week 10)
- Code splitting
- Image optimization
- Bundle optimization
- Lighthouse audit

### Phase 10: Testing & Polish (Week 11)
- Cross-browser testing
- Device testing
- Performance testing
- Bug fixes

### Phase 11: Deployment (Week 12)
- Build optimization
- CI/CD setup
- Hosting configuration
- Production deployment

### Phase 12: Post-Launch (Ongoing)
- Monitoring
- Maintenance
- Updates
- New features

---

## Contact & Support

For questions about these standards or the project:

1. Review the architecture documentation in the project root
2. Check the TASKS.md for current task status
3. Review the CHANGELOG.md for recent changes
4. Contact the project lead for clarification

---

## Document Updates

This document should be reviewed and updated:

- When project standards change
- When new technologies are adopted
- When processes change
- Annually at minimum

**Last Updated:** August 1, 2026  
**Next Review:** After Phase 1 completion
