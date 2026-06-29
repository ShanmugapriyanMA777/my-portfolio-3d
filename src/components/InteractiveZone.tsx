import React from 'react';
import { useGame, type ZoneType } from '../context/GameContext';
import { CuboidCollider } from '@react-three/rapier';

interface InteractiveZoneProps {
  zoneId: ZoneType;
  position: [number, number, number];
  args: [number, number, number]; // width, height, depth of trigger box
}

export const InteractiveZone: React.FC<InteractiveZoneProps> = ({ zoneId, position, args }) => {
  const { setCurrentZone, triggerSound } = useGame();

  const handleEnter = (event: any) => {
    // Check if the intersecting body is indeed the player
    if (event.other.rigidBodyObject?.name === 'player') {
      setCurrentZone(zoneId);
      triggerSound('zoneEntry');
    }
  };

  const handleExit = (event: any) => {
    if (event.other.rigidBodyObject?.name === 'player') {
      // Avoid resetting if we've already transitioned to another active zone
      setCurrentZone('none');
    }
  };

  return (
    <group position={position}>
      <CuboidCollider
        args={args}
        sensor
        onIntersectionEnter={handleEnter}
        onIntersectionExit={handleExit}
      />
    </group>
  );
};
