import { motion } from 'framer-motion';

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

// Simple SVG Korea map outline with marker positioning
// Korea bounding box: lat 33-39, lng 124-132
function latLngToXY(lat: number, lng: number, width: number, height: number) {
  const x = ((lng - 124.5) / (131 - 124.5)) * width;
  const y = ((39.5 - lat) / (39.5 - 33)) * height;
  return { x, y };
}

export default function KoreaMap({ markers }: KoreaMapProps) {
  const width = 400;
  const height = 500;

  return (
    <div className="relative w-full max-w-md mx-auto">
      <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-auto">
        {/* Simplified Korea outline */}
        <path
          d="M180,40 Q200,35 215,45 L230,55 Q245,60 250,75 L255,90 Q258,100 255,115
             L250,130 Q248,140 250,155 L255,170 Q260,185 258,200 L252,215
             Q248,230 250,245 L255,260 Q258,275 252,290 L245,305
             Q240,315 235,330 L228,345 Q222,358 215,368 L205,380
             Q195,390 185,395 L175,398 Q165,400 155,395 L145,388
             Q135,380 130,370 L125,355 Q120,340 118,325 L115,310
             Q112,295 115,280 L118,265 Q120,250 118,235 L115,220
             Q112,205 115,190 L120,175 Q125,160 122,145 L118,130
             Q115,115 120,100 L128,85 Q135,72 145,62 L158,50
             Q168,43 180,40 Z"
          fill="none"
          stroke="#D4C5B2"
          strokeWidth="2"
          opacity="0.6"
        />

        {/* Jeju Island */}
        <ellipse cx="175" cy="470" rx="35" ry="15" fill="none" stroke="#D4C5B2" strokeWidth="2" opacity="0.6" />

        {/* Map markers */}
        {markers.map((marker, i) => {
          const { x, y } = latLngToXY(marker.lat, marker.lng, width, height);
          return (
            <motion.g
              key={marker.id}
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: i * 0.15, type: 'spring', stiffness: 200 }}
            >
              {/* Pulse ring */}
              <circle cx={x} cy={y} r="12" fill="#E8B4B8" opacity="0.2">
                <animate attributeName="r" values="8;16;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Marker dot */}
              <circle cx={x} cy={y} r="6" fill="#C5727A" stroke="#FDF6EE" strokeWidth="2" />
              {/* Label */}
              <text
                x={x}
                y={y - 14}
                textAnchor="middle"
                className="text-[10px] fill-brown font-medium"
                style={{ fontFamily: 'Noto Sans KR' }}
              >
                {marker.place}
              </text>
            </motion.g>
          );
        })}
      </svg>
    </div>
  );
}
