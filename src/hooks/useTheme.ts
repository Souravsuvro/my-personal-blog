import { useState, useEffect } from 'react';
import { DefaultTheme } from 'styled-components';
import { lightTheme, darkTheme } from '../styles/theme';

type ThemeMode = 'light' | 'dark';

export const useTheme = () => {
  const [theme, setTheme] = useState<DefaultTheme>(lightTheme);
  const [themeMode, setThemeMode] = useState<ThemeMode>('light');

  useEffect(() => {
    // Get theme from localStorage or system preference
    const savedTheme = localStorage.getItem('theme') as ThemeMode;
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const initialTheme = savedTheme || (prefersDark ? 'dark' : 'light');
    
    setThemeMode(initialTheme);
    setTheme(initialTheme === 'dark' ? darkTheme : lightTheme);
  }, []);

  const toggleTheme = () => {
    const newMode = themeMode === 'light' ? 'dark' : 'light';
    setThemeMode(newMode);
    setTheme(newMode === 'dark' ? darkTheme : lightTheme);
    localStorage.setItem('theme', newMode);
  };

  return { theme, themeMode, toggleTheme };
};
