import { motion } from 'framer-motion';

interface DateCardProps {
  date: string;
  title: string;
  place: string;
  memo: string;
  category: string;
  index: number;
}

const categoryColors: Record<string, string> = {
  cafe: 'bg-gold/20 text-gold',
  outdoor: 'bg-sage/30 text-sage',
  travel: 'bg-blush/30 text-rose',
  restaurant: 'bg-rose/15 text-deep-rose',
  date: 'bg-blush/20 text-rose',
};

const categoryLabels: Record<string, string> = {
  cafe: 'Cafe',
  outdoor: 'Outdoor',
  travel: 'Travel',
  restaurant: 'Restaurant',
  date: 'Date',
};

export default function DateCard({ date, title, place, memo, category, index }: DateCardProps) {
  const colorClass = categoryColors[category] || 'bg-sand/20 text-light-brown';

  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: '-50px' }}
      transition={{ delay: index * 0.08, duration: 0.5 }}
      className="group relative bg-white/50 backdrop-blur-sm rounded-2xl p-6 border border-sand/20 hover:border-blush/40 hover:shadow-lg hover:shadow-blush/10 transition-all duration-500"
    >
      {/* Timeline dot */}
      <div className="absolute -left-[2.1rem] top-8 w-3 h-3 rounded-full bg-blush border-2 border-cream hidden md:block" />

      <div className="flex flex-col gap-3">
        <div className="flex items-center justify-between">
          <time className="text-xs text-light-brown/70 tracking-wider font-light">{date}</time>
          <span className={`text-xs px-3 py-1 rounded-full font-medium ${colorClass}`}>
            {categoryLabels[category] || category}
          </span>
        </div>

        <h3 className="text-lg font-semibold text-brown group-hover:text-rose transition-colors duration-300">
          {title}
        </h3>

        <div className="flex items-center gap-1.5 text-sm text-light-brown">
          <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
          {place}
        </div>

        <p className="text-sm text-light-brown/80 leading-relaxed">{memo}</p>
      </div>
    </motion.div>
  );
}
