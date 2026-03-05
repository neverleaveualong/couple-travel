import { motion } from 'framer-motion';
import WorldMap from '../components/WorldMap';
import travels from '../data/travels.json';

export default function Travel() {
  const mapMarkers = travels.map(t => ({
    id: t.id,
    countryKr: t.countryKr,
    city: t.city,
    coordinates: t.coordinates as [number, number],
    date: t.date,
  }));

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-light-brown/60 text-sm tracking-[0.3em] uppercase mb-3">World Travel</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown">
            Our World
          </h1>
          <p className="text-light-brown/60 text-sm mt-3">
            {travels.length}개 나라를 함께 여행했어요
          </p>
        </motion.div>

        {/* World Map */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-4 md:p-8 border border-sand/20 mb-12"
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
              className="group bg-white/50 backdrop-blur-sm rounded-2xl overflow-hidden border border-sand/20 hover:border-blush/40 hover:shadow-lg hover:shadow-blush/10 transition-all duration-500"
            >
              {/* Color banner */}
              <div className="h-32 bg-gradient-to-br from-blush/40 via-rose/20 to-sage/30 flex items-center justify-center">
                <span className="font-[family-name:var(--font-display)] text-5xl font-bold text-white/80">
                  {t.countryKr}
                </span>
              </div>

              <div className="p-6">
                <div className="flex items-center justify-between mb-3">
                  <h3 className="text-lg font-semibold text-brown">
                    {t.city}, {t.countryKr}
                  </h3>
                </div>
                <p className="text-xs text-light-brown/60 mb-3">
                  {t.date} ~ {t.endDate}
                </p>
                <p className="text-sm text-light-brown/80 leading-relaxed">{t.memo}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
