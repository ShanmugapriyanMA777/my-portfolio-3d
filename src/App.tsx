import React from 'react';
import { GameProvider } from './context/GameContext';
import { GameCanvas } from './components/GameCanvas';
import { HUD } from './components/UI/HUD';
import { LoadingScreen } from './components/UI/LoadingScreen';
import { CardModal } from './components/UI/CardModal';
import { Toast } from './components/UI/Toast';
import { CustomJoystick } from './components/CustomJoystick';
import { useAudio } from './hooks/useAudio';

const GameAppContent: React.FC = () => {
  // Synthesizes BGM and sound FX loops
  useAudio();

  return (
    <div className="w-full h-full relative overflow-hidden bg-[#03000d]">
      {/* 3D R3F Canvas */}
      <GameCanvas />

      {/* Virtual Joystick for Mobile Devices */}
      <CustomJoystick />

      {/* UI Overlays */}
      <HUD />
      <CardModal />
      <Toast />
      <LoadingScreen />
    </div>
  );
};

export default function App() {
  return (
    <GameProvider>
      <GameAppContent />
    </GameProvider>
  );
}
