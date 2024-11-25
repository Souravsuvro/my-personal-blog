import React from 'react';
import styled from 'styled-components';

interface ImageProps {
  src: string;
  alt: string;
  width?: string | number;
  height?: string | number;
  className?: string;
  priority?: boolean;
  onLoad?: () => void;
  sizes?: string;
  quality?: number;
  objectFit?: 'contain' | 'cover' | 'fill' | 'none' | 'scale-down';
}

const StyledImage = styled.img<{ $loaded: boolean; $objectFit?: string }>`
  opacity: ${({ $loaded }) => ($loaded ? '1' : '0')};
  transition: opacity 0.3s ease-in-out;
  max-width: 100%;
  height: auto;
  object-fit: ${({ $objectFit }) => $objectFit || 'cover'};
`;

const ImageWrapper = styled.div<{ $width?: string | number; $height?: string | number }>`
  position: relative;
  width: ${({ $width }) => ($width ? (typeof $width === 'number' ? `${$width}px` : $width) : '100%')};
  height: ${({ $height }) => ($height ? (typeof $height === 'number' ? `${$height}px` : $height) : 'auto')};
  overflow: hidden;
  background: var(--bg-secondary);
`;

const Image: React.FC<ImageProps> = ({
  src,
  alt,
  width,
  height,
  className,
  priority = false,
  onLoad,
  sizes = '100vw',
  quality = 90,
  objectFit = 'cover',
}) => {
  const [loaded, setLoaded] = React.useState(false);
  const imageRef = React.useRef<HTMLImageElement>(null);

  React.useEffect(() => {
    if (imageRef.current?.complete) {
      handleLoad();
    }
  }, []);

  const handleLoad = () => {
    setLoaded(true);
    onLoad?.();
  };

  const getOptimizedSrc = (url: string) => {
    if (!url) return '';
    if (url.startsWith('data:') || url.startsWith('blob:')) return url;
    
    // If the image is already a WebP, return as is
    if (url.endsWith('.webp')) return url;

    // Generate srcSet widths
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const devicePixelRatio = typeof window !== 'undefined' ? window.devicePixelRatio : 1;
    const viewportWidth = typeof window !== 'undefined' ? window.innerWidth : 1920;
    const targetWidth = Math.min(viewportWidth * devicePixelRatio, 2048);

    // Replace extension with .webp
    const baseUrl = url.replace(/\.[^/.]+$/, '');
    return `${baseUrl}.webp?w=${targetWidth}&q=${quality}`;
  };

  const generateSrcSet = (url: string): string => {
    if (url.startsWith('data:') || url.startsWith('blob:')) return '';
    
    const widths = [640, 750, 828, 1080, 1200, 1920, 2048];
    const baseUrl = url.replace(/\.[^/.]+$/, '');
    
    return widths
      .map(w => `${baseUrl}.webp?w=${w}&q=${quality} ${w}w`)
      .join(', ');
  };

  return (
    <ImageWrapper className={className} $width={width} $height={height}>
      <StyledImage
        ref={imageRef}
        src={getOptimizedSrc(src)}
        srcSet={generateSrcSet(src)}
        sizes={sizes}
        alt={alt}
        loading={priority ? 'eager' : 'lazy'}
        onLoad={handleLoad}
        $loaded={loaded}
        width={width}
        height={height}
        $objectFit={objectFit}
        decoding="async"
      />
    </ImageWrapper>
  );
};

export default Image;
