import styled from 'styled-components';

export const Container = styled.div`
  margin: 2rem 0;
  padding: 1.5rem;
  border-radius: 0.5rem;
  background: ${({ theme }) => theme.colors?.background?.secondary};
`;

export const Title = styled.h4`
  font-size: ${({ theme }) => theme.fontSizes?.sm || '0.875rem'};
  font-weight: ${({ theme }) => theme.fontWeights?.medium || 500};
  color: ${({ theme }) => theme.colors?.text?.secondary};
  margin-bottom: 1rem;
  text-align: center;
`;

export const ButtonsContainer = styled.div`
  display: flex;
  justify-content: center;
  gap: 1rem;
  
  button {
    transition: transform 0.2s ease;
    
    &:hover {
      transform: translateY(-2px);
    }
    
    &:active {
      transform: translateY(0);
    }
  }
`;
