/**
 * Web Audio API based sound synthesizer & ambient soundscape generator
 * Provides 100% offline, zero-network-dependency cinematic audio
 */

class AudioEngine {
  private ctx: AudioContext | null = null;
  private isMuted: boolean = false;
  private masterGain: GainNode | null = null;
  private musicGain: GainNode | null = null;
  private ambientGain: GainNode | null = null;
  private sfxGain: GainNode | null = null;

  // Active ambient nodes
  private currentAmbientNodes: { stop: () => void }[] = [];
  private currentMusicTimer: number | null = null;
  private currentMusicMood: string | null = null;

  public init() {
    if (this.ctx) return;
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      this.ctx = new AudioCtx();

      this.masterGain = this.ctx.createGain();
      this.masterGain.gain.setValueAtTime(0.85, this.ctx.currentTime);
      this.masterGain.connect(this.ctx.destination);

      this.musicGain = this.ctx.createGain();
      this.musicGain.gain.setValueAtTime(0.7, this.ctx.currentTime);
      this.musicGain.connect(this.masterGain);

      this.ambientGain = this.ctx.createGain();
      this.ambientGain.gain.setValueAtTime(0.5, this.ctx.currentTime);
      this.ambientGain.connect(this.masterGain);

      this.sfxGain = this.ctx.createGain();
      this.sfxGain.gain.setValueAtTime(0.8, this.ctx.currentTime);
      this.sfxGain.connect(this.masterGain);
    } catch {
      // Audio not supported or blocked
    }
  }

  public resume() {
    if (this.ctx && this.ctx.state === 'suspended') {
      this.ctx.resume();
    }
  }

  public setMuted(muted: boolean) {
    this.isMuted = muted;
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(muted ? 0 : 0.85, this.ctx.currentTime);
    }
  }

  public getMuted() {
    return this.isMuted;
  }

  public setVolume(volume: number) {
    if (this.masterGain && this.ctx) {
      this.masterGain.gain.setValueAtTime(this.isMuted ? 0 : volume, this.ctx.currentTime);
    }
  }

  // --- AMBIENCE GENERATORS ---

  public stopAmbience() {
    this.currentAmbientNodes.forEach(node => {
      try {
        node.stop();
      } catch {}
    });
    this.currentAmbientNodes = [];
  }

  public playAmbience(type: 'room_morning' | 'campus_day' | 'tea_shop' | 'rain' | 'evening_city' | 'silence') {
    this.stopAmbience();
    if (!this.ctx || this.isMuted || type === 'silence') return;

    if (type === 'room_morning') {
      // Gentle fan drone + subtle distant chirps
      const fanNoise = this.createFilteredNoise(120, 'lowpass', 0.12);
      this.currentAmbientNodes.push(fanNoise);

      // Periodic morning bird chime
      const birdInterval = window.setInterval(() => {
        if (!this.isMuted && this.ctx && Math.random() > 0.4) {
          this.playBirdChirp();
        }
      }, 3500);
      this.currentAmbientNodes.push({ stop: () => clearInterval(birdInterval) });
    } else if (type === 'campus_day') {
      // Distant campus rumble & rustling breeze
      const campusRumble = this.createFilteredNoise(280, 'bandpass', 0.15);
      this.currentAmbientNodes.push(campusRumble);
    } else if (type === 'tea_shop') {
      // Warm roadside hum + occasional clink
      const roadHum = this.createFilteredNoise(350, 'lowpass', 0.2);
      this.currentAmbientNodes.push(roadHum);

      const clinkInterval = window.setInterval(() => {
        if (!this.isMuted && this.ctx && Math.random() > 0.5) {
          this.playTeaClink();
        }
      }, 4000);
      this.currentAmbientNodes.push({ stop: () => clearInterval(clinkInterval) });
    } else if (type === 'rain') {
      // Realistic soothing rainfall noise with modulated bandpass
      const rain1 = this.createRainNoise(0.35);
      this.currentAmbientNodes.push(rain1);
    } else if (type === 'evening_city') {
      // Distant city dusk hum
      const cityHum = this.createFilteredNoise(180, 'lowpass', 0.18);
      this.currentAmbientNodes.push(cityHum);
    }
  }

  private createFilteredNoise(freq: number, type: BiquadFilterType, gainLevel: number) {
    if (!this.ctx || !this.ambientGain) return { stop: () => {} };

    const bufferSize = this.ctx.sampleRate * 2;
    const noiseBuffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const output = noiseBuffer.getChannelData(0);
    for (let i = 0; i < bufferSize; i++) {
      output[i] = Math.random() * 2 - 1;
    }

    const whiteNoise = this.ctx.createBufferSource();
    whiteNoise.buffer = noiseBuffer;
    whiteNoise.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = type;
    filter.frequency.setValueAtTime(freq, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);

    whiteNoise.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);

    whiteNoise.start();

    return {
      stop: () => {
        try {
          whiteNoise.stop();
          whiteNoise.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      }
    };
  }

  private createRainNoise(gainLevel: number) {
    if (!this.ctx || !this.ambientGain) return { stop: () => {} };

    const bufferSize = this.ctx.sampleRate * 2;
    const buffer = this.ctx.createBuffer(1, bufferSize, this.ctx.sampleRate);
    const data = buffer.getChannelData(0);
    // Pink noise generation
    let b0 = 0, b1 = 0, b2 = 0, b3 = 0, b4 = 0, b5 = 0, b6 = 0;
    for (let i = 0; i < bufferSize; i++) {
      const white = Math.random() * 2 - 1;
      b0 = 0.99886 * b0 + white * 0.0555179;
      b1 = 0.99332 * b1 + white * 0.0750759;
      b2 = 0.96900 * b2 + white * 0.1538520;
      b3 = 0.86650 * b3 + white * 0.3104856;
      b4 = 0.55000 * b4 + white * 0.5329522;
      b5 = -0.7616 * b5 - white * 0.0168980;
      data[i] = (b0 + b1 + b2 + b3 + b4 + b5 + b6 + white * 0.5362) * 0.11;
      b6 = white * 0.115926;
    }

    const source = this.ctx.createBufferSource();
    source.buffer = buffer;
    source.loop = true;

    const filter = this.ctx.createBiquadFilter();
    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1400, this.ctx.currentTime);

    const gain = this.ctx.createGain();
    gain.gain.setValueAtTime(gainLevel, this.ctx.currentTime);

    source.connect(filter);
    filter.connect(gain);
    gain.connect(this.ambientGain);

    source.start();

    return {
      stop: () => {
        try {
          source.stop();
          source.disconnect();
          filter.disconnect();
          gain.disconnect();
        } catch {}
      }
    };
  }

  // --- SOUND EFFECTS ---

  public playFootstep() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc.type = 'sine';
    const pitch = 80 + Math.random() * 20;
    osc.frequency.setValueAtTime(pitch, this.ctx.currentTime);
    osc.frequency.exponentialRampToValueAtTime(30, this.ctx.currentTime + 0.08);

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.08, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);

    osc.connect(filter);
    filter.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.09);
  }

  public playPaperPickup() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const noise = this.createFilteredNoise(1200, 'bandpass', 0.15);
    setTimeout(() => noise.stop(), 180);
  }

  public playPhoneVibrate() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'triangle';
    osc.frequency.setValueAtTime(130, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.2, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.0, this.ctx.currentTime + 0.2);
    gain.gain.setValueAtTime(0.2, this.ctx.currentTime + 0.3);
    gain.gain.setValueAtTime(0.0, this.ctx.currentTime + 0.55);

    osc.connect(gain);
    gain.connect(this.sfxGain);

    osc.start();
    osc.stop(this.ctx.currentTime + 0.6);
  }

  public playKeyType() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(600 + Math.random() * 200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.04, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.04);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.05);
  }

  public playTeaClink() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(1800 + Math.random() * 200, this.ctx.currentTime);

    gain.gain.setValueAtTime(0.06, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.3);

    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.35);
  }

  private playBirdChirp() {
    if (!this.ctx || this.isMuted || !this.ambientGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';

    const start = this.ctx.currentTime;
    osc.frequency.setValueAtTime(2400, start);
    osc.frequency.exponentialRampToValueAtTime(3200, start + 0.08);
    osc.frequency.exponentialRampToValueAtTime(2600, start + 0.16);

    gain.gain.setValueAtTime(0.03, start);
    gain.gain.exponentialRampToValueAtTime(0.001, start + 0.2);

    osc.connect(gain);
    gain.connect(this.ambientGain);
    osc.start();
    osc.stop(start + 0.22);
  }

  public playClick() {
    if (!this.ctx || this.isMuted || !this.sfxGain) return;
    const osc = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    osc.type = 'sine';
    osc.frequency.setValueAtTime(440, this.ctx.currentTime);
    gain.gain.setValueAtTime(0.05, this.ctx.currentTime);
    gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.05);
    osc.connect(gain);
    gain.connect(this.sfxGain);
    osc.start();
    osc.stop(this.ctx.currentTime + 0.06);
  }

  // --- CINEMATIC MUSIC GENERATOR ---
  // Synthesizes a restrained, nostalgic, gentle piano/rhodes progression

  public playMusicTheme(mood: 'nostalgia' | 'routine' | 'rain' | 'melancholy' | 'acceptance' | 'silence') {
    if (this.currentMusicMood === mood) return;
    this.stopMusic();
    this.currentMusicMood = mood;

    if (!this.ctx || this.isMuted || mood === 'silence') return;

    // Chord progressions (frequencies in Hz)
    const progressions: Record<string, number[][]> = {
      nostalgia: [
        [261.63, 329.63, 392.00, 493.88], // Cmaj7
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63, 329.63], // Fmaj7
        [196.00, 246.94, 293.66, 392.00], // G
      ],
      routine: [
        [261.63, 329.63, 392.00],         // C
        [174.61, 220.00, 261.63],         // F
        [220.00, 261.63, 329.63],         // Am
        [196.00, 246.94, 293.66],         // G
      ],
      rain: [
        [220.00, 261.63, 329.63, 392.00], // Am7
        [174.61, 220.00, 261.63],         // F
        [164.81, 196.00, 246.94, 293.66], // Em7
        [220.00, 261.63, 329.63],         // Am
      ],
      melancholy: [
        [220.00, 261.63, 329.63],         // Am
        [174.61, 207.65, 261.63],         // Fm (bittersweet modal mixture)
        [261.63, 329.63, 392.00],         // C
        [196.00, 246.94, 293.66],         // G
      ],
      acceptance: [
        [261.63, 329.63, 392.00, 523.25], // C add 9
        [196.00, 246.94, 293.66, 392.00], // G
        [220.00, 261.63, 329.63],         // Am
        [174.61, 220.00, 261.63, 392.00], // F add 9
      ]
    };

    const chords = progressions[mood] || progressions.nostalgia;
    let chordIdx = 0;

    const playNextChord = () => {
      if (!this.ctx || this.isMuted) return;
      const currentChord = chords[chordIdx % chords.length];
      chordIdx++;

      // Play notes with soft arpeggiated human feel
      currentChord.forEach((freq, i) => {
        setTimeout(() => {
          this.playPianoNote(freq, 2.8);
        }, i * 160);
      });
    };

    playNextChord();
    this.currentMusicTimer = window.setInterval(playNextChord, 4800);
  }

  private playPianoNote(freq: number, duration: number) {
    if (!this.ctx || this.isMuted || !this.musicGain) return;

    const now = this.ctx.currentTime;
    const osc1 = this.ctx.createOscillator();
    const osc2 = this.ctx.createOscillator();
    const gain = this.ctx.createGain();
    const filter = this.ctx.createBiquadFilter();

    osc1.type = 'triangle';
    osc1.frequency.setValueAtTime(freq, now);

    osc2.type = 'sine';
    osc2.frequency.setValueAtTime(freq * 2, now); // soft harmonic

    filter.type = 'lowpass';
    filter.frequency.setValueAtTime(1200, now);
    filter.frequency.exponentialRampToValueAtTime(300, now + duration);

    gain.gain.setValueAtTime(0.001, now);
    gain.gain.linearRampToValueAtTime(0.12, now + 0.05);
    gain.gain.exponentialRampToValueAtTime(0.0001, now + duration);

    osc1.connect(filter);
    osc2.connect(filter);
    filter.connect(gain);
    gain.connect(this.musicGain);

    osc1.start(now);
    osc2.start(now);
    osc1.stop(now + duration + 0.1);
    osc2.stop(now + duration + 0.1);
  }

  public stopMusic() {
    if (this.currentMusicTimer) {
      clearInterval(this.currentMusicTimer);
      this.currentMusicTimer = null;
    }
    this.currentMusicMood = null;
  }
}

export const audioEngine = new AudioEngine();
