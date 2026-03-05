import { motion } from 'framer-motion';
import WorldMap from '../components/WorldMap';
import travels from '../data/travels.json';

const gradients = [
  'from-rose/20 via-peach/30 to-blush/20',
  'from-lavender/30 via-blush/20 to-peach/20',
  'from-sage/20 via-peach/20 to-lavender/15',
  'from-peach/25 via-rose/15 to-sage/15',
];

export default function Travel() {
  const mapMarkers = travels.map(t => ({
    id: t.id,
    countryKr: t.countryKr,
    city: t.city,
    coordinates: t.coordinates as [number, number],
    date: t.date,
  }));

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[15%] left-[15%] w-96 h-96 bg-gradient-to-br from-lavender/15 to-blush/10 rounded-full blur-[100px]" style={{ animation: 'blob-float 14s ease-in-out infinite' }} />
        <div className="absolute bottom-[10%] right-[10%] w-80 h-80 bg-gradient-to-tl from-peach/15 to-sage/10 rounded-full blur-[80px]" style={{ animation: 'blob-float 11s ease-in-out infinite 4s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-light-brown/50 text-xs tracking-[0.4em] uppercase font-medium mb-3">World Travel</p>
          <div className="flex items-center gap-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-gradient">
              Our World
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-sand/50 to-transparent" />
          </div>
          <p className="text-light-brown/60 text-sm mt-3">
            <span className="text-rose font-medium">{travels.length}</span>개 나라를 함께 여행했어요
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="glass rounded-3xl p-4 md:p-8 mb-12"
        >
          <WorldMap markers={mapMarkers} />
        </motion.div>

        {/* Travel Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {travels.map((t, i) => (
            <motion.div
              key={t.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.15 }}
              className="card-hover glass rounded-3xl overflow-hidden group"
            >
              {/* Gradient header */}
              <div className={`h-36 md:h-44 bg-gradient-to-br ${gradients[i % gradients.length]} relative flex items-center justify-center`}>
                <div className="absolute inset-0 bg-white/10" />
                <div className="relative text-center">
                  <span className="font-[family-name:var(--font-display)] text-5xl md:text-6xl font-bold text-brown/30">
                    {t.countryKr}
                  </span>
                  <p className="text-sm text-brown/40 mt-1 font-medium tracking-wider">{t.country}</p>
                </div>
              </div>

              <div className="p-6">
                <h3 className="text-xl font-semibold text-brown group-hover:text-rose transition-colors">
                  {t.city}, {t.countryKr}
                </h3>
                <div className="flex items-center gap-2 mt-2 text-xs text-light-brown/50">
                  <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  {t.date} ~ {t.endDate}
                </div>
                <p className="text-sm text-light-brown/70 mt-3 leading-relaxed">{t.memo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
