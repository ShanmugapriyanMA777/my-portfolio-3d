import React from 'react';
import { Text } from '@react-three/drei';
import { useGame } from '../../context/GameContext';
import { InteractiveZone } from '../InteractiveZone';

export const HomeZone: React.FC = () => {
  const { dayMode } = useGame();
  const accentColor = dayMode ? '#00bfff' : '#00f2fe';

  return (
    <group position={[0, 0, 0]}>
      {/* Interactive spawn sensor */}
      <InteractiveZone zoneId="home" position={[0, 0.5, 0]} args={[3, 1, 3]} />

      {/* Gateway Pillars */}
      <mesh position={[-3, 2, -4]}>
        <boxGeometry args={[0.6, 4, 0.6]} />
        <meshStandardMaterial color="#1f1f38" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[-3, 4, -4]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>

      <mesh position={[3, 2, -4]}>
        <boxGeometry args={[0.6, 4, 0.6]} />
        <meshStandardMaterial color="#1f1f38" roughness={0.2} metalness={0.8} />
      </mesh>
      <mesh position={[3, 4, -4]}>
        <boxGeometry args={[0.8, 0.3, 0.8]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} />
      </mesh>

      {/* Gateway Arch Header */}
      <mesh position={[0, 4, -4]}>
        <boxGeometry args={[6.6, 0.4, 0.6]} />
        <meshStandardMaterial color="#1f1f38" roughness={0.2} metalness={0.8} />
      </mesh>

      {/* Holographic Portal Gate */}
      <mesh position={[0, 2, -4]}>
        <planeGeometry args={[5.4, 3.6]} />
        <meshBasicMaterial
          color={dayMode ? '#7f00ff' : '#08001a'}
          transparent
          opacity={0.3}
          wireframe
        />
      </mesh>

      {/* Floating welcome titles */}
      <Text
        position={[0, 5.5, -4]}
        fontSize={0.65}
        color={accentColor}
        anchorX="center"
        anchorY="middle"
      >
        SHANMUGAPRIYAN
      </Text>
      
      <Text
        position={[0, 4.8, -4]}
        fontSize={0.24}
        color="#7f00ff"
        anchorX="center"
        anchorY="middle"
      >
        AI & Data Science Student | Seyyonic Founder
      </Text>

      <Text
        position={[0, 0.05, 3]}
        rotation={[-Math.PI / 2, 0, 0]}
        fontSize={0.22}
        color="#ffffff"
        fillOpacity={0.6}
        anchorX="center"
      >
        ▲ WASD or joystick to explore the grid ▲
      </Text>

      {/* Landing Pad Grid circles */}
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[1.8, 2.0, 32]} />
        <meshBasicMaterial color={accentColor} toneMapped={false} transparent opacity={0.6} />
      </mesh>
      <mesh position={[0, 0.01, 0]} rotation={[-Math.PI / 2, 0, 0]}>
        <ringGeometry args={[0, 0.1, 16]} />
        <meshBasicMaterial color="#ec008c" toneMapped={false} />
      </mesh>
    </group>
  );
};
