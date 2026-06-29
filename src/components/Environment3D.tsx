import React, { useRef, useEffect } from 'react';
import { Stars, Grid } from '@react-three/drei';
import { RigidBody, CuboidCollider } from '@react-three/rapier';
import { useGame } from '../context/GameContext';
import { useFrame, useThree } from '@react-three/fiber';
import * as THREE from 'three';

export const Environment3D: React.FC = () => {
  const { dayMode, unlockAchievement, achievementsUnlocked, triggerSound } = useGame();
  const { scene } = useThree();
  const dirLightRef = useRef<THREE.DirectionalLight>(null);
  
  // Easter Egg Orb ref
  const orbRef = useRef<THREE.Mesh>(null);

  // Transition lighting parameters smoothly based on Day/Night mode
  useFrame((state) => {
    const time = state.clock.getElapsedTime();
    
    // Animate the easter egg glowing orb if it hasn't been collected yet
    if (orbRef.current) {
      orbRef.current.rotation.y = time * 2;
      orbRef.current.position.y = 1.0 + Math.sin(time * 4) * 0.12;
    }

    // Set target fog color and density
    const targetFogColor = dayMode ? new THREE.Color('#0c0c1b') : new THREE.Color('#03000d');
    const targetFogNear = dayMode ? 14 : 10;
    const targetFogFar = dayMode ? 40 : 30;

    // Lerp scene fog parameters
    if (scene.fog && scene.fog instanceof THREE.Fog) {
      scene.fog.color.lerp(targetFogColor, 0.08);
      scene.fog.near = THREE.MathUtils.lerp(scene.fog.near, targetFogNear, 0.08);
      scene.fog.far = THREE.MathUtils.lerp(scene.fog.far, targetFogFar, 0.08);
      
      // Update scene background color to match fog (seamless horizon)
      scene.background = scene.fog.color;
    }

    // Smoothly animate the sun/moon intensity and position
    if (dirLightRef.current) {
      const targetIntensity = dayMode ? 1.0 : 0.15;
      dirLightRef.current.intensity = THREE.MathUtils.lerp(
        dirLightRef.current.intensity,
        targetIntensity,
        0.05
      );
      
      const targetColor = dayMode ? new THREE.Color('#00f2fe') : new THREE.Color('#7f00ff');
      dirLightRef.current.color.lerp(targetColor, 0.05);
    }
  });

  // Attach fog on mount
  useEffect(() => {
    scene.background = new THREE.Color('#03000d');
    scene.fog = new THREE.Fog('#03000d', 10, 30);
    return () => {
      scene.fog = null;
      scene.background = null;
    };
  }, [scene]);

  // Handle collecting the secret Seyyonic orb
  const handleOrbCollision = (event: any) => {
    if (event.other.rigidBodyObject?.name === 'player') {
      if (!achievementsUnlocked.includes('egg_hunter')) {
        unlockAchievement('egg_hunter');
        triggerSound('achievement');
      }
    }
  };

  const hasCollectedEgg = achievementsUnlocked.includes('egg_hunter');

  return (
    <>
      {/* 1. LIGHTING */}
      <ambientLight intensity={dayMode ? 0.45 : 0.08} color={dayMode ? '#00f2fe' : '#7f00ff'} />
      
      <directionalLight
        ref={dirLightRef}
        position={[15, 20, 10]}
        intensity={0.15}
        castShadow
        shadow-mapSize={[1024, 1024]}
      />

      {/* Point lights on zones for local cyber glows */}
      <pointLight position={[-12, 2.5, -10]} intensity={1.5} color="#7f00ff" distance={8} /> {/* About */}
      <pointLight position={[12, 2.5, -10]} intensity={1.5} color="#00f2fe" distance={8} />  {/* Skills */}
      <pointLight position={[-12, 2.5, 10]} intensity={1.5} color="#ec008c" distance={8} />  {/* Projects */}
      <pointLight position={[12, 2.5, 10]} intensity={1.5} color="#9333ea" distance={8} />   {/* Credentials */}
      <pointLight position={[0, 2.5, 16]} intensity={1.5} color="#eab308" distance={8} />    {/* Trophy */}
      <pointLight position={[0, 2.5, -16]} intensity={1.5} color="#ec008c" distance={8} />   {/* Mailbox */}

      {/* 2. STATIC PHYSICAL GROUND COLLIDER */}
      <RigidBody type="fixed" colliders="cuboid" position={[0, -0.1, 0]} friction={0.5}>
        {/* Visual ground plate */}
        <mesh receiveShadow>
          <boxGeometry args={[70, 0.2, 70]} />
          <meshStandardMaterial color={dayMode ? '#0a0a1f' : '#03000b'} roughness={0.9} />
        </mesh>
      </RigidBody>

      {/* Outer grid boundary collision walls */}
      <RigidBody type="fixed">
        <CuboidCollider position={[0, 2, 35]} args={[35, 2, 0.5]} />
        <CuboidCollider position={[0, 2, -35]} args={[35, 2, 0.5]} />
        <CuboidCollider position={[35, 2, 0]} args={[0.5, 2, 35]} />
        <CuboidCollider position={[-35, 2, 0]} args={[0.5, 2, 35]} />
      </RigidBody>

      {/* 3. VISUAL DECORATIONS (Retro Grid & Starfield) */}
      <Grid
        position={[0, 0.01, 0]}
        args={[70, 70]}
        cellSize={1.0}
        cellThickness={0.8}
        cellColor={dayMode ? '#1e1b4b' : '#0e0b25'}
        sectionSize={5}
        sectionThickness={1.2}
        sectionColor={dayMode ? '#00f2fe' : '#7f00ff'}
        fadeDistance={30}
        infiniteGrid
      />

      <Stars radius={90} depth={40} count={2200} factor={5} saturation={0.5} fade speed={1.5} />

      {/* 4. EASTER EGG: Hidden Seyyonic glowing orb (Floating behind the home portal grid) */}
      {!hasCollectedEgg && (
        <group position={[0, 1.0, -8]}>
          <RigidBody type="fixed" colliders="ball" sensor onIntersectionEnter={handleOrbCollision}>
            <mesh ref={orbRef}>
              <octahedronGeometry args={[0.22, 0]} />
              <meshBasicMaterial color="#00f2fe" toneMapped={false} />
            </mesh>
            {/* Soft pulsing point light around the secret */}
            <pointLight intensity={1.5} color="#00f2fe" distance={3} />
            {/* Base Ring under the orb */}
            <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.6, 0]}>
              <ringGeometry args={[0.3, 0.35, 8]} />
              <meshBasicMaterial color="#7f00ff" toneMapped={false} />
            </mesh>
          </RigidBody>
        </group>
      )}

      {/* Ambient Obstacles: Floating Low-Poly Crystals for immersive atmosphere */}
      <group position={[-15, 1, 0]}>
        <mesh>
          <octahedronGeometry args={[0.6, 0]} />
          <meshStandardMaterial color="#7f00ff" roughness={0.1} emissive="#7f00ff" emissiveIntensity={0.2} />
        </mesh>
      </group>
      <group position={[15, 1.2, 2]}>
        <mesh>
          <octahedronGeometry args={[0.8, 0]} />
          <meshStandardMaterial color="#00f2fe" roughness={0.1} emissive="#00f2fe" emissiveIntensity={0.2} />
        </mesh>
      </group>
    </>
  );
};
