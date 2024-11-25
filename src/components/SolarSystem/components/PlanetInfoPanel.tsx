import React from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { PlanetInfoPanelProps } from '../types';

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
  border-bottom: 2px solid #0070f3;
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

const AtmosphereList = styled.ul`
  list-style: none;
  padding: 0;
  margin: 0;
  margin-top: 1rem;

  li {
    font-size: 0.875rem;
    padding: 0.25rem 0;
    display: flex;
    align-items: center;

    &:before {
      content: '•';
      color: #0070f3;
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

const PlanetInfoPanel: React.FC<PlanetInfoPanelProps> = ({ planet, position, onClose }) => {
  if (!planet) return null;

  return (
    <AnimatePresence>
      <Panel
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        exit={{ opacity: 0, x: 50 }}
        transition={{ type: 'spring', damping: 20 }}
      >
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>{planet.name}</Title>
        <InfoGrid>
          <InfoItem>
            <h4>Diameter</h4>
            <p>{formatNumber(planet.diameter)} km</p>
          </InfoItem>
          <InfoItem>
            <h4>Mass</h4>
            <p>{planet.mass} kg</p>
          </InfoItem>
          <InfoItem>
            <h4>Temperature</h4>
            <p>{planet.mean_temperature}°C</p>
          </InfoItem>
          <InfoItem>
            <h4>Day Length</h4>
            <p>{planet.length_of_day} hours</p>
          </InfoItem>
          <InfoItem>
            <h4>Moons</h4>
            <p>{planet.moons}</p>
          </InfoItem>
          <InfoItem>
            <h4>Rings</h4>
            <p>{planet.rings ? 'Yes' : 'No'}</p>
          </InfoItem>
        </InfoGrid>

        {position && (
          <>
            <h4>Current Position</h4>
            <InfoGrid>
              <InfoItem>
                <h4>Constellation</h4>
                <p>{position.constellation}</p>
              </InfoItem>
              <InfoItem>
                <h4>Distance</h4>
                <p>{position.distance.toFixed(2)} AU</p>
              </InfoItem>
            </InfoGrid>
          </>
        )}

        <h4>Atmosphere</h4>
        <AtmosphereList>
          {planet.atmospheric_composition.map((gas, index) => (
            <li key={index}>{gas}</li>
          ))}
        </AtmosphereList>
      </Panel>
    </AnimatePresence>
  );
};

export default PlanetInfoPanel;
