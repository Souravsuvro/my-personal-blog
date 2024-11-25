import React, { useEffect, useRef } from 'react';
import styled from 'styled-components';

const Canvas = styled.canvas`
  position: absolute;
  top: 0;
  left: 0;
  width: 100vw;
  height: 100%;
  z-index: 0;
  opacity: 0.5;
  pointer-events: none;
  background-color: transparent;
`;

const CodeRain: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const resizeCanvas = () => {
      if (!canvas || !ctx) return;
      
      const container = canvas.parentElement;
      if (!container) return;
      
      canvas.width = window.innerWidth;
      canvas.height = container.getBoundingClientRect().height;
    };

    resizeCanvas();

    const resizeObserver = new ResizeObserver(resizeCanvas);
    if (canvas.parentElement) {
      resizeObserver.observe(canvas.parentElement);
    }
    window.addEventListener('resize', resizeCanvas);

    const chars = '01';
    const fontSize = 16;
    const columns = Math.floor(canvas.width / fontSize);
    
    const drops: number[] = new Array(columns).fill(1);
    const speeds: number[] = new Array(columns).fill(0).map(() => 0.3 + Math.random() * 0.3);
    const opacities: number[] = new Array(columns).fill(0).map(() => 0.7 + Math.random() * 0.3);
    const brightnesses: number[] = new Array(columns).fill(0).map(() => 60 + Math.random() * 40);
    
    let lastTime = 0;
    let pulsePhase = 0;

    const getRandomChar = () => chars[Math.floor(Math.random() * chars.length)];

    const draw = (currentTime: number) => {
      if (!ctx || !canvas) return;

      const deltaTime = currentTime - lastTime;
      if (deltaTime < 50) {
        requestAnimationFrame(draw);
        return;
      }
      lastTime = currentTime;

      pulsePhase += 0.02;
      const pulseIntensity = Math.sin(pulsePhase) * 0.15 + 0.85;

      ctx.fillStyle = 'rgba(0, 0, 0, 0.15)';
      ctx.fillRect(0, 0, canvas.width, canvas.height);

      for (let i = 0; i < drops.length; i++) {
        const text = getRandomChar();
        const x = i * fontSize;
        const y = drops[i] * fontSize;

        const hue = 190;
        const saturation = 100;
        const brightness = brightnesses[i];
        
        ctx.font = `bold ${fontSize}px monospace`;
        ctx.textAlign = 'center';
        ctx.fillStyle = `hsla(${hue}, ${saturation}%, ${brightness}%, ${opacities[i] * pulseIntensity})`;
        
        ctx.shadowColor = `hsla(${hue}, ${saturation}%, ${brightness}%, ${opacities[i] * 0.5})`;
        ctx.shadowBlur = 8;
        ctx.shadowOffsetX = 0;
        ctx.shadowOffsetY = 0;
        
        ctx.fillText(text, x, y);

        ctx.fillStyle = `hsla(${hue}, ${saturation}%, 90%, ${opacities[i] * 0.7})`;
        ctx.shadowBlur = 0;
        ctx.fillText(text, x, y);

        drops[i] += speeds[i];

        if (y > canvas.height) {
          if (Math.random() > 0.99) {
            drops[i] = 0;
            speeds[i] = 0.3 + Math.random() * 0.3;
            opacities[i] = 0.7 + Math.random() * 0.3;
            brightnesses[i] = 60 + Math.random() * 40;
          }
        }
      }

      requestAnimationFrame(draw);
    };

    requestAnimationFrame(draw);

    return () => {
      resizeObserver.disconnect();
      window.removeEventListener('resize', resizeCanvas);
    };
  }, []);

  return <Canvas ref={canvasRef} />;
};

export default CodeRain;
