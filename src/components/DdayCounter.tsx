import { useEffect, useState } from 'react';
import { motion } from 'framer-motion';

const START_DATE = new Date('2024-03-14');

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
    <div className="flex flex-col items-center gap-3">
      <p className="text-light-brown text-sm tracking-widest uppercase">Together for</p>
      <div className="flex items-baseline gap-1">
        <span className="font-[family-name:var(--font-display)] text-rose text-2xl font-semibold mr-1">D+</span>
        <div className="flex gap-1.5">
          {digits.map((digit, i) => (
            <motion.span
              key={`${i}-${digit}`}
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: i * 0.1, type: 'spring', stiffness: 200 }}
              className="inline-flex items-center justify-center w-12 h-16 md:w-16 md:h-20 bg-white/60 backdrop-blur-sm rounded-xl shadow-sm border border-sand/30 font-[family-name:var(--font-display)] text-4xl md:text-5xl font-bold text-brown"
            >
              {digit}
            </motion.span>
          ))}
        </div>
      </div>
      <p className="text-light-brown/70 text-xs tracking-wider">
        {START_DATE.getFullYear()}.{String(START_DATE.getMonth() + 1).padStart(2, '0')}.{String(START_DATE.getDate()).padStart(2, '0')} ~
      </p>
    </div>
  );
}
