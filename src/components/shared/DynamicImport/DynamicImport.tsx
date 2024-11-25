import React, { Suspense } from 'react';
import LoadingSpinner from '../LoadingSpinner/LoadingSpinner';

interface DynamicImportProps {
  children: React.ReactNode;
}

const DynamicImport: React.FC<DynamicImportProps> = ({ children }) => {
  return (
    <Suspense fallback={<LoadingSpinner />}>
      {children}
    </Suspense>
  );
};

export default DynamicImport;
