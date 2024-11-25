import React, { useState, useRef } from 'react';
import { Canvas, useFrame } from '@react-three/fiber';
import { OrbitControls, Stars } from '@react-three/drei';
import * as THREE from 'three';
import styled from 'styled-components';
import { planetData, sunData } from './data';
import { PlanetData } from './types';
import PlanetInfoPanel from './components/PlanetInfoPanel';
import SunInfoPanel from './components/SunInfoPanel';

const SolarSystemSection = styled.section`
  width: 100%;
  min-height: 600px;
  display: flex;
  justify-content: center;
  align-items: center;
  padding: ${({ theme }) => theme.spacing['8']};
  background: ${({ theme }) => theme.colors.background.primary};

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    min-height: 500px;
    padding: ${({ theme }) => theme.spacing['6']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    min-height: 400px;
    padding: ${({ theme }) => theme.spacing['4']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    min-height: 300px;
    padding: ${({ theme }) => theme.spacing['2']};
  }
`;

const Card = styled.div`
  width: 100%;
  max-width: 1024px;
  height: 600px;
  background: ${({ theme }) => theme.colors.background.secondary};
  border-radius: ${({ theme }) => theme.borderRadius.xl};
  overflow: hidden;
  box-shadow: 
    0 10px 15px -3px rgba(0, 0, 0, 0.3),
    0 4px 6px -2px rgba(0, 0, 0, 0.2),
    0 0 20px rgba(0, 0, 0, 0.1);
  position: relative;
  transition: transform 0.3s ease, box-shadow 0.3s ease;

  &:hover {
    transform: translateY(-5px);
    box-shadow: 
      0 20px 25px -5px rgba(0, 0, 0, 0.4),
      0 10px 10px -5px rgba(0, 0, 0, 0.3),
      0 0 25px rgba(0, 0, 0, 0.2);
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.lg}) {
    height: 450px;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    height: 350px;
    max-width: 100%;
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    height: 250px;
    border-radius: ${({ theme }) => theme.borderRadius.lg};
  }
`;

const CardTitle = styled.h2`
  position: absolute;
  top: ${({ theme }) => theme.spacing['4']};
  left: ${({ theme }) => theme.spacing['4']};
  color: #ffffff;
  font-size: ${({ theme }) => theme.fontSizes.xl};
  z-index: 10;
  margin: 0;
  padding: ${({ theme }) => theme.spacing['2']} ${({ theme }) => theme.spacing['4']};
  background: rgba(0, 0, 0, 0.5);
  border-radius: ${({ theme }) => theme.borderRadius.md};
  backdrop-filter: blur(4px);

  @media (max-width: ${({ theme }) => theme.breakpoints.md}) {
    font-size: ${({ theme }) => theme.fontSizes.lg};
    padding: ${({ theme }) => theme.spacing['1']} ${({ theme }) => theme.spacing['3']};
  }

  @media (max-width: ${({ theme }) => theme.breakpoints.sm}) {
    font-size: ${({ theme }) => theme.fontSizes.md};
    top: ${({ theme }) => theme.spacing['2']};
    left: ${({ theme }) => theme.spacing['2']};
    padding: ${({ theme }) => theme.spacing['1']} ${({ theme }) => theme.spacing['2']};
  }
`;

const SolarSystemContainer = styled.div`
  width: 100%;
  height: 100%;
  background: #000;
`;

interface PlanetProps {
  planet: PlanetData;
  onClick: () => void;
}

