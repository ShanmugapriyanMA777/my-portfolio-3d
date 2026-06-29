import React, { useState } from 'react';
import { useGame, ACHIEVEMENTS_LIST } from '../../context/GameContext';
import { Volume2, VolumeX, Sun, Moon, Trophy, Compass, HelpCircle, X, Award } from 'lucide-react';

export const HUD: React.FC = () => {
  const {
    dayMode,
    setDayMode,
    audioEnabled,
    setAudioEnabled,
    currentZone,
    achievementsUnlocked,
    triggerSound,
  } = useGame();

  const [showAchievements, setShowAchievements] = useState(false);
  const [showHelp, setShowHelp] = useState(false);

  const toggleSound = () => {
    // We play a click sound, but wait, if sound is about to be disabled we can play a click, if it is enabled, we toggle.
    setAudioEnabled(!audioEnabled);
  };

  const toggleDayMode = () => {
    triggerSound('click');
    setDayMode(!dayMode);
  };

  const zoneNames: Record<string, string> = {
    home: '🏠 Spawn Point / Lobby',
    about: '👨‍💻 Cyber Terminal (About)',
    skills: '🛠 Tech Matrix (Skills)',
    projects: '📂 Holographic Podium (Projects)',
    certifications: '🏆 Credentials Room (Certificates)',
    achievements: '📈 Performance Core (Achievements)',
    contact: '📞 Postbox Terminal (Contact)',
    none: '🌍 Cyberspace Grid',
  };

  const currentZoneDisplay = zoneNames[currentZone] || zoneNames.none;

  return (
    <>
      {/* HUD Container */}
      <div className="absolute inset-0 pointer-events-none z-30 flex flex-col justify-between p-4 md:p-6 select-none">
        
        {/* TOP BAR */}
        <div className="w-full flex justify-between items-start">
          {/* Active Zone Display */}
          <div className="pointer-events-auto glass-neon-cyan px-4 py-2.5 rounded-lg flex items-center gap-3 animate-float max-w-xs md:max-w-md">
            <div className="relative">
              <Compass className={`w-5 h-5 text-cyber-neonCyan ${currentZone !== 'none' ? 'animate-spin-slow' : ''}`} />
              <div className="absolute -inset-1 border border-cyan-400/20 rounded-full animate-ping opacity-30" />
            </div>
            <div>
              <div className="text-[10px] text-gray-500 font-mono tracking-widest uppercase">CURRENT SECTOR</div>
              <div className="text-sm font-semibold text-white tracking-wide truncate">{currentZoneDisplay}</div>
            </div>
          </div>

          {/* Quick Settings Toggles */}
          <div className="pointer-events-auto flex items-center gap-3">
            {/* Help Button */}
            <button
              onClick={() => { triggerSound('click'); setShowHelp(true); }}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-gray-400 hover:text-white hover:border-cyber-neonCyan/40 hover:shadow-neon-cyan transition-all"
              title="Help & Controls"
            >
              <HelpCircle className="w-5 h-5" />
            </button>

            {/* Achievements Button */}
            <button
              onClick={() => { triggerSound('click'); setShowAchievements(true); }}
              className={`w-10 h-10 rounded-lg glass flex items-center justify-center relative ${
                achievementsUnlocked.length > 0
                  ? 'text-yellow-400 border-yellow-500/30 shadow-neon-purple hover:border-yellow-400'
                  : 'text-gray-400 hover:text-white'
              } transition-all`}
              title="Achievements"
            >
              <Trophy className="w-5 h-5" />
              {achievementsUnlocked.length > 0 && (
                <span className="absolute -top-1 -right-1 bg-yellow-500 text-black font-extrabold text-[10px] w-5 h-5 rounded-full flex items-center justify-center shadow-lg border border-black animate-pulse">
                  {achievementsUnlocked.length}
                </span>
              )}
            </button>

            {/* Day / Night Toggle */}
            <button
              onClick={toggleDayMode}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-cyber-neonCyan hover:text-white hover:border-cyber-neonCyan/40 hover:shadow-neon-cyan transition-all"
              title={dayMode ? 'Switch to Night Mode' : 'Switch to Day Mode'}
            >
              {dayMode ? <Sun className="w-5 h-5" /> : <Moon className="w-5 h-5 text-cyber-neonPurple" />}
            </button>

            {/* Audio Toggle */}
            <button
              onClick={toggleSound}
              className="w-10 h-10 rounded-lg glass flex items-center justify-center text-cyber-neonPink hover:text-white hover:border-cyber-neonPink/40 hover:shadow-neon-pink transition-all"
              title={audioEnabled ? 'Mute Audio' : 'Unmute Audio'}
            >
              {audioEnabled ? <Volume2 className="w-5 h-5" /> : <VolumeX className="w-5 h-5 text-gray-500" />}
            </button>
          </div>
        </div>

        {/* BOTTOM BAR */}
        <div className="w-full flex justify-between items-end">
          {/* Controls Helper (Desktop) */}
          <div className="hidden md:block pointer-events-auto glass px-4 py-2.5 rounded-lg text-xs font-mono text-gray-400 tracking-wider">
            <span className="text-cyber-neonCyan font-bold">W A S D</span> / <span className="text-cyber-neonCyan font-bold">ARROWS</span> to move • <span className="text-cyber-neonPurple font-bold">SPACE</span> to jump • Approach buildings to interact
          </div>

          {/* Interactive zone reminder when close */}
          {currentZone !== 'none' && (
            <div className="pointer-events-auto glass-neon-pink px-4 py-2.5 rounded-lg text-xs font-mono text-center animate-pulse text-white mx-auto md:mx-0">
              <span className="text-cyber-neonPink font-extrabold">🚨 PROXIMITY SIGNAL TRIGGERED</span>
              <p className="text-[10px] text-gray-300 mt-1">Interactive terminal has opened! Click outside card to exit.</p>
            </div>
          )}

          {/* Seyyonic Brand */}
          <div className="hidden sm:block pointer-events-auto glass-neon-purple px-4 py-2 rounded-lg text-right max-w-xxs">
            <div className="text-xxs text-gray-500 font-mono tracking-widest uppercase">FOUNDER SITE</div>
            <div className="text-xs font-semibold text-cyber-neonPurple">Seyyonic Intelligence</div>
          </div>
        </div>
      </div>

      {/* ACHIEVEMENTS DRAWER OVERLAY */}
      {showAchievements && (
        <div className="absolute inset-0 bg-black/60 backdrop-blur-md z-40 flex justify-end pointer-events-auto">
          <div className="w-full max-w-md h-full bg-[#050511] border-l border-cyan-500/20 p-6 flex flex-col justify-between shadow-2xl relative scanlines">
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050511]/90 to-[#050511]" />
            <div className="relative z-10 flex flex-col h-full">
              {/* Header */}
              <div className="flex justify-between items-center border-b border-cyan-900/30 pb-4 mb-6">
                <div className="flex items-center gap-2">
                  <Trophy className="w-6 h-6 text-yellow-400" />
                  <h2 className="text-xl font-bold text-white uppercase tracking-wider font-mono">Performance Core</h2>
                </div>
                <button
                  onClick={() => { triggerSound('click'); setShowAchievements(false); }}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              {/* Achievements stats */}
              <div className="mb-6 glass px-4 py-3 rounded-lg flex items-center justify-between">
                <div>
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider">SYNC COMPLETED</span>
                  <div className="text-2xl font-black text-cyber-neonCyan font-mono">
                    {Math.round((achievementsUnlocked.length / ACHIEVEMENTS_LIST.length) * 100)}%
                  </div>
                </div>
                <div className="text-right">
                  <span className="text-[10px] text-gray-500 font-mono tracking-wider">CORES UNLOCKED</span>
                  <div className="text-lg font-bold text-yellow-400 font-mono">
                    {achievementsUnlocked.length} / {ACHIEVEMENTS_LIST.length}
                  </div>
                </div>
              </div>

              {/* Achievements List */}
              <div className="flex-1 overflow-y-auto flex flex-col gap-3 pr-2">
                {ACHIEVEMENTS_LIST.map((ach) => {
                  const isUnlocked = achievementsUnlocked.includes(ach.id);
                  return (
                    <div
                      key={ach.id}
                      className={`p-3.5 rounded-lg border flex items-center gap-3.5 transition-all ${
                        isUnlocked
                          ? 'bg-purple-950/20 border-yellow-500/30 shadow-sm'
                          : 'bg-black/40 border-gray-900 opacity-50'
                      }`}
                    >
                      <div className={`w-11 h-11 rounded-full flex items-center justify-center text-2xl border ${
                        isUnlocked ? 'bg-yellow-500/10 border-yellow-500/40' : 'bg-gray-900 border-gray-800'
                      }`}>
                        {isUnlocked ? ach.icon : '🔒'}
                      </div>
                      <div className="flex-1 min-w-0">
                        <div className={`text-sm font-bold truncate ${isUnlocked ? 'text-white' : 'text-gray-500'}`}>
                          {ach.title}
                        </div>
                        <div className="text-xs text-gray-400 mt-0.5 line-clamp-2 leading-relaxed">
                          {ach.description}
                        </div>
                      </div>
                      {isUnlocked && (
                        <div className="text-[10px] font-bold text-yellow-400 font-mono flex items-center gap-0.5 uppercase bg-yellow-500/10 px-1.5 py-0.5 rounded border border-yellow-500/20">
                          <Award className="w-3 h-3" />
                          UNLOCKED
                        </div>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Footer */}
              <div className="border-t border-cyan-900/30 pt-4 mt-6 text-center text-xxs text-gray-500 font-mono">
                FIND HIDDEN GLOWING ORBS IN THE MATRIX TO UNLOCK ALL CORES
              </div>
            </div>
          </div>
        </div>
      )}

      {/* HELP MODAL OVERLAY */}
      {showHelp && (
        <div className="absolute inset-0 bg-black/70 backdrop-blur-md z-40 flex items-center justify-center p-4 pointer-events-auto">
          <div className="w-full max-w-md bg-[#050511] border border-cyan-500/20 rounded-xl p-6 relative shadow-2xl scanlines">
            <div className="absolute inset-0 bg-radial-gradient from-transparent via-[#050511]/90 to-[#050511]" />
            <div className="relative z-10">
              <div className="flex justify-between items-center border-b border-cyan-900/30 pb-3 mb-4">
                <div className="flex items-center gap-2">
                  <HelpCircle className="w-5 h-5 text-cyber-neonCyan" />
                  <h3 className="font-bold text-lg text-white uppercase tracking-wider font-mono">Grid Exploration Manual</h3>
                </div>
                <button
                  onClick={() => { triggerSound('click'); setShowHelp(false); }}
                  className="p-1 rounded-full hover:bg-white/10 text-gray-400 hover:text-white transition-colors"
                >
                  <X className="w-5 h-5" />
                </button>
              </div>

              <div className="space-y-4 text-sm leading-relaxed text-gray-300">
                <div>
                  <h4 className="font-bold text-cyber-neonPurple text-xs uppercase tracking-wider mb-2 font-mono">🕹 Keyboard Controls (Desktop)</h4>
                  <ul className="list-disc list-inside space-y-1 text-xs text-gray-400 pl-1 font-mono">
                    <li><strong className="text-white">W / Arrow Up</strong>: Move Forward</li>
                    <li><strong className="text-white">S / Arrow Down</strong>: Move Backward</li>
                    <li><strong className="text-white">A / Arrow Left</strong>: Strafe Left</li>
                    <li><strong className="text-white">D / Arrow Right</strong>: Strafe Right</li>
                    <li><strong className="text-white">SPACEBAR</strong>: Jump</li>
                  </ul>
                </div>

                <div>
                  <h4 className="font-bold text-cyber-neonCyan text-xs uppercase tracking-wider mb-2 font-mono">📱 Mobile Controls</h4>
                  <p className="text-xs text-gray-400 font-mono">
                    A virtual joystick will appear in the bottom left on touch devices. Drag the joystick node to steer the avatar, and tap the screen button to jump.
                  </p>
                </div>

                <div>
                  <h4 className="font-bold text-cyber-neonPink text-xs uppercase tracking-wider mb-2 font-mono">💡 Interactive Matrix</h4>
                  <p className="text-xs text-gray-400 leading-relaxed font-mono">
                    Move your character close to glowing cyberpunk skyscrapers and grid terminals to launch their info console interfaces. Move away or press close to collapse them. Locate the secret Seyyonic Intelligence sphere for a special achievement!
                  </p>
                </div>
              </div>

              <button
                onClick={() => { triggerSound('click'); setShowHelp(false); }}
                className="mt-6 w-full py-2.5 glass-neon-cyan text-cyan-400 font-semibold rounded-lg hover:bg-cyber-neonCyan hover:text-black transition-all text-xs font-mono"
              >
                DISMISS PROTOCOL
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
