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
                fill="#E8DDD0"
                stroke="#D4C5B2"
                strokeWidth={0.5}
                style={{
                  default: { outline: 'none' },
                  hover: { fill: '#D4C5B2', outline: 'none' },
                  pressed: { outline: 'none' },
                }}
              />
            ))
          }
        </Geographies>

        {markers.map((marker, i) => (
          <Marker key={marker.id} coordinates={marker.coordinates}>
            <motion.g
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: i * 0.2, type: 'spring' }}
            >
              <circle r={6} fill="#C5727A" stroke="#FDF6EE" strokeWidth={2} />
              <circle r={10} fill="#E8B4B8" opacity={0.3}>
                <animate attributeName="r" values="8;14;8" dur="3s" repeatCount="indefinite" />
                <animate attributeName="opacity" values="0.3;0;0.3" dur="3s" repeatCount="indefinite" />
              </circle>
              <text
                textAnchor="middle"
                y={-16}
                style={{
                  fontFamily: 'Noto Sans KR',
                  fontSize: '11px',
                  fill: '#5C3D2E',
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
