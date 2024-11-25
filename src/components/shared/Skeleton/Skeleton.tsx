import React from 'react';
import type { SkeletonProps } from '@/types';
import { SkeletonContainer } from './Skeleton.styles';

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  borderRadius,
  ...props
}) => {
  return (
    <SkeletonContainer
      $width={width}
      $height={height}
      $borderRadius={borderRadius}
      {...props}
    />
  );
};

export default Skeleton;
