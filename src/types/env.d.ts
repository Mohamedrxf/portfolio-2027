// Environment Variable Type Definitions
// Task 1.10 - Configure Environment Variables
//
// This file provides TypeScript type definitions for Vite environment variables.
// These types ensure type safety when accessing import.meta.env in the code.

interface ImportMetaEnv {
  // Application Information
  readonly VITE_APP_NAME: string;
  readonly VITE_APP_VERSION: string;

  // API Configuration
  readonly VITE_API_URL: string;

  // Site Configuration
  readonly VITE_SITE_URL: string;

  // Contact Information
  readonly VITE_CONTACT_EMAIL: string;

  // Social Media Links
  readonly VITE_GITHUB_URL: string;
  readonly VITE_LINKEDIN_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
