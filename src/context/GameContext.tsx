import React, { createContext, useContext, useState, useEffect, useCallback, useRef } from 'react';

export type ZoneType = 'home' | 'about' | 'skills' | 'projects' | 'certifications' | 'achievements' | 'contact' | 'none';

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
}

export const ACHIEVEMENTS_LIST: Achievement[] = [
  { id: 'first_steps', title: 'First Steps', description: 'Explore the 3D grid environment.', icon: '🚶‍♂️' },
  { id: 'explorer', title: 'World Explorer', description: 'Visit all 7 interactive zones.', icon: '🌍' },
  { id: 'creator', title: 'Project Enthusiast', description: 'Review the project showcase.', icon: '🤖' },
  { id: 'certified', title: 'AI & Data Specialist', description: 'Inspect the credentials wall.', icon: '📜' },
  { id: 'egg_hunter', title: 'Seyyonic Intelligence Orb', description: 'Found the hidden Seyyonic Intelligence glowing core!', icon: '✨' },
];

interface GameContextType {
  dayMode: boolean;
  setDayMode: (mode: boolean) => void;
  audioEnabled: boolean;
  setAudioEnabled: (enabled: boolean) => void;
  currentZone: ZoneType;
  setCurrentZone: (zone: ZoneType) => void;
  activeModal: string | null;
  setActiveModal: (modal: string | null) => void;
  modalData: any;
  setModalData: (data: any) => void;
  achievementsUnlocked: string[];
  unlockAchievement: (id: string) => void;
  visitedZones: Set<string>;
  triggerSound: (soundName: string) => void;
  registerSoundTrigger: (trigger: (soundName: string) => void) => void;
  joystickActive: boolean;
  setJoystickActive: (active: boolean) => void;
  joystickVector: { x: number; y: number };
  setJoystickVector: (vec: { x: number; y: number }) => void;
}

const GameContext = createContext<GameContextType | undefined>(undefined);

export const GameProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [dayMode, setDayMode] = useState<boolean>(false);
  const [audioEnabled, setAudioEnabled] = useState<boolean>(false);
  const [currentZone, setCurrentZone] = useState<ZoneType>('none');
  const [activeModal, setActiveModal] = useState<string | null>(null);
  const [modalData, setModalData] = useState<any>(null);
  const [achievementsUnlocked, setAchievementsUnlocked] = useState<string[]>([]);
  const [visitedZones, setVisitedZones] = useState<Set<string>>(new Set(['home']));
  const [joystickActive, setJoystickActive] = useState<boolean>(false);
  const [joystickVector, setJoystickVector] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  
  // A callback ref to play sound from UI or game events (eliminates render loops)
  const soundTriggerRef = useRef<((soundName: string) => void) | null>(null);

  const registerSoundTrigger = useCallback((trigger: (soundName: string) => void) => {
    soundTriggerRef.current = trigger;
  }, []);

  const triggerSound = useCallback((soundName: string) => {
    if (audioEnabled && soundTriggerRef.current) {
      soundTriggerRef.current(soundName);
    }
  }, [audioEnabled]);

  const unlockAchievement = useCallback((id: string) => {
    setAchievementsUnlocked((prev) => {
      if (!prev.includes(id)) {
        // Trigger achievement sound asynchronously to prevent React warning/cycles
        setTimeout(() => triggerSound('achievement'), 0);
        return [...prev, id];
      }
      return prev;
    });
  }, [triggerSound]);

  // Track visited zones to trigger 'Explorer' achievement
  useEffect(() => {
    if (currentZone !== 'none' && currentZone !== 'home') {
      const updated = new Set(visitedZones);
      updated.add(currentZone);
      setVisitedZones(updated);
      
      // If visited all 7 zones
      const targetZones = ['home', 'about', 'skills', 'projects', 'certifications', 'achievements', 'contact'];
      const hasAll = targetZones.every(z => updated.has(z));
      if (hasAll) {
        unlockAchievement('explorer');
      }
    }
  }, [currentZone]);

  // Unlock "First Steps" when game starts and they move
  useEffect(() => {
    if (visitedZones.size > 1) {
      unlockAchievement('first_steps');
    }
  }, [visitedZones]);

  return (
    <GameContext.Provider
      value={{
        dayMode,
        setDayMode,
        audioEnabled,
        setAudioEnabled,
        currentZone,
        setCurrentZone,
        activeModal,
        setActiveModal,
        modalData,
        setModalData,
        achievementsUnlocked,
        unlockAchievement,
        visitedZones,
        triggerSound,
        registerSoundTrigger,
        joystickActive,
        setJoystickActive,
        joystickVector,
        setJoystickVector,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};

export const useGame = () => {
  const context = useContext(GameContext);
  if (!context) {
    throw new Error('useGame must be used within a GameProvider');
  }
  return context;
};
