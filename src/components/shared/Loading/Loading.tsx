import React from 'react';
import { LoadingProps } from '@/types/components';
import { Container, Spinner } from './Loading.styles';

export const Loading: React.FC<LoadingProps> = ({
  size = 'md',
  color,
  fullscreen = false,
  className,
  style,
  ...props
}) => {
  return (
    <Container $fullscreen={fullscreen} className={className} style={style} {...props}>
      <Spinner $size={size} $color={color} />
    </Container>
  );
};

export default Loading;
