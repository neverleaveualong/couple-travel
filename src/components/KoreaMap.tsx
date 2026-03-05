import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface MapMarker {
  id: number;
  title: string;
  place: string;
  lat: number;
  lng: number;
  date: string;
}

interface KoreaMapProps {
  markers: MapMarker[];
}

// Convert lat/lng to SVG coordinates
// Korea bounding: lat ~33.1 to ~38.6, lng ~125.0 to ~131.9
function latLngToXY(lat: number, lng: number) {
  const x = 50 + ((lng - 125.0) / (131.9 - 125.0)) * 300;
  const y = 25 + ((38.6 - lat) / (38.6 - 33.1)) * 430;
  return { x, y };
}

// Spread overlapping markers apart
function spreadMarkers(markers: MapMarker[]) {
  const positioned = markers.map(m => ({
    ...m,
    ...latLngToXY(m.lat, m.lng),
  }));

  // Push apart markers that are too close
  for (let iter = 0; iter < 5; iter++) {
    for (let i = 0; i < positioned.length; i++) {
      for (let j = i + 1; j < positioned.length; j++) {
        const dx = positioned[j].x - positioned[i].x;
        const dy = positioned[j].y - positioned[i].y;
        const dist = Math.sqrt(dx * dx + dy * dy);
        const minDist = 45;
        if (dist < minDist && dist > 0) {
          const pushX = (dx / dist) * (minDist - dist) * 0.5;
          const pushY = (dy / dist) * (minDist - dist) * 0.5;
          positioned[i].x -= pushX;
          positioned[i].y -= pushY;
          positioned[j].x += pushX;
          positioned[j].y += pushY;
        }
      }
    }
  }
  return positioned;
}

export default function KoreaMap({ markers }: KoreaMapProps) {
  const [active, setActive] = useState<number | null>(null);
  const positioned = spreadMarkers(markers);

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox="0 0 400 500" className="w-full h-auto">
        <defs>
          <linearGradient id="mapFill" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#F5EDE4" />
            <stop offset="100%" stopColor="#EBE0D4" />
          </linearGradient>
          <linearGradient id="mapStroke" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#D9CCBE" />
            <stop offset="100%" stopColor="#C5B5A5" />
          </linearGradient>
          <filter id="markerGlow">
            <feGaussianBlur stdDeviation="4" result="blur" />
            <feMerge>
              <feMergeNode in="blur" />
              <feMergeNode in="SourceGraphic" />
            </feMerge>
          </filter>
          <filter id="softShadow">
            <feDropShadow dx="0" dy="2" stdDeviation="3" floodColor="#8B7265" floodOpacity="0.1" />
          </filter>
        </defs>

        {/* Korea mainland */}
        <path
          d="M195,32 Q212,26 228,35 L242,46 Q252,54 258,65 L264,82 Q268,96 265,112
             L260,130 Q257,142 260,158 L264,172 Q270,188 267,205 L262,222
             Q258,238 260,255 L264,270 Q268,286 262,304 L254,320
             Q248,334 240,348 L232,362 Q224,374 214,384 L202,394
             Q192,402 180,406 L170,410 Q158,414 148,408 L138,398
             Q128,388 122,375 L116,358 Q110,340 108,322 L106,305
             Q103,288 106,272 L110,258 Q114,242 110,228 L106,212
             Q103,198 108,182 L114,168 Q120,152 116,138 L112,122
             Q108,108 114,92 L124,78 Q132,66 144,56 L160,45
             Q172,36 186,32 Z"
          fill="url(#mapFill)"
          stroke="url(#mapStroke)"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#softShadow)"
        />

        {/* Jeju Island */}
        <path
          d="M155,465 Q168,455 185,455 Q202,455 212,462 Q220,470 215,480 Q208,490 192,492 Q176,494 162,488 Q150,480 155,465 Z"
          fill="url(#mapFill)"
          stroke="url(#mapStroke)"
          strokeWidth="2"
          strokeLinejoin="round"
          filter="url(#softShadow)"
        />

        {/* Subtle inner detail lines */}
        <path d="M180,120 Q200,150 190,180 Q175,210 185,240" fill="none" stroke="#D9CCBE" strokeWidth="0.5" opacity="0.4" strokeDasharray="4,6" />
        <path d="M140,200 Q170,220 160,260 Q150,290 165,320" fill="none" stroke="#D9CCBE" strokeWidth="0.5" opacity="0.3" strokeDasharray="4,6" />

        {/* Marker connection lines */}
        {positioned.map((m) => {
          const orig = latLngToXY(m.lat, m.lng);
          if (Math.abs(m.x - orig.x) > 2 || Math.abs(m.y - orig.y) > 2) {
            return (
              <line
                key={`conn-${m.id}`}
                x1={orig.x} y1={orig.y}
                x2={m.x} y2={m.y}
                stroke="#D4808A"
                strokeWidth="1"
                opacity="0.2"
                strokeDasharray="3,3"
              />
            );
          }
          return null;
        })}

        {/* Markers */}
        {positioned.map((m, i) => {
          const isActive = active === m.id;
          return (
            <motion.g
              key={m.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.12, type: 'spring', stiffness: 180 }}
            >
              {/* Pulse ring */}
              <circle cx={m.x} cy={m.y} r="10" fill="#D4808A" opacity="0.08">
                <animate attributeName="r" values="6;18;6" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.15;0;0.15" dur="3s" begin={`${i * 0.6}s`} repeatCount="indefinite" />
              </circle>

              {/* Outer ring */}
              <circle
                cx={m.x} cy={m.y} r={isActive ? 10 : 8}
                fill="none"
                stroke="#D4808A"
                strokeWidth="1.5"
                opacity={isActive ? 0.5 : 0.2}
                style={{ transition: 'all 0.3s' }}
              />

              {/* Inner dot */}
              <circle
                cx={m.x} cy={m.y} r="5"
                fill={isActive ? '#B85A64' : '#D4808A'}
                stroke="#FFF9F5"
                strokeWidth="2.5"
                className="cursor-pointer"
                filter={isActive ? "url(#markerGlow)" : undefined}
                onMouseEnter={() => setActive(m.id)}
                onMouseLeave={() => setActive(null)}
                onClick={() => setActive(isActive ? null : m.id)}
                style={{ transition: 'fill 0.3s' }}
              />

              {/* Label */}
              <text
                x={m.x}
                y={m.y - 18}
                textAnchor="middle"
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: isActive ? '12px' : '10px',
                  fill: isActive ? '#D4808A' : '#4A3228',
                  fontWeight: isActive ? 600 : 400,
                  opacity: isActive ? 1 : 0.7,
                  transition: 'all 0.3s',
                }}
              >
                {m.place}
              </text>
            </motion.g>
          );
        })}
      </svg>

      {/* Tooltip */}
      <AnimatePresence>
        {active && (() => {
          const marker = markers.find(m => m.id === active);
          if (!marker) return null;
          return (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 8, scale: 0.95 }}
              className="absolute bottom-2 left-1/2 -translate-x-1/2 glass-strong rounded-2xl px-5 py-3 shadow-lg shadow-brown/10 text-center"
            >
              <p className="font-semibold text-brown text-sm">{marker.title}</p>
              <p className="text-xs text-light-brown/50 mt-0.5">{marker.place} &middot; {marker.date}</p>
            </motion.div>
          );
        })()}
      </AnimatePresence>
    </div>
  );
}
