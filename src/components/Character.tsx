import React, { useRef, useState } from 'react';
import { useFrame } from '@react-three/fiber';
import { RigidBody, RapierRigidBody, CapsuleCollider } from '@react-three/rapier';
import { useKeyboard } from '../hooks/useKeyboard';
import { useGame } from '../context/GameContext';
import * as THREE from 'three';

export const Character: React.FC = () => {
  const rigidBodyRef = useRef<RapierRigidBody>(null);
  const robotMeshRef = useRef<THREE.Group>(null);
  const headRef = useRef<THREE.Mesh>(null);
  
  const keyboard = useKeyboard();
  const { joystickActive, joystickVector, triggerSound } = useGame();
  
  const speed = 7.5;
  const jumpForce = 6.0;
  const [footstepTimer, setFootstepTimer] = useState(0);

  // Character movement and camera follow updates inside render loop
  useFrame((state, delta) => {
    if (!rigidBodyRef.current) return;

    // 1. Get positions
    const pos = rigidBodyRef.current.translation();
    const velocity = rigidBodyRef.current.linvel();

    // 2. Ground detection (simple velocity and height check)
    const currentOnGround = Math.abs(velocity.y) < 0.1 && pos.y < 1.05;

    // 3. Process movement vectors
    let moveX = 0;
    let moveZ = 0;

    if (joystickActive) {
      // Mobile touch joystick
      moveX = joystickVector.x;
      moveZ = joystickVector.y; // joystick Y controls forward/backward (Z world space)
    } else {
      // Keyboard WASD
      if (keyboard.moveForward) moveZ -= 1;
      if (keyboard.moveBackward) moveZ += 1;
      if (keyboard.moveLeft) moveX -= 1;
      if (keyboard.moveRight) moveX += 1;
    }

    // Normalize movement vector to avoid diagonal speed boost
    const moveVector = new THREE.Vector3(moveX, 0, moveZ);
    if (moveVector.lengthSq() > 0.01) {
      moveVector.normalize();
    }

    // Apply movement speeds
    const targetVelX = moveVector.x * speed;
    const targetVelZ = moveVector.z * speed;
    
    // Jump mechanics
    let targetVelY = velocity.y;
    if (keyboard.jump && currentOnGround) {
      targetVelY = jumpForce;
      triggerSound('click'); // Play jump sound trigger
    }

    // Update rigid body velocity
    rigidBodyRef.current.setLinvel(
      { x: targetVelX, y: targetVelY, z: targetVelZ },
      true
    );

    // 4. Character mesh rotation & bobbing animations
    if (robotMeshRef.current && (Math.abs(targetVelX) > 0.1 || Math.abs(targetVelZ) > 0.1)) {
      // Rotate mesh to face direction of travel
      const targetAngle = Math.atan2(targetVelX, targetVelZ);
      robotMeshRef.current.rotation.y = THREE.MathUtils.lerp(
        robotMeshRef.current.rotation.y,
        targetAngle,
        0.15
      );

      // Character body running bobbing animation
      const time = state.clock.getElapsedTime();
      robotMeshRef.current.position.y = Math.sin(time * 15) * 0.08;
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 15) * 0.05;
      }

      // Footstep sound triggers
      if (currentOnGround) {
        const nextTimer = footstepTimer + delta;
        if (nextTimer > 0.35) {
          triggerSound('footstep');
          setFootstepTimer(0);
        } else {
          setFootstepTimer(nextTimer);
        }
      }
    } else if (robotMeshRef.current) {
      // Idle bobbing
      const time = state.clock.getElapsedTime();
      robotMeshRef.current.position.y = Math.sin(time * 3) * 0.04;
      if (headRef.current) {
        headRef.current.rotation.x = Math.sin(time * 3) * 0.02;
      }
    }

    // 5. Cinematic Third-Person Camera follow with lag (lerp)
    const cameraOffset = new THREE.Vector3(0, 10, 11); // camera relative to player
    const targetCamX = pos.x + cameraOffset.x;
    const targetCamY = pos.y + cameraOffset.y;
    const targetCamZ = pos.z + cameraOffset.z;

    state.camera.position.x += (targetCamX - state.camera.position.x) * 0.06;
    state.camera.position.y += (targetCamY - state.camera.position.y) * 0.06;
    state.camera.position.z += (targetCamZ - state.camera.position.z) * 0.06;
    
    // Camera looks slightly ahead of player (at player body level)
    state.camera.lookAt(pos.x, pos.y + 0.8, pos.z);
  });

  return (
    <RigidBody
      ref={rigidBodyRef}
      colliders={false}
      position={[0, 1, 0]}
      enabledRotations={[false, false, false]} // Lock tipping rotations
      name="player"
      friction={0.2}
    >
      {/* Real capsule collider for physical presence */}
      <CapsuleCollider args={[0.45, 0.3]} position={[0, 0.75, 0]} />

      {/* Procedural Low-Poly Robot Character */}
      <group ref={robotMeshRef}>
        
        {/* Legs / Hover Thruster */}
        <mesh position={[0, 0.1, 0]}>
          <cylinderGeometry args={[0.25, 0.15, 0.3, 8]} />
          <meshStandardMaterial color="#7f00ff" roughness={0.4} metalness={0.2} />
        </mesh>
        {/* Thruster Glow */}
        <mesh position={[0, -0.08, 0]}>
          <cylinderGeometry args={[0.12, 0.01, 0.1, 8]} />
          <meshBasicMaterial color="#00f2fe" toneMapped={false} />
        </mesh>
        
        {/* Torso / Body */}
        <mesh position={[0, 0.55, 0]}>
          <boxGeometry args={[0.7, 0.6, 0.5]} />
          <meshStandardMaterial color="#1a1a2e" roughness={0.3} metalness={0.8} />
        </mesh>
        {/* Chest Plate / Neon Logo */}
        <mesh position={[0, 0.55, 0.26]}>
          <boxGeometry args={[0.4, 0.3, 0.02]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} />
        </mesh>

        {/* Head */}
        <mesh ref={headRef} position={[0, 1.05, 0]}>
          <boxGeometry args={[0.45, 0.4, 0.4]} />
          <meshStandardMaterial color="#1f2028" roughness={0.3} metalness={0.8} />
        </mesh>
        
        {/* Visor / Eyes (Glowing Emissive Neon Cyan) */}
        <mesh position={[0, 1.05, 0.21]}>
          <boxGeometry args={[0.35, 0.12, 0.02]} />
          <meshBasicMaterial color="#00f2fe" toneMapped={false} />
        </mesh>

        {/* Antennas */}
        <mesh position={[0.15, 1.3, -0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} />
          <meshStandardMaterial color="#7f00ff" />
        </mesh>
        <mesh position={[0.15, 1.4, -0.1]}>
          <sphereGeometry args={[0.04, 4, 4]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} />
        </mesh>
        <mesh position={[-0.15, 1.3, -0.1]}>
          <cylinderGeometry args={[0.02, 0.02, 0.2, 4]} />
          <meshStandardMaterial color="#7f00ff" />
        </mesh>
        <mesh position={[-0.15, 1.4, -0.1]}>
          <sphereGeometry args={[0.04, 4, 4]} />
          <meshBasicMaterial color="#ec008c" toneMapped={false} />
        </mesh>
      </group>
    </RigidBody>
  );
};
