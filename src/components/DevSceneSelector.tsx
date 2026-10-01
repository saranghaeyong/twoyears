import React, { useState } from 'react';
import { STORY_SCENES } from '../data/story';
import { Compass, X } from 'lucide-react';

interface DevSceneSelectorProps {
  currentSceneId: string;
  onSelectScene: (sceneId: string) => void;
}

export const DevSceneSelector: React.FC<DevSceneSelectorProps> = ({
  currentSceneId,
  onSelectScene,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const scenes = Object.values(STORY_SCENES);

  return (
    <div className="fixed top-3 right-14 z-50 select-none">
      <button
        onClick={() => setIsOpen(!isOpen)}
        title="Quick Chapter Jump"
        className="p-1.5 rounded-lg bg-black/40 hover:bg-black/80 text-stone-400 hover:text-stone-200 border border-white/10 backdrop-blur-sm transition-colors text-xs flex items-center gap-1.5"
      >
        <Compass className="w-3.5 h-3.5 text-amber-400/80" />
        <span className="hidden sm:inline font-mono text-[10px] text-stone-400">Chapters</span>
      </button>

      {isOpen && (
        <div className="absolute right-0 mt-2 w-72 max-h-96 overflow-y-auto bg-stone-900 border border-stone-700/80 rounded-xl shadow-2xl p-2 text-xs">
          <div className="flex items-center justify-between pb-2 mb-2 border-b border-stone-800 px-2">
            <span className="font-semibold text-stone-300 font-mono text-[11px]">Chapter Jump</span>
            <button onClick={() => setIsOpen(false)} className="text-stone-400 hover:text-white">
              <X className="w-3.5 h-3.5" />
            </button>
          </div>

          <div className="space-y-1">
            {scenes.map(s => (
              <button
                key={s.id}
                onClick={() => {
                  onSelectScene(s.id);
                  setIsOpen(false);
                }}
                className={`w-full text-left px-2.5 py-1.5 rounded-lg transition-colors flex items-center justify-between ${
                  s.id === currentSceneId
                    ? 'bg-amber-500/20 text-amber-200 border border-amber-500/30 font-medium'
                    : 'text-stone-300 hover:bg-stone-800'
                }`}
              >
                <div className="truncate pr-2">
                  <span className="text-[10px] font-mono text-stone-400 mr-1.5">
                    CH {s.chapterNumber}
                  </span>
                  <span>{s.locationTitle}</span>
                </div>
                {s.timeIndicator && (
                  <span className="text-[9px] text-stone-400 font-mono shrink-0">
                    {s.timeIndicator.split('·')[0]}
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
