// App Router component
// Task 1.7.1 - Routing Architecture Cleanup

import { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Layout } from '@/components/layout/Layout';
import { routeConfig } from './routeConfig';

// Loading fallback for lazy-loaded components
function RouteLoadingFallback() {
  return (
    <div className="min-h-screen flex items-center justify-center">
      <div className="text-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-500 mx-auto mb-4" />
        <p className="text-gray-400">Loading...</p>
      </div>
    </div>
  );
}

export function AppRouter() {
  return (
    <BrowserRouter>
      <Layout>
        <Suspense fallback={<RouteLoadingFallback />}>
          <Routes>
            {routeConfig.map(({ path, Component }) => (
              <Route key={path} path={path} Component={Component} />
            ))}
          </Routes>
        </Suspense>
      </Layout>
    </BrowserRouter>
  );
}
