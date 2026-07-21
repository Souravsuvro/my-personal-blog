import React from 'react';
import { HelmetProvider } from 'react-helmet-async';
import { SpeedInsights } from '@vercel/speed-insights/react';
import { ThemeProvider } from './context/ThemeContext';
import AppRouter from './router/AppRouter';

const App: React.FC = () => {
  return (
    <HelmetProvider>
      <ThemeProvider>
        <AppRouter />
        <SpeedInsights />
      </ThemeProvider>
    </HelmetProvider>
  );
};

export default App;
