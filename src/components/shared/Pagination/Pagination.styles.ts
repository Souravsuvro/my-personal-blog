import styled, { css } from 'styled-components';

export const PaginationContainer = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  gap: 0.5rem;
  margin-top: 3rem;
`;

export const PageButton = styled.button<{ active?: boolean }>`
  width: 40px;
  height: 40px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: ${({ theme }) => theme.borderRadius.md};
  border: 2px solid transparent;
  background: ${({ theme }) => theme.colors.background.secondary};
  color: ${({ theme }) => theme.colors.text.primary};
  font-weight: ${({ theme }) => theme.fontWeights.medium};
  cursor: pointer;
  transition: all 0.2s ease-in-out;

  &:hover {
    background: ${({ theme }) => theme.colors.background.tertiary};
  }

  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }

  ${({ active, theme }) =>
    active &&
    css`
      background: ${theme.colors.primary};
      color: white;
      &:hover {
        background: ${theme.colors.primary};
      }
    `}
`;

export const PageEllipsis = styled.span`
  color: ${({ theme }) => theme.colors.text.secondary};
  display: flex;
  align-items: center;
  justify-content: center;
  width: 40px;
  height: 40px;
`;
