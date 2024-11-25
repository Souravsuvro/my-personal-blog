import React from 'react';
import type { CardProps } from '@/types';
import { fadeInUp } from '@/utils/animations';
import {
  CardContainer,
  CardHeader,
  CardTitle,
  CardSubtitle,
  CardBody,
  CardFooter,
} from './Card.styles';

export const Card: React.FC<CardProps> = ({
  variant = 'default',
  title,
  subtitle,
  children,
  footer,
  isHoverable = false,
  isFullWidth = false,
  ...props
}) => {
  return (
    <CardContainer
      $variant={variant}
      $isHoverable={isHoverable}
      $isFullWidth={isFullWidth}
      variants={fadeInUp}
      initial="hidden"
      animate="visible"
      {...props}
    >
      {(title || subtitle) && (
        <CardHeader>
          {title && <CardTitle>{title}</CardTitle>}
          {subtitle && <CardSubtitle>{subtitle}</CardSubtitle>}
        </CardHeader>
      )}
      <CardBody>{children}</CardBody>
      {footer && <CardFooter>{footer}</CardFooter>}
    </CardContainer>
  );
};

export default Card;
