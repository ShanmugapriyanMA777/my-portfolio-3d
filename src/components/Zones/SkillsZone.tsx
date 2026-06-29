import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import * as THREE from 'three';

export const SkillsZone: React.FC = () => {
  const coreRef = useRef<THREE.Mesh>(null);
  const ring1Ref = useRef<THREE.Group>(null);
  const ring2Ref = useRef<THREE.Group>(null);

  const neonCyan = '#00f2fe';
  const neonPurple = '#7f00ff';
  const neonPink = '#ec008c';

  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Rotate central core
    if (coreRef.current) {
      coreRef.current.rotation.x = time * 0.5;
      coreRef.current.rotation.y = time * 0.9;
      coreRef.current.position.y = 1.8 + Math.sin(time * 2) * 0.1;
    }

    // Rotate orbits
    if (ring1Ref.current) {
      ring1Ref.current.rotation.y = time * 0.3;
    }
    if (ring2Ref.current) {
      ring2Ref.current.rotation.y = -time * 0.2;
    }
  });

  return (
    <group position={[12, 0, -10]}>
      {/* Sensor Trigger */}
      <InteractiveZone zoneId="skills" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#050517" roughness={0.6} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 32]} />
        <meshBasicMaterial color={neonCyan} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Center Pillar */}
      <mesh position={[0, 0.6, 0]}>
        <cylinderGeometry args={[0.6, 0.8, 1.2, 8]} />
        <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.7} />
      </mesh>

      {/* Central Tech Core Processor (Glowing Box) */}
      <mesh ref={coreRef} position={[0, 1.8, 0]}>
        <boxGeometry args={[0.5, 0.5, 0.5]} />
        <meshStandardMaterial
          color={neonCyan}
          emissive={neonCyan}
          emissiveIntensity={1.2}
          roughness={0.1}
          metalness={0.9}
        />
      </mesh>

      {/* Holographic Ring Orbits */}
      <group ref={ring1Ref} position={[0, 1.8, 0]}>
        {/* Orbital ring line */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.3, 1.32, 32]} />
          <meshBasicMaterial color={neonPurple} toneMapped={false} transparent opacity={0.4} />
        </mesh>
        
        {/* Orbiting skill node 1 (Programming node) */}
        <mesh position={[1.3, 0, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color={neonPurple} toneMapped={false} />
        </mesh>
        
        {/* Orbiting skill node 2 */}
        <mesh position={[-1.3, 0, 0]}>
          <sphereGeometry args={[0.15, 8, 8]} />
          <meshBasicMaterial color={neonPurple} toneMapped={false} />
        </mesh>
      </group>

      <group ref={ring2Ref} position={[0, 1.8, 0]}>
        {/* Orbital ring line */}
        <mesh rotation={[Math.PI / 2, 0, 0]}>
          <ringGeometry args={[1.7, 1.72, 32]} />
          <meshBasicMaterial color={neonPink} toneMapped={false} transparent opacity={0.4} />
        </mesh>
        
        {/* Orbiting skill node 3 (AI / Tech node) */}
        <mesh position={[0, 0, 1.7]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color={neonPink} toneMapped={false} />
        </mesh>
        
        {/* Orbiting skill node 4 */}
        <mesh position={[0, 0, -1.7]}>
          <boxGeometry args={[0.2, 0.2, 0.2]} />
          <meshBasicMaterial color={neonPink} toneMapped={false} />
        </mesh>
      </group>

      {/* Floating skill signs around center */}
      {/* 1. Programming */}
      <group position={[-1.4, 0.9, 1.0]} rotation={[0, Math.PI / 4, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.5, 0.1]} />
          <meshStandardMaterial color="#11112b" />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.1} color="#ffffff" font="monospace">
          CODE
        </Text>
      </group>

      {/* 2. AI & Data Science */}
      <group position={[1.4, 0.9, 1.0]} rotation={[0, -Math.PI / 4, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.5, 0.1]} />
          <meshStandardMaterial color="#11112b" />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.1} color={neonCyan} font="monospace">
          AI/ML
        </Text>
      </group>

      {/* 3. Tech Stack */}
      <group position={[0, 0.9, -1.4]} rotation={[0, 0, 0]}>
        <mesh>
          <boxGeometry args={[0.8, 0.5, 0.1]} />
          <meshStandardMaterial color="#11112b" />
        </mesh>
        <Text position={[0, 0, 0.06]} fontSize={0.1} color={neonPink} font="monospace">
          TECH
        </Text>
      </group>

      {/* Section Label */}
      <Text
        position={[0, 3.2, -1.5]}
        fontSize={0.35}
        color={neonCyan}
        anchorX="center"
      >
        SKILLS MATRIX
      </Text>
    </group>
  );
};
