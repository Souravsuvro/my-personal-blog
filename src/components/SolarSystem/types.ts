export interface PlanetData {
  id: string;
  name: string;
  diameter: number; // km
  mass: string;
  gravity: number; // m/s²
  escape: number; // km/s
  rotation: number; // hours
  length_of_day: number; // hours
  distance_from_sun: number; // km
  mean_temperature: number; // °C
  surface_pressure: string; // atmospheres
  atmospheric_composition: string[];
  moons: number;
  rings: boolean;
  global_magnetic_field: boolean;
  color: string;
  size: number; // relative size for visualization
  orbitRadius: number;
  speed: number;
}

export interface SpaceWeather {
  solar_wind_speed: number; // km/s
  solar_wind_density: number; // particles/cm³
  magnetic_field: number; // nT (nanotesla)
  x_ray_flux: number; // W/m²
  updated_at: string;
}

export interface PlanetPosition {
  id: string;
  name: string;
  ra: number; // Right Ascension (degrees)
  dec: number; // Declination (degrees)
  distance: number; // AU
  phase: number; // 0-1
  magnitude: number;
  constellation: string;
  updated_at: string;
}

export interface PlanetInfoPanelProps {
  planet: PlanetData;
  position: PlanetPosition | undefined;
  onClose: () => void;
}

export interface TimeControlsProps {
  isPlaying: boolean;
  speed: number;
  currentDate: Date;
  onPlayPause: () => void;
  onSpeedChange: (speed: number) => void;
  onReset: () => void;
}

export interface SunData {
  id: string;
  name: string;
  diameter: number;
  mass: string;
  surface_gravity: number;
  escape_velocity: number;
  rotation_period: number;
  surface_temperature: number;
  core_temperature: number;
  luminosity: string;
  age: string;
  composition: {
    hydrogen: number;
    helium: number;
    oxygen: number;
    carbon: number;
    iron: number;
    others: number;
  };
  color: string;
  size: number;
  emissiveIntensity: number;
  metalness: number;
  roughness: number;
}

export interface SunInfoPanelProps {
  sun: SunData;
  onClose: () => void;
}
