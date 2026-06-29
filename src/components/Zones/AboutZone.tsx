import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import { useGame } from '../../context/GameContext';
import * as THREE from 'three';

export const AboutZone: React.FC = () => {
  const { dayMode } = useGame();
  const brainRef = useRef<THREE.Mesh>(null);
  
  const accentColor = dayMode ? '#7f00ff' : '#a855f7';
  const neonCyan = '#00f2fe';

  useFrame((state) => {
    if (brainRef.current) {
      // Rotate and bob the floating AI core
      const time = state.clock.getElapsedTime();
      brainRef.current.rotation.y = time * 0.8;
      brainRef.current.rotation.x = time * 0.4;
      brainRef.current.position.y = 2.4 + Math.sin(time * 2.5) * 0.15;
    }
  });

  return (
    <group position={[-12, 0, -10]}>
      {/* Sensor Zone (trigger) */}
      <InteractiveZone zoneId="about" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#0b0a21" roughness={0.5} />
      </mesh>
      
      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 4]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Main Terminal Column */}
      <mesh position={[0, 1.0, -1.5]}>
        <boxGeometry args={[2.5, 2.0, 0.8]} />
        <meshStandardMaterial color="#14142b" metalness={0.7} roughness={0.2} />
      </mesh>

      {/* Terminal Screen (Glowing) */}
      <mesh position={[0, 1.2, -1.08]}>
        <planeGeometry args={[2.0, 1.0]} />
        <meshBasicMaterial color="#0c0a25" />
      </mesh>

      {/* Neon Scanline Screen outline */}
      <mesh position={[0, 1.2, -1.07]}>
        <planeGeometry args={[2.02, 1.02]} />
        <meshBasicMaterial color={neonCyan} wireframe toneMapped={false} />
      </mesh>

      {/* Screen text */}
      <Text
        position={[0, 1.2, -1.06]}
        fontSize={0.11}
        color={neonCyan}
        font="monospace"
        anchorX="center"
        anchorY="middle"
      >
        {"SYSTEM REGISTER: ON\nShanmugapriyan\nFounder of Seyyonic\n[APPROACH TO EXPAND]"}
      </Text>

      {/* Server Rack (Right) */}
      <group position={[1.5, 0.8, -1.5]}>
        <mesh>
          <boxGeometry args={[0.6, 1.6, 0.8]} />
          <meshStandardMaterial color="#1a1a36" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Glowing lights */}
        <mesh position={[0.31, 0.5, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#00f2fe" toneMapped={false} />
        </mesh>
        <mesh position={[0.31, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} />
        </mesh>
        <mesh position={[0.31, -0.3, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#7f00ff" toneMapped={false} />
        </mesh>
      </group>

      {/* Server Rack (Left) */}
      <group position={[-1.5, 0.8, -1.5]}>
        <mesh>
          <boxGeometry args={[0.6, 1.6, 0.8]} />
          <meshStandardMaterial color="#1a1a36" metalness={0.8} roughness={0.3} />
        </mesh>
        {/* Glowing lights */}
        <mesh position={[-0.31, 0.5, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#7f00ff" toneMapped={false} />
        </mesh>
        <mesh position={[-0.31, 0.1, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#00f2fe" toneMapped={false} />
        </mesh>
        <mesh position={[-0.31, -0.3, 0]}>
          <boxGeometry args={[0.02, 0.1, 0.6]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} />
        </mesh>
      </group>

      {/* Floating AI Core (Rotating Octahedron) */}
      <mesh ref={brainRef} position={[0, 2.4, 0]}>
        <octahedronGeometry args={[0.5, 0]} />
        <meshStandardMaterial
          color={accentColor}
          emissive={accentColor}
          emissiveIntensity={1.5}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Zone Title text */}
      <Text
        position={[0, 3.2, -1.5]}
        fontSize={0.35}
        color={accentColor}
        anchorX="center"
      >
        ABOUT ME
      </Text>
    </group>
  );
};
