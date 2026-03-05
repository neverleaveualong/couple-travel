import { useState } from 'react';
import { motion } from 'framer-motion';
import DateCard from '../components/DateCard';
import dates from '../data/dates.json';

const categories = ['all', 'cafe', 'outdoor', 'travel', 'restaurant', 'date'];
const categoryLabels: Record<string, string> = {
  all: '전체',
  cafe: '카페',
  outdoor: '야외',
  travel: '여행',
  restaurant: '맛집',
  date: '데이트',
};

export default function Dates() {
  const [filter, setFilter] = useState('all');

  const filtered = filter === 'all' ? dates : dates.filter(d => d.category === filter);

  return (
    <div className="min-h-screen pt-24 px-6 pb-16">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-12"
        >
          <p className="text-light-brown/60 text-sm tracking-[0.3em] uppercase mb-3">Our Dates</p>
          <h1 className="font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown">
            Date Records
          </h1>
          <p className="text-light-brown/60 text-sm mt-3">
            {dates.length}개의 소중한 기록
          </p>
        </motion.div>

        {/* Filter */}
        <div className="flex flex-wrap justify-center gap-2 mb-10">
          {categories.map((cat) => (
            <button
              key={cat}
              onClick={() => setFilter(cat)}
              className={`px-4 py-2 rounded-full text-xs font-medium transition-all duration-300 ${
                filter === cat
                  ? 'bg-rose text-white shadow-md shadow-rose/20'
                  : 'bg-white/50 text-light-brown hover:bg-white/80 border border-sand/30'
              }`}
            >
              {categoryLabels[cat]}
            </button>
          ))}
        </div>

        {/* Timeline */}
        <div className="relative md:pl-8">
          {/* Timeline line */}
          <div className="absolute left-0 top-0 bottom-0 w-px bg-sand/30 hidden md:block" />

          <div className="space-y-5">
            {filtered.map((d, i) => (
              <DateCard
                key={d.id}
                date={d.date}
                title={d.title}
                place={d.place}
                memo={d.memo}
                category={d.category}
                index={i}
              />
            ))}
          </div>
        </div>

        {filtered.length === 0 && (
          <p className="text-center text-light-brown/50 py-20">아직 기록이 없어요</p>
        )}
      </div>
    </div>
  );
}
