import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DdayCounter from '../components/DdayCounter';
import dates from '../data/dates.json';
import travels from '../data/travels.json';

export default function Home() {
  return (
    <div className="min-h-screen pt-20">
      {/* Hero Section */}
      <section className="relative px-6 py-20 md:py-32 overflow-hidden">
        {/* Background blobs */}
        <div className="absolute top-10 right-10 w-72 h-72 bg-blush/20 rounded-full blur-3xl" style={{ animation: 'blob-float 8s ease-in-out infinite' }} />
        <div className="absolute bottom-10 left-10 w-64 h-64 bg-sage/15 rounded-full blur-3xl" style={{ animation: 'blob-float 8s ease-in-out infinite 2s' }} />
        <div className="absolute top-1/2 left-1/2 w-48 h-48 bg-gold/10 rounded-full blur-3xl" style={{ animation: 'blob-float 8s ease-in-out infinite 4s' }} />

        <div className="relative max-w-4xl mx-auto text-center">
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-light-brown/60 text-sm tracking-[0.3em] uppercase mb-4"
          >
            Our Love Story
          </motion.p>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.1 }}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-brown mb-2 tracking-tight"
          >
            Na Gyeom
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, scale: 0.5 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5, delay: 0.3 }}
            className="flex items-center justify-center gap-4 my-4"
          >
            <div className="h-px w-16 bg-sand" />
            <span className="font-[family-name:var(--font-display)] text-3xl text-rose italic">&</span>
            <div className="h-px w-16 bg-sand" />
          </motion.div>

          <motion.h1
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.2 }}
            className="font-[family-name:var(--font-display)] text-5xl md:text-7xl lg:text-8xl font-bold text-brown mb-12 tracking-tight"
          >
            Woo Hyun
          </motion.h1>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
          >
            <DdayCounter />
          </motion.div>
        </div>
      </section>

      {/* Quick Stats */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto grid grid-cols-2 md:grid-cols-4 gap-6">
          {[
            { number: dates.length, label: '데이트', icon: '&#x2665;', link: '/dates' },
            { number: travels.length, label: '해외여행', icon: '&#x2708;', link: '/travel' },
            { number: new Set(dates.map(d => d.place)).size, label: '방문한 곳', icon: '&#x25C9;', link: '/korea-map' },
            { number: travels.length, label: '나라', icon: '&#x2691;', link: '/travel' },
          ].map((stat, i) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
            >
              <Link
                to={stat.link}
                className="block bg-white/40 backdrop-blur-sm rounded-2xl p-6 text-center border border-sand/20 hover:border-blush/40 hover:shadow-lg hover:shadow-blush/5 transition-all duration-500"
              >
                <span className="text-2xl" dangerouslySetInnerHTML={{ __html: stat.icon }} />
                <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-brown mt-2">{stat.number}</p>
                <p className="text-xs text-light-brown/70 mt-1 tracking-wider">{stat.label}</p>
              </Link>
            </motion.div>
          ))}
        </div>
      </section>

      {/* Recent Timeline */}
      <section className="px-6 py-16">
        <div className="max-w-4xl mx-auto">
          <motion.h2
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="font-[family-name:var(--font-display)] text-3xl md:text-4xl font-bold text-center mb-12"
          >
            Recent Memories
          </motion.h2>

          <div className="space-y-4">
            {dates.slice(-3).reverse().map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, x: i % 2 === 0 ? -20 : 20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="flex items-center gap-4 bg-white/40 backdrop-blur-sm rounded-xl p-4 border border-sand/20"
              >
                <div className="w-2 h-2 rounded-full bg-rose shrink-0" />
                <div className="flex-1 min-w-0">
                  <p className="font-medium text-brown truncate">{d.title}</p>
                  <p className="text-xs text-light-brown/70">{d.place}</p>
                </div>
                <time className="text-xs text-light-brown/50 shrink-0">{d.date}</time>
              </motion.div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Link
              to="/dates"
              className="inline-flex items-center gap-2 text-sm text-rose hover:text-deep-rose transition-colors font-medium"
            >
              View all memories
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-12 text-center border-t border-sand/20">
        <p className="font-[family-name:var(--font-display)] text-lg text-light-brown/50 italic">
          "Every moment with you is a beautiful adventure"
        </p>
        <p className="text-xs text-light-brown/30 mt-4 tracking-wider">Na Gyeom & Woo Hyun</p>
      </footer>
    </div>
  );
}
