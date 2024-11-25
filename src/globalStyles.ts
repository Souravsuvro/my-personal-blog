import { createGlobalStyle } from 'styled-components';
import { Theme } from './styles/theme';

const GlobalStyle = createGlobalStyle<{ theme: Theme }>`
  * {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
  }

  html {
    font-size: 16px;
    scroll-behavior: smooth;
    height: 100%;

    @media (max-width: ${({ theme }) => theme.breakpoints.xl}) {
      font-size: 15px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
      font-size: 14px;
    }

    @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
      font-size: 13px;
    }
  }

  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen,
      Ubuntu, Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
    background: ${({ theme }) => theme.background};
    color: ${({ theme }) => theme.text};
    line-height: 1.5;
    font-size: 16px;
    transition: all 0.2s ease-in-out;
  }

  #root {
    min-height: 100vh;
    display: flex;
    flex-direction: column;
  }

  h1, h2, h3, h4, h5, h6 {
    color: ${({ theme }) => theme.text};
    margin-bottom: 1rem;
    font-weight: 600;
  }

  h1 {
    font-size: 2.5rem;
  }

  h2 {
    font-size: 2rem;
  }

  h3 {
    font-size: 1.75rem;
  }

  h4 {
    font-size: 1.5rem;
  }

  h5 {
    font-size: 1.25rem;
  }

  h6 {
    font-size: 1rem;
  }

  p {
    margin-bottom: 1rem;
    font-size: ${({ theme }) => theme.fontSizes.md};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  a {
    color: ${({ theme }) => theme.primary};
    text-decoration: none;
    transition: color 0.2s ease-in-out;

    &:hover {
      color: ${({ theme }) => theme.secondary};
    }
  }

  img {
    max-width: 100%;
    height: auto;
  }

  button {
    cursor: pointer;
    border: none;
    background: none;
    font-family: inherit;
    font-size: inherit;
  }

  input,
  textarea {
    font-family: inherit;
    font-size: inherit;
  }

  ul, ol {
    margin-bottom: 1rem;
    padding-left: 1.5rem;
  }

  li {
    margin-bottom: ${({ theme }) => theme.spacing['2']};
    color: ${({ theme }) => theme.colors.text.secondary};
  }

  section {
    padding: ${({ theme }) => `${theme.spacing['16']} 0`};
  }

  code {
    font-family: ${({ theme }) => theme.fonts.mono};
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: ${({ theme }) => `${theme.spacing['1']} ${theme.spacing['2']}`};
    border-radius: ${({ theme }) => theme.borderRadius.sm};
    font-size: 0.9em;
  }

  pre {
    background: ${({ theme }) => theme.colors.background.secondary};
    padding: ${({ theme }) => theme.spacing['4']};
    border-radius: ${({ theme }) => theme.borderRadius.md};
    overflow-x: auto;
    margin-bottom: ${({ theme }) => theme.spacing['4']};

    code {
      background: none;
      padding: 0;
      border-radius: 0;
    }
  }
`;

export default GlobalStyle;
