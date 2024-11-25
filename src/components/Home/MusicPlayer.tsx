import React, { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion, AnimatePresence } from 'framer-motion';
import { FaPlay, FaPause, FaMusic, FaVolumeUp, FaVolumeMute } from 'react-icons/fa';

const PlayerContainer = styled(motion.div)`
  position: fixed;
  bottom: 32px;
  right: 32px;
  z-index: 100;
  display: flex;
  align-items: center;
  gap: 16px;
  background: rgba(255, 255, 255, 0.1);
  backdrop-filter: blur(10px);
  padding: 12px;
  border-radius: 60px;
  border: 1px solid rgba(255, 255, 255, 0.1);
  box-shadow: 0 8px 32px rgba(0, 0, 0, 0.2);
  transition: all 0.3s ease;

  &:hover {
    transform: translateY(-2px);
    box-shadow: 0 12px 40px rgba(0, 0, 0, 0.3);
    border-color: var(--primary);
  }

  @media (max-width: 768px) {
    bottom: 20px;
    right: 20px;
    padding: 10px;
  }
`;

const PlayButton = styled(motion.button)`
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: var(--primary);
  border: none;
  color: white;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.1);
  transition: all 0.2s ease-in-out;

  &:hover {
    transform: scale(1.05);
    box-shadow: 0 6px 16px rgba(0, 0, 0, 0.15);
    background: var(--primary);
    filter: brightness(1.1);
  }

  &:active {
    transform: scale(0.95);
  }

  @media (max-width: 768px) {
    width: 40px;
    height: 40px;
  }
`;

const SongInfo = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 12px;
  padding: 8px 16px;
  border-radius: 24px;
  color: var(--text-primary);
  
  @media (max-width: 768px) {
    padding: 6px 12px;
  }
`;

const SongTitle = styled.span`
  font-size: 14px;
  font-weight: 500;
  white-space: nowrap;
  
  @media (max-width: 768px) {
    font-size: 12px;
  }
`;

const VolumeControl = styled(motion.div)`
  display: flex;
  align-items: center;
  gap: 8px;
`;

const VolumeSlider = styled.input`
  width: 80px;
  height: 4px;
  -webkit-appearance: none;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 2px;
  outline: none;
  opacity: 0;
  transition: all 0.3s ease;

  ${PlayerContainer}:hover & {
    opacity: 1;
  }

  &::-webkit-slider-thumb {
    -webkit-appearance: none;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    background: var(--primary);
    cursor: pointer;
    transition: all 0.2s ease;

    &:hover {
      transform: scale(1.2);
    }
  }

  @media (max-width: 768px) {
    display: none;
  }
`;

const VolumeButton = styled(motion.button)`
  color: var(--text-primary);
  background: none;
  border: none;
  cursor: pointer;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 8px;
  border-radius: 50%;
  transition: all 0.2s ease;

  &:hover {
    color: var(--primary);
    background: rgba(255, 255, 255, 0.1);
  }
`;

const MusicPlayer: React.FC = () => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [showInfo, setShowInfo] = useState(false);
  const [volume, setVolume] = useState(0.5);
  const [isMuted, setIsMuted] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    audioRef.current = new Audio('/music/teri-deewani.mp3');
    audioRef.current.volume = volume;
    
    audioRef.current.addEventListener('ended', () => {
      setIsPlaying(false);
    });

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current.removeEventListener('ended', () => {
          setIsPlaying(false);
        });
      }
    };
  }, []);

  const togglePlay = () => {
    if (!audioRef.current) return;

    if (isPlaying) {
      audioRef.current.pause();
    } else {
      audioRef.current.play();
    }
    setIsPlaying(!isPlaying);
    setShowInfo(true);
    setTimeout(() => setShowInfo(false), 3000);
  };

  const handleVolumeChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newVolume = parseFloat(e.target.value);
    setVolume(newVolume);
    if (audioRef.current) {
      audioRef.current.volume = newVolume;
    }
    setIsMuted(newVolume === 0);
  };

  const toggleMute = () => {
    if (!audioRef.current) return;
    
    const newMuted = !isMuted;
    setIsMuted(newMuted);
    
    if (newMuted) {
      audioRef.current.volume = 0;
      setVolume(0);
    } else {
      audioRef.current.volume = 0.5;
      setVolume(0.5);
    }
  };

  return (
    <PlayerContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <AnimatePresence>
        {showInfo && (
          <SongInfo
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -20 }}
            transition={{ duration: 0.2 }}
          >
            <FaMusic size={14} />
            <SongTitle>Teri Deewani - Kailash Kher</SongTitle>
          </SongInfo>
        )}
      </AnimatePresence>
      
      <VolumeControl>
        <VolumeButton onClick={toggleMute}>
          {isMuted ? <FaVolumeMute size={16} /> : <FaVolumeUp size={16} />}
        </VolumeButton>
        <VolumeSlider
          type="range"
          min="0"
          max="1"
          step="0.01"
          value={volume}
          onChange={handleVolumeChange}
        />
      </VolumeControl>

      <PlayButton
        onClick={togglePlay}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
      >
        {isPlaying ? <FaPause size={16} /> : <FaPlay size={16} />}
      </PlayButton>
    </PlayerContainer>
  );
};

export default MusicPlayer;
