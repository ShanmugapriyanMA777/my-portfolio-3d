import React, { useEffect, useRef, useState } from 'react';
import { useGame } from '../context/GameContext';
import { ArrowUp } from 'lucide-react';

export const CustomJoystick: React.FC = () => {
  const { setJoystickActive, setJoystickVector, triggerSound } = useGame();
  const [touchStart, setTouchStart] = useState<{ x: number; y: number } | null>(null);
  const [knobPos, setKnobPos] = useState({ x: 0, y: 0 });
  const containerRef = useRef<HTMLDivElement>(null);
  const maxRadius = 40; // max displacement in pixels

  const handleTouchStart = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    if (containerRef.current) {
      const rect = containerRef.current.getBoundingClientRect();
      const centerX = rect.left + rect.width / 2;
      const centerY = rect.top + rect.height / 2;
      setTouchStart({ x: centerX, y: centerY });
      setJoystickActive(true);
    }
  };

  const handleTouchMove = (e: React.TouchEvent<HTMLDivElement>) => {
    if (!touchStart) return;
    e.stopPropagation();
    const touch = e.touches[0];
    
    const deltaX = touch.clientX - touchStart.x;
    const deltaY = touch.clientY - touchStart.y;
    const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    
    let angle = Math.atan2(deltaY, deltaX);
    let clampedDistance = Math.min(distance, maxRadius);
    
    const moveX = Math.cos(angle) * clampedDistance;
    const moveY = Math.sin(angle) * clampedDistance;
    
    setKnobPos({ x: moveX, y: moveY });
    
    // Normalize values between -1 and 1
    // Note: Three.js coordinates: +x is right, +z is backward (which is +y in 2D screen coordinate)
    // We map joystick X to player strafe (-x is left, +x is right)
    // and joystick Y to player forward (-y is forward, +y is backward)
    setJoystickVector({
      x: moveX / maxRadius,
      y: moveY / maxRadius
    });
  };

  const handleTouchEnd = (e: React.TouchEvent<HTMLDivElement>) => {
    e.stopPropagation();
    setTouchStart(null);
    setKnobPos({ x: 0, y: 0 });
    setJoystickActive(false);
    setJoystickVector({ x: 0, y: 0 });
  };

  const simulateJumpPress = () => {
    triggerSound('hover');
    window.dispatchEvent(new KeyboardEvent('keydown', { key: ' ' }));
  };

  const simulateJumpRelease = () => {
    window.dispatchEvent(new KeyboardEvent('keyup', { key: ' ' }));
  };

  // Only show on touch/mobile viewports
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const checkTouch = () => {
      setIsTouchDevice(
        'ontouchstart' in window || navigator.maxTouchPoints > 0
      );
    };
    checkTouch();
    window.addEventListener('resize', checkTouch);
    return () => window.removeEventListener('resize', checkTouch);
  }, []);

  if (!isTouchDevice) return null;

  return (
    <div className="absolute inset-x-0 bottom-0 top-0 pointer-events-none z-30 select-none">
      
      {/* Joystick Area (Bottom Left) */}
      <div 
        ref={containerRef}
        onTouchStart={handleTouchStart}
        onTouchMove={handleTouchMove}
        onTouchEnd={handleTouchEnd}
        className="absolute bottom-10 left-10 w-24 h-24 rounded-full bg-cyan-950/20 border-2 border-cyber-neonCyan/30 flex items-center justify-center pointer-events-auto backdrop-blur-sm touch-none"
      >
        {/* Outer Ring Guideline */}
        <div className="w-16 h-16 rounded-full border border-cyan-400/10 absolute" />
        
        {/* Joystick Knob */}
        <div
          className="w-10 h-10 rounded-full bg-gradient-to-br from-cyber-neonCyan to-cyber-neonPurple flex items-center justify-center shadow-lg border border-black/40 cursor-pointer pointer-events-none"
          style={{
            transform: `translate(${knobPos.x}px, ${knobPos.y}px)`,
            transition: touchStart ? 'none' : 'transform 0.15s ease-out',
          }}
        >
          <div className="w-4 h-4 rounded-full bg-white/20" />
        </div>
      </div>

      {/* Jump Button (Bottom Right) */}
      <button
        onTouchStart={simulateJumpPress}
        onTouchEnd={simulateJumpRelease}
        onMouseDown={simulateJumpPress}
        onMouseUp={simulateJumpRelease}
        className="absolute bottom-10 right-10 w-16 h-16 rounded-full glass-neon-purple border border-purple-500/40 text-purple-400 flex items-center justify-center hover:bg-cyber-neonPurple hover:text-white pointer-events-auto shadow-neon-purple active:scale-90 select-none active:bg-cyber-neonPurple/30"
        title="Jump"
      >
        <ArrowUp className="w-8 h-8" />
      </button>
    </div>
  );
};
