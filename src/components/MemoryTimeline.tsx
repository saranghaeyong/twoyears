import React, { useState } from 'react';
import { MEMORY_SNAPSHOTS } from '../data/story';
import { MemorySnapshot } from '../types/story';
import { audioEngine } from '../services/audioEngine';
import { Clock, BookOpen, Coffee, CloudRain, Sparkles, GraduationCap, X } from 'lucide-react';

interface MemoryTimelineProps {
  isRetrospective?: boolean;
  onContinue: () => void;
  onSelectScene?: (sceneId: string) => void;
}

export const MemoryTimeline: React.FC<MemoryTimelineProps> = ({
  isRetrospective = false,
  onContinue,
  onSelectScene,
}) => {
  const [selectedMemory, setSelectedMemory] = useState<MemorySnapshot | null>(null);

  const year1Memories = MEMORY_SNAPSHOTS.filter(m => m.year === 'Year 01');
  const year2Memories = MEMORY_SNAPSHOTS.filter(m => m.year === 'Year 02');

  const getIcon = (type: string) => {
    switch (type) {
      case 'tea':
        return <Coffee className="w-3.5 h-3.5 text-amber-400" />;
      case 'rain':
        return <CloudRain className="w-3.5 h-3.5 text-sky-400" />;
      case 'exam':
        return <BookOpen className="w-3.5 h-3.5 text-indigo-400" />;
      case 'festival':
        return <Sparkles className="w-3.5 h-3.5 text-rose-400" />;
      case 'gate':
        return <GraduationCap className="w-3.5 h-3.5 text-emerald-400" />;
      default:
        return <Clock className="w-3.5 h-3.5 text-stone-400" />;
    }
  };

  const handleNodeClick = (mem: MemorySnapshot) => {
    audioEngine.playClick();
    setSelectedMemory(mem);
  };

  return (
    <div
      className={`absolute inset-0 z-30 flex flex-col justify-between p-4 sm:p-8 overflow-y-auto ${
        isRetrospective
          ? 'bg-[#141210]/90 memory-sepia backdrop-blur-md'
          : 'bg-[#090b10]/90 backdrop-blur-md'
      }`}
    >
      {/* Header */}
      <div className="max-w-4xl mx-auto w-full pt-4 text-center">
        <span className="text-xs uppercase tracking-widest text-amber-400/80 font-mono">
          {isRetrospective ? 'Chapter 07 · Retrospective' : 'Chapter 03 · Routine'}
        </span>
        <h2 className="text-3xl sm:text-5xl font-serif text-stone-100 mt-1 tracking-wide">
          TWO YEARS
        </h2>
        <p className="text-xs sm:text-sm text-stone-400 mt-2 max-w-lg mx-auto font-serif italic">
          {isRetrospective
            ? '“Some moments only become precious after they are gone.”'
            : 'Twenty-four months. Ordinary mornings, shared silence, and memories stitched together.'}
        </p>
      </div>

      {/* Timeline Grid */}
      <div className="max-w-4xl mx-auto w-full my-6 space-y-8">
        {/* YEAR 01 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 bg-stone-800/80 px-3 py-1 rounded-md">
              Year 01
            </span>
            <div className="h-[1px] flex-1 bg-stone-800" />
            <span className="text-xs text-stone-500 font-mono">June — December</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {year1Memories.map(mem => (
              <button
                key={mem.id}
                onClick={() => handleNodeClick(mem)}
                className="flex items-start gap-3 p-3.5 rounded-xl text-left bg-stone-900/60 border border-stone-800/80 hover:border-amber-400/40 hover:bg-stone-800/50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getIcon(mem.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-amber-400/90 font-mono text-[11px]">{mem.month}</span>
                    <span className="text-[10px] text-stone-500">Inspect</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-stone-200 truncate group-hover:text-white">
                    {mem.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                    {mem.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* YEAR 02 */}
        <div className="space-y-3">
          <div className="flex items-center gap-3">
            <span className="text-xs font-semibold uppercase tracking-wider text-stone-300 bg-stone-800/80 px-3 py-1 rounded-md">
              Year 02
            </span>
            <div className="h-[1px] flex-1 bg-stone-800" />
            <span className="text-xs text-stone-500 font-mono">January — June</span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
            {year2Memories.map(mem => (
              <button
                key={mem.id}
                onClick={() => handleNodeClick(mem)}
                className="flex items-start gap-3 p-3.5 rounded-xl text-left bg-stone-900/60 border border-stone-800/80 hover:border-amber-400/40 hover:bg-stone-800/50 transition-all duration-200 group"
              >
                <div className="w-8 h-8 rounded-lg bg-stone-800/80 flex items-center justify-center shrink-0 group-hover:scale-105 transition-transform">
                  {getIcon(mem.iconType)}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="flex items-center justify-between text-xs mb-1">
                    <span className="text-amber-400/90 font-mono text-[11px]">{mem.month}</span>
                    <span className="text-[10px] text-stone-500">Inspect</span>
                  </div>
                  <h4 className="text-xs sm:text-sm font-medium text-stone-200 truncate group-hover:text-white">
                    {mem.title}
                  </h4>
                  <p className="text-[11px] text-stone-400 line-clamp-2 mt-0.5 leading-snug">
                    {mem.description}
                  </p>
                </div>
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Memory Detail Modal */}
      {selectedMemory && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-md flex items-center justify-center p-4">
          <div className="bg-stone-900 border border-stone-700/80 rounded-2xl max-w-md w-full p-6 relative shadow-2xl">
            <button
              onClick={() => setSelectedMemory(null)}
              className="absolute top-4 right-4 text-stone-400 hover:text-white"
            >
              <X className="w-5 h-5" />
            </button>

            <span className="text-xs text-amber-400 font-mono uppercase tracking-wider">
              {isRetrospective ? '“You remember this.”' : selectedMemory.month}
            </span>
            <h3 className="text-xl sm:text-2xl font-serif text-white mt-1 mb-3">
              {selectedMemory.title}
            </h3>

            <p className="text-sm text-stone-300 leading-relaxed font-serif">
              {selectedMemory.description}
            </p>

            <div className="mt-6 pt-4 border-t border-stone-800 flex justify-end gap-3">
              {onSelectScene && (
                <button
                  onClick={() => {
                    onSelectScene(selectedMemory.associatedSceneId);
                    setSelectedMemory(null);
                  }}
                  className="px-4 py-2 bg-stone-800 hover:bg-stone-700 text-stone-200 text-xs rounded-lg uppercase tracking-wider transition-colors"
                >
                  Replay Scene
                </button>
              )}
              <button
                onClick={() => setSelectedMemory(null)}
                className="px-4 py-2 bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs rounded-lg uppercase tracking-wider transition-colors"
              >
                Close
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Footer / Continue button */}
      <div className="max-w-4xl mx-auto w-full pt-4 pb-2 border-t border-stone-800/80 flex items-center justify-between">
        <span className="text-xs text-stone-500 font-mono">
          {isRetrospective ? 'All memories revisited' : 'Timeline active'}
        </span>
        <button
          onClick={() => {
            audioEngine.playClick();
            onContinue();
          }}
          className="px-6 py-2.5 bg-stone-100 hover:bg-white text-stone-900 text-xs font-semibold uppercase tracking-widest rounded-lg transition-all shadow-lg hover:shadow-white/10"
        >
          {isRetrospective ? 'Continue To Present Day' : 'Proceed To Final Day'}
        </button>
      </div>
    </div>
  );
};
