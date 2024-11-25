import styled from 'styled-components';

export const Container = styled.div`
  min-height: 100vh;
  padding: 6rem 1rem;
  background: ${({ theme }) => theme.colors?.background?.primary};
`;

export const Header = styled.header`
  text-align: center;
  max-width: 1200px;
  margin: 0 auto 4rem;
  padding: 0 1rem;
`;

export const Title = styled.h1`
  font-size: ${({ theme }) => theme.fontSizes['4xl']};
  color: ${({ theme }) => theme.colors?.text?.primary};
  text-align: center;
  margin-bottom: ${({ theme }) => theme.spacing.xl};
  font-weight: ${({ theme }) => theme.fontWeights.bold};
  background: linear-gradient(
    to right,
    ${({ theme }) => theme.colors?.primary},
    ${({ theme }) => theme.colors?.secondary}
  );
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
  padding: ${({ theme }) => theme.spacing.md} 0;
  position: relative;
  letter-spacing: 0.02em;
  
  &::after {
    content: '';
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translateX(-50%);
    width: 60px;
    height: 4px;
    background: ${({ theme }) => theme.colors?.primary};
    border-radius: 2px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes['3xl']};
    margin-bottom: ${({ theme }) => theme.spacing.lg};
    
    &::after {
      width: 40px;
      height: 3px;
    }
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes['2xl']};
    margin-bottom: ${({ theme }) => theme.spacing.md};
  }
`;

export const Description = styled.p`
  font-size: ${({ theme }) => theme.fontSizes.lg};
  color: ${({ theme }) => theme.colors?.text?.secondary};
  max-width: 36rem;
  margin: 0 auto;
  line-height: 1.6;
  
  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
  }
`;
