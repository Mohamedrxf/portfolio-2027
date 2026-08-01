# API Layer Architecture Documentation

**Version:** 1.0  
**Date:** August 1, 2026  
**Project:** Portfolio 2027

---

## Table of Contents

1. [Overview](#overview)
2. [Architecture Goals](#architecture-goals)
3. [Technology Stack](#technology-stack)
4. [API Layer Structure](#api-layer-structure)
5. [API Client Implementation](#api-client-implementation)
6. [API Endpoints](#api-endpoints)
7. [React Query Integration](#react-query-integration)
8. [Validation Layer](#validation-layer)
9. [Error Handling Strategy](#error-handling-strategy)
10. [Caching Strategy](#caching-strategy)
11. [Security Considerations](#security-considerations)
12. [API Integration Points](#api-integration-points)
13. [Migration Strategy](#migration-strategy)

---

## Overview

The API layer architecture is designed for future backend integration when the portfolio evolves to require dynamic content, user authentication, or administrative features. The architecture follows RESTful principles, is type-safe, and includes comprehensive error handling and caching strategies.

### Current State

**Phase 1: Static Data (Current)**
- Data stored in TypeScript files
- No API calls
- Fast and simple
- Easy to update and maintain

### Future State

**Phase 2: API Layer Addition**
- Add API client structure
- Implement endpoints
- Keep static data as fallback
- Feature flag for API mode

**Phase 3: Gradual Migration**
- Migrate one endpoint at a time
- Start with contact form (dynamic)
- Then projects (read-only)
- Then admin features (read-write)

**Phase 4: Full API Integration**
- All data from API
- Static data removed
- CMS integration for content management

---

## Architecture Goals

1. **Type Safety:** Full TypeScript support from API to components
2. **Performance:** Request caching, batching, and optimization
3. **Error Handling:** Comprehensive error handling with user-friendly messages
4. **Scalability:** Easy to extend with new endpoints
5. **Security:** Proper authentication, authorization, and data validation
6. **Developer Experience:** Intuitive API with clear documentation

---

## Technology Stack

### Client-Side

| Technology | Version | Purpose |
|------------|---------|---------|
| Fetch API | Native | HTTP requests |
| React Query (TanStack Query) | Latest | Data fetching, caching, state management |
| Zod | Latest | Runtime type validation |
| Axios (optional) | Latest | HTTP client with interceptors (if needed) |

### Server-Side Options

| Option | Description | Use Case |
|--------|-------------|---------|
| Headless CMS | Contentful, Strapi, Sanity | Content management |
| Custom API | Node.js/Express | Full control |
| Serverless | Vercel, Netlify Functions | Simple backend |
| Next.js API Routes | Next.js | Integrated with Next.js |

---

## API Layer Structure

```
src/
└── lib/
    └── api/
        ├── client/
        │   ├── apiClient.ts        # Base API client
        │   ├── interceptors.ts     # Request/response interceptors
        │   └── config.ts           # API configuration
        ├── endpoints/
        │   ├── projects.ts         # Project endpoints
        │   ├── experience.ts       # Experience endpoints
        │   ├── skills.ts           # Skills endpoints
        │   ├── certifications.ts   # Certification endpoints
        │   ├── contact.ts          # Contact form endpoint
        │   └── auth.ts             # Authentication endpoints (future)
        ├── types/
        │   ├── requests.ts         # Request type definitions
        │   ├── responses.ts        # Response type definitions
        │   └── errors.ts           # Error type definitions
        ├── hooks/
        │   ├── useProjects.ts      # Projects data hook
        │   ├── useExperience.ts    # Experience data hook
        │   ├── useSkills.ts        # Skills data hook
        │   ├── useContact.ts       # Contact form hook
        │   └── useAuth.ts          # Authentication hook (future)
        ├── utils/
        │   ├── validators.ts       # Request validators
        │   ├── transformers.ts     # Data transformers
        │   └── normalizers.ts      # Data normalizers
        └── constants/
            ├── endpoints.ts       # Endpoint URLs
            └── cacheKeys.ts        # React Query cache keys
```

### Directory Purposes

| Directory | Purpose |
|-----------|---------|
| `client/` | Base API client configuration |
| `endpoints/` | API endpoint implementations |
| `types/` | TypeScript type definitions |
| `hooks/` | React Query custom hooks |
| `utils/` | Validation, transformation, normalization |
| `constants/` | Endpoint URLs and cache keys |

---

## API Client Implementation

### Base API Client

```typescript
// src/lib/api/client/apiClient.ts

interface ApiClientConfig {
  baseUrl: string
  timeout?: number
  headers?: Record<string, string>
  onError?: (error: ApiError) => void
}

class ApiClient {
  private baseUrl: string
  private timeout: number
  private defaultHeaders: Record<string, string>
  private onError?: (error: ApiError) => void
  
  constructor(config: ApiClientConfig) {
    this.baseUrl = config.baseUrl
    this.timeout = config.timeout ?? 10000
    this.defaultHeaders = {
      'Content-Type': 'application/json',
      ...config.headers
    }
    this.onError = config.onError
  }
  
  private async request<T>(
    endpoint: string,
    options: RequestInit = {}
  ): Promise<T> {
    const url = `${this.baseUrl}${endpoint}`
    const controller = new AbortController()
    const timeoutId = setTimeout(() => controller.abort(), this.timeout)
    
    try {
      const response = await fetch(url, {
        ...options,
        headers: {
          ...this.defaultHeaders,
          ...options.headers
        },
        signal: controller.signal
      })
      
      clearTimeout(timeoutId)
      
      if (!response.ok) {
        const error = await this.handleError(response)
        this.onError?.(error)
        throw error
      }
      
      const data = await response.json()
      return data as T
    } catch (error) {
      clearTimeout(timeoutId)
      
      if (error instanceof ApiError) {
        throw error
      }
      
      throw new ApiError({
        message: 'Network error occurred',
        status: 0,
        code: 'NETWORK_ERROR'
      })
    }
  }
  
  async get<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'GET' })
  }
  
  async post<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'POST',
      body: JSON.stringify(data)
    })
  }
  
  async put<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PUT',
      body: JSON.stringify(data)
    })
  }
  
  async patch<T>(endpoint: string, data: unknown, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, {
      ...options,
      method: 'PATCH',
      body: JSON.stringify(data)
    })
  }
  
  async delete<T>(endpoint: string, options?: RequestInit): Promise<T> {
    return this.request<T>(endpoint, { ...options, method: 'DELETE' })
  }
  
  private async handleError(response: Response): Promise<ApiError> {
    let errorData: ErrorResponse
    
    try {
      errorData = await response.json()
    } catch {
      errorData = {
        message: 'An error occurred',
        code: 'UNKNOWN_ERROR'
      }
    }
    
    return new ApiError({
      message: errorData.message,
      status: response.status,
      code: errorData.code,
      details: errorData.details
    })
  }
}

export const apiClient = new ApiClient({
  baseUrl: import.meta.env.VITE_API_URL || '/api',
  timeout: 10000,
  onError: (error) => {
    console.error('API Error:', error)
    // Send to error tracking service (e.g., Sentry)
  }
})
```

### Type Definitions

```typescript
// src/lib/api/types/errors.ts

export class ApiError extends Error {
  status: number
  code: string
  details?: unknown
  
  constructor(config: {
    message: string
    status: number
    code: string
    details?: unknown
  }) {
    super(config.message)
    this.name = 'ApiError'
    this.status = config.status
    this.code = config.code
    this.details = config.details
  }
}

export interface ErrorResponse {
  message: string
  code: string
  details?: unknown
}

// src/lib/api/types/requests.ts

export interface ContactFormData {
  name: string
  email: string
  subject: string
  message: string
  recaptchaToken?: string
}

export interface LoginRequest {
  email: string
  password: string
}

export interface UpdateProjectRequest {
  title?: string
  description?: string
  technologies?: string[]
  category?: string
  featured?: boolean
}

// src/lib/api/types/responses.ts

export interface ApiResponse<T> {
  data: T
  meta?: {
    timestamp: string
    requestId: string
  }
}

export interface PaginatedResponse<T> {
  data: T[]
  pagination: {
    page: number
    limit: number
    total: number
    totalPages: number
  }
}

export interface ContactFormResponse {
  success: boolean
  message: string
}

export interface AuthResponse {
  token: string
  user: {
    id: string
    email: string
    name: string
    role: string
  }
}
```

---

## API Endpoints

### Projects Endpoint

```typescript
// src/lib/api/endpoints/projects.ts

import { apiClient } from '../client/apiClient'
import type { Project, PaginatedResponse } from '../../types/project'

export const projectsApi = {
  async getAll(params?: {
    category?: string
    featured?: boolean
    status?: string
    page?: number
    limit?: number
  }): Promise<PaginatedResponse<Project>> {
    const queryParams = new URLSearchParams()
    
    if (params?.category) queryParams.append('category', params.category)
    if (params?.featured !== undefined) queryParams.append('featured', String(params.featured))
    if (params?.status) queryParams.append('status', params.status)
    if (params?.page) queryParams.append('page', String(params.page))
    if (params?.limit) queryParams.append('limit', String(params.limit))
    
    const query = queryParams.toString()
    return apiClient.get<PaginatedResponse<Project>>(`/projects${query ? `?${query}` : ''}`)
  },
  
  async getById(id: string): Promise<Project> {
    return apiClient.get<Project>(`/projects/${id}`)
  },
  
  async getFeatured(): Promise<Project[]> {
    return apiClient.get<Project[]>('/projects/featured')
  },
  
  async create(data: Partial<Project>): Promise<Project> {
    return apiClient.post<Project>('/projects', data)
  },
  
  async update(id: string, data: Partial<Project>): Promise<Project> {
    return apiClient.patch<Project>(`/projects/${id}`, data)
  },
  
  async delete(id: string): Promise<void> {
    return apiClient.delete<void>(`/projects/${id}`)
  }
}
```

### Contact Endpoint

```typescript
// src/lib/api/endpoints/contact.ts

import { apiClient } from '../client/apiClient'
import type { ContactFormData, ContactFormResponse } from '../types/requests'

export const contactApi = {
  async submitForm(data: ContactFormData): Promise<ContactFormResponse> {
    return apiClient.post<ContactFormResponse>('/contact', data)
  },
  
  async getRateLimit(): Promise<{ remaining: number; resetAt: string }> {
    return apiClient.get<{ remaining: number; resetAt: string }>('/contact/rate-limit')
  }
}
```

### Authentication Endpoint (Future)

```typescript
// src/lib/api/endpoints/auth.ts

import { apiClient } from '../client/apiClient'
import type { LoginRequest, AuthResponse } from '../types/requests'

export const authApi = {
  async login(credentials: LoginRequest): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/login', credentials)
  },
  
  async logout(): Promise<void> {
    return apiClient.post<void>('/auth/logout', {})
  },
  
  async refreshToken(): Promise<AuthResponse> {
    return apiClient.post<AuthResponse>('/auth/refresh', {})
  },
  
  async resetPassword(email: string): Promise<void> {
    return apiClient.post<void>('/auth/reset-password', { email })
  }
}
```

### Endpoint Summary

| Endpoint | Method | Description | Auth Required |
|----------|--------|-------------|---------------|
| `/projects` | GET | Get all projects | No |
| `/projects/:id` | GET | Get single project | No |
| `/projects/featured` | GET | Get featured projects | No |
| `/projects` | POST | Create project | Yes |
| `/projects/:id` | PATCH | Update project | Yes |
| `/projects/:id` | DELETE | Delete project | Yes |
| `/contact` | POST | Submit contact form | No |
| `/contact/rate-limit` | GET | Get rate limit info | No |
| `/auth/login` | POST | Login | No |
| `/auth/logout` | POST | Logout | Yes |
| `/auth/refresh` | POST | Refresh token | Yes |
| `/auth/reset-password` | POST | Reset password | No |

---

## React Query Integration

### Custom Hooks

```typescript
// src/lib/api/hooks/useProjects.ts

import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query'
import { projectsApi } from '../endpoints/projects'
import { queryKeys } from '../constants/cacheKeys'

export function useProjects(params?: {
  category?: string
  featured?: boolean
  status?: string
  page?: number
  limit?: number
}) {
  return useQuery({
    queryKey: queryKeys.projects.list(params),
    queryFn: () => projectsApi.getAll(params),
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  })
}

export function useProject(id: string) {
  return useQuery({
    queryKey: queryKeys.projects.detail(id),
    queryFn: () => projectsApi.getById(id),
    enabled: !!id,
    staleTime: 10 * 60 * 1000 // 10 minutes
  })
}

export function useFeaturedProjects() {
  return useQuery({
    queryKey: queryKeys.projects.featured(),
    queryFn: () => projectsApi.getFeatured(),
    staleTime: 15 * 60 * 1000 // 15 minutes
  })
}

export function useCreateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsApi.create,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
    }
  })
}

export function useUpdateProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: ({ id, data }: { id: string; data: Partial<Project> }) => 
      projectsApi.update(id, data),
    onSuccess: (_, { id }) => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.detail(id) })
    }
  })
}

export function useDeleteProject() {
  const queryClient = useQueryClient()
  
  return useMutation({
    mutationFn: projectsApi.delete,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
    }
  })
}
```

### Cache Keys

```typescript
// src/lib/api/constants/cacheKeys.ts

export const queryKeys = {
  projects: {
    all: ['projects'] as const,
    lists: () => ['projects', 'list'] as const,
    list: (params?: Record<string, unknown>) => 
      ['projects', 'list', params] as const,
    details: () => ['projects', 'detail'] as const,
    detail: (id: string) => ['projects', 'detail', id] as const,
    featured: () => ['projects', 'featured'] as const
  },
  experience: {
    all: ['experience'] as const,
    list: () => ['experience', 'list'] as const
  },
  skills: {
    all: ['skills'] as const,
    list: () => ['skills', 'list'] as const
  },
  certifications: {
    all: ['certifications'] as const,
    list: () => ['certifications', 'list'] as const
  },
  contact: {
    submit: () => ['contact', 'submit'] as const
  },
  auth: {
    user: () => ['auth', 'user'] as const
  }
}
```

---

## Validation Layer

### Zod Schemas

```typescript
// src/lib/api/utils/validators.ts

import { z } from 'zod'

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(100),
  email: z.string().email('Invalid email address'),
  subject: z.string().min(5, 'Subject must be at least 5 characters').max(200),
  message: z.string().min(20, 'Message must be at least 20 characters').max(5000),
  recaptchaToken: z.string().optional()
})

export const projectSchema = z.object({
  title: z.string().min(1).max(200),
  description: z.string().min(1).max(500),
  longDescription: z.string().optional(),
  images: z.array(z.string().url()).min(1),
  technologies: z.array(z.string()).min(1),
  category: z.enum(['Web Development', 'Mobile Development', 'Full Stack', 'DevOps', 'UI/UX']),
  featured: z.boolean().default(false),
  liveUrl: z.string().url().optional(),
  repositoryUrl: z.string().url().optional(),
  startDate: z.string().datetime(),
  endDate: z.string().datetime().optional(),
  status: z.enum(['completed', 'in-progress', 'planned'])
})

export type ContactFormData = z.infer<typeof contactFormSchema>
export type ProjectFormData = z.infer<typeof projectSchema>
```

### Validation Usage

```typescript
// In a component
import { contactFormSchema } from '../lib/api/utils/validators'

export function ContactForm() {
  const handleSubmit = (data: unknown) => {
    const result = contactFormSchema.safeParse(data)
    
    if (!result.success) {
      // Handle validation errors
      console.error(result.error.errors)
      return
    }
    
    // Submit valid data
    contactApi.submitForm(result.data)
  }
  
  return <form onSubmit={handleSubmit}>{/* ... */}</form>
}
```

---

## Error Handling Strategy

### Error Categories

```typescript
// src/lib/api/types/errors.ts

export enum ErrorCode {
  // Network errors
  NETWORK_ERROR = 'NETWORK_ERROR',
  TIMEOUT_ERROR = 'TIMEOUT_ERROR',
  
  // Client errors (4xx)
  BAD_REQUEST = 'BAD_REQUEST',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  NOT_FOUND = 'NOT_FOUND',
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  RATE_LIMIT_EXCEEDED = 'RATE_LIMIT_EXCEEDED',
  
  // Server errors (5xx)
  INTERNAL_SERVER_ERROR = 'INTERNAL_SERVER_ERROR',
  SERVICE_UNAVAILABLE = 'SERVICE_UNAVAILABLE',
  
  // Application errors
  UNKNOWN_ERROR = 'UNKNOWN_ERROR'
}

export const errorMessages: Record<ErrorCode, string> = {
  [ErrorCode.NETWORK_ERROR]: 'Unable to connect to the server. Please check your internet connection.',
  [ErrorCode.TIMEOUT_ERROR]: 'Request timed out. Please try again.',
  [ErrorCode.BAD_REQUEST]: 'Invalid request. Please check your input.',
  [ErrorCode.UNAUTHORIZED]: 'You must be logged in to perform this action.',
  [ErrorCode.FORBIDDEN]: 'You do not have permission to perform this action.',
  [ErrorCode.NOT_FOUND]: 'The requested resource was not found.',
  [ErrorCode.VALIDATION_ERROR]: 'Please correct the errors in the form.',
  [ErrorCode.RATE_LIMIT_EXCEEDED]: 'Too many requests. Please try again later.',
  [ErrorCode.INTERNAL_SERVER_ERROR]: 'An unexpected error occurred. Please try again.',
  [ErrorCode.SERVICE_UNAVAILABLE]: 'The service is temporarily unavailable. Please try again later.',
  [ErrorCode.UNKNOWN_ERROR]: 'An unexpected error occurred.'
}
```

### Error Boundary

```typescript
// src/components/ErrorBoundary.tsx

import { Component, ReactNode } from 'react'

interface Props {
  children: ReactNode
  fallback?: ReactNode
}

interface State {
  hasError: boolean
  error?: Error
}

export class ErrorBoundary extends Component<Props, State> {
  constructor(props: Props) {
    super(props)
    this.state = { hasError: false }
  }
  
  static getDerivedStateFromError(error: Error): State {
    return { hasError: true, error }
  }
  
  componentDidCatch(error: Error, errorInfo: React.ErrorInfo) {
    console.error('Error caught by boundary:', error, errorInfo)
    // Send to error tracking service
  }
  
  render() {
    if (this.state.hasError) {
      return this.props.fallback || (
        <div className="error-fallback">
          <h2>Something went wrong</h2>
          <p>{this.state.error?.message}</p>
          <button onClick={() => window.location.reload()}>
            Reload Page
          </button>
        </div>
      )
    }
    
    return this.props.children
  }
}
```

---

## Caching Strategy

### Cache Configuration

```typescript
// Cache times based on data type
const cacheConfig = {
  // Static content (long cache)
  projects: {
    staleTime: 5 * 60 * 1000, // 5 minutes
    gcTime: 10 * 60 * 1000 // 10 minutes
  },
  experience: {
    staleTime: 10 * 60 * 1000, // 10 minutes
    gcTime: 30 * 60 * 1000 // 30 minutes
  },
  skills: {
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000 // 1 hour
  },
  certifications: {
    staleTime: 15 * 60 * 1000, // 15 minutes
    gcTime: 60 * 60 * 1000 // 1 hour
  },
  
  // Dynamic content (short cache)
  contact: {
    staleTime: 0, // No cache
    gcTime: 0
  },
  
  // User-specific data (no cache)
  auth: {
    staleTime: 0,
    gcTime: 0
  }
}
```

### Cache Invalidation Strategy

```typescript
// Invalidation on mutations
const mutation = useMutation({
  mutationFn: updateProject,
  onSuccess: () => {
    // Invalidate all project queries
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.all })
    
    // Or invalidate specific queries
    queryClient.invalidateQueries({ queryKey: queryKeys.projects.list() })
  }
})
```

### Cache Strategy Table

| Data Type | Stale Time | GC Time | Invalidation Strategy |
|-----------|------------|---------|---------------------|
| Projects | 5 minutes | 10 minutes | On create/update/delete |
| Experience | 10 minutes | 30 minutes | On update |
| Skills | 15 minutes | 1 hour | On update |
| Certifications | 15 minutes | 1 hour | On update |
| Contact | 0 | 0 | Never cached |
| Auth | 0 | 0 | Never cached |

---

## Security Considerations

### Authentication (Future)

```typescript
// src/lib/api/client/interceptors.ts

export function authInterceptor(config: RequestConfig): RequestConfig {
  const token = localStorage.getItem('authToken')
  
  if (token) {
    config.headers = {
      ...config.headers,
      Authorization: `Bearer ${token}`
    }
  }
  
  return config
}
```

### CSRF Protection

```typescript
// CSRF token handling
export function csrfInterceptor(config: RequestConfig): RequestConfig {
  const csrfToken = getCookie('csrfToken')
  
  if (csrfToken) {
    config.headers = {
      ...config.headers,
      'X-CSRF-Token': csrfToken
    }
  }
  
  return config
}
```

### Rate Limiting

```typescript
// Client-side rate limiting
class RateLimiter {
  private requests: Map<string, number[]> = new Map()
  
  canMakeRequest(key: string, limit: number, window: number): boolean {
    const now = Date.now()
    const timestamps = this.requests.get(key) || []
    
    // Remove old timestamps outside the window
    const validTimestamps = timestamps.filter(t => now - t < window)
    
    if (validTimestamps.length >= limit) {
      return false
    }
    
    validTimestamps.push(now)
    this.requests.set(key, validTimestamps)
    return true
  }
}

export const rateLimiter = new RateLimiter()
```

---

## API Integration Points

### Contact Form Integration

```typescript
// src/pages/Contact.tsx (future with API)

import { useContactForm } from '../lib/api/hooks/useContact'

export function ContactPage() {
  const { mutate, isPending, error } = useContactForm()
  
  const handleSubmit = (data: ContactFormData) => {
    mutate(data, {
      onSuccess: () => {
        // Show success message
      },
      onError: (error) => {
        // Show error message
      }
    })
  }
  
  return (
    <ContactForm 
      onSubmit={handleSubmit}
      isSubmitting={isPending}
      error={error}
    />
  )
}
```

### Projects Page Integration

```typescript
// src/pages/Projects.tsx (future with API)

import { useProjects, useFeaturedProjects } from '../lib/api/hooks/useProjects'

export function ProjectsPage() {
  const { data: projects, isLoading, error } = useProjects()
  const { data: featuredProjects } = useFeaturedProjects()
  
  if (isLoading) return <ProjectsSkeleton />
  if (error) return <ErrorMessage error={error} />
  
  return (
    <div>
      <FeaturedSection projects={featuredProjects || []} />
      <AllProjectsSection projects={projects?.data || []} />
    </div>
  )
}
```

---

## Migration Strategy

### Phase 1: Static Data (Current)

**Status:** Implemented

**Characteristics:**
- Data stored in TypeScript files
- No API calls
- Fast and simple
- Easy to update and maintain

**Files:**
- `src/data/projects.ts`
- `src/data/experience.ts`
- `src/data/skills.ts`
- `src/data/certifications.ts`

---

### Phase 2: API Layer Addition

**Status:** Future

**Tasks:**
- Add API client structure
- Implement endpoints
- Keep static data as fallback
- Add feature flag for API mode

**Feature Flag:**
```typescript
const USE_API = import.meta.env.VITE_USE_API === 'true'

export function getProjects() {
  if (USE_API) {
    return projectsApi.getAll()
  }
  return Promise.resolve({ data: projects })
}
```

---

### Phase 3: Gradual Migration

**Status:** Future

**Migration Order:**

1. **Contact Form** (Week 1)
   - Dynamic form submission
   - No read operations
   - Low risk

2. **Projects** (Week 2-3)
   - Read-only initially
   - Add write operations later
   - Medium risk

3. **Experience** (Week 4)
   - Read-only
   - Low risk

4. **Skills** (Week 5)
   - Read-only
   - Low risk

5. **Certifications** (Week 6)
   - Read-only
   - Low risk

---

### Phase 4: Full API Integration

**Status:** Future

**Tasks:**
- All data from API
- Static data removed
- CMS integration for content management
- Admin panel for content updates

**Benefits:**
- Non-technical content updates
- Version history
- Preview mode
- Scheduled publishing

---

## API Layer Summary

The API layer architecture provides:

- **Type Safety:** End-to-end TypeScript support
- **Performance:** Caching, batching, and optimization
- **Error Handling:** Comprehensive error management
- **Scalability:** Easy to extend with new endpoints
- **Security:** Authentication, authorization, and validation
- **Flexibility:** Works with various backend options

### Key Features

| Feature | Description |
|---------|-------------|
| Type Safety | Full TypeScript coverage from API to components |
| Caching | React Query for intelligent caching |
| Error Handling | Comprehensive error handling with user-friendly messages |
| Validation | Zod for runtime type validation |
| Security | Authentication, CSRF protection, rate limiting |
| Performance | Request deduplication, background refetching |
| Developer Experience | Custom hooks, type definitions, clear API |

### Migration Path

```
Static Data → API Layer → Gradual Migration → Full Integration
    ↓            ↓              ↓                  ↓
  Current    Future         Future             Future
```

---

## Conclusion

The API layer architecture provides a robust, type-safe, and performant foundation for future backend integration. The architecture is designed to be non-intrusive initially (static data) while providing a clear path to full API integration when needed.

The phased migration approach ensures minimal risk and allows for gradual adoption of API features. The architecture supports various backend options, from headless CMS to custom APIs, providing flexibility for future needs.

---

**Document Version:** 1.0  
**Last Updated:** August 1, 2026  
**Next Review:** When API integration is planned
