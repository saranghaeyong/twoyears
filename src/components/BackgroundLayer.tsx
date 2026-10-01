import React from 'react';
import { SceneBackground } from '../types/story';

interface BackgroundLayerProps {
  type: SceneBackground;
  isNostalgic?: boolean;
}

export const BackgroundLayer: React.FC<BackgroundLayerProps> = ({ type, isNostalgic = false }) => {
  return (
    <div className={`absolute inset-0 w-full h-full overflow-hidden select-none ${isNostalgic ? 'memory-sepia' : ''}`}>
      {/* 1. PG ROOM */}
      {type === 'pg_room' && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="wallGrad" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#2c2a29" />
              <stop offset="100%" stopColor="#181716" />
            </linearGradient>
            <linearGradient id="sunbeam" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#fef08a" stopOpacity="0.25" />
              <stop offset="100%" stopColor="#fef08a" stopOpacity="0.0" />
            </linearGradient>
            <linearGradient id="floorGrad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#352e2b" />
              <stop offset="100%" stopColor="#1e1a18" />
            </linearGradient>
          </defs>

          {/* Wall & Floor */}
          <rect width="1000" height="420" fill="url(#wallGrad)" />
          <rect y="420" width="1000" height="180" fill="url(#floorGrad)" />
          <line x1="0" y1="420" x2="1000" y2="420" stroke="#141211" strokeWidth="3" />

          {/* Ceiling Fan */}
          <g transform="translate(500, 30)">
            <rect x="-3" y="0" width="6" height="40" fill="#44403c" />
            <circle cx="0" cy="40" r="14" fill="#292524" />
            <g className="animate-fan" style={{ transformOrigin: '0px 40px' }}>
              <ellipse cx="0" cy="40" rx="90" ry="12" fill="#57534e" opacity="0.85" />
              <ellipse cx="0" cy="40" rx="12" ry="90" fill="#57534e" opacity="0.85" />
            </g>
          </g>

          {/* Window on right */}
          <g transform="translate(740, 90)">
            {/* Window frame */}
            <rect x="0" y="0" width="180" height="230" fill="#7dd3fc" opacity="0.3" stroke="#52525b" strokeWidth="8" rx="4" />
            {/* Morning Sky through window */}
            <rect x="8" y="8" width="164" height="214" fill="#38bdf8" opacity="0.2" />
            {/* Window panes */}
            <line x1="90" y1="8" x2="90" y2="222" stroke="#52525b" strokeWidth="4" />
            <line x1="8" y1="115" x2="172" y2="115" stroke="#52525b" strokeWidth="4" />
            {/* Distant building silhouette */}
            <rect x="30" y="140" width="50" height="80" fill="#0c4a6e" opacity="0.3" />
            <rect x="95" y="120" width="60" height="100" fill="#075985" opacity="0.3" />
            {/* Curtains swaying */}
            <path
              d="M 0 0 Q -25 110 5 230 L 30 230 Q 5 110 35 0 Z"
              fill="#cbd5e1"
              opacity="0.7"
              className="animate-curtain"
            />
            <path
              d="M 180 0 Q 205 110 175 230 L 150 230 Q 175 110 145 0 Z"
              fill="#cbd5e1"
              opacity="0.7"
              className="animate-curtain"
            />
          </g>

          {/* Sunbeam pouring across room */}
          <polygon points="760,110 1000,560 620,560 740,110" fill="url(#sunbeam)" pointerEvents="none" />

          {/* Bed on the left */}
          <g transform="translate(30, 360)">
            <rect x="0" y="40" width="220" height="60" rx="4" fill="#3f3f46" stroke="#27272a" strokeWidth="4" />
            {/* Bed Mattress & Sheet */}
            <rect x="6" y="25" width="208" height="26" rx="3" fill="#0284c7" />
            {/* Folded blanket */}
            <rect x="110" y="22" width="100" height="30" rx="4" fill="#0369a1" />
            {/* Pillow */}
            <rect x="14" y="16" width="55" height="22" rx="6" fill="#f8fafc" />
            {/* Bed legs */}
            <rect x="10" y="100" width="8" height="40" fill="#18181b" />
            <rect x="202" y="100" width="8" height="40" fill="#18181b" />
          </g>

          {/* Study Desk & Chair */}
          <g transform="translate(340, 340)">
            {/* Table top */}
            <rect x="0" y="40" width="180" height="14" rx="2" fill="#78350f" stroke="#451a03" strokeWidth="2" />
            {/* Table legs */}
            <rect x="10" y="54" width="8" height="90" fill="#451a03" />
            <rect x="162" y="54" width="8" height="90" fill="#451a03" />
            {/* Books stack on desk */}
            <rect x="18" y="22" width="42" height="7" rx="1" fill="#dc2626" />
            <rect x="16" y="29" width="46" height="6" rx="1" fill="#2563eb" />
            <rect x="14" y="35" width="50" height="6" rx="1" fill="#16a34a" />
            {/* Anglepoise lamp */}
            <path d="M 140 40 L 134 16 L 152 4" stroke="#e2e8f0" strokeWidth="3" fill="none" />
            <polygon points="144,4 162,0 156,14" fill="#f59e0b" />
            {/* Stool */}
            <rect x="60" y="80" width="60" height="10" rx="2" fill="#92400e" />
            <line x1="70" y1="90" x2="65" y2="140" stroke="#78350f" strokeWidth="4" />
            <line x1="110" y1="90" x2="115" y2="140" stroke="#78350f" strokeWidth="4" />
          </g>

          {/* Wooden Door on the far left */}
          <g transform="translate(100, 140)">
            <rect x="0" y="0" width="110" height="280" fill="#451a03" stroke="#271102" strokeWidth="6" rx="2" />
            {/* Panels */}
            <rect x="16" y="20" width="78" height="100" fill="#5c2605" rx="2" />
            <rect x="16" y="145" width="78" height="115" fill="#5c2605" rx="2" />
            {/* Brass Handle */}
            <circle cx="28" cy="142" r="5" fill="#fbbf24" />
          </g>
        </svg>
      )}

      {/* 2. CAMPUS WALK / FIRST MEETING / WALKING ROUTINE */}
      {(type === 'campus_walk' || type === 'first_meeting' || type === 'walking_routine') && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="skyDay" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" />
              <stop offset="40%" stopColor="#bae6fd" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
            <linearGradient id="roadAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#334155" />
              <stop offset="100%" stopColor="#1e293b" />
            </linearGradient>
          </defs>

          {/* Sky */}
          <rect width="1000" height="380" fill="url(#skyDay)" />

          {/* Distant Campus Architecture / Clock Tower */}
          <g opacity="0.45" transform="translate(680, 160)">
            <rect x="40" y="20" width="60" height="180" fill="#64748b" />
            <polygon points="70,0 35,20 105,20" fill="#475569" />
            <circle cx="70" cy="50" r="12" fill="#f8fafc" />
            {/* Archway wing */}
            <rect x="-80" y="100" width="120" height="100" fill="#64748b" />
            <path d="M -50 140 A 20 20 0 0 1 -10 140 L -10 200 L -50 200 Z" fill="#334155" />
          </g>

          {/* Gulmohar & Neem Trees Canopy */}
          <g opacity="0.85">
            {/* Left Big Tree */}
            <path d="M -40 380 Q 40 280 20 150 Q 80 80 160 140 Q 240 180 200 380 Z" fill="#14532d" />
            <path d="M 60 110 Q 120 40 190 90 Q 240 60 270 120 Q 200 180 60 110 Z" fill="#15803d" />
            {/* Orange Gulmohar blossoms */}
            <circle cx="110" cy="90" r="14" fill="#ea580c" opacity="0.7" />
            <circle cx="180" cy="75" r="16" fill="#f97316" opacity="0.75" />
            <circle cx="150" cy="120" r="12" fill="#ea580c" opacity="0.7" />

            {/* Tree Trunk */}
            <path d="M 70 380 Q 90 280 85 180" stroke="#451a03" strokeWidth="24" strokeLinecap="round" fill="none" />
          </g>

          {/* College Brick Boundary Wall */}
          <rect y="320" width="1000" height="70" fill="#7f1d1d" stroke="#450a0a" strokeWidth="3" />
          {/* Wall pillars */}
          <rect x="220" y="300" width="25" height="90" fill="#991b1b" />
          <rect x="520" y="300" width="25" height="90" fill="#991b1b" />
          <rect x="820" y="300" width="25" height="90" fill="#991b1b" />

          {/* Electric pole & wires */}
          <line x1="380" y1="120" x2="380" y2="390" stroke="#334155" strokeWidth="6" />
          <line x1="350" y1="140" x2="410" y2="140" stroke="#334155" strokeWidth="4" />
          <path d="M 0 140 Q 380 180 1000 130" stroke="#1e293b" strokeWidth="1.5" fill="none" opacity="0.7" />

          {/* Sidewalk & Kerb */}
          <rect y="390" width="1000" height="40" fill="#64748b" />
          <line x1="0" y1="430" x2="1000" y2="430" stroke="#475569" strokeWidth="4" />

          {/* Road Surface */}
          <rect y="430" width="1000" height="170" fill="url(#roadAsphalt)" />
          {/* Broken Center Yellow Line */}
          <line x1="80" y1="520" x2="220" y2="520" stroke="#fbbf24" strokeWidth="5" strokeDasharray="60 40" opacity="0.8" />
          <line x1="380" y1="520" x2="520" y2="520" stroke="#fbbf24" strokeWidth="5" strokeDasharray="60 40" opacity="0.8" />
          <line x1="680" y1="520" x2="820" y2="520" stroke="#fbbf24" strokeWidth="5" strokeDasharray="60 40" opacity="0.8" />

          {/* Dropped papers in first meeting */}
          {type === 'first_meeting' && (
            <g transform="translate(500, 480)" className="animate-pulse">
              <rect x="-15" y="-10" width="28" height="20" rx="1" fill="#f8fafc" stroke="#cbd5e1" strokeWidth="1" transform="rotate(-12)" />
              <rect x="0" y="-5" width="26" height="18" rx="1" fill="#ffffff" stroke="#cbd5e1" strokeWidth="1" transform="rotate(18)" />
              <line x1="-8" y1="-4" x2="8" y2="-4" stroke="#94a3b8" strokeWidth="1" />
              <line x1="-8" y1="2" x2="4" y2="2" stroke="#94a3b8" strokeWidth="1" />
            </g>
          )}
        </svg>
      )}

      {/* 3. TEA SHOP */}
      {type === 'tea_shop' && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="eveningSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="50%" stopColor="#b45309" />
              <stop offset="100%" stopColor="#fef08a" />
            </linearGradient>
          </defs>

          {/* Dusk Sky */}
          <rect width="1000" height="380" fill="url(#eveningSky)" />

          {/* Distant Trees & Road */}
          <rect y="380" width="1000" height="220" fill="#1c1917" />
          <line x1="0" y1="440" x2="1000" y2="440" stroke="#292524" strokeWidth="3" />

          {/* Tea Stall Structure (Left & Center) */}
          <g transform="translate(60, 160)">
            {/* Corrugated Tin Roof */}
            <polygon points="-40,60 520,30 490,90 -20,120" fill="#475569" stroke="#334155" strokeWidth="3" />
            {/* Wooden Support Pillars */}
            <rect x="20" y="100" width="14" height="340" fill="#78350f" />
            <rect x="440" y="80" width="14" height="360" fill="#78350f" />

            {/* Tea Shop Counter */}
            <rect x="180" y="240" width="280" height="150" fill="#854d0e" stroke="#582f07" strokeWidth="4" rx="3" />
            {/* Shelf with glass biscuit jars */}
            <rect x="200" y="210" width="240" height="10" fill="#451a03" />
            <rect x="215" y="170" width="28" height="40" rx="4" fill="#93c5fd" opacity="0.6" stroke="#bfdbfe" strokeWidth="2" />
            <rect x="255" y="170" width="28" height="40" rx="4" fill="#93c5fd" opacity="0.6" stroke="#bfdbfe" strokeWidth="2" />
            <rect x="295" y="170" width="28" height="40" rx="4" fill="#93c5fd" opacity="0.6" stroke="#bfdbfe" strokeWidth="2" />

            {/* Brass Tea Kettle with rising steam */}
            <g transform="translate(390, 185)">
              <ellipse cx="25" cy="40" rx="22" ry="16" fill="#d97706" />
              <rect x="15" y="16" width="20" height="12" fill="#b45309" />
              <path d="M 8 36 Q -6 20 4 10" stroke="#b45309" strokeWidth="5" fill="none" />
              {/* Animated steam */}
              <path
                d="M 22 10 Q 18 0 24 -10 Q 30 -20 22 -30"
                stroke="#ffffff"
                strokeWidth="2.5"
                fill="none"
                opacity="0.6"
                className="animate-pulse"
              />
            </g>

            {/* Wooden Bench where Boy & Girl sit */}
            <rect x="-20" y="320" width="160" height="14" rx="2" fill="#92400e" stroke="#713f12" strokeWidth="2" />
            <rect x="0" y="334" width="8" height="70" fill="#582f07" />
            <rect x="110" y="334" width="8" height="70" fill="#582f07" />

            {/* Tea Glasses on table */}
            <rect x="70" y="302" width="14" height="20" rx="2" fill="#bae6fd" opacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            <rect x="90" y="302" width="14" height="20" rx="2" fill="#bae6fd" opacity="0.8" stroke="#38bdf8" strokeWidth="1" />
            {/* Chai fill in glasses */}
            <rect x="72" y="308" width="10" height="12" fill="#b45309" />
            <rect x="92" y="308" width="10" height="12" fill="#b45309" />

            {/* Hanging warm yellow bulb */}
            <line x1="280" y1="70" x2="280" y2="130" stroke="#18181b" strokeWidth="2" />
            <circle cx="280" cy="136" r="8" fill="#fef08a" />
            <circle cx="280" cy="136" r="45" fill="#fef08a" opacity="0.15" />
          </g>
        </svg>
      )}

      {/* 4. RAIN ROAD */}
      {type === 'rain_road' && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="rainSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#0f172a" />
              <stop offset="60%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#334155" />
            </linearGradient>
            <linearGradient id="wetAsphalt" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e293b" />
              <stop offset="100%" stopColor="#090d16" />
            </linearGradient>
          </defs>

          {/* Dark Monsoon Sky */}
          <rect width="1000" height="380" fill="url(#rainSky)" />

          {/* Distant wet trees in silhouette */}
          <path d="M 0 380 Q 200 300 400 350 Q 700 280 1000 380 Z" fill="#0f172a" opacity="0.8" />

          {/* Wet Reflective Road */}
          <rect y="380" width="1000" height="220" fill="url(#wetAsphalt)" />

          {/* Puddle reflections */}
          <ellipse cx="320" cy="480" rx="90" ry="18" fill="#38bdf8" opacity="0.15" />
          <ellipse cx="680" cy="510" rx="140" ry="24" fill="#38bdf8" opacity="0.15" />
          <ellipse cx="500" cy="540" rx="120" ry="16" fill="#fef08a" opacity="0.1" />

          {/* Distant car headlight beams cutting through rain */}
          <polygon points="120,400 0,440 0,480 120,410" fill="#fef08a" opacity="0.12" />

          {/* Rain Streaks Layer */}
          <g stroke="#93c5fd" strokeWidth="1.2" opacity="0.45" strokeDasharray="30 15">
            <line x1="40" y1="0" x2="20" y2="600" className="animate-pulse" />
            <line x1="120" y1="0" x2="90" y2="600" />
            <line x1="200" y1="0" x2="180" y2="600" className="animate-pulse" />
            <line x1="290" y1="0" x2="270" y2="600" />
            <line x1="380" y1="0" x2="360" y2="600" className="animate-pulse" />
            <line x1="480" y1="0" x2="450" y2="600" />
            <line x1="580" y1="0" x2="560" y2="600" className="animate-pulse" />
            <line x1="680" y1="0" x2="660" y2="600" />
            <line x1="770" y1="0" x2="740" y2="600" className="animate-pulse" />
            <line x1="860" y1="0" x2="840" y2="600" />
            <line x1="940" y1="0" x2="910" y2="600" className="animate-pulse" />
          </g>

          {/* Water ripples on ground */}
          <ellipse cx="260" cy="460" rx="16" ry="4" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.4" />
          <ellipse cx="640" cy="490" rx="20" ry="5" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.4" />
          <ellipse cx="480" cy="530" rx="18" ry="4" stroke="#93c5fd" strokeWidth="1" fill="none" opacity="0.4" />
        </svg>
      )}

      {/* 5. CAMPUS FAREWELL / SEPARATION FORK */}
      {(type === 'campus_farewell' || type === 'separation_fork') && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="farewellSunset" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#431407" />
              <stop offset="40%" stopColor="#9a3412" />
              <stop offset="75%" stopColor="#f97316" />
              <stop offset="100%" stopColor="#fde047" />
            </linearGradient>
          </defs>

          {/* Amber / Orange Sunset Sky */}
          <rect width="1000" height="390" fill="url(#farewellSunset)" />

          {/* Giant Setting Sun */}
          <circle cx="500" cy="360" r="90" fill="#fef08a" opacity="0.35" />

          {/* The Road Fork */}
          <g>
            {/* Ground / Hills */}
            <rect y="390" width="1000" height="210" fill="#1c1917" />

            {/* Left Road Branch (Straight to PG) */}
            <polygon points="460,390 520,390 320,600 160,600" fill="#292524" />

            {/* Right Road Branch (Curving toward Railway Junction) */}
            <polygon points="500,390 540,390 880,600 740,600" fill="#292524" />

            {/* Fork Divider Island */}
            <polygon points="510,390 620,600 420,600" fill="#18181b" />

            {/* Lamppost at the junction */}
            <line x1="510" y1="240" x2="510" y2="440" stroke="#52525b" strokeWidth="6" />
            <path d="M 480 240 Q 510 210 540 240" stroke="#52525b" strokeWidth="4" fill="none" />
            <circle cx="510" cy="245" r="7" fill="#fde047" />
            <circle cx="510" cy="245" r="32" fill="#fde047" opacity="0.2" />
          </g>

          {/* Farewell Banner on Campus if type === 'campus_farewell' */}
          {type === 'campus_farewell' && (
            <g transform="translate(300, 160)">
              <path d="M 0 40 Q 200 70 400 40" stroke="#f8fafc" strokeWidth="30" fill="none" opacity="0.9" />
              <text x="200" y="58" textAnchor="middle" fill="#0f172a" fontSize="16" fontWeight="bold" letterSpacing="4">
                FAREWELL BATCH 20XX
              </text>
            </g>
          )}
        </svg>
      )}

      {/* 6. LATER WORK ROOM / 2 YEARS LATER */}
      {type === 'later_work_room' && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="nightSky" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#020617" />
              <stop offset="100%" stopColor="#0f172a" />
            </linearGradient>
            <linearGradient id="monitorGlow" x1="0%" y1="0%" x2="100%" y2="100%">
              <stop offset="0%" stopColor="#38bdf8" stopOpacity="0.2" />
              <stop offset="100%" stopColor="#38bdf8" stopOpacity="0.0" />
            </linearGradient>
          </defs>

          {/* Wall & Modern floor */}
          <rect width="1000" height="430" fill="#0f172a" />
          <rect y="430" width="1000" height="170" fill="#020617" />
          <line x1="0" y1="430" x2="1000" y2="430" stroke="#1e293b" strokeWidth="2" />

          {/* Large Panoramic City Window on Right */}
          <g transform="translate(620, 40)">
            <rect x="0" y="0" width="340" height="350" fill="url(#nightSky)" stroke="#334155" strokeWidth="6" rx="4" />
            {/* Distant City Skyscrapers */}
            <rect x="30" y="160" width="45" height="184" fill="#1e293b" />
            <rect x="85" y="110" width="60" height="234" fill="#0f172a" />
            <rect x="155" y="140" width="50" height="204" fill="#1e293b" />
            <rect x="215" y="80" width="70" height="264" fill="#0f172a" />
            <rect x="295" y="180" width="40" height="164" fill="#1e293b" />
            {/* Twinkling Windows */}
            <g fill="#fef08a" opacity="0.6">
              <rect x="95" y="130" width="4" height="6" />
              <rect x="110" y="150" width="4" height="6" />
              <rect x="230" y="110" width="4" height="6" />
              <rect x="250" y="130" width="4" height="6" />
              <rect x="230" y="170" width="4" height="6" />
              <rect x="165" y="160" width="4" height="6" />
            </g>
          </g>

          {/* Modern Work Desk in center */}
          <g transform="translate(260, 310)">
            {/* Sleek desk top */}
            <rect x="0" y="80" width="340" height="16" rx="3" fill="#334155" stroke="#1e293b" strokeWidth="2" />
            {/* Minimalist steel legs */}
            <rect x="20" y="96" width="6" height="110" fill="#64748b" />
            <rect x="314" y="96" width="6" height="110" fill="#64748b" />

            {/* Laptop open with screen glow */}
            <g transform="translate(130, 20)">
              <polygon points="0,60 80,60 70,5 10,5" fill="#1e293b" stroke="#475569" strokeWidth="1" />
              {/* Screen glow */}
              <polygon points="12,8 68,8 78,58 2,58" fill="#38bdf8" opacity="0.4" />
              {/* Base */}
              <rect x="-10" y="58" width="100" height="5" rx="1" fill="#475569" />
            </g>

            {/* Cone of monitor light */}
            <polygon points="170,30 380,180 80,180" fill="url(#monitorGlow)" pointerEvents="none" />

            {/* Ceramic coffee mug */}
            <rect x="250" y="60" width="16" height="20" rx="2" fill="#e2e8f0" />
            <path d="M 266 65 Q 274 70 266 75" stroke="#e2e8f0" strokeWidth="2.5" fill="none" />

            {/* Smartphone lying flat, vibrating */}
            <g transform="translate(80, 72)" className="animate-pulse">
              <rect x="0" y="0" width="22" height="11" rx="2" fill="#0284c7" stroke="#e0f2fe" strokeWidth="1" />
            </g>

            {/* Ergonomic mesh chair silhouette */}
            <g transform="translate(140, 70)" opacity="0.7">
              <rect x="15" y="0" width="40" height="50" rx="6" fill="#1e293b" />
              <rect x="32" y="50" width="6" height="50" fill="#475569" />
              <polygon points="15,100 55,100 35,90" fill="#334155" />
            </g>
          </g>
        </svg>
      )}

      {/* 7. FINAL SOLITARY WALK */}
      {type === 'final_solitary_walk' && (
        <svg viewBox="0 0 1000 600" preserveAspectRatio="xMidYMid slice" className="w-full h-full">
          <defs>
            <linearGradient id="twilightRoad" x1="0%" y1="0%" x2="0%" y2="100%">
              <stop offset="0%" stopColor="#1e1b4b" />
              <stop offset="45%" stopColor="#312e81" />
              <stop offset="75%" stopColor="#4338ca" />
              <stop offset="100%" stopColor="#fb923c" />
            </linearGradient>
          </defs>

          {/* Twilight Horizon */}
          <rect width="1000" height="380" fill="url(#twilightRoad)" />

          {/* Distant Quiet Avenue Canopy */}
          <path d="M 0 380 Q 250 240 500 340 Q 750 230 1000 380 Z" fill="#0f172a" opacity="0.9" />

          {/* Peaceful Road with Amber Streetlights */}
          <rect y="380" width="1000" height="220" fill="#18181b" />
          <line x1="0" y1="480" x2="1000" y2="480" stroke="#3f3f46" strokeWidth="2" strokeDasharray="30 40" />

          {/* Recurring Streetlights */}
          {[180, 480, 780].map((x, i) => (
            <g key={i} transform={`translate(${x}, 180)`}>
              <line x1="0" y1="0" x2="0" y2="200" stroke="#52525b" strokeWidth="5" />
              <path d="M -20 0 Q 0 -15 20 0" stroke="#52525b" strokeWidth="4" fill="none" />
              <circle cx="0" cy="5" r="6" fill="#fef08a" />
              <circle cx="0" cy="5" r="40" fill="#fef08a" opacity="0.15" />
              {/* Soft cone on ground */}
              <ellipse cx="0" cy="220" rx="55" ry="12" fill="#fef08a" opacity="0.08" />
            </g>
          ))}
        </svg>
      )}

      {/* Subtle Dust / Ambient Floating Particles */}
      <div className="absolute inset-0 pointer-events-none opacity-40">
        <div className="w-1.5 h-1.5 bg-amber-100/40 rounded-full absolute top-1/4 left-1/5 animate-drift" />
        <div className="w-1 h-1 bg-amber-100/30 rounded-full absolute top-1/3 left-2/3 animate-drift" style={{ animationDelay: '1.5s' }} />
        <div className="w-2 h-2 bg-amber-100/25 rounded-full absolute top-1/2 left-1/3 animate-drift" style={{ animationDelay: '3s' }} />
        <div className="w-1 h-1 bg-amber-100/35 rounded-full absolute top-2/3 left-4/5 animate-drift" style={{ animationDelay: '2s' }} />
      </div>

      {/* Cinematic Vignette */}
      <div className="absolute inset-0 vignette-overlay pointer-events-none" />
    </div>
  );
};
