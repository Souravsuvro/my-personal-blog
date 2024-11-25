import React from 'react';
import type { ContainerProps } from '@/types';
import { StyledContainer } from './Container.styles';

export const Container: React.FC<ContainerProps> = ({
  children,
  size = 'lg',
  fluid = false,
  ...props
}) => {
  return (
    <StyledContainer $size={size} $fluid={fluid} {...props}>
      {children}
    </StyledContainer>
  );
};

export default Container;
