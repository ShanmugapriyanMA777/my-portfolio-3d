import React, { useEffect, useState } from 'react';
import { useProgress } from '@react-three/drei';
import { useGame } from '../../context/GameContext';
import { Terminal, Shield, Zap } from 'lucide-react';

export const LoadingScreen: React.FC = () => {
  const { progress } = useProgress();
  const { setAudioEnabled } = useGame();
  const [isFinished, setIsFinished] = useState(false);
  const [logs, setLogs] = useState<string[]>([]);
  const [fadeOut, setFadeOut] = useState(false);

  useEffect(() => {
    const startupLogs = [
      'Initializing Seyyonic Intelligence grid...',
      'Mapping neural coordinate system...',
      'Loading low-poly physics boundaries...',
      'Compiling neon shaders...',
      'Connecting to Google Gemini API cluster...',
      'Syncing digital portfolio assets...',
      'System ready. Launch sequence initialized.'
    ];

    let timer: any;
    const addLog = (index: number) => {
      if (index < startupLogs.length) {
        setLogs((prev) => [...prev, startupLogs[index]]);
        timer = setTimeout(() => addLog(index + 1), 250);
      }
    };

    addLog(0);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (progress === 100 && logs.length >= 7) {
      setTimeout(() => {
        setIsFinished(true);
      }, 500);
    }
  }, [progress, logs]);

  const handleStart = (enableSound: boolean) => {
    setAudioEnabled(enableSound);
    setFadeOut(true);
  };

  if (fadeOut) return null;

  return (
    <div
      className={`fixed inset-0 z-50 flex flex-col items-center justify-center bg-[#030012] transition-opacity duration-1000 ${
        isFinished && fadeOut ? 'opacity-0 pointer-events-none' : 'opacity-100'
      }`}
    >
      {/* Cinematic grid lines in background */}
      <div className="absolute inset-0 bg-[linear-gradient(to_right,#11112b_1px,transparent_1px),linear-gradient(to_bottom,#11112b_1px,transparent_1px)] bg-[size:4rem_4rem] opacity-20" />
      <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#030012]/80 to-[#030012]" />

      <div className="relative z-10 flex flex-col items-center max-w-lg w-full px-6">
        {/* Holographic Logo */}
        <div className="relative mb-8 flex items-center justify-center w-24 h-24 rounded-full border border-cyber-neonCyan/30 bg-cyber-neonCyan/5 animate-pulse-slow shadow-neon-cyan">
          <Shield className="w-12 h-12 text-cyber-neonCyan" />
          <div className="absolute -inset-1 border border-cyber-neonPurple/20 rounded-full animate-spin-slow" />
        </div>

        {/* Title */}
        <h1 className="text-3xl font-extrabold tracking-widest text-center uppercase bg-clip-text text-transparent bg-gradient-to-r from-cyber-neonCyan via-cyber-neonPurple to-cyber-neonPink animate-pulse-slow">
          SEYYONIC PORTFOLIO
        </h1>
        <p className="text-xs tracking-widest text-cyan-400/70 mb-8 font-mono">
          VIRTUAL 3D ENVIRONMENT v1.2.0
        </p>

        {/* Terminal Boot logs */}
        <div className="w-full h-40 bg-[#060417] border border-cyan-900/30 rounded-lg p-4 font-mono text-xs text-cyan-500/80 mb-6 overflow-hidden scanlines">
          <div className="flex items-center gap-1.5 border-b border-cyan-900/30 pb-2 mb-2">
            <Terminal className="w-3.5 h-3.5" />
            <span>CONSOLE LOGS</span>
          </div>
          <div className="flex flex-col gap-1 overflow-y-auto h-28 select-text">
            {logs.map((log, idx) => (
              <div key={idx} className="flex gap-1">
                <span className="text-cyber-neonPurple font-bold">&gt;</span>
                <span>{log}</span>
              </div>
            ))}
            {progress < 100 && (
              <div className="flex items-center gap-2 mt-2">
                <div className="w-3 h-3 bg-cyan-400 rounded-full animate-ping" />
                <span className="text-cyan-300">Loading resources... {Math.round(progress)}%</span>
              </div>
            )}
          </div>
        </div>

        {/* Action Button */}
        {isFinished ? (
          <div className="flex flex-col items-center gap-4 w-full animate-fade-in">
            <p className="text-sm font-semibold text-purple-300/80 animate-bounce">
              Digital Matrix Loaded Successfully!
            </p>
            <div className="flex gap-4 w-full justify-center">
              <button
                onClick={() => handleStart(true)}
                className="flex-1 py-3 px-6 glass-neon-cyan text-cyan-400 text-sm font-semibold rounded-lg hover:bg-cyber-neonCyan hover:text-black transition-all duration-300 transform hover:scale-105 active:scale-95 shadow-neon-cyan flex items-center justify-center gap-2"
              >
                <Zap className="w-4 h-4" />
                ENTER WITH MUSIC
              </button>
              <button
                onClick={() => handleStart(false)}
                className="py-3 px-6 glass-neon-purple text-purple-400 text-sm font-semibold rounded-lg hover:bg-cyber-neonPurple hover:text-white transition-all duration-300 transform hover:scale-105 active:scale-95 flex items-center justify-center gap-2"
              >
                ENTER SILENTLY
              </button>
            </div>
          </div>
        ) : (
          <div className="w-full">
            {/* Custom progress bar */}
            <div className="h-1.5 w-full bg-[#120e2e] rounded-full overflow-hidden border border-cyan-900/30">
              <div
                className="h-full bg-gradient-to-r from-cyber-neonCyan via-cyber-neonPurple to-cyber-neonPink transition-all duration-300"
                style={{ width: `${progress}%` }}
              />
            </div>
            <p className="text-center font-mono text-xxs text-gray-500 mt-2 tracking-widest">
              SYSTEM INITIALIZING
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
