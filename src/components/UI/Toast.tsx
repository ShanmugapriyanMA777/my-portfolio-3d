import React, { useEffect, useState } from 'react';
import { useGame, ACHIEVEMENTS_LIST, type Achievement } from '../../context/GameContext';
import { AnimatePresence, motion } from 'framer-motion';
import { Trophy, Award } from 'lucide-react';

export const Toast: React.FC = () => {
  const { achievementsUnlocked } = useGame();
  const [currentToast, setCurrentToast] = useState<Achievement | null>(null);
  const [displayedIds, setDisplayedIds] = useState<string[]>([]);

  useEffect(() => {
    // Check if there are newly unlocked achievements that haven't been shown yet
    const newUnlock = achievementsUnlocked.find(id => !displayedIds.includes(id));
    
    if (newUnlock) {
      const ach = ACHIEVEMENTS_LIST.find(a => a.id === newUnlock);
      if (ach) {
        setCurrentToast(ach);
        setDisplayedIds(prev => [...prev, newUnlock]);
        
        // Hide after 4 seconds
        const timer = setTimeout(() => {
          setCurrentToast(null);
        }, 4000);
        
        return () => clearTimeout(timer);
      }
    }
  }, [achievementsUnlocked, displayedIds]);

  return (
    <div className="absolute top-20 right-4 z-50 pointer-events-none select-none max-w-sm w-full">
      <AnimatePresence>
        {currentToast && (
          <motion.div
            initial={{ opacity: 0, x: 100, y: -20, scale: 0.9 }}
            animate={{ opacity: 1, x: 0, y: 0, scale: 1 }}
            exit={{ opacity: 0, x: 50, scale: 0.95 }}
            transition={{ type: 'spring', stiffness: 300, damping: 25 }}
            className="pointer-events-auto w-full p-4 rounded-xl border border-yellow-500/30 bg-[#050511]/90 shadow-2xl glass-neon-purple flex items-start gap-4 cursor-pointer scanlines"
          >
            <div className="w-12 h-12 rounded-full bg-yellow-500/10 border border-yellow-500/30 flex items-center justify-center text-3xl shrink-0">
              {currentToast.icon}
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex items-center gap-1.5 text-yellow-400 font-bold text-xs uppercase font-mono tracking-wider">
                <Trophy className="w-3.5 h-3.5" />
                ACHIEVEMENT UNLOCKED!
              </div>
              <h4 className="font-bold text-white text-sm font-mono mt-1 tracking-wide truncate">
                {currentToast.title}
              </h4>
              <p className="text-xs text-gray-400 mt-1 leading-relaxed">
                {currentToast.description}
              </p>
            </div>
            <div className="text-[9px] font-bold text-yellow-400 font-mono flex items-center gap-0.5 uppercase bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20 shrink-0 self-start">
              <Award className="w-3 h-3" />
              CORE
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};
