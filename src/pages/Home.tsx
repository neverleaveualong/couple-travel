import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import DdayCounter from '../components/DdayCounter';
import domesticData from '../data/dates.json';
import travels from '../data/travels.json';

const allTravels = [
  ...domesticData.map(d => ({ ...d, type: 'domestic' as const })),
  ...travels.map(t => ({ id: t.id + 100, date: t.date, title: `${t.city}, ${t.countryKr}`, place: t.countryKr, memo: t.memo, type: 'international' as const })),
].sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <section className="relative min-h-[85vh] md:min-h-screen flex items-center justify-center overflow-hidden">
        {/* Animated background orbs */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute top-[10%] right-[15%] w-80 h-80 bg-gradient-to-br from-blush/30 to-peach/20 rounded-full blur-[80px]" style={{ animation: 'blob-float 12s ease-in-out infinite' }} />
          <div className="absolute bottom-[15%] left-[10%] w-96 h-96 bg-gradient-to-tr from-lavender/20 to-blush/15 rounded-full blur-[100px]" style={{ animation: 'blob-float 15s ease-in-out infinite 3s' }} />
          <div className="absolute top-[40%] left-[40%] w-64 h-64 bg-gradient-to-bl from-peach/20 to-sage/10 rounded-full blur-[60px]" style={{ animation: 'blob-float 10s ease-in-out infinite 6s' }} />
        </div>

        {/* Decorative circles */}
        <div className="absolute top-[20%] left-[8%] w-3 h-3 rounded-full bg-rose/20" style={{ animation: 'pulse-soft 4s ease-in-out infinite' }} />
        <div className="absolute top-[35%] right-[12%] w-2 h-2 rounded-full bg-gold/30" style={{ animation: 'pulse-soft 3s ease-in-out infinite 1s' }} />
        <div className="absolute bottom-[30%] left-[20%] w-2 h-2 rounded-full bg-sage/30" style={{ animation: 'pulse-soft 5s ease-in-out infinite 2s' }} />

        <div className="relative z-10 max-w-5xl mx-auto px-6 text-center">
          <motion.div
            initial={{ opacity: 0, y: 40 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 1, ease: [0.22, 1, 0.36, 1] }}
          >
            <p className="text-light-brown/50 text-xs tracking-[0.5em] uppercase mb-8 font-medium">Our Journey Together</p>

            <div className="mb-6">
              <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                <span className="text-gradient">Happy</span>
              </h1>

              <div className="flex items-center justify-center gap-6 my-4 md:my-6">
                <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-sand to-transparent" />
                <motion.span
                  animate={{ scale: [1, 1.15, 1] }}
                  transition={{ duration: 2, repeat: Infinity, ease: 'easeInOut' }}
                  className="text-3xl md:text-4xl text-rose"
                >
                  &hearts;
                </motion.span>
                <div className="h-px w-20 md:w-32 bg-gradient-to-r from-transparent via-sand to-transparent" />
              </div>

              <h1 className="font-[family-name:var(--font-display)] text-6xl md:text-8xl lg:text-9xl font-bold tracking-tight leading-none">
                <span className="text-gradient">Paul</span>
              </h1>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mt-12 md:mt-16"
          >
            <DdayCounter />
          </motion.div>

          {/* Scroll indicator */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 1.2 }}
            className="absolute bottom-8 left-1/2 -translate-x-1/2"
          >
            <motion.div
              animate={{ y: [0, 8, 0] }}
              transition={{ duration: 2, repeat: Infinity }}
              className="w-6 h-10 rounded-full border-2 border-sand/40 flex items-start justify-center p-1.5"
            >
              <div className="w-1 h-2.5 rounded-full bg-rose/50" />
            </motion.div>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="px-6 py-20 md:py-28">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="grid grid-cols-3 gap-4 md:gap-8"
          >
            {[
              { number: domesticData.length, label: '국내여행', sub: 'Domestic', gradient: 'from-peach/60 to-blush/40' },
              { number: travels.length, label: '해외여행', sub: 'International', gradient: 'from-lavender/50 to-blush/30' },
              { number: travels.length, label: '나라', sub: 'Countries', gradient: 'from-sage/40 to-peach/30' },
            ].map((stat, i) => (
              <motion.div
                key={stat.label}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.15 }}
                className="card-hover glass rounded-3xl p-6 md:p-8 text-center relative overflow-hidden"
              >
                <div className={`absolute inset-0 bg-gradient-to-br ${stat.gradient} opacity-30`} />
                <div className="relative z-10">
                  <p className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-brown">{stat.number}</p>
                  <p className="text-sm md:text-base font-medium text-brown/80 mt-2">{stat.label}</p>
                  <p className="text-xs text-light-brown/50 tracking-wider mt-1">{stat.sub}</p>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>

      {/* Recent Travels */}
      <section className="px-6 py-16 md:py-24">
        <div className="max-w-5xl mx-auto">
          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            className="flex items-center gap-4 mb-12"
          >
            <h2 className="font-[family-name:var(--font-display)] text-3xl md:text-5xl font-bold text-gradient">
              Recent Travels
            </h2>
            <div className="flex-1 h-px bg-gradient-to-r from-sand/50 to-transparent" />
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 md:gap-6">
            {allTravels.slice(0, 4).map((d, i) => (
              <motion.div
                key={d.id}
                initial={{ opacity: 0, y: 25 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.1 }}
                className="card-hover glass rounded-2xl p-5 md:p-6 relative overflow-hidden group"
              >
                <div className={`absolute top-0 right-0 w-24 h-24 rounded-bl-[3rem] ${
                  d.type === 'international' ? 'bg-gradient-to-bl from-lavender/30 to-transparent' : 'bg-gradient-to-bl from-peach/30 to-transparent'
                }`} />

                <div className="relative z-10">
                  <div className="flex items-center justify-between mb-3">
                    <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                      d.type === 'international'
                        ? 'bg-lavender/30 text-deep-rose'
                        : 'bg-peach/30 text-brown'
                    }`}>
                      {d.type === 'international' ? 'International' : 'Domestic'}
                    </span>
                    <time className="text-xs text-light-brown/50 font-light">{d.date}</time>
                  </div>

                  <h3 className="text-lg font-semibold text-brown group-hover:text-rose transition-colors">
                    {d.title}
                  </h3>
                  <p className="text-sm text-light-brown/70 mt-1 flex items-center gap-1.5">
                    <svg className="w-3.5 h-3.5 text-rose/50" fill="currentColor" viewBox="0 0 20 20">
                      <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                    </svg>
                    {d.place}
                  </p>
                  {'memo' in d && <p className="text-sm text-light-brown/60 mt-2 leading-relaxed">{d.memo}</p>}
                </div>
              </motion.div>
            ))}
          </div>

          <div className="flex justify-center gap-4 mt-10">
            {[
              { to: '/korea-map', label: 'Korea Map' },
              { to: '/travel', label: 'World Travel' },
            ].map((link) => (
              <Link
                key={link.to}
                to={link.to}
                className="group inline-flex items-center gap-2 px-6 py-3 glass rounded-full text-sm font-medium text-brown hover:text-rose transition-all card-hover"
              >
                {link.label}
                <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="px-6 py-16 text-center">
        <div className="max-w-md mx-auto">
          <div className="h-px w-16 mx-auto bg-gradient-to-r from-transparent via-rose/30 to-transparent mb-8" />
          <p className="font-[family-name:var(--font-display)] text-xl text-light-brown/40 italic leading-relaxed">
            "Every moment with you is a beautiful adventure"
          </p>
          <p className="text-xs text-light-brown/25 mt-6 tracking-[0.3em] uppercase">Happy &hearts; Paul</p>
        </div>
      </footer>
    </div>
  );
}
