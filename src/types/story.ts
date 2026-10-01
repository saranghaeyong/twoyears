export interface CharacterConfig {
  id: 'boy' | 'girl' | 'students';
  name: string;
  positionPercent: number; // 0 to 100
  state: 'idle' | 'walking' | 'sitting' | 'talking' | 'looking' | 'holding_umbrella' | 'phone' | 'leaving';
  direction: 'left' | 'right';
  opacity?: number;
}

export interface InspectionItem {
  id: string;
  label: string;
  xPercent: number;
  yPercent: number;
  inspectText: string;
  visited?: boolean;
  requiredToProceed?: boolean;
}

export interface DialogueItem {
  speaker: 'Boy' | 'Girl' | 'Thought' | 'Narrator' | 'Friend';
  text: string;
}

export interface ChoiceOption {
  id: string;
  label: string;
  reactionText: string;
  animationState?: string;
}

export type SceneBackground = 
  | 'pg_room'
  | 'campus_walk'
  | 'first_meeting'
  | 'walking_routine'
  | 'tea_shop'
  | 'rain_road'
  | 'classroom_crush'
  | 'timeline_interactive'
  | 'campus_farewell'
  | 'separation_fork'
  | 'later_work_room'
  | 'social_story_modal'
  | 'memory_revisit'
  | 'final_solitary_walk'
  | 'final_epilogue';

export interface Scene {
  id: string;
  chapterNumber: number;
  chapterTitle: string;
  locationTitle: string;
  timeIndicator?: string;
  backgroundType: SceneBackground;
  characters: CharacterConfig[];
  playableMovement?: {
    enabled: boolean;
    initialPosition: number; // 0 to 100
    targetGoalX?: number;
    goalActionPrompt?: string;
    onReachGoalNextScene?: string;
  };
  inspectionItems?: InspectionItem[];
  dialogue?: DialogueItem[];
  choices?: ChoiceOption[];
  ambientAudio: 'room_morning' | 'campus_day' | 'tea_shop' | 'rain' | 'evening_city' | 'silence';
  musicMood: 'nostalgia' | 'routine' | 'rain' | 'melancholy' | 'acceptance' | 'silence';
  camera?: {
    zoom?: number;
    panX?: number;
  };
  specialMode?: 'normal' | 'phone_messaging' | 'social_story' | 'timeline' | 'final_credits';
  nextSceneId: string | null;
  memoryId?: string;
  memoryTitle?: string;
  memoryMonth?: string;
}

export interface MemorySnapshot {
  id: string;
  title: string;
  month: string;
  year: 'Year 01' | 'Year 02';
  description: string;
  associatedSceneId: string;
  iconType: 'walk' | 'tea' | 'rain' | 'exam' | 'festival' | 'bus' | 'gate' | 'bench';
  unlocked: boolean;
}

export interface StoryProgress {
  currentSceneId: string;
  unlockedMemoryIds: string[];
  hasSeenWeddingStory: boolean;
  soundEnabled: boolean;
  reducedMotion: boolean;
  subtitlesEnabled: boolean;
}
