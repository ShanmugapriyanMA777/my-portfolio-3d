import React, { useRef } from 'react';
import { useFrame } from '@react-three/fiber';
import { Text } from '@react-three/drei';
import { InteractiveZone } from '../InteractiveZone';
import { useGame } from '../../context/GameContext';
import * as THREE from 'three';

export const CertificationsZone: React.FC = () => {
  const { dayMode } = useGame();
  const boardRef = useRef<THREE.Group>(null);
  
  const accentColor = dayMode ? '#7f00ff' : '#9333ea';

  useFrame((state) => {
    if (boardRef.current) {
      const time = state.clock.getElapsedTime();
      // Floating certificate board
      boardRef.current.position.y = 1.3 + Math.sin(time * 2.2) * 0.08;
    }
  });

  return (
    <group position={[12, 0, 10]}>
      {/* Proximity Trigger */}
      <InteractiveZone zoneId="certifications" position={[0, 0.5, 0]} args={[3.2, 1, 3.2]} />

      {/* Grid Floor plate */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <planeGeometry args={[4, 4]} />
        <meshStandardMaterial color="#0c071a" roughness={0.5} />
      </mesh>

      {/* Border glow */}
      <mesh position={[0, 0.02, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.9, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>

      {/* Gallery stand base */}
      <mesh position={[0, 0.4, 0]}>
        <boxGeometry args={[1.6, 0.8, 1.6]} />
        <meshStandardMaterial color="#1a1130" roughness={0.3} metalness={0.6} />
      </mesh>

      {/* Floating certificates display assembly */}
      <group ref={boardRef} position={[0, 1.3, 0]}>
        {/* Certificate Display wall */}
        <mesh position={[0, 0.4, -0.6]}>
          <boxGeometry args={[2.4, 1.3, 0.15]} />
          <meshStandardMaterial color="#0c0c17" roughness={0.2} metalness={0.8} />
        </mesh>
        
        {/* Glowing framing panel */}
        <mesh position={[0, 0.4, -0.52]}>
          <planeGeometry args={[2.3, 1.2]} />
          <meshBasicMaterial color={accentColor} wireframe toneMapped={false} />
        </mesh>

        {/* Floating Mini certificates inside the frame */}
        {/* IBM */}
        <mesh position={[-0.8, 0.6, -0.5]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshBasicMaterial color="#00f2fe" toneMapped={false} transparent opacity={0.8} />
        </mesh>
        
        {/* Google Gemini */}
        <mesh position={[-0.2, 0.6, -0.5]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} transparent opacity={0.8} />
        </mesh>

        {/* Deloitte */}
        <mesh position={[0.4, 0.6, -0.5]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshBasicMaterial color="#7f00ff" toneMapped={false} transparent opacity={0.8} />
        </mesh>

        {/* NPTEL */}
        <mesh position={[0.8, 0.15, -0.5]}>
          <planeGeometry args={[0.5, 0.35]} />
          <meshBasicMaterial color="#ffffff" toneMapped={false} transparent opacity={0.6} />
        </mesh>

        {/* Text descriptions */}
        <Text
          position={[0, 0.35, -0.49]}
          fontSize={0.095}
          color="#ffffff"
          font="monospace"
          anchorX="center"
        >
          {"VERIFIED CREDENTIALS GALLERY\n[IBM | GOOGLE | DELOITTE | NPTEL]\nAPPROACH TO AUDIT CORES"}
        </Text>
      </group>

      {/* Section Title text */}
      <Text
        position={[0, 3.2, -1.5]}
        fontSize={0.35}
        color={accentColor}
        anchorX="center"
      >
        CREDENTIALS
      </Text>
    </group>
  );
};
