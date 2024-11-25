import { CSSProperties } from 'react';

export type ThemeMode = 'light' | 'dark';

export type ColorScheme = {
  primary: string;
  secondary: string;
  accent: string;
  background: {
    primary: string;
    secondary: string;
    tertiary: string;
  };
  text: {
    primary: string;
    secondary: string;
    tertiary: string;
    accent: string;
  };
  border: string;
  success: string;
  error: string;
  warning: string;
  info: string;
};

export type Breakpoints = {
  xs: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
};

export type FontSizes = {
  xs: string;
  sm: string;
  base: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  '4xl': string;
  '5xl': string;
  '6xl': string;
};

export type Fonts = {
  body: string;
  heading: string;
  mono: string;
};

export type FontWeights = {
  thin: number;
  light: number;
  normal: number;
  medium: number;
  semibold: number;
  bold: number;
  extrabold: number;
};

export type Spacing = {
  px: string;
  '0': string;
  '0.5': string;
  '1': string;
  '1.5': string;
  '2': string;
  '2.5': string;
  '3': string;
  '3.5': string;
  '4': string;
  '5': string;
  '6': string;
  '7': string;
  '8': string;
  '9': string;
  '10': string;
  '11': string;
  '12': string;
  '14': string;
  '16': string;
  '20': string;
  '24': string;
  '28': string;
  '32': string;
  '36': string;
  '40': string;
  '44': string;
  '48': string;
  '52': string;
  '56': string;
  '60': string;
  '64': string;
  '72': string;
  '80': string;
  '96': string;
};

export type BorderRadius = {
  none: string;
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  '3xl': string;
  full: string;
};

export type Shadows = {
  sm: string;
  md: string;
  lg: string;
  xl: string;
  '2xl': string;
  inner: string;
  none: string;
};

export type ZIndices = {
  hide: number;
  auto: 'auto';
  base: number;
  docked: number;
  dropdown: number;
  sticky: number;
  banner: number;
  overlay: number;
  modal: number;
  popover: number;
  skipLink: number;
  toast: number;
  tooltip: number;
};

export type Transitions = {
  speed: string;
  curve: CSSProperties['transitionTimingFunction'];
};

export interface Theme {
  mode: ThemeMode;
  colors: ColorScheme;
  breakpoints: Breakpoints;
  fontSizes: FontSizes;
  fonts: Fonts;
  fontWeights: FontWeights;
  spacing: Spacing;
  borderRadius: BorderRadius;
  shadows: Shadows;
  zIndices: ZIndices;
  transitions: Transitions;
}

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
