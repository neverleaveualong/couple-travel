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
    const diff = Math.ceil((target.getTime() - now.getTime()) / (1000 * 60 * 60 * 24));
    return diff;
  };

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-light-brown/60 text-sm tracking-[0.3em] uppercase mb-3">Future Plans</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown">
            Our Plans
          </h1>
        </motion.div>

        {/* Upcoming */}
        <section className="mb-16">
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brown mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-rose/10 flex items-center justify-center text-rose text-sm">&#x25B6;</span>
            Upcoming
          </h2>

          <div className="space-y-4">
            {plans.upcoming.map((plan, i) => {
              const dLeft = daysUntil(plan.date);
              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: i * 0.1 }}
                  className="bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/20 hover:border-blush/30 transition-all duration-300"
                >
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div className="flex-1">
                      <div className="flex items-center gap-3 mb-2">
                        <span className={`text-xs px-3 py-1 rounded-full font-medium ${
                          plan.type === 'domestic'
                            ? 'bg-sage/20 text-sage'
                            : 'bg-blush/20 text-rose'
                        }`}>
                          {plan.type === 'domestic' ? '국내' : '해외'}
                        </span>
                        <h3 className="text-lg font-semibold text-brown">{plan.title}</h3>
                      </div>
                      <p className="text-sm text-light-brown/70">{plan.place}</p>
                      <p className="text-xs text-light-brown/50 mt-1">{plan.date} ~ {plan.endDate}</p>
                      <p className="text-sm text-light-brown/80 mt-2">{plan.memo}</p>
                    </div>

                    <div className="shrink-0 text-center bg-cream rounded-xl px-5 py-3 border border-sand/20">
                      {dLeft > 0 ? (
                        <>
                          <p className="font-[family-name:var(--font-display)] text-3xl font-bold text-rose">{dLeft}</p>
                          <p className="text-xs text-light-brown/60">days left</p>
                        </>
                      ) : (
                        <p className="text-sm font-medium text-sage">Completed</p>
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
          <h2 className="font-[family-name:var(--font-display)] text-2xl font-bold text-brown mb-6 flex items-center gap-3">
            <span className="w-8 h-8 rounded-full bg-gold/10 flex items-center justify-center text-gold text-sm">&#x2606;</span>
            Bucket List
          </h2>

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
                  className={`flex items-center gap-3 p-4 rounded-xl border text-left transition-all duration-300 ${
                    checked
                      ? 'bg-sage/10 border-sage/30'
                      : 'bg-white/40 border-sand/20 hover:border-blush/30'
                  }`}
                >
                  <div className={`w-5 h-5 rounded-full border-2 shrink-0 flex items-center justify-center transition-all ${
                    checked
                      ? 'border-sage bg-sage'
                      : 'border-sand'
                  }`}>
                    {checked && (
                      <svg className="w-3 h-3 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    )}
                  </div>
                  <div>
                    <p className={`text-sm font-medium transition-all ${checked ? 'line-through text-light-brown/50' : 'text-brown'}`}>
                      {item.title}
                    </p>
                    <p className="text-xs text-light-brown/50">{item.place}</p>
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
