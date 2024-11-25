import { css } from 'styled-components';
import { Theme } from './types';

export const breakpoints = {
  sm: '30em', // 480px
  md: '48em', // 768px
  lg: '62em', // 992px
  xl: '80em', // 1280px
  '2xl': '96em', // 1536px
};

export const mediaQueries = {
  sm: `@media screen and (min-width: ${breakpoints.sm})`,
  md: `@media screen and (min-width: ${breakpoints.md})`,
  lg: `@media screen and (min-width: ${breakpoints.lg})`,
  xl: `@media screen and (min-width: ${breakpoints.xl})`,
  '2xl': `@media screen and (min-width: ${breakpoints['2xl']})`,
};

export const getResponsiveValue = (theme: Theme, value: string | number) => {
  if (typeof value === 'number') {
    return `${value}px`;
  }

  if (typeof value === 'string') {
    if (value.includes('px') || value.includes('rem') || value.includes('%')) {
      return value;
    }

    if (theme.space[value]) {
      return theme.space[value];
    }
  }

  return value;
};

export const getColor = (theme: Theme, color: string) => {
  if (color.includes('.')) {
    const [group, key] = color.split('.');
    return theme.colors[group]?.[key] || color;
  }

  return theme.colors[color] || color;
};

export const getFontSize = (theme: Theme, size: string) => {
  return theme.fontSizes[size] || size;
};

export const getSpace = (theme: Theme, space: string | number) => {
  if (typeof space === 'number') {
    return `${space}px`;
  }

  return theme.space[space] || space;
};

export const getRadius = (theme: Theme, radius: string) => {
  return theme.borderRadius[radius] || radius;
};

export const getZIndex = (theme: Theme, zIndex: string | number) => {
  if (typeof zIndex === 'number') {
    return zIndex;
  }

  return theme.zIndices[zIndex] || zIndex;
};

export const rgba = (color: string, alpha: number) => {
  return color.replace(')', `, ${alpha})`).replace('rgb(', 'rgba(');
};

export const truncate = css`
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
`;

export const visuallyHidden = css`
  border: 0;
  clip: rect(0 0 0 0);
  height: 1px;
  width: 1px;
  margin: -1px;
  padding: 0;
  overflow: hidden;
  position: absolute;
  white-space: nowrap;
`;
