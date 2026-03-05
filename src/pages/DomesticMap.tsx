import { motion } from 'framer-motion';
import KoreaMap from '../components/KoreaMap';
import dates from '../data/dates.json';

export default function DomesticMap() {
  const markers = dates.map(d => ({
    id: d.id,
    title: d.title,
    place: d.place,
    lat: d.lat,
    lng: d.lng,
    date: d.date,
  }));

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-4xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-light-brown/60 text-sm tracking-[0.3em] uppercase mb-3">Korea Map</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown">
            Our Korea
          </h1>
          <p className="text-light-brown/60 text-sm mt-3">
            함께 방문한 국내 장소들
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ delay: 0.2 }}
          className="bg-white/40 backdrop-blur-sm rounded-3xl p-6 md:p-10 border border-sand/20"
        >
          <KoreaMap markers={markers} />
        </motion.div>

        {/* Location list */}
        <div className="mt-10 grid grid-cols-1 md:grid-cols-2 gap-4">
          {markers.map((m, i) => (
            <motion.div
              key={m.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="flex items-center gap-3 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-sand/20"
            >
              <div className="w-8 h-8 rounded-full bg-blush/20 flex items-center justify-center shrink-0">
                <div className="w-2.5 h-2.5 rounded-full bg-rose" />
              </div>
              <div className="min-w-0">
                <p className="font-medium text-brown text-sm truncate">{m.title}</p>
                <p className="text-xs text-light-brown/60">{m.place} &middot; {m.date}</p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
