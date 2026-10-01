import React from 'react';
import { ArrowLeft, ArrowRight, Hand } from 'lucide-react';

interface MobileControlsProps {
  onMoveLeft: () => void;
  onMoveRight: () => void;
  onAction?: () => void;
  actionLabel?: string;
  showAction?: boolean;
}

export const MobileControls: React.FC<MobileControlsProps> = ({
  onMoveLeft,
  onMoveRight,
  onAction,
  actionLabel = 'Interact',
  showAction = false,
}) => {
  return (
    <div className="absolute bottom-4 left-4 right-4 z-40 flex items-center justify-between pointer-events-none md:hidden select-none">
      {/* Directional Pad */}
      <div className="flex items-center gap-2 pointer-events-auto">
        <button
          onTouchStart={onMoveLeft}
          onClick={onMoveLeft}
          className="w-13 h-13 rounded-2xl bg-black/60 active:bg-black/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
          aria-label="Walk Left"
        >
          <ArrowLeft className="w-6 h-6" />
        </button>

        <button
          onTouchStart={onMoveRight}
          onClick={onMoveRight}
          className="w-13 h-13 rounded-2xl bg-black/60 active:bg-black/90 backdrop-blur-md border border-white/20 flex items-center justify-center text-white shadow-lg"
          aria-label="Walk Right"
        >
          <ArrowRight className="w-6 h-6" />
        </button>
      </div>

      {/* Action / Goal Button */}
      {showAction && onAction && (
        <button
          onTouchStart={onAction}
          onClick={onAction}
          className="pointer-events-auto px-5 py-3 rounded-2xl bg-amber-500/90 active:bg-amber-400 text-stone-950 font-semibold text-xs tracking-wider uppercase backdrop-blur-md shadow-xl flex items-center gap-2 animate-pulse"
        >
          <Hand className="w-4 h-4" />
          <span>{actionLabel}</span>
        </button>
      )}
    </div>
  );
};
