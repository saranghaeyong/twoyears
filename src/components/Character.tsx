import React from 'react';
import { CharacterConfig } from '../types/story';

interface CharacterProps {
  config: CharacterConfig;
  isMoving?: boolean;
}

export const Character: React.FC<CharacterProps> = ({ config, isMoving = false }) => {
  const { id, state, direction, opacity = 1 } = config;
  const isWalking = state === 'walking' || isMoving;
  const isGirl = id === 'girl';
  const isStudents = id === 'students';

  if (isStudents) {
    return (
      <div
        className="absolute bottom-16 pointer-events-none transition-all duration-700 select-none"
        style={{
          left: `${config.positionPercent}%`,
          opacity,
          transform: `translateX(-50%) scaleX(${direction === 'left' ? -1 : 1})`,
        }}
      >
        <svg width="120" height="180" viewBox="0 0 120 180" className="drop-shadow-md">
          {/* Background student silhouettes */}
          <g opacity="0.6">
            <ellipse cx="40" cy="172" rx="20" ry="4" fill="#000000" opacity="0.3" />
            {/* Student 1 */}
            <circle cx="40" cy="40" r="14" fill="#3f4553" />
            <path d="M 28 54 Q 40 50 52 54 L 54 110 L 26 110 Z" fill="#2c3340" />
            <rect x="29" y="110" width="9" height="58" fill="#1e222d" rx="4" />
            <rect x="42" y="110" width="9" height="58" fill="#1e222d" rx="4" />
            {/* Student 2 */}
            <circle cx="80" cy="48" r="13" fill="#4d443d" />
            <path d="M 68 62 Q 80 58 92 62 L 94 114 L 66 114 Z" fill="#634832" />
            <rect x="69" y="114" width="8" height="54" fill="#2d2218" rx="4" />
            <rect x="83" y="114" width="8" height="54" fill="#2d2218" rx="4" />
          </g>
        </svg>
      </div>
    );
  }

  // BOY OR GIRL CHARACTER
  return (
    <div
      className={`absolute bottom-14 pointer-events-none transition-all duration-500 select-none ${
        state === 'leaving' ? 'transition-all duration-[3000ms] opacity-20 scale-75' : ''
      }`}
      style={{
        left: `${config.positionPercent}%`,
        opacity,
        transform: `translateX(-50%) scaleX(${direction === 'left' ? -1 : 1})`,
      }}
    >
      <div className={`relative ${isWalking ? 'animate-bounce' : 'animate-drift'}`} style={{ animationDuration: isWalking ? '0.6s' : '4s' }}>
        {/* Shadow */}
        <div
          className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-20 h-4 bg-black/40 rounded-full blur-[2px] transition-all"
          style={{ transform: `translateX(-50%) scale(${state === 'sitting' ? 1.2 : 1})` }}
        />

        {/* Character SVG */}
        <svg
          width="130"
          height="230"
          viewBox="0 0 130 230"
          className="overflow-visible drop-shadow-lg"
        >
          {isGirl ? (
            /* GIRL CHARACTER */
            <g id="girl-figure">
              {/* Rain umbrella if holding */}
              {state === 'holding_umbrella' && (
                <g className="animate-drift" style={{ animationDuration: '3s' }}>
                  <path d="M 15 25 Q 65 -15 115 25 Z" fill="#9333ea" opacity="0.9" />
                  <path d="M 65 25 L 65 95" stroke="#4a044e" strokeWidth="3" strokeLinecap="round" />
                  <path d="M 65 95 Q 65 105 57 103" fill="none" stroke="#4a044e" strokeWidth="3" />
                </g>
              )}

              {/* Legs */}
              {state === 'sitting' ? (
                <g>
                  {/* Seated legs */}
                  <path d="M 52 145 L 85 148 L 86 195" stroke="#334155" strokeWidth="12" strokeLinecap="round" fill="none" />
                  <path d="M 45 145 L 78 148 L 78 195" stroke="#1e293b" strokeWidth="12" strokeLinecap="round" fill="none" />
                  {/* Shoes */}
                  <ellipse cx="86" cy="196" rx="9" ry="5" fill="#0f172a" />
                  <ellipse cx="78" cy="196" rx="9" ry="5" fill="#0f172a" />
                </g>
              ) : (
                <g>
                  {/* Standing / walking legs */}
                  <g className={isWalking ? 'animate-pulse' : ''}>
                    {/* Left Leg */}
                    <path
                      d={isWalking ? "M 48 140 Q 42 170 38 205" : "M 48 140 L 44 205"}
                      stroke="#475569"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <ellipse cx={isWalking ? "36" : "42"} cy="207" rx="8" ry="4" fill="#0f172a" />

                    {/* Right Leg */}
                    <path
                      d={isWalking ? "M 62 140 Q 68 170 74 205" : "M 62 140 L 64 205"}
                      stroke="#334155"
                      strokeWidth="11"
                      strokeLinecap="round"
                    />
                    <ellipse cx={isWalking ? "76" : "66"} cy="207" rx="8" ry="4" fill="#0f172a" />
                  </g>
                </g>
              )}

              {/* Torso & Kurta / Top */}
              <g>
                {/* Traditional mustard/terracotta kurta */}
                <path
                  d="M 38 75 Q 55 70 72 75 L 78 142 Q 55 146 32 142 Z"
                  fill="#c2410c"
                />
                {/* Subtle border / embroidery slit */}
                <line x1="55" y1="74" x2="55" y2="105" stroke="#ea580c" strokeWidth="2" />
                <path d="M 32 120 L 32 142" stroke="#9a3412" strokeWidth="2" />
                <path d="M 78 120 L 78 142" stroke="#9a3412" strokeWidth="2" />

                {/* Shoulder bag strap */}
                <path d="M 42 75 Q 58 105 72 135" stroke="#78350f" strokeWidth="3" fill="none" />
                <rect x="68" y="125" width="22" height="28" rx="4" fill="#854d0e" />
              </g>

              {/* Head & Hair */}
              <g>
                {/* Neck */}
                <rect x="50" y="58" width="10" height="18" fill="#fbcfe8" rx="3" />
                {/* Head */}
                <circle cx="55" cy="46" r="16" fill="#fde68a" />
                {/* Hair - long dark tied or shoulder-length */}
                <path
                  d="M 39 46 C 39 26 71 26 71 46 C 71 58 68 76 68 76 C 68 76 64 54 55 54 C 46 54 42 76 42 76 C 42 76 39 58 39 46 Z"
                  fill="#1c1917"
                />
                {/* Front bangs & gentle profile */}
                <path d="M 40 40 Q 55 34 68 42" stroke="#1c1917" strokeWidth="4" fill="none" />
                {/* Discrete ear & earring */}
                <circle cx="43" cy="48" r="2.5" fill="#fde68a" />
                <circle cx="43" cy="51" r="1" fill="#f59e0b" />
              </g>
            </g>
          ) : (
            /* BOY CHARACTER */
            <g id="boy-figure">
              {/* Rain umbrella if holding */}
              {state === 'holding_umbrella' && (
                <g className="animate-drift" style={{ animationDuration: '3s' }}>
                  <path d="M 15 20 Q 65 -20 115 20 Z" fill="#1e293b" opacity="0.95" />
                  <path d="M 65 20 L 65 92" stroke="#0f172a" strokeWidth="3.5" strokeLinecap="round" />
                  <path d="M 65 92 Q 65 102 57 100" fill="none" stroke="#0f172a" strokeWidth="3.5" />
                </g>
              )}

              {/* Legs */}
              {state === 'sitting' ? (
                <g>
                  {/* Seated legs */}
                  <path d="M 50 142 L 80 145 L 80 196" stroke="#1e293b" strokeWidth="13" strokeLinecap="round" fill="none" />
                  <path d="M 42 142 L 72 145 L 72 196" stroke="#0f172a" strokeWidth="13" strokeLinecap="round" fill="none" />
                  {/* Sneakers */}
                  <ellipse cx="80" cy="198" rx="10" ry="5" fill="#cbd5e1" />
                  <ellipse cx="72" cy="198" rx="10" ry="5" fill="#94a3b8" />
                </g>
              ) : (
                <g>
                  {/* Standing / walking legs */}
                  <g className={isWalking ? 'animate-pulse' : ''}>
                    {/* Left Leg */}
                    <path
                      d={isWalking ? "M 48 138 Q 40 170 36 205" : "M 46 138 L 44 205"}
                      stroke="#1e293b"
                      strokeWidth="13"
                      strokeLinecap="round"
                    />
                    <ellipse cx={isWalking ? "34" : "42"} cy="207" rx="9" ry="4" fill="#e2e8f0" />

                    {/* Right Leg */}
                    <path
                      d={isWalking ? "M 62 138 Q 70 170 76 205" : "M 64 138 L 66 205"}
                      stroke="#0f172a"
                      strokeWidth="13"
                      strokeLinecap="round"
                    />
                    <ellipse cx={isWalking ? "78" : "68"} cy="207" rx="9" ry="4" fill="#94a3b8" />
                  </g>
                </g>
              )}

              {/* Backpack (behind back) */}
              <rect x="28" y="76" width="16" height="46" rx="6" fill="#047857" opacity="0.9" />
              <path d="M 36 78 Q 48 88 48 120" stroke="#065f46" strokeWidth="3" fill="none" />

              {/* Torso & Shirt */}
              <g>
                {/* Navy / Steel overshirt */}
                <path
                  d="M 38 72 Q 55 68 72 72 L 74 138 Q 55 140 36 138 Z"
                  fill="#1e3a8a"
                />
                {/* Collar */}
                <polygon points="48,72 55,86 42,76" fill="#172554" />
                <polygon points="62,72 55,86 68,76" fill="#172554" />
                {/* Inner white tee */}
                <polygon points="50,72 55,84 60,72" fill="#e2e8f0" />

                {/* Arms */}
                {state === 'phone' ? (
                  <g>
                    {/* Holding phone in front */}
                    <path d="M 40 85 L 56 108 L 62 102" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" fill="none" />
                    {/* Glowing phone */}
                    <rect x="58" y="94" width="10" height="16" rx="2" fill="#38bdf8" className="animate-pulse" />
                  </g>
                ) : (
                  <path d="M 40 82 L 36 128" stroke="#1e3a8a" strokeWidth="8" strokeLinecap="round" />
                )}
              </g>

              {/* Head & Hair */}
              <g>
                {/* Neck */}
                <rect x="50" y="56" width="10" height="18" fill="#fde68a" rx="2" />
                {/* Head */}
                <circle cx="55" cy="45" r="16" fill="#fde68a" />
                {/* Short messy black hair */}
                <path
                  d="M 38 44 C 38 24 72 24 72 44 C 70 34 60 28 55 28 C 48 28 42 34 38 44 Z"
                  fill="#09090b"
                />
                {/* Sideburn & subtle facial line */}
                <path d="M 42 42 L 42 48" stroke="#09090b" strokeWidth="3" />
                {/* Discrete ear */}
                <circle cx="43" cy="46" r="2.5" fill="#fde68a" />
              </g>
            </g>
          )}
        </svg>
      </div>
    </div>
  );
};
