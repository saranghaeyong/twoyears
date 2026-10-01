import React from 'react';
import { audioEngine } from '../services/audioEngine';
import { Headphones } from 'lucide-react';

interface OpeningScreenProps {
  onBegin: () => void;
}

export const OpeningScreen: React.FC<OpeningScreenProps> = ({ onBegin }) => {
  const handleBeginClick = () => {
    // Initialize Web Audio API on user gesture
    audioEngine.init();
    audioEngine.resume();
    audioEngine.playClick();
    onBegin();
  };

  return (
    <div className="fixed inset-0 z-50 bg-[#090a0f] flex flex-col items-center justify-between p-8 select-none overflow-hidden">
      {/* Subtle background ambient glow */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-1/3 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-amber-500/5 rounded-full blur-[140px]" />
        <div className="absolute inset-0 vignette-overlay" />
      </div>

      {/* Top note */}
      <div className="z-10 text-center pt-8">
        <div className="inline-flex items-center gap-2 text-stone-500 text-xs tracking-widest uppercase font-mono">
          <Headphones className="w-3.5 h-3.5 text-stone-400" />
          <span>Best experienced with sound</span>
        </div>
      </div>

      {/* Center Title & Action */}
      <div className="z-10 text-center max-w-lg mx-auto flex flex-col items-center">
        <span className="text-xs uppercase tracking-[0.3em] text-stone-400 font-mono mb-3">
          AN INTERACTIVE ANIMATED STORY
        </span>

        <h1 className="text-5xl sm:text-7xl md:text-8xl font-serif text-stone-100 font-normal tracking-wider drop-shadow-md">
          TWO YEARS
        </h1>

        <div className="w-12 h-[1px] bg-stone-700 my-8" />

        <button
          onClick={handleBeginClick}
          className="group px-10 py-3.5 bg-stone-100 hover:bg-white text-stone-950 font-medium text-xs tracking-[0.25em] uppercase rounded-full transition-all duration-300 transform hover:scale-105 shadow-xl hover:shadow-stone-100/10 cursor-pointer"
        >
          <span>BEGIN</span>
        </button>

        <p className="mt-12 text-sm sm:text-base text-stone-400 font-serif italic max-w-xs sm:max-w-sm leading-relaxed">
          “Some people stay in our lives.
          <br />
          Some people stay in our memories.”
        </p>
      </div>

      {/* Bottom hint */}
      <div className="z-10 text-stone-600 text-[11px] font-mono tracking-wider pb-4">
        Keyboard WASD / Arrows · Touch & Tap Friendly
      </div>
    </div>
  );
};
