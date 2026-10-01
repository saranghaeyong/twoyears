import React, { useState } from 'react';
import { audioEngine } from '../services/audioEngine';
import { Volume2, VolumeX, Eye, Activity, X } from 'lucide-react';

interface PauseMenuProps {
  isOpen: boolean;
  onResume: () => void;
  onOpenMemories: () => void;
  onRestartChapter: () => void;
  onExitStory: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  reducedMotion: boolean;
  onToggleReducedMotion: () => void;
  subtitlesEnabled: boolean;
  onToggleSubtitles: () => void;
}

export const PauseMenu: React.FC<PauseMenuProps> = ({
  isOpen,
  onResume,
  onOpenMemories,
  onRestartChapter,
  onExitStory,
  soundEnabled,
  onToggleSound,
  reducedMotion,
  onToggleReducedMotion,
  subtitlesEnabled,
  onToggleSubtitles,
}) => {
  const [activeTab, setActiveTab] = useState<'menu' | 'settings'>('menu');

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 bg-black/85 backdrop-blur-xl flex items-center justify-center p-4 select-none">
      <div className="max-w-sm w-full bg-stone-900/90 border border-stone-800 rounded-2xl p-6 sm:p-8 text-center relative shadow-2xl">
        <button
          onClick={onResume}
          className="absolute top-4 right-4 text-stone-400 hover:text-white p-1"
        >
          <X className="w-5 h-5" />
        </button>

        {activeTab === 'menu' ? (
          <div>
            <span className="text-[11px] uppercase tracking-widest text-stone-500 font-mono">
              Memory Paused
            </span>
            <h2 className="text-3xl font-serif text-stone-100 tracking-wide mt-1 mb-8">
              TWO YEARS
            </h2>

            <div className="space-y-3">
              <button
                onClick={() => {
                  audioEngine.playClick();
                  onResume();
                }}
                className="w-full py-3 bg-stone-100 hover:bg-white text-stone-950 font-medium text-xs uppercase tracking-widest rounded-xl transition-all shadow"
              >
                Resume
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  onOpenMemories();
                }}
                className="w-full py-3 bg-stone-800/80 hover:bg-stone-850 text-stone-200 hover:text-white text-xs uppercase tracking-widest rounded-xl border border-stone-700/60 transition-all"
              >
                Memories Timeline
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  setActiveTab('settings');
                }}
                className="w-full py-3 bg-stone-800/80 hover:bg-stone-850 text-stone-200 hover:text-white text-xs uppercase tracking-widest rounded-xl border border-stone-700/60 transition-all"
              >
                Settings
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  onRestartChapter();
                }}
                className="w-full py-3 bg-stone-800/80 hover:bg-stone-850 text-stone-200 hover:text-white text-xs uppercase tracking-widest rounded-xl border border-stone-700/60 transition-all"
              >
                Restart Chapter
              </button>

              <button
                onClick={() => {
                  audioEngine.playClick();
                  onExitStory();
                }}
                className="w-full py-3 text-stone-400 hover:text-stone-200 text-xs uppercase tracking-widest transition-colors mt-2"
              >
                Exit Story
              </button>
            </div>
          </div>
        ) : (
          <div>
            <div className="flex items-center justify-between mb-6 pb-2 border-b border-stone-800">
              <h3 className="text-base font-serif text-white">Settings</h3>
              <button
                onClick={() => setActiveTab('menu')}
                className="text-xs text-amber-400 hover:underline uppercase tracking-wider"
              >
                Back
              </button>
            </div>

            <div className="space-y-4 text-left">
              {/* Sound Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-800/50 border border-stone-700/50">
                <div className="flex items-center gap-2.5 text-stone-200">
                  {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-400" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
                  <span className="text-xs font-medium">Ambient Audio & Music</span>
                </div>
                <button
                  onClick={onToggleSound}
                  className={`w-10 h-5 rounded-full transition-colors relative ${soundEnabled ? 'bg-amber-500' : 'bg-stone-700'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${soundEnabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* Subtitles Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-800/50 border border-stone-700/50">
                <div className="flex items-center gap-2.5 text-stone-200">
                  <Eye className="w-4 h-4 text-sky-400" />
                  <span className="text-xs font-medium">Subtitles & Thoughts</span>
                </div>
                <button
                  onClick={onToggleSubtitles}
                  className={`w-10 h-5 rounded-full transition-colors relative ${subtitlesEnabled ? 'bg-sky-500' : 'bg-stone-700'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${subtitlesEnabled ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>

              {/* Reduced Motion Toggle */}
              <div className="flex items-center justify-between p-3 rounded-xl bg-stone-800/50 border border-stone-700/50">
                <div className="flex items-center gap-2.5 text-stone-200">
                  <Activity className="w-4 h-4 text-emerald-400" />
                  <span className="text-xs font-medium">Reduced Motion</span>
                </div>
                <button
                  onClick={onToggleReducedMotion}
                  className={`w-10 h-5 rounded-full transition-colors relative ${reducedMotion ? 'bg-emerald-500' : 'bg-stone-700'}`}
                >
                  <span className={`w-4 h-4 bg-white rounded-full absolute top-0.5 transition-transform ${reducedMotion ? 'right-0.5' : 'left-0.5'}`} />
                </button>
              </div>
            </div>

            <button
              onClick={() => setActiveTab('menu')}
              className="mt-6 w-full py-2.5 bg-stone-800 hover:bg-stone-700 text-stone-200 rounded-xl text-xs uppercase tracking-wider"
            >
              Done
            </button>
          </div>
        )}
      </div>
    </div>
  );
};
