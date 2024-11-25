import React, { useState, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FiRefreshCw } from 'react-icons/fi';
import Button from '../Button';

const NotificationContainer = styled(motion.div)`
  position: fixed;
  bottom: ${({ theme }) => theme.spacing['4']};
  left: 50%;
  transform: translateX(-50%);
  background: ${({ theme }) => theme.colors.background.primary};
  border: 1px solid ${({ theme }) => theme.colors.border};
  border-radius: ${({ theme }) => theme.borderRadius.lg};
  padding: ${({ theme }) => theme.spacing['4']};
  box-shadow: ${({ theme }) => theme.shadows.lg};
  display: flex;
  align-items: center;
  gap: ${({ theme }) => theme.spacing['4']};
  z-index: 1000;
`;

const Message = styled.p`
  margin: 0;
  color: ${({ theme }) => theme.colors.text.primary};
`;

const variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0 },
  exit: { opacity: 0, y: 50 },
};

export const UpdateNotification: React.FC = () => {
  const [show, setShow] = useState(false);

  useEffect(() => {
    const handleUpdateAvailable = () => setShow(true);
    window.addEventListener('serviceWorkerUpdateAvailable', handleUpdateAvailable);
    return () => {
      window.removeEventListener('serviceWorkerUpdateAvailable', handleUpdateAvailable);
    };
  }, []);

  const handleUpdate = () => {
    window.location.reload();
  };

  return (
    <AnimatePresence>
      {show && (
        <NotificationContainer
          variants={variants}
          initial="hidden"
          animate="visible"
          exit="exit"
        >
          <FiRefreshCw />
          <Message>A new version is available!</Message>
          <Button
            onClick={handleUpdate}
            variant="primary"
            size="sm"
          >
            Update now
          </Button>
        </NotificationContainer>
      )}
    </AnimatePresence>
  );
};

export default UpdateNotification;
