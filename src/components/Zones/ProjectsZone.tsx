import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import { useGame } from '../../context/GameContext';
import * as THREE from 'three';

export const ProjectsZone: React.FC = () => {
  const { dayMode } = useGame();
  const hologramRef = useRef<THREE.Group>(null);
  
  const accentColor = dayMode ? '#ec008c' : '#f43f5e';
  const neonCyan = '#00f2fe';

  useFrame((state) => {
    if (hologramRef.current) {
      const time = state.clock.getElapsedTime();
      hologramRef.current.rotation.y = time * 0.4;
      
      // Floating bobbing motion for all child nodes
      hologramRef.current.position.y = 1.6 + Math.sin(time * 3) * 0.08;
    }
  });

  return (
    <group position={[-12, 0, 10]}>
      {/* Sensor Zone Trigger */}
      <InteractiveZone zoneId="projects" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#0d0515" roughness={0.4} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Holographic Projection Pedestal */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.7, 0.9, 1.2, 12]} />
        <meshStandardMaterial color="#1f1f2e" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Glowing Projector Lens */}
      <mesh position={[0, 1.21, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.5, 12]} />
        <meshBasicMaterial color={neonCyan} toneMapped={false} />
      </mesh>

      {/* Floating Holographic Displays (Bobbing and Spinning Group) */}
      <group ref={hologramRef} position={[0, 1.6, 0]}>
        {/* Central hologram projection beam */}
        <mesh position={[0, -0.4, 0]} rotation={[0, 0, 0]}>
          <cylinderGeometry args={[0.01, 0.5, 0.8, 16, 1, true]} />
          <meshBasicMaterial color={neonCyan} transparent opacity={0.15} side={THREE.DoubleSide} />
        </mesh>
        
        {/* Hologram Core (Spinning Prisms representing project archives) */}
        <mesh position={[0, 0.1, 0]}>
          <dodecahedronGeometry args={[0.4, 0]} />
          <meshBasicMaterial color={accentColor} wireframe toneMapped={false} />
        </mesh>
        
        {/* Outer orbital nodes */}
        <mesh position={[0.7, 0.3, 0.7]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color={neonCyan} toneMapped={false} />
        </mesh>
        <mesh position={[-0.7, 0.3, -0.7]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color={neonCyan} toneMapped={false} />
        </mesh>
        <mesh position={[0.7, 0.3, -0.7]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color={neonCyan} toneMapped={false} />
        </mesh>
        <mesh position={[-0.7, 0.3, 0.7]}>
          <boxGeometry args={[0.15, 0.15, 0.15]} />
          <meshBasicMaterial color={neonCyan} toneMapped={false} />
        </mesh>
      </group>

      {/* Interactive Display text plate */}
      <group position={[0, 0.95, 0.92]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.2, 0.35, 0.05]} />
          <meshStandardMaterial color="#0c0a25" metalness={0.9} roughness={0.1} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.075} color={neonCyan} font="monospace">
          PROJECTS ARCHIVE
        </Text>
      </group>

      {/* Section Label */}
      <Text
        position={[0, 3.2, -1.5]}
        fontSize={0.35}
        color={accentColor}
        anchorX="center"
      >
        PROJECTS Showcase
      </Text>
    </group>
  );
};
