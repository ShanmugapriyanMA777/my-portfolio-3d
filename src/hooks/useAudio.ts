import { useEffect } from 'react';
import { useGame } from '../context/GameContext';

class SoundSynthesizer {
  private ctx: AudioContext | null = null;
  private bgmOscs: (OscillatorNode | GainNode)[] = [];
  private isBgmPlaying = false;
  private schedulerTimer: number | null = null;
  private tempo = 100; // BPM
  private currentBeat = 0;
  private filterNode: BiquadFilterNode | null = null;

  constructor() {
    // AudioContext will be initialized on first user interaction
  }

  private initContext() {
    if (!this.ctx) {
      this.ctx = new (window.AudioContext || (window as any).webkitAudioContext)();
    }
    if (this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  playClick() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(800, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(150, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playHover() {
    this.initContext();
    if (!this.ctx) return;

    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'triangle';
    osc.frequency.setValueAtTime(300, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(600, this.ctx.currentTime + 0.08);

    gain.gain.setValueAtTime(0.02, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.08);
  }

  playFootstep() {
    this.initContext();
    if (!this.ctx) return;

    // A low thud combined with brief bandpassed noise
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc.type = 'sine';
    osc.frequency.setValueAtTime(90, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.1);

    gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.1);

    osc.connect(gain);
    gain.connect(this.ctx.destination);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.1);
  }

  playZoneEntry() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    
    // Low sweeping pad
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const filter = this.ctx.createBiquadFilter();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(110, now); // A2
    osc1.frequency.exponentialRampToValueAtTime(220, now + 1.2);

    osc2.type = 'sawtooth';
    osc2.frequency.setValueAtTime(110.5, now);
    osc2.frequency.exponentialRampToValueAtTime(221, now + 1.2);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, now);
    filter.frequency.exponentialRampToValueAtTime(1200, now + 0.8);
    filter.frequency.exponentialRampToValueAtTime(300, now + 1.2);
    filter.Q.value = 5;

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.08, now + 0.3);
    gain.gain.exponentialRampToValueAtTime(0.001, now + 1.2);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.ctx.destination);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + 1.2);
    osc2.stop(now + 1.2);
  }

  playAchievement() {
    this.initContext();
    if (!this.ctx) return;

    const now = this.ctx.currentTime;
    const notes = [261.63, 329.63, 392.00, 523.25, 659.25, 783.99, 1046.50]; // C4, E4, G4, C5, E5, G5, C6 (major arpeggio)
    
    notes.forEach((freq, index) => {
      const osc = this.ctx!.createOscillator();
      const gain = this.ctx!.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(freq, now + index * 0.1);
      
      gain.gain.setValueAtTime(0, now);
      gain.gain.setValueAtTime(0, now + index * 0.1);
      gain.gain.linearRampToValueAtTime(0.06, now + index * 0.1 + 0.05);
      gain.gain.exponentialRampToValueAtTime(0.001, now + index * 0.1 + 0.4);

      osc.connect(gain);
      gain.connect(this.ctx!.destination);

      osc.start(now + index * 0.1);
      osc.stop(now + index * 0.1 + 0.5);
    });
  }

  startBgm() {
    this.initContext();
    if (!this.ctx || this.isBgmPlaying) return;
    this.isBgmPlaying = true;
    this.currentBeat = 0;

    // Create a filter to warm up the BGM sound
    this.filterNode = this.ctx.createBiquadFilter();
    this.filterNode.type = 'lowpass';
    this.filterNode.frequency.setValueAtTime(600, this.ctx.currentTime);
    this.filterNode.Q.value = 1;
    this.filterNode.connect(this.ctx.destination);

    // BGM Scheduler loop
    const scheduleNextBeats = () => {
      const secondsPerBeat = 60.0 / this.tempo;
      const stepDuration = secondsPerBeat / 2; // 8th notes
      
      const now = this.ctx!.currentTime;
      this.playBgmStep(this.currentBeat, now);
      
      this.currentBeat = (this.currentBeat + 1) % 16;
      this.schedulerTimer = window.setTimeout(scheduleNextBeats, stepDuration * 1000);
    };

    scheduleNextBeats();
  }

  stopBgm() {
    if (this.schedulerTimer) {
      clearTimeout(this.schedulerTimer);
      this.schedulerTimer = null;
    }
    this.isBgmPlaying = false;
    // Clean up nodes
    this.bgmOscs.forEach(node => {
      try {
        if ('stop' in node) {
          node.stop();
        }
      } catch (e) {
        // Suppress errors
      }
    });
    this.bgmOscs = [];
  }

  private playBgmStep(beat: number, time: number) {
    if (!this.ctx || !this.filterNode) return;

    // Cyberpunk Synth Bassline: 16-step loop
    // Notes: C2 (65Hz), Eb2 (77Hz), G2 (98Hz), Bb2 (116Hz)
    const scale = [65.41, 65.41, 77.78, 77.78, 97.99, 97.99, 116.54, 97.99, 
                   65.41, 65.41, 77.78, 77.78, 97.99, 116.54, 130.81, 116.54];
    
    const bassNote = scale[beat];
    
    // Play a dual oscillator saw-wave bass synth
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();

    osc1.type = 'sawtooth';
    osc1.frequency.setValueAtTime(bassNote, time);

    osc2.type = 'square';
    osc2.frequency.setValueAtTime(bassNote * 1.005, time); // detune slightly

    gain.gain.setValueAtTime(0, time);
    gain.gain.linearRampToValueAtTime(0.04, time + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.001, time + 0.25);

    osc1.connect(gain);
    osc2.connect(gain);
    gain.connect(this.filterNode);

    osc1.start(time);
    osc2.start(time);
    osc1.stop(time + 0.3);
    osc2.stop(time + 0.3);

    // Slowly modulate the filter for standard synthwave "wow" effect
    const lfoVal = Math.sin(time * 0.5) * 200 + 550;
    this.filterNode.frequency.setValueAtTime(lfoVal, time);

    // Add a soft high-hat/synth-tick on beat offsets (beats 2, 6, 10, 14)
    if (beat % 4 === 2) {
      const tickOsc = this.ctx.createOscillator();
      const tickGain = this.ctx.createGain();
      tickOsc.type = 'sine';
      tickOsc.frequency.setValueAtTime(10000, time);
      tickGain.gain.setValueAtTime(0.003, time);
      tickGain.gain.exponentialRampToValueAtTime(0.0001, time + 0.04);
      tickOsc.connect(tickGain);
      tickGain.connect(this.ctx.destination);
      tickOsc.start(time);
      tickOsc.stop(time + 0.05);
    }
  }
}

