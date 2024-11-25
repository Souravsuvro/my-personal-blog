import React from 'react';
import ReactDOM from 'react-dom/client';
import { 
  createBrowserRouter,
  RouterProvider,
  createRoutesFromElements,
  Route,
  Navigate
} from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import App from './App';
import { ErrorBoundary } from './components/shared/ErrorBoundary/ErrorBoundary';
import Loading from './components/shared/Loading/Loading';

// Lazy load routes
const Home = React.lazy(() => import('./pages/Home'));
const Projects = React.lazy(() => import('./pages/Projects/index'));
const Contact = React.lazy(() => import('./pages/Contact'));
const Blog = React.lazy(() => import('./pages/Blog'));
const BlogPost = React.lazy(() => import('./pages/BlogPost'));
const LiveProjects = React.lazy(() => import('./pages/LiveProjects'));

// Create router with future flags enabled
const router = createBrowserRouter(
  createRoutesFromElements(
    <Route element={<App />}>
      <Route
        index
        element={
          <React.Suspense fallback={<Loading />}>
            <Home />
          </React.Suspense>
        }
      />
      <Route
        path="live-projects"
        element={
          <React.Suspense fallback={<Loading />}>
            <LiveProjects />
          </React.Suspense>
        }
      />
      <Route path="blog">
        <Route
          index
          element={
            <React.Suspense fallback={<Loading />}>
              <Blog />
            </React.Suspense>
          }
        />
        <Route
          path=":slug"
          element={
            <React.Suspense fallback={<Loading />}>
              <BlogPost />
            </React.Suspense>
          }
        />
        <Route
          path="category/:category"
          element={
            <React.Suspense fallback={<Loading />}>
              <Blog />
            </React.Suspense>
          }
        />
      </Route>
      <Route
        path="projects"
        element={
          <React.Suspense fallback={<Loading />}>
            <Projects />
          </React.Suspense>
        }
      />
      <Route
        path="contact"
        element={<Navigate to="/#contact" replace />}
      />
    </Route>
  ),
  {
    future: {
      v7_startTransition: true,
      v7_relativeSplatPath: true
    }
  }
);

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ErrorBoundary>
      <ThemeProvider>
        <RouterProvider router={router} />
      </ThemeProvider>
    </ErrorBoundary>
  </React.StrictMode>
);