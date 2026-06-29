import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import { useGame } from '../../context/GameContext';
import * as THREE from 'three';

export const ContactZone: React.FC = () => {
  const { dayMode } = useGame();
  const antennaRef = useRef<THREE.Mesh>(null);
  
  const accentColor = dayMode ? '#ec008c' : '#db2777';
  const neonCyan = '#00f2fe';

  useFrame((state) => {
    if (antennaRef.current) {
      const time = state.clock.getElapsedTime();
      // Pulsing scale of transmission bubble
      const scaleVal = 1.0 + Math.sin(time * 6) * 0.15;
      antennaRef.current.scale.set(scaleVal, scaleVal, scaleVal);
    }
  });

  return (
    <group position={[0, 0, -16]}>
      {/* Proximity trigger */}
      <InteractiveZone zoneId="contact" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#1a040d" roughness={0.4} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Main Mailbox Post Column */}
      <mesh position={[0, 0.9, 0]}>
        <boxGeometry args={[0.5, 1.8, 0.5]} />
        <meshStandardMaterial color="#2d121c" metalness={0.7} roughness={0.3} />
      </mesh>
      
      {/* Glowing horizontal postbox slot */}
      <mesh position={[0, 1.3, 0.26]}>
        <boxGeometry args={[0.3, 0.08, 0.02]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>

      {/* Floating Transmission Beacon Sphere */}
      <mesh ref={antennaRef} position={[0, 2.1, 0]}>
        <sphereGeometry args={[0.15, 8, 8]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>
      
      {/* Beacon Support ring */}
      <mesh position={[0, 1.9, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <torusGeometry args={[0.22, 0.03, 8, 16]} />
        <meshStandardMaterial color="#4d1b2e" roughness={0.2} />
      </mesh>

      {/* Beacon halo wave */}
      <mesh position={[0, 2.1, 0]} rotation={[Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0.3, 0.35, 16]} />
        <meshBasicMaterial color={neonCyan} toneMapped={false} transparent opacity={0.4} />
      </mesh>

      {/* Signboard */}
      <group position={[0, 0.95, 0.3]} rotation={[-Math.PI / 8, 0, 0]}>
        <mesh>
          <boxGeometry args={[1.0, 0.3, 0.05]} />
          <meshStandardMaterial color="#0a050f" metalness={0.9} roughness={0.1} />
        </mesh>
        <Text position={[0, 0, 0.03]} fontSize={0.07} color={accentColor} font="monospace">
          MAILBOX PROTOCOL
        </Text>
      </group>

      {/* Section Title text */}
      <Text
        position={[0, 3.2, -1.5]}
        fontSize={0.35}
        color={accentColor}
        anchorX="center"
      >
        CONTACT PING
      </Text>
    </group>
  );
};
