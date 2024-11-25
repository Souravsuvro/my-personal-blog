import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';

const LoadingContainer = styled.div`
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  background: var(--bg-primary);
`;

const LoadingDot = styled(motion.span)`
  width: 12px;
  height: 12px;
  border-radius: 50%;
  background-color: var(--primary);
  margin: 0 4px;
  display: inline-block;
`;

const Loading: React.FC = () => {
  const dotVariants = {
    initial: { y: 0 },
    animate: { y: -10 },
  };

  const containerVariants = {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
  };

  return (
    <LoadingContainer
      as={motion.div}
      initial="initial"
      animate="animate"
      variants={containerVariants}
      transition={{ duration: 0.3 }}
    >
      {[0, 1, 2].map((index) => (
        <LoadingDot
          key={index}
          variants={dotVariants}
          animate="animate"
          initial="initial"
          transition={{
            repeat: Infinity,
            repeatType: "reverse",
            duration: 0.5,
            delay: index * 0.1,
          }}
        />
      ))}
    </LoadingContainer>
  );
};

export default Loading;
