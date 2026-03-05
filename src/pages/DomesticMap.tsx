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
    <div className="min-h-screen pt-28 pb-20">
      {/* Background orbs */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[20%] right-[10%] w-80 h-80 bg-gradient-to-br from-sage/15 to-peach/10 rounded-full blur-[80px]" style={{ animation: 'blob-float 12s ease-in-out infinite' }} />
        <div className="absolute bottom-[20%] left-[5%] w-72 h-72 bg-gradient-to-tr from-peach/10 to-lavender/10 rounded-full blur-[60px]" style={{ animation: 'blob-float 10s ease-in-out infinite 3s' }} />
      </div>

      <div className="max-w-6xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-12"
        >
          <p className="text-light-brown/50 text-xs tracking-[0.4em] uppercase font-medium mb-3">Korea Map</p>
          <div className="flex items-center gap-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-gradient">
              Our Korea
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-sand/50 to-transparent" />
          </div>
          <p className="text-light-brown/60 text-sm mt-3">
            함께 방문한 <span className="text-rose font-medium">{markers.length}</span>개의 장소
          </p>
        </motion.div>

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-8 items-start">
          {/* Map */}
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="lg:col-span-3 glass rounded-3xl p-6 md:p-8"
          >
            <KoreaMap markers={markers} />
          </motion.div>

          {/* Location list */}
          <div className="lg:col-span-2 space-y-3">
            {markers.map((m, i) => (
              <motion.div
                key={m.id}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                transition={{ delay: 0.3 + i * 0.08 }}
                className="card-hover glass rounded-2xl p-4 flex items-center gap-4 group"
              >
                <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-rose/20 to-peach/30 flex items-center justify-center shrink-0">
                  <div className="w-2.5 h-2.5 rounded-full bg-rose" />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-medium text-brown text-sm group-hover:text-rose transition-colors truncate">{m.title}</p>
                  <p className="text-xs text-light-brown/50 mt-0.5">{m.place}</p>
                </div>
                <time className="text-xs text-light-brown/40 shrink-0 font-light">{m.date}</time>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
