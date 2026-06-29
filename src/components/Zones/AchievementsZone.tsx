import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import { useGame } from '../../context/GameContext';
import * as THREE from 'three';

export const AchievementsZone: React.FC = () => {
  const { dayMode } = useGame();
  const trophyRef = useRef<THREE.Group>(null);
  
  const accentColor = dayMode ? '#ffd700' : '#eab308';
  const neonPurple = '#7f00ff';

  useFrame((state) => {
    if (trophyRef.current) {
      const time = state.clock.getElapsedTime();
      trophyRef.current.rotation.y = time * 0.9;
      trophyRef.current.position.y = 1.6 + Math.sin(time * 2.8) * 0.08;
    }
  });

  return (
    <group position={[0, 0, 16]}>
      {/* Proximity trigger */}
      <InteractiveZone zoneId="achievements" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#0c0c00" roughness={0.4} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Trophy Pedestal */}
      <mesh position={[0, 0.5, 0]}>
        <cylinderGeometry args={[0.5, 0.7, 1.0, 8]} />
        <meshStandardMaterial color="#1a1c0d" metalness={0.7} roughness={0.3} />
      </mesh>

      {/* Floating Trophy Assembly */}
      <group ref={trophyRef} position={[0, 1.6, 0]}>
        {/* Trophy Cup Core */}
        <mesh position={[0, 0.3, 0]}>
          <coneGeometry args={[0.3, 0.5, 6]} />
          <meshStandardMaterial color={accentColor} roughness={0.1} metalness={0.9} />
        </mesh>
        
        {/* Trophy Base connector */}
        <mesh position={[0, 0.0, 0]}>
          <cylinderGeometry args={[0.08, 0.08, 0.2, 8]} />
          <meshStandardMaterial color={accentColor} roughness={0.1} metalness={0.9} />
        </mesh>

        {/* Trophy Ring Stand */}
        <mesh position={[0, -0.15, 0]}>
          <cylinderGeometry args={[0.22, 0.22, 0.1, 8]} />
          <meshStandardMaterial color="#111111" roughness={0.5} />
        </mesh>

        {/* Floating halo rings */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[0.5, 0.53, 16]} />
          <meshBasicMaterial color={neonPurple} toneMapped={false} transparent opacity={0.5} />
        </mesh>
      </group>

      {/* Achievement core stats text panel */}
      <group position={[0, 0.85, 0.82]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.3, 0.05]} />
          <meshStandardMaterial color="#0c0c03" metalness={0.9} roughness={0.1} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.075} color={accentColor} font="monospace">
          PERFORMANCE ARCHIVE
        </Text>
      </group>

      {/* Title */}
      <Text
        position={[0, 3.0, -1.2]}
        fontSize={0.35}
        color={accentColor}
        anchorX="center"
      >
        ACHIEVEMENTS
      </Text>
    </group>
  );
};
