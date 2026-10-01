import React, { useState, useEffect } from 'react';
import { audioEngine } from '../services/audioEngine';
import { X, Heart, Send, Volume2, VolumeX } from 'lucide-react';

interface SocialStoryViewerProps {
  onClose: () => void;
}

export const SocialStoryViewer: React.FC<SocialStoryViewerProps> = ({ onClose }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [progress, setProgress] = useState(0);
  const [isMuted, setIsMuted] = useState(false);

  const slides = [
    {
      id: 1,
      title: 'Haldi & Sangeet',
      tagline: 'Yellow marigolds & laughter ✨',
      date: '4h ago',
      contentSvg: (
        <svg viewBox="0 0 360 560" className="w-full h-full">
          {/* Warm festive background */}
          <rect width="360" height="560" fill="#451a03" />
          <radialGradient id="haldiGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#f59e0b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#451a03" stopOpacity="0" />
          </radialGradient>
          <rect width="360" height="560" fill="url(#haldiGlow)" />

          {/* Marigold Torans / Strings */}
          {[40, 90, 140, 190, 240, 290, 340].map((x, i) => (
            <g key={i}>
              <circle cx={x} cy={60} r="8" fill="#f59e0b" />
              <circle cx={x} cy={80} r="8" fill="#ea580c" />
              <circle cx={x} cy={100} r="8" fill="#f59e0b" />
              <circle cx={x} cy={120} r="8" fill="#ea580c" />
            </g>
          ))}

          {/* Illustrated Figures - Bride laughing with family */}
          <g transform="translate(180, 310)">
            <ellipse cx="0" cy="180" rx="90" ry="16" fill="#000000" opacity="0.3" />
            {/* Yellow Kurta / Anarkali */}
            <path d="M -30 -30 Q 0 -40 30 -30 L 60 140 Q 0 160 -60 140 Z" fill="#eab308" />
            {/* Haldi marks on cheek */}
            <circle cx="0" cy="-75" r="28" fill="#fed7aa" />
            {/* Hair with yellow marigolds */}
            <path d="M -28 -75 C -28 -110 28 -110 28 -75 C 28 -50 20 -20 20 -20 C 20 -20 0 -55 -28 -75 Z" fill="#1c1917" />
            <circle cx="22" cy="-70" r="5" fill="#f59e0b" />
            {/* Smiling eyes */}
            <path d="M -12 -76 Q -7 -80 -2 -76" stroke="#451a03" strokeWidth="2.5" fill="none" />
            <path d="M 6 -76 Q 11 -80 16 -76" stroke="#451a03" strokeWidth="2.5" fill="none" />
            {/* Smile */}
            <path d="M -8 -64 Q 2 -58 12 -64" stroke="#991b1b" strokeWidth="2.5" fill="none" />
          </g>

          <text x="180" y="500" textAnchor="middle" fill="#fef08a" fontSize="15" fontFamily="var(--font-serif)" fontStyle="italic">
            "Surrounded by family and sunshine."
          </text>
        </svg>
      ),
    },
    {
      id: 2,
      title: 'The Wedding Vows',
      tagline: 'Forever & always 💍🕊️',
      date: '3h ago',
      contentSvg: (
        <svg viewBox="0 0 360 560" className="w-full h-full">
          {/* Rich crimson wedding mandap */}
          <rect width="360" height="560" fill="#2d080a" />
          <radialGradient id="mandapGlow" cx="50%" cy="40%" r="50%">
            <stop offset="0%" stopColor="#991b1b" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#1a0506" stopOpacity="0" />
          </radialGradient>
          <rect width="360" height="560" fill="url(#mandapGlow)" />

          {/* Floral Mandap Canopy */}
          <path d="M 20 80 Q 180 50 340 80" stroke="#fecdd3" strokeWidth="14" fill="none" opacity="0.6" />
          <line x1="60" y1="80" x2="60" y2="400" stroke="#7f1d1d" strokeWidth="6" />
          <line x1="300" y1="80" x2="300" y2="400" stroke="#7f1d1d" strokeWidth="6" />

          {/* Bride and Groom in Traditional Attire */}
          {/* Groom (Left) */}
          <g transform="translate(130, 290)">
            <circle cx="0" cy="-70" r="24" fill="#fed7aa" />
            {/* Turban / Safa */}
            <ellipse cx="0" cy="-84" rx="26" ry="14" fill="#991b1b" />
            <rect x="0" y="-96" width="4" height="14" fill="#fbbf24" />
            {/* Cream Sherwani */}
            <path d="M -26 -35 Q 0 -40 26 -35 L 32 120 Q 0 125 -32 120 Z" fill="#fef3c7" stroke="#d97706" strokeWidth="1.5" />
            {/* Varmala (Garland) */}
            <path d="M -20 -30 Q 0 20 20 -30" stroke="#ea580c" strokeWidth="7" fill="none" />
          </g>

          {/* Bride (Right) */}
          <g transform="translate(230, 300)">
            <circle cx="0" cy="-70" r="23" fill="#fed7aa" />
            {/* Traditional bridal red dupatta draped over hair */}
            <path d="M -28 -75 C -28 -115 28 -115 28 -75 C 28 -20 38 110 38 110 L -38 110 Z" fill="#b91c1c" />
            {/* Red Bridal Silk Saree / Lehenga */}
            <path d="M -24 -35 Q 0 -40 24 -35 L 42 120 Q 0 130 -42 120 Z" fill="#991b1b" />
            {/* Gold zari embroidery border */}
            <line x1="-30" y1="110" x2="30" y2="110" stroke="#fbbf24" strokeWidth="4" />
            {/* Varmala (Garland) */}
            <path d="M -18 -30 Q 0 20 18 -30" stroke="#ea580c" strokeWidth="7" fill="none" />
            {/* Jasmine flowers in hair */}
            <circle cx="20" cy="-80" r="4" fill="#ffffff" />
            <circle cx="23" cy="-74" r="4" fill="#ffffff" />
            <circle cx="24" cy="-68" r="4" fill="#ffffff" />
          </g>

          {/* Joined Hands with ceremonial knot */}
          <circle cx="180" cy="335" r="9" fill="#fed7aa" />
          <path d="M 160 330 Q 180 345 200 330" stroke="#ea580c" strokeWidth="4" fill="none" />

          {/* Subtle text */}
          <text x="180" y="475" textAnchor="middle" fill="#fed7aa" fontSize="16" fontFamily="var(--font-serif)">
            Mr. & Mrs.
          </text>
          <text x="180" y="500" textAnchor="middle" fill="#fca5a5" fontSize="12" letterSpacing="2">
            08 · OCTOBER · 20XY
          </text>
        </svg>
      ),
    },
    {
      id: 3,
      title: 'Reception Dinner',
      tagline: 'Thank you for making our day unforgettable.',
      date: '1h ago',
      contentSvg: (
        <svg viewBox="0 0 360 560" className="w-full h-full">
          {/* Midnight blue reception banquet */}
          <rect width="360" height="560" fill="#090d16" />
          {/* Bokeh lights */}
          <circle cx="50" cy="120" r="30" fill="#fef08a" opacity="0.1" />
          <circle cx="310" cy="180" r="40" fill="#fef08a" opacity="0.08" />
          <circle cx="180" cy="80" r="25" fill="#38bdf8" opacity="0.12" />

          {/* Couple portrait silhouettes */}
          <g transform="translate(180, 280)">
            {/* Husband in dark tuxedo */}
            <g transform="translate(-40, 0)">
              <circle cx="0" cy="-60" r="22" fill="#fed7aa" />
              <path d="M -22 -30 Q 0 -35 22 -30 L 26 120 L -26 120 Z" fill="#0f172a" />
              <polygon points="-4,-20 0,-10 4,-20" fill="#ffffff" />
            </g>
            {/* Wife in elegant pastel saree */}
            <g transform="translate(40, 10)">
              <circle cx="0" cy="-60" r="21" fill="#fed7aa" />
              <path d="M -20 -30 Q 0 -35 20 -30 L 32 120 L -32 120 Z" fill="#475569" />
              <path d="M -16 -25 Q 15 20 28 80" stroke="#94a3b8" strokeWidth="8" fill="none" opacity="0.7" />
            </g>
          </g>

          <text x="180" y="470" textAnchor="middle" fill="#e2e8f0" fontSize="14" fontStyle="italic" fontFamily="var(--font-serif)">
            "To new journeys and quiet beginnings."
          </text>
        </svg>
      ),
    },
  ];

  // Auto-progress slides
  useEffect(() => {
    setProgress(0);
    const stepInterval = setInterval(() => {
      setProgress(p => {
        if (p >= 100) {
          if (currentSlide < slides.length - 1) {
            setCurrentSlide(c => c + 1);
            return 0;
          } else {
            return 100;
          }
        }
        return p + 2;
      });
    }, 120);

    return () => clearInterval(stepInterval);
  }, [currentSlide, slides.length]);

  return (
    <div className="absolute inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-2 sm:p-4 select-none">
      {/* Mobile Story Container */}
      <div className="w-full max-w-sm h-[92vh] max-h-[640px] bg-black rounded-3xl overflow-hidden relative shadow-2xl flex flex-col border border-white/10">
        {/* Top Progress Bars */}
        <div className="absolute top-3 left-4 right-4 z-20 flex gap-1.5">
          {slides.map((_, idx) => (
            <div key={idx} className="h-1 flex-1 bg-white/30 rounded-full overflow-hidden">
              <div
                className="h-full bg-white transition-all duration-100"
                style={{
                  width:
                    idx < currentSlide
                      ? '100%'
                      : idx === currentSlide
                      ? `${progress}%`
                      : '0%',
                }}
              />
            </div>
          ))}
        </div>

        {/* Story Header */}
        <div className="absolute top-6 left-4 right-4 z-20 flex items-center justify-between text-white drop-shadow">
          <div className="flex items-center gap-2.5">
            {/* Story Ring */}
            <div className="w-9 h-9 rounded-full p-0.5 bg-gradient-to-tr from-amber-500 via-rose-500 to-purple-600">
              <div className="w-full h-full rounded-full bg-neutral-900 border border-black flex items-center justify-center font-bold text-xs text-amber-200">
                A
              </div>
            </div>
            <div>
              <div className="flex items-center gap-1.5">
                <span className="text-xs font-semibold">ananya.r</span>
                <span className="text-[10px] text-white/70">· {slides[currentSlide].date}</span>
              </div>
              <p className="text-[11px] text-white/80">{slides[currentSlide].title}</p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            <button
              onClick={() => {
                const nextMuted = !isMuted;
                setIsMuted(nextMuted);
                audioEngine.setMuted(nextMuted);
              }}
              className="p-1.5 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
            >
              {isMuted ? <VolumeX className="w-4 h-4 text-white" /> : <Volume2 className="w-4 h-4 text-white" />}
            </button>
            <button
              onClick={onClose}
              className="p-1.5 bg-black/40 rounded-full hover:bg-black/60 transition-colors"
            >
              <X className="w-4 h-4 text-white" />
            </button>
          </div>
        </div>

        {/* Story Content Area */}
        <div className="flex-1 relative overflow-hidden">
          {slides[currentSlide].contentSvg}

          {/* Left / Right Tap zones */}
          <div
            className="absolute top-0 bottom-20 left-0 w-1/3 z-10 cursor-pointer"
            onClick={() => {
              if (currentSlide > 0) setCurrentSlide(c => c - 1);
            }}
          />
          <div
            className="absolute top-0 bottom-20 right-0 w-1/3 z-10 cursor-pointer"
            onClick={() => {
              if (currentSlide < slides.length - 1) {
                setCurrentSlide(c => c + 1);
              } else {
                onClose();
              }
            }}
          />
        </div>

        {/* Bottom Bar */}
        <div className="p-3 bg-gradient-to-t from-black via-black/80 to-transparent z-20 flex items-center justify-between gap-3">
          <div className="flex-1 bg-white/10 backdrop-blur-md rounded-full px-4 py-2 text-xs text-white/60 border border-white/10">
            Send a silent prayer...
          </div>
          <Heart className="w-6 h-6 text-white/80" />
          <Send className="w-5 h-5 text-white/80" />
        </div>

        {/* Close & Continue Action Prompt */}
        <div className="bg-neutral-950 px-4 py-3 border-t border-neutral-800 text-center">
          <button
            onClick={() => {
              audioEngine.playClick();
              onClose();
            }}
            className="w-full py-2 bg-stone-200 hover:bg-white text-stone-900 rounded-lg text-xs font-semibold tracking-wider uppercase transition-colors"
          >
            Close Story · Continue
          </button>
        </div>
      </div>
    </div>
  );
};
