import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';
import { RotateCcw, BookOpen } from 'lucide-react';

interface EpilogueProps {
  onReplay: () => void;
  onExploreMemories: () => void;
}

export const Epilogue: React.FC<EpilogueProps> = ({ onReplay, onExploreMemories }) => {
  const [step, setStep] = useState(0);

  useEffect(() => {
    // Timed reveals for the final poetic message
    const timers = [
      setTimeout(() => setStep(1), 1200), // "Some people become part of our lives."
      setTimeout(() => setStep(2), 4000), // "Some become part of our memories."
      setTimeout(() => setStep(3), 7200), // "And sometimes, that is enough."
      setTimeout(() => setStep(4), 10500), // "THE END" & options
    ];

    return () => timers.forEach(t => clearTimeout(t));
  }, []);

  return (
    <div className="fixed inset-0 z-50 bg-[#07080c] flex flex-col items-center justify-center p-8 text-center select-none">
      <div className="max-w-xl mx-auto flex flex-col items-center">
        <h1 className="text-4xl sm:text-6xl font-serif text-stone-100 tracking-wider mb-8">
          TWO YEARS
        </h1>

        <div className="space-y-6 min-h-[140px] flex flex-col justify-center">
          {step >= 1 && (
            <p className="text-lg sm:text-2xl font-serif text-stone-300 italic transition-all duration-1000 ease-in-out">
              “Some people become part of our lives.”
            </p>
          )}

          {step >= 2 && (
            <p className="text-lg sm:text-2xl font-serif text-stone-300 italic transition-all duration-1000 ease-in-out">
              “Some become part of our memories.”
            </p>
          )}

          {step >= 3 && (
            <p className="text-xl sm:text-3xl font-serif text-amber-200/90 italic font-medium transition-all duration-1000 ease-in-out">
              “And sometimes, that is enough.”
            </p>
          )}
        </div>

        {step >= 4 && (
          <div className="mt-12 transition-all duration-1000 ease-out flex flex-col items-center">
            <span className="text-xs uppercase tracking-[0.4em] text-stone-500 font-mono mb-8">
              THE END
            </span>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onReplay();
                }}
                className="px-6 py-2.5 bg-stone-100 hover:bg-white text-stone-950 font-medium text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Replay</span>
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  onExploreMemories();
                }}
                className="px-6 py-2.5 bg-stone-900 hover:bg-stone-800 text-stone-200 border border-stone-800 text-xs uppercase tracking-widest rounded-full transition-all flex items-center gap-2"
              >
                <BookOpen className="w-3.5 h-3.5" />
                <span>Explore Memories</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
