import { useState } from 'react';
import { motion } from 'framer-motion';
import plans from '../data/plans.json';

export default function Plans() {
  const [checkedItems, setCheckedItems] = useState<Set<number>>(new Set());

  const toggleCheck = (id: number) => {
    setCheckedItems(prev => {
      const next = new Set(prev);
      if (next.has(id)) next.delete(id);
      else next.add(id);
      return next;
    });
  };

  const daysUntil = (dateStr: string) => {
    const target = new Date(dateStr);
    const now = new Date();
    return Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
  };

  return (
    <div className="min-h-screen pt-28 pb-20">
      {/* Background */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute top-[25%] right-[20%] w-72 h-72 bg-gradient-to-br from-gold/10 to-peach/15 rounded-full blur-[80px]" style={{ animation: 'blob-float 12s ease-in-out infinite' }} />
        <div className="absolute bottom-[15%] left-[15%] w-80 h-80 bg-gradient-to-tr from-sage/10 to-lavender/10 rounded-full blur-[60px]" style={{ animation: 'blob-float 10s ease-in-out infinite 3s' }} />
      </div>

      <div className="max-w-4xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="mb-14"
        >
          <p className="text-light-brown/50 text-xs tracking-[0.4em] uppercase font-medium mb-3">Future Plans</p>
          <div className="flex items-center gap-4">
            <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-6xl font-bold text-gradient">
              Our Plans
            </h1>
            <div className="flex-1 h-px bg-gradient-to-r from-sand/50 to-transparent" />
          </div>
        </motion.div>

        {/* Upcoming */}
        <section className="mb-16">
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-rose/20 to-peach/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-rose" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brown">Upcoming</h2>
          </div>

          <div className="space-y-4">
            {plans.upcoming.map((plan, i) => {
              const dLeft = daysUntil(plan.date);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.1 }}
                  className="card-hover glass rounded-2xl p-6 relative overflow-hidden"
                >
                  <div className={`absolute top-0 right-0 w-32 h-32 rounded-bl-[4rem] ${
                    plan.type === 'domestic' ? 'bg-gradient-to-bl from-sage/15 to-transparent' : 'bg-gradient-to-bl from-lavender/15 to-transparent'
                  }`} />

                  <div className="relative flex flex-col md:flex-row md:items-center justify-between gap-5">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-3">
                        <span className={`text-xs px-3 py-1.5 rounded-full font-medium ${
                          plan.type === 'domestic'
                            ? 'bg-sage/15 text-sage'
                            : 'bg-lavender/20 text-deep-rose'
                        }`}>
                          {plan.type === 'domestic' ? 'Domestic' : 'International'}
                        </span>
                        <h3 className="text-lg font-semibold text-brown">{plan.title}</h3>
                      </div>
                      <div className="flex items-center gap-1.5 text-sm text-light-brown/60">
                        <svg className="w-3.5 h-3.5 text-rose/50" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z" clipRule="evenodd" />
                        </svg>
                        {plan.place}
                      </div>
                      <p className="text-xs text-light-brown/40 mt-1">{plan.date} ~ {plan.endDate}</p>
                      <p className="text-sm text-light-brown/70 mt-2">{plan.memo}</p>
                    </div>

                    <div className="shrink-0 glass rounded-2xl px-6 py-4 text-center min-w-[100px]">
                      {dLeft > 0 ? (
                        <>
                          <p className="font-[family-name:var(--font-display)] text-4xl font-bold text-rose">{dLeft}</p>
                          <p className="text-xs text-light-brown/50 mt-1 tracking-wider">days left</p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-sage">Done!</p>
                      )}
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </section>

        {/* Bucket List */}
        <section>
          <div className="flex items-center gap-3 mb-8">
            <div className="w-8 h-8 rounded-xl bg-gradient-to-br from-gold/20 to-peach/30 flex items-center justify-center">
              <svg className="w-4 h-4 text-gold" fill="currentColor" viewBox="0 0 20 20">
                <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
              </svg>
            </div>
            <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brown">Bucket List</h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
            {plans.bucketList.map((item, i) => {
              const checked = checkedItems.has(item.id) || item.done;
              return (
                <motion.button
                  key={item.id}
                  initial={{ opacity: 0, y: 15 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.05 }}
                  onClick={() => toggleCheck(item.id)}
                  className={`card-hover flex items-center gap-4 p-4 rounded-2xl text-left transition-all duration-300 ${
                    checked ? 'glass bg-sage/5' : 'glass'
                  }`}
                >
                  <div className={`w-6 h-6 rounded-lg border-2 shrink-0 flex items-center justify-center transition-all ${
                    checked
                      ? 'border-sage bg-sage'
                      : 'border-sand/50 hover:border-rose/50'
                  }`}>
                    {checked && (
                      <motion.svg
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        className="w-3.5 h-3.5 text-white"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </motion.svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-all ${checked ? 'line-through text-light-brown/40' : 'text-brown'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-light-brown/40 mt-0.5">{item.place}</p>
                  </div>
                </motion.button>
              );
            })}
          </div>
        </section>
      </div>
    </div>
  );
}
