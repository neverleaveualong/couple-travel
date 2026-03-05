import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const START_DATE = new Date('2024-07-25');

export default function DdayCounter() {
  const [days, setDays] = useState(0);

  useEffect(() => {
    const calc = () => {
      const now = new Date();
      const diff = Math.floor((now.getTime() - START_DATE.getTime()) / (1000 * 60 * 60 * 24));
      setDays(diff + 1);
    };
    calc();
    const interval = setInterval(calc, 60000);
    return () => clearInterval(interval);
  }, []);

  const digits = String(days).split('');

  return (
    <div className="flex flex-col items-center gap-5">
      <div className="flex items-center gap-3">
        <div className="h-px w-12 bg-gradient-to-r from-transparent to-sand" />
        <p className="text-light-brown text-xs tracking-[0.4em] uppercase font-medium">Together</p>
        <div className="h-px w-12 bg-gradient-to-l from-transparent to-sand" />
      </div>

      <div className="flex items-center gap-3">
        <span className="font-[family-name:var(--font-display)] text-rose text-3xl font-semibold italic">D+</span>
        <div className="flex gap-2">
          {digits.map((digit, i) => (
            <motion.span
              key={`${i}-${digit}`}
              initial={{ y: 30, opacity: 0, rotateX: -90 }}
              animate={{ y: 0, opacity: 1, rotateX: 0 }}
              transition={{ delay: i * 0.12, type: 'spring', stiffness: 150, damping: 15 }}
              className="inline-flex items-center justify-center w-14 h-18 md:w-18 md:h-22 glass rounded-2xl shadow-lg shadow-rose/10 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown"
            >
              {digit}
            </motion.span>
          ))}
        </div>
      </div>

      <div className="flex items-center gap-2 text-light-brown/60 text-sm">
        <span className="w-1.5 h-1.5 rounded-full bg-rose/40" />
        <span className="tracking-wider font-light">
          {START_DATE.getFullYear()}.{String(START_DATE.getMonth() + 1).padStart(2, '0')}.{String(START_DATE.getDate()).padStart(2, '0')} ~
        </span>
      </div>
    </div>
  );
}
