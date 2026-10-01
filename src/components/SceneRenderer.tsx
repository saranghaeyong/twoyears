import React, { useState, useEffect, useCallback } from 'react';
import { Scene, InspectionItem } from '../types/story';
import { BackgroundLayer } from './BackgroundLayer';
import { Character } from './Character';
import { DialogueBox } from './DialogueBox';
import { MobileControls } from './MobileControls';
import { audioEngine } from '../services/audioEngine';
import { Hand, Volume2, VolumeX, Pause, Sparkles } from 'lucide-react';

interface SceneRendererProps {
  scene: Scene;
  onSceneComplete: (nextSceneId?: string) => void;
  onOpenPause: () => void;
  soundEnabled: boolean;
  onToggleSound: () => void;
  subtitlesEnabled: boolean;
}

export const SceneRenderer: React.FC<SceneRendererProps> = ({
  scene,
  onSceneComplete,
  onOpenPause,
  soundEnabled,
  onToggleSound,
  subtitlesEnabled,
}) => {
  // Dialogue state
  const [dialogueIndex, setDialogueIndex] = useState(0);
  const [dialogueComplete, setDialogueComplete] = useState(false);

  // Inspection state
  const [inspections, setInspections] = useState<InspectionItem[]>(scene.inspectionItems || []);
  const [activeInspectionText, setActiveInspectionText] = useState<string | null>(null);

  // Choice state (e.g. rain walk)
  const [selectedChoiceReaction, setSelectedChoiceReaction] = useState<string | null>(null);

  // Playable movement state
  const isMoveable = !!scene.playableMovement?.enabled;
  const [playerX, setPlayerX] = useState(scene.playableMovement?.initialPosition || 20);
  const [isPlayerMoving, setIsPlayerMoving] = useState(false);

  // Scene intro title display
  const [showSceneTitle, setShowSceneTitle] = useState(true);

  // Reset states when scene changes
  useEffect(() => {
    setDialogueIndex(0);
    setDialogueComplete(!scene.dialogue || scene.dialogue.length === 0);
    setInspections(scene.inspectionItems || []);
    setActiveInspectionText(null);
    setSelectedChoiceReaction(null);
    setPlayerX(scene.playableMovement?.initialPosition || 20);
    setIsPlayerMoving(false);
    setShowSceneTitle(true);

    const titleTimer = setTimeout(() => {
      setShowSceneTitle(false);
    }, 3200);

    // Audio setup
    audioEngine.playAmbience(scene.ambientAudio);
    audioEngine.playMusicTheme(scene.musicMood);

    return () => {
      clearTimeout(titleTimer);
    };
  }, [scene]);

  // Movement handler
  const movePlayer = useCallback((delta: number) => {
    if (!isMoveable) return;
    setIsPlayerMoving(true);
    setPlayerX(prev => {
      const next = Math.max(5, Math.min(95, prev + delta));
      return next;
    });
    audioEngine.playFootstep();

    setTimeout(() => {
      setIsPlayerMoving(false);
    }, 150);
  }, [isMoveable]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        onOpenPause();
        return;
      }

      if (isMoveable) {
        if (e.key === 'ArrowRight' || e.key === 'd' || e.key === 'D') {
          movePlayer(4);
        } else if (e.key === 'ArrowLeft' || e.key === 'a' || e.key === 'A') {
          movePlayer(-4);
        }
      }

      // Space or Enter to progress dialogue
      if (e.key === ' ' || e.key === 'Enter') {
        if (scene.dialogue && dialogueIndex < scene.dialogue.length - 1) {
          audioEngine.playClick();
          setDialogueIndex(i => i + 1);
        } else if (scene.dialogue && dialogueIndex === scene.dialogue.length - 1) {
          setDialogueComplete(true);
        }
      }

      // Interact with goal
      if (e.key === 'e' || e.key === 'E') {
        if (isNearGoal) {
          handleGoalAction();
        }
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isMoveable, movePlayer, onOpenPause, scene.dialogue, dialogueIndex]);

  // Goal distance checking
  const targetGoalX = scene.playableMovement?.targetGoalX || 80;
  const isNearGoal = isMoveable && Math.abs(playerX - targetGoalX) < 16;

  const handleGoalAction = () => {
    audioEngine.playClick();
    if (scene.playableMovement?.onReachGoalNextScene) {
      onSceneComplete(scene.playableMovement.onReachGoalNextScene);
    } else {
      onSceneComplete();
    }
  };

  const handleNextDialogue = () => {
    audioEngine.playClick();
    if (scene.dialogue && dialogueIndex < scene.dialogue.length - 1) {
      setDialogueIndex(i => i + 1);
    } else {
      setDialogueComplete(true);
      // If there are no required inspections or choices, proceed to next scene
      const hasUnfinishedRequiredInspection = inspections.some(i => i.requiredToProceed && !i.visited);
      const hasChoices = scene.choices && scene.choices.length > 0;
      if (!hasUnfinishedRequiredInspection && !hasChoices && !scene.playableMovement?.enabled) {
        setTimeout(() => {
          onSceneComplete();
        }, 1200);
      }
    }
  };

  const handleInspect = (item: InspectionItem) => {
    audioEngine.playPaperPickup();
    setActiveInspectionText(item.inspectText);
    setInspections(prev =>
      prev.map(i => (i.id === item.id ? { ...i, visited: true } : i))
    );

    if (item.requiredToProceed) {
      setTimeout(() => {
        onSceneComplete();
      }, 2500);
    }
  };

  const handleChoiceSelect = (reaction: string) => {
    audioEngine.playClick();
    setSelectedChoiceReaction(reaction);
    setTimeout(() => {
      onSceneComplete();
    }, 3000);
  };

  return (
    <div className="relative w-full h-full overflow-hidden select-none bg-black">
      {/* Visual Environment */}
      <BackgroundLayer type={scene.backgroundType} />

      {/* Top Cinematic Bar */}
      <div className="absolute top-4 left-6 right-6 z-30 flex items-center justify-between pointer-events-none">
        <div className="flex flex-col">
          <span className="text-[10px] sm:text-xs font-mono tracking-widest text-amber-400/90 uppercase">
            Chapter 0{scene.chapterNumber} · {scene.chapterTitle}
          </span>
          <span className="text-xs sm:text-sm font-serif text-stone-300">
            {scene.locationTitle} {scene.timeIndicator && `· ${scene.timeIndicator}`}
          </span>
        </div>

        {/* Action icons */}
        <div className="flex items-center gap-2 pointer-events-auto">
          <button
            onClick={onToggleSound}
            className="p-2 rounded-xl bg-black/50 hover:bg-black/80 text-stone-300 border border-white/10 backdrop-blur-md transition-colors"
            title={soundEnabled ? 'Mute' : 'Unmute'}
          >
            {soundEnabled ? <Volume2 className="w-4 h-4 text-amber-300" /> : <VolumeX className="w-4 h-4 text-stone-500" />}
          </button>
          <button
            onClick={onOpenPause}
            className="p-2 rounded-xl bg-black/50 hover:bg-black/80 text-stone-300 border border-white/10 backdrop-blur-md transition-colors"
            title="Pause Menu"
          >
            <Pause className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* Big Editorial Title Overlay at Scene Start */}
      {showSceneTitle && (
        <div className="absolute inset-0 pointer-events-none z-20 flex flex-col items-center justify-center bg-black/40 backdrop-blur-[2px] transition-opacity duration-1000">
          <span className="text-xs sm:text-sm uppercase tracking-[0.3em] text-amber-400 font-mono mb-2">
            CHAPTER 0{scene.chapterNumber}
          </span>
          <h2 className="text-3xl sm:text-5xl font-serif text-stone-100 tracking-wider">
            {scene.chapterTitle}
          </h2>
          {scene.timeIndicator && (
            <p className="text-xs sm:text-sm font-mono text-stone-400 mt-2">
              {scene.timeIndicator}
            </p>
          )}
        </div>
      )}

      {/* Characters */}
      {scene.characters.map(char => {
        const posX = isMoveable && char.id === 'boy' ? playerX : char.positionPercent;
        return (
          <Character
            key={char.id}
            config={{
              ...char,
              positionPercent: posX,
            }}
            isMoving={char.id === 'boy' ? isPlayerMoving : false}
          />
        );
      })}

      {/* Interactive Inspection Hotspots */}
      {inspections.map(item => (
        <button
          key={item.id}
          onClick={() => handleInspect(item)}
          className="absolute z-25 group transform -translate-x-1/2 -translate-y-1/2 cursor-pointer focus:outline-none"
          style={{ left: `${item.xPercent}%`, top: `${item.yPercent}%` }}
        >
          <div className="flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-black/75 hover:bg-amber-500/90 text-stone-200 hover:text-stone-950 border border-amber-400/40 backdrop-blur-md text-[11px] font-medium tracking-wide transition-all duration-200 shadow-lg group-hover:scale-105">
            <Sparkles className="w-3 h-3 text-amber-400 group-hover:text-stone-950 animate-pulse" />
            <span>{item.label}</span>
          </div>
        </button>
      ))}

      {/* Inspection Text Callout Modal / Bottom Strip */}
      {activeInspectionText && (
        <div className="absolute top-20 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-35 animate-fade-in">
          <div className="bg-[#10121a]/95 border border-amber-500/30 p-4 rounded-xl shadow-2xl backdrop-blur-md text-stone-200 text-xs sm:text-sm font-serif leading-relaxed flex items-start justify-between gap-3">
            <p>{activeInspectionText}</p>
            <button
              onClick={() => setActiveInspectionText(null)}
              className="text-stone-400 hover:text-white shrink-0 text-xs uppercase font-mono px-2 py-1 bg-stone-800 rounded"
            >
              OK
            </button>
          </div>
        </div>
      )}

      {/* Multiple Choices (e.g. Rain Scene) */}
      {scene.choices && scene.choices.length > 0 && !selectedChoiceReaction && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-lg z-30 flex flex-col items-center gap-2">
          <span className="text-[11px] text-stone-400 font-mono tracking-widest uppercase mb-1">
            Choose Your Moment
          </span>
          <div className="flex flex-wrap justify-center gap-2.5 w-full">
            {scene.choices.map(choice => (
              <button
                key={choice.id}
                onClick={() => handleChoiceSelect(choice.reactionText)}
                className="px-5 py-2.5 bg-stone-900/90 hover:bg-amber-500 hover:text-stone-950 text-stone-200 border border-stone-700/80 rounded-xl text-xs font-semibold tracking-wider uppercase transition-all duration-200 shadow-xl"
              >
                {choice.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Choice Reaction Feedback */}
      {selectedChoiceReaction && (
        <div className="absolute bottom-24 left-1/2 -translate-x-1/2 w-[90%] max-w-md z-30 text-center animate-fade-in">
          <div className="bg-black/85 border border-white/20 p-4 rounded-xl backdrop-blur-md text-stone-200 text-sm font-serif italic">
            “{selectedChoiceReaction}”
          </div>
        </div>
      )}

      {/* Playable Goal Prompt (e.g. "Enter College Gate" / "Walk Forward") */}
      {isNearGoal && (
        <div className="absolute top-24 left-1/2 -translate-x-1/2 z-35 animate-bounce">
          <button
            onClick={handleGoalAction}
            className="px-6 py-2.5 rounded-full bg-amber-500 hover:bg-amber-400 text-stone-950 font-semibold text-xs tracking-widest uppercase shadow-2xl flex items-center gap-2 transition-transform hover:scale-105"
          >
            <Hand className="w-4 h-4" />
            <span>{scene.playableMovement?.goalActionPrompt || 'Proceed'}</span>
          </button>
        </div>
      )}

      {/* Subtitles & Dialogue Strip */}
      {subtitlesEnabled && scene.dialogue && scene.dialogue.length > 0 && !dialogueComplete && (
        <DialogueBox
          dialogueList={scene.dialogue}
          currentIndex={dialogueIndex}
          onNext={handleNextDialogue}
          isComplete={dialogueComplete}
        />
      )}

      {/* Mobile Touch Navigation */}
      {isMoveable && (
        <MobileControls
          onMoveLeft={() => movePlayer(-5)}
          onMoveRight={() => movePlayer(5)}
          onAction={handleGoalAction}
          actionLabel={scene.playableMovement?.goalActionPrompt || 'Proceed'}
          showAction={isNearGoal}
        />
      )}
    </div>
  );
};
