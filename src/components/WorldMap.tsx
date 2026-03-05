import { ComposableMap, Geographies, Geography, Marker } from 'react-simple-maps';
import { motion } from 'framer-motion';

const GEO_URL = "https://cdn.jsdelivr.net/npm/world-atlas@2/countries-110m.json";

interface TravelMarker {
  id: number;
  countryKr: string;
  city: string;
  coordinates: [number, number];
  date: string;
}

interface WorldMapProps {
  markers: TravelMarker[];
}

export default function WorldMap({ markers }: WorldMapProps) {
  return (
    <div className="w-full max-w-4xl mx-auto">
      <ComposableMap
        projection="geoMercator"
        projectionConfig={{
          scale: 140,
          center: [30, 20],
        }}
        style={{ width: '100%', height: 'auto' }}
      >
        <Geographies geography={GEO_URL}>
          {({ geographies }) =>
            geographies.map((geo) => (
              <Geography
                key={geo.rpiKey || geo.id || geo.properties?.name}
                geography={geo}
                fill="#EDE3D8"
                stroke="#D9CCBE"
                strokeWidth={0.4}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#DDD3C6', outline: 'none', transition: 'fill 0.3s' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {markers.map((marker, i) => (
          <Marker key={marker.id} coordinates={marker.coordinates}>
            <motion.g
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.3 + i * 0.2, type: 'spring', stiffness: 200 }}
            >
              {/* Pulse */}
              <circle r={10} fill="#D4808A" opacity={0.15}>
                <animate attributeName="r" values="6;14;6" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.2;0;0.2" dur="3s" repeatCount="indefinite" />
              </circle>
              {/* Outer ring */}
              <circle r={8} fill="none" stroke="#D4808A" strokeWidth={1} opacity={0.3} />
              {/* Dot */}
              <circle r={4.5} fill="#D4808A" stroke="#FFF9F5" strokeWidth={2} />
              {/* Label */}
              <text
                textAnchor="middle"
                y={-18}
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: '11px',
                  fill: '#4A3228',
                  fontWeight: 500,
                }}
              >
                {marker.city}
              </text>
            </motion.g>
          </Marker>
        ))}
      </ComposableMap>
    </div>
  );
}