const synthInstance = new SoundSynthesizer();

export const useAudio = () => {
  const { audioEnabled, registerSoundTrigger } = useGame();

  useEffect(() => {
    // Register the sound trigger callback in game context
    registerSoundTrigger((soundName: string) => {
      switch (soundName) {
        case 'click':
          synthInstance.playClick();
          break;
        case 'hover':
          synthInstance.playHover();
          break;
        case 'footstep':
          synthInstance.playFootstep();
          break;
        case 'zoneEntry':
          synthInstance.playZoneEntry();
          break;
        case 'achievement':
          synthInstance.playAchievement();
          break;
      }
    });
  }, [audioEnabled, registerSoundTrigger]);

  useEffect(() => {
    if (audioEnabled) {
      synthInstance.startBgm();
    } else {
      synthInstance.stopBgm();
    }
    return () => {
      synthInstance.stopBgm();
    };
  }, [audioEnabled]);

  return {
    playClick: () => audioEnabled && synthInstance.playClick(),
    playHover: () => audioEnabled && synthInstance.playHover(),
    playFootstep: () => audioEnabled && synthInstance.playFootstep(),
    playZoneEntry: () => audioEnabled && synthInstance.playZoneEntry(),
    playAchievement: () => audioEnabled && synthInstance.playAchievement(),
  };
};
