import React from 'react';
import { DialogueItem } from '../types/story';
import { ChevronRight } from 'lucide-react';

interface DialogueBoxProps {
  dialogueList: DialogueItem[];
  currentIndex: number;
  onNext: () => void;
  isComplete: boolean;
}

export const DialogueBox: React.FC<DialogueBoxProps> = ({
  dialogueList,
  currentIndex,
  onNext,
  isComplete,
}) => {
  if (dialogueList.length === 0 || isComplete) return null;

  const currentDialogue = dialogueList[currentIndex];
  if (!currentDialogue) return null;

  const { speaker, text } = currentDialogue;

  const getSpeakerStyle = () => {
    switch (speaker) {
      case 'Girl':
        return 'text-amber-300 font-medium';
      case 'Boy':
        return 'text-sky-300 font-medium';
      case 'Thought':
        return 'text-stone-400 italic font-serif text-sm tracking-wide';
      case 'Friend':
        return 'text-emerald-300 font-medium';
      default:
        return 'text-stone-300 font-serif text-sm tracking-wider uppercase';
    }
  };

  return (
    <div
      onClick={onNext}
      className="absolute bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-2xl z-30 cursor-pointer select-none group"
    >
      <div className="bg-[#0b0d14]/85 backdrop-blur-md border border-white/10 px-6 py-4 rounded-xl shadow-2xl transition-all duration-300 group-hover:border-white/20">
        <div className="flex items-center justify-between mb-1.5">
          <span className={`text-xs ${getSpeakerStyle()}`}>
            {speaker === 'Thought' ? 'Quiet Thought' : speaker}
          </span>
          <span className="text-[11px] text-stone-500 font-mono flex items-center gap-1">
            <span>{currentIndex + 1} / {dialogueList.length}</span>
            <span className="hidden sm:inline text-stone-600">· Space / Tap</span>
          </span>
        </div>

        <p className={`text-base sm:text-lg leading-relaxed ${speaker === 'Thought' ? 'text-stone-300 font-serif italic text-lg' : 'text-stone-100'}`}>
          {text}
        </p>

        <div className="flex justify-end items-center gap-1 mt-2 text-stone-400 text-xs font-medium">
          <span className="text-[11px] tracking-wider uppercase text-stone-400">Continue</span>
          <ChevronRight className="w-3.5 h-3.5 animate-pulse text-amber-300/80" />
        </div>
      </div>
    </div>
  );
};
