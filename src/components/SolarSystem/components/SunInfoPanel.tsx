import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { SunInfoPanelProps } from '../types';

const Panel = styled(motion.div)`
  position: absolute;
  top: 50%;
  right: 2rem;
  transform: translateY(-50%);
  background: rgba(0, 0, 0, 0.85);
  border-radius: 1rem;
  padding: 1.5rem;
  width: 300px;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.3);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: white;
  z-index: 100;

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    right: 50%;
    transform: translate(50%, -50%);
    width: 90%;
    max-width: 300px;
  }
`;

const Title = styled.h3`
  font-size: 1.5rem;
  margin-bottom: 1rem;
  border-bottom: 2px solid #FDB813;
  padding-bottom: 0.5rem;
`;

const InfoGrid = styled.div`
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin-bottom: 1rem;
`;

const InfoItem = styled.div`
  h4 {
    font-size: 0.875rem;
    color: #888;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 1rem;
    color: white;
  }
`;

const CompositionList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;

  li {
    font-size: 0.875rem;
    padding: 0.25rem 0;
    display: flex;
    align-items: center;
    justify-content: space-between;

    &:before {
      content: '•';
      color: #FDB813;
      margin-right: 0.5rem;
    }
  }
`;

const CloseButton = styled.button`
  position: absolute;
  top: 1rem;
  right: 1rem;
  background: none;
  border: none;
  color: #888;
  font-size: 1.5rem;
  cursor: pointer;
  padding: 0.5rem;
  transition: color 0.2s ease;

  &:hover {
    color: white;
  }
`;

const formatNumber = (num: number): string => {
  return new Intl.NumberFormat('en-US').format(num);
};

const SunInfoPanel: React.FC<SunInfoPanelProps> = ({ sun, onClose }) => {
  return (
    <AnimatePresence>
      <Panel
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>{sun.name}</Title>
        <InfoGrid>
          <InfoItem>
            <h4>Diameter</h4>
            <p>{formatNumber(sun.diameter)} km</p>
          </InfoItem>
          <InfoItem>
            <h4>Mass</h4>
            <p>{sun.mass} kg</p>
          </InfoItem>
          <InfoItem>
            <h4>Surface Temperature</h4>
            <p>{formatNumber(sun.surface_temperature)}°C</p>
          </InfoItem>
          <InfoItem>
            <h4>Core Temperature</h4>
            <p>{formatNumber(sun.core_temperature)}°C</p>
          </InfoItem>
          <InfoItem>
            <h4>Surface Gravity</h4>
            <p>{sun.surface_gravity} m/s²</p>
          </InfoItem>
          <InfoItem>
            <h4>Age</h4>
            <p>{sun.age} years</p>
          </InfoItem>
        </InfoGrid>

        <h4>Composition</h4>
        <CompositionList>
          <li>
            <span>Hydrogen</span>
            <span>{sun.composition.hydrogen}%</span>
          </li>
          <li>
            <span>Helium</span>
            <span>{sun.composition.helium}%</span>
          </li>
          <li>
            <span>Oxygen</span>
            <span>{sun.composition.oxygen}%</span>
          </li>
          <li>
            <span>Carbon</span>
            <span>{sun.composition.carbon}%</span>
          </li>
          <li>
            <span>Iron</span>
            <span>{sun.composition.iron}%</span>
          </li>
          <li>
            <span>Others</span>
            <span>{sun.composition.others}%</span>
          </li>
        </CompositionList>

        <InfoGrid>
          <InfoItem>
            <h4>Luminosity</h4>
            <p>{sun.luminosity} watts</p>
          </InfoItem>
          <InfoItem>
            <h4>Rotation Period</h4>
            <p>{sun.rotation_period} days</p>
          </InfoItem>
        </InfoGrid>
      </Panel>
    </AnimatePresence>
  );
};

export default SunInfoPanel;
