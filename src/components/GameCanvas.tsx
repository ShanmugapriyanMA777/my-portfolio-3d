import React, { Suspense } from 'react';
import { Canvas } from '@react-three/fiber';
import { Physics } from '@react-three/rapier';
import { Environment3D } from './Environment3D';
import { Character } from './Character';
import { HomeZone } from './Zones/HomeZone';
import { AboutZone } from './Zones/AboutZone';
import { SkillsZone } from './Zones/SkillsZone';
import { ProjectsZone } from './Zones/ProjectsZone';
import { CertificationsZone } from './Zones/CertificationsZone';
import { AchievementsZone } from './Zones/AchievementsZone';
import { ContactZone } from './Zones/ContactZone';

export const GameCanvas: React.FC = () => {
  return (
    <div className="w-full h-full relative">
      <Canvas
        shadows
        camera={{
          fov: 42,
          near: 0.1,
          far: 200,
          position: [0, 12, 16], // Starting camera position (third-person view)
        }}
      >
        <Suspense fallback={null}>
          {/* Rapier Physics Loop */}
          <Physics gravity={[0, -18, 0]} timeStep="vary">
            
            {/* Environment (Ground, Sky, Fog, Lights, Easter Egg) */}
            <Environment3D />

            {/* Controllable Player Character & Camera Follower */}
            <Character />

            {/* Interactive World Sections */}
            <HomeZone />
            <AboutZone />
            <SkillsZone />
            <ProjectsZone />
            <CertificationsZone />
            <AchievementsZone />
            <ContactZone />

          </Physics>
        </Suspense>
      </Canvas>
    </div>
  );
};
