import React, { useState, useEffect } from 'react';

// Responsive Design Utility Functions

export const breakpoints = {
  mobile: 480,
  tablet: 768,
  desktop: 1024,
  largeDesktop: 1440
};

export const isMobile = () => window.innerWidth <= breakpoints.mobile;
export const isTablet = () => 
  window.innerWidth > breakpoints.mobile && 
  window.innerWidth <= breakpoints.tablet;
export const isDesktop = () => window.innerWidth > breakpoints.tablet;

export const useResponsive = () => {
  const [deviceType, setDeviceType] = useState<'mobile' | 'tablet' | 'desktop'>('desktop');

  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth <= breakpoints.mobile) {
        setDeviceType('mobile');
      } else if (window.innerWidth <= breakpoints.tablet) {
        setDeviceType('tablet');
      } else {
        setDeviceType('desktop');
      }
    };

    handleResize(); // Initial call
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  return {
    isMobile: deviceType === 'mobile',
    isTablet: deviceType === 'tablet',
    isDesktop: deviceType === 'desktop',
    deviceType
  };
};
