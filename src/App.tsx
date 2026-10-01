import React, { useState, useEffect } from 'react';
import { STORY_SCENES } from './data/story';
import { OpeningScreen } from './components/OpeningScreen';
import { SceneRenderer } from './components/SceneRenderer';
import { PhoneMessaging } from './components/PhoneMessaging';
import { SocialStoryViewer } from './components/SocialStoryViewer';
import { MemoryTimeline } from './components/MemoryTimeline';
import { Epilogue } from './components/Epilogue';
import { PauseMenu } from './components/PauseMenu';
import { DevSceneSelector } from './components/DevSceneSelector';
import { audioEngine } from './services/audioEngine';

export default function App() {
  const [inStory, setInStory] = useState(false);
  const [currentSceneId, setCurrentSceneId] = useState<string>('scene-01-pg-room');
  const [isTransitioning, setIsTransitioning] = useState(false);
  const [isPauseOpen, setIsPauseOpen] = useState(false);
  const [isMemoryViewerOpen, setIsMemoryViewerOpen] = useState(false);

  // Settings
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [reducedMotion, setReducedMotion] = useState(false);
  const [subtitlesEnabled, setSubtitlesEnabled] = useState(true);

  // Load saved progress from localStorage safely
  useEffect(() => {
    try {
      const saved = localStorage.getItem('two_years_progress');
      if (saved) {
        const parsed = JSON.parse(saved);
        if (parsed.soundEnabled !== undefined) setSoundEnabled(parsed.soundEnabled);
        if (parsed.reducedMotion !== undefined) setReducedMotion(parsed.reducedMotion);
        if (parsed.subtitlesEnabled !== undefined) setSubtitlesEnabled(parsed.subtitlesEnabled);
      }
    } catch {
      // LocalStorage unavailable, graceful fallback
    }
  }, []);

  // Save progress
  const savePreferences = (sound: boolean, motion: boolean, subs: boolean) => {
    try {
      localStorage.setItem(
        'two_years_progress',
        JSON.stringify({
          soundEnabled: sound,
          reducedMotion: motion,
          subtitlesEnabled: subs,
          currentSceneId,
        })
      );
    } catch {}
  };

  const handleToggleSound = () => {
    const next = !soundEnabled;
    setSoundEnabled(next);
    audioEngine.setMuted(!next);
    savePreferences(next, reducedMotion, subtitlesEnabled);
  };

  const handleToggleReducedMotion = () => {
    const next = !reducedMotion;
    setReducedMotion(next);
    savePreferences(soundEnabled, next, subtitlesEnabled);
  };

  const handleToggleSubtitles = () => {
    const next = !subtitlesEnabled;
    setSubtitlesEnabled(next);
    savePreferences(soundEnabled, reducedMotion, next);
  };

  const handleBegin = () => {
    setInStory(true);
    setCurrentSceneId('scene-01-pg-room');
    audioEngine.setMuted(!soundEnabled);
  };

  const transitionToScene = (nextId: string) => {
    setIsTransitioning(true);
    setTimeout(() => {
      setCurrentSceneId(nextId);
      setIsTransitioning(false);
    }, 600);
  };

  const handleSceneComplete = (explicitNextSceneId?: string) => {
    const currentScene = STORY_SCENES[currentSceneId];
    const targetNext = explicitNextSceneId || currentScene?.nextSceneId;
    if (targetNext && STORY_SCENES[targetNext]) {
      transitionToScene(targetNext);
    } else {
      // If at end, transition to epilogue
      transitionToScene('scene-15-epilogue');
    }
  };

  const handleRestartChapter = () => {
    const current = STORY_SCENES[currentSceneId];
    // Find first scene of current chapter
    const firstOfChapter = Object.values(STORY_SCENES).find(
      s => s.chapterNumber === current.chapterNumber
    );
    if (firstOfChapter) {
      transitionToScene(firstOfChapter.id);
    }
    setIsPauseOpen(false);
  };

  const handleExitStory = () => {
    audioEngine.stopAmbience();
    audioEngine.stopMusic();
    setIsPauseOpen(false);
    setInStory(false);
  };

  // Current Scene Object
  const activeScene = STORY_SCENES[currentSceneId] || STORY_SCENES['scene-01-pg-room'];

  return (
    <main className={`relative w-screen h-screen overflow-hidden bg-black ${reducedMotion ? 'motion-reduce' : ''}`}>
      {/* 1. Opening Screen */}
      {!inStory && <OpeningScreen onBegin={handleBegin} />}

      {/* 2. Active Scene or Special Modes */}
      {inStory && (
        <div className="relative w-full h-full">
          {/* Chapter Quick Jump Selector */}
          <DevSceneSelector
            currentSceneId={currentSceneId}
            onSelectScene={id => transitionToScene(id)}
          />

          {/* Special Mode 1: Chapter 02 Crush Phone Messaging */}
          {activeScene.specialMode === 'phone_messaging' ? (
            <div className="relative w-full h-full">
              <SceneRenderer
                scene={activeScene}
                onSceneComplete={handleSceneComplete}
                onOpenPause={() => setIsPauseOpen(true)}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                subtitlesEnabled={subtitlesEnabled}
              />
              <PhoneMessaging
                onComplete={() => handleSceneComplete(activeScene.nextSceneId || undefined)}
              />
            </div>
          ) : activeScene.specialMode === 'social_story' ? (
            /* Special Mode 2: Chapter 06 Instagram Wedding Story */
            <div className="relative w-full h-full">
              <SceneRenderer
                scene={activeScene}
                onSceneComplete={handleSceneComplete}
                onOpenPause={() => setIsPauseOpen(true)}
                soundEnabled={soundEnabled}
                onToggleSound={handleToggleSound}
                subtitlesEnabled={subtitlesEnabled}
              />
              <SocialStoryViewer
                onClose={() => handleSceneComplete(activeScene.nextSceneId || undefined)}
              />
            </div>
          ) : activeScene.specialMode === 'timeline' ? (
            /* Special Mode 3: Interactive Timeline (Chapter 03 & Chapter 07) */
            <div className="relative w-full h-full">
              <MemoryTimeline
                isRetrospective={activeScene.id === 'scene-13-memory-revisit'}
                onContinue={() => handleSceneComplete(activeScene.nextSceneId || undefined)}
                onSelectScene={sceneId => {
                  if (STORY_SCENES[sceneId]) {
                    transitionToScene(sceneId);
                  }
                }}
              />
            </div>
          ) : activeScene.specialMode === 'final_credits' ? (
            /* Special Mode 4: Chapter 09 Epilogue */
            <Epilogue
              onReplay={() => {
                transitionToScene('scene-01-pg-room');
              }}
              onExploreMemories={() => {
                transitionToScene('scene-13-memory-revisit');
              }}
            />
          ) : (
            /* Standard Cinematic Interactive Scene */
            <SceneRenderer
              scene={activeScene}
              onSceneComplete={handleSceneComplete}
              onOpenPause={() => setIsPauseOpen(true)}
              soundEnabled={soundEnabled}
              onToggleSound={handleToggleSound}
              subtitlesEnabled={subtitlesEnabled}
            />
          )}

          {/* Fade transition curtain */}
          <div
            className={`fixed inset-0 z-50 bg-black pointer-events-none transition-opacity duration-500 flex items-center justify-center ${
              isTransitioning ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <span className="text-stone-400 font-mono text-xs tracking-widest uppercase animate-pulse">
              LOADING MEMORY...
            </span>
          </div>
        </div>
      )}

      {/* Standalone Memory Viewer from Pause Menu */}
      {isMemoryViewerOpen && (
        <MemoryTimeline
          isRetrospective={false}
          onContinue={() => setIsMemoryViewerOpen(false)}
          onSelectScene={sceneId => {
            setIsMemoryViewerOpen(false);
            transitionToScene(sceneId);
          }}
        />
      )}

      {/* Pause Menu & Settings */}
      <PauseMenu
        isOpen={isPauseOpen}
        onResume={() => setIsPauseOpen(false)}
        onOpenMemories={() => {
          setIsPauseOpen(false);
          setIsMemoryViewerOpen(true);
        }}
        onRestartChapter={handleRestartChapter}
        onExitStory={handleExitStory}
        soundEnabled={soundEnabled}
        onToggleSound={handleToggleSound}
        reducedMotion={reducedMotion}
        onToggleReducedMotion={handleToggleReducedMotion}
        subtitlesEnabled={subtitlesEnabled}
        onToggleSubtitles={handleToggleSubtitles}
      />
    </main>
  );
}
