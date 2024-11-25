import React from 'react';
import { motion } from 'framer-motion';
import { ButtonContainer } from './Button.styles';
import type { ButtonProps } from '@/types';

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  isFullWidth = false,
  isLoading = false,
  leftIcon,
  rightIcon,
  ...props
}) => {
  return (
    <ButtonContainer
      as={motion.button}
      $variant={variant}
      $size={size}
      $isFullWidth={isFullWidth}
      $isLoading={isLoading}
      whileHover={{ scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      disabled={isLoading || props.disabled}
      {...props}
    >
      {leftIcon && <span className="icon left">{leftIcon}</span>}
      {isLoading ? <span className="loading" /> : children}
      {rightIcon && <span className="icon right">{rightIcon}</span>}
    </ButtonContainer>
  );
};

export default Button;
