import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { trackPaintTimings, trackResourceTiming } from './utils/performance';
import Navbar from './components/Navbar/Navbar';

// Lazy load routes
const Home = React.lazy(() => import('./pages/Home'));
const Contact = React.lazy(() => import('./pages/Contact'));

const App: React.FC = () => {
  useEffect(() => {
    // Track initial performance metrics
    trackPaintTimings();
    trackResourceTiming();

    // Track performance metrics on route changes
    const cleanup = () => {
      trackPaintTimings();
      trackResourceTiming();
    };
    return cleanup;
  }, []);

  return (
    <>
      <Navbar />
      <Outlet />
    </>
  );
};

export default App;