const Planet: React.FC<PlanetProps> = ({ planet, onClick }) => {
  const meshRef = useRef<THREE.Mesh>(null);
  const orbitRef = useRef<THREE.Line>(null);

  useFrame(({ clock }) => {
    if (meshRef.current) {
      const time = clock.getElapsedTime() * planet.speed;
      meshRef.current.position.x = Math.cos(time) * planet.orbitRadius;
      meshRef.current.position.z = Math.sin(time) * planet.orbitRadius;
      meshRef.current.rotation.y += 0.01;
    }
  });

  const orbitPoints = new Array(64).fill(0).map((_, i) => {
    const angle = (i / 64) * Math.PI * 2;
    return new THREE.Vector3(
      Math.cos(angle) * planet.orbitRadius,
      0,
      Math.sin(angle) * planet.orbitRadius
    );
  });

  const orbitGeometry = new THREE.BufferGeometry().setFromPoints(orbitPoints);

  return (
    <group>
      <line ref={orbitRef} geometry={orbitGeometry}>
        <lineBasicMaterial attach="material" color="#ffffff" opacity={0.2} transparent />
      </line>
      <mesh ref={meshRef} position={[planet.orbitRadius, 0, 0]} onClick={onClick}>
        <sphereGeometry args={[planet.size, 32, 32]} />
        <meshStandardMaterial
          color={planet.color}
          metalness={0.4}
          roughness={0.7}
        />
      </mesh>
    </group>
  );
};

const Sun: React.FC<{ onClick: () => void }> = ({ onClick }) => {
  const sunRef = useRef<THREE.Mesh>(null);

  useFrame(() => {
    if (sunRef.current) {
      sunRef.current.rotation.y += 0.002;
    }
  });

  return (
    <mesh ref={sunRef} position={[0, 0, 0]} onClick={onClick}>
      <sphereGeometry args={[sunData.size, 32, 32]} />
      <meshStandardMaterial
        color={sunData.color}
        emissive={sunData.color}
        emissiveIntensity={sunData.emissiveIntensity}
        metalness={sunData.metalness}
        roughness={sunData.roughness}
      />
      <pointLight intensity={1.5} distance={100} decay={2} />
    </mesh>
  );
};

const SolarSystem: React.FC = () => {
  const [selectedPlanet, setSelectedPlanet] = useState<PlanetData | null>(null);
  const [showSunInfo, setShowSunInfo] = useState(false);

  const handlePlanetClick = (planet: PlanetData) => {
    setSelectedPlanet(planet);
    setShowSunInfo(false);
  };

  const handleSunClick = () => {
    setShowSunInfo(true);
    setSelectedPlanet(null);
  };

  return (
    <SolarSystemSection>
      <Card>
        <CardTitle>Interactive Solar System</CardTitle>
        <SolarSystemContainer>
          <Canvas camera={{ position: [0, 15, 25], fov: 45 }}>
            <ambientLight intensity={0.1} />
            <Stars
              radius={100}
              depth={50}
              count={5000}
              factor={4}
              saturation={0}
              fade
            />
            <OrbitControls
              enableZoom={true}
              enablePan={true}
              enableRotate={true}
              zoomSpeed={1.2}
              panSpeed={0.8}
              rotateSpeed={0.6}
              minDistance={5}
              maxDistance={50}
            />

            <Sun onClick={handleSunClick} />
            {planetData.map((planet) => (
              <Planet
                key={planet.id}
                planet={planet}
                onClick={() => handlePlanetClick(planet)}
              />
            ))}
          </Canvas>
        </SolarSystemContainer>

        {selectedPlanet && (
          <PlanetInfoPanel
            planet={selectedPlanet}
            position={{
              id: selectedPlanet.id,
              name: selectedPlanet.name,
              ra: Math.random() * 360,
              dec: Math.random() * 180 - 90,
              distance: selectedPlanet.distance_from_sun / 149597870.7,
              phase: Math.random(),
              magnitude: -4 + Math.random() * 8,
              constellation: ['Aries', 'Taurus', 'Gemini', 'Cancer', 'Leo'][Math.floor(Math.random() * 5)],
              updated_at: new Date().toISOString()
            }}
            onClose={() => setSelectedPlanet(null)}
          />
        )}

        {showSunInfo && (
          <SunInfoPanel
            sun={sunData}
            onClose={() => setShowSunInfo(false)}
          />
        )}
      </Card>
    </SolarSystemSection>
  );
};

export default SolarSystem;
