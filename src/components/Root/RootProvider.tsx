import React from 'react';

interface RootProviderProps {
  children: React.ReactNode;
}

const RootProvider: React.FC<RootProviderProps> = ({ children }) => {
  return <>{children}</>;
};

export default RootProvider;
