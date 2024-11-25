import React from 'react';
import styled from 'styled-components';
import Navbar from '../Navbar/Navbar';

interface LayoutProps {
  children: React.ReactNode;
}

const LayoutWrapper = styled.div`
  min-height: 100vh;
  background: var(--bg);
  color: var(--text-primary);
  position: relative;
  padding-top: 70px; // Height of the navbar

  @media (max-width: ${({ theme }) => theme.breakpoints?.md}) {
    padding-top: 60px;
  }
`;

const Layout: React.FC<LayoutProps> = ({ children }) => {
  console.log('Layout rendering');
  return (
    <LayoutWrapper>
      <Navbar />
      {children}
    </LayoutWrapper>
  );
};

export default Layout;
