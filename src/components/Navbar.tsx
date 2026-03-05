import { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const navItems = [
  { path: '/', label: 'Home' },
  { path: '/korea-map', label: 'Korea' },
  { path: '/travel', label: 'Travel' },
  { path: '/plans', label: 'Plans' },
];

export default function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  return (
    <nav className="fixed top-0 left-0 right-0 z-50">
      <div className="mx-auto max-w-7xl px-4 md:px-8 pt-4">
        <div className="glass-strong rounded-2xl px-6 py-3 flex items-center justify-between shadow-lg shadow-brown/5">
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2">
            <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-brown tracking-wide">
              happy
            </span>
            <span className="text-rose text-lg">&hearts;</span>
            <span className="font-[family-name:var(--font-display)] text-xl md:text-2xl font-bold text-brown tracking-wide">
              paul
            </span>
          </Link>

          {/* Desktop Nav */}
          <div className="hidden md:flex items-center gap-1">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={item.path}
                className={`relative px-4 py-2 rounded-xl text-sm font-medium tracking-wide transition-all duration-300 ${
                  location.pathname === item.path
                    ? 'text-rose bg-rose/10'
                    : 'text-light-brown hover:text-brown hover:bg-white/50'
                }`}
              >
                {item.label}
                {location.pathname === item.path && (
                  <motion.div
                    layoutId="nav-pill"
                    className="absolute inset-0 bg-rose/10 rounded-xl -z-10"
                    transition={{ type: 'spring', stiffness: 300, damping: 30 }}
                  />
                )}
              </Link>
            ))}
          </div>

          {/* Mobile Hamburger */}
          <button
            onClick={() => setIsOpen(!isOpen)}
            className="md:hidden w-10 h-10 rounded-xl flex items-center justify-center hover:bg-white/50 transition-colors"
            aria-label="Toggle menu"
          >
            <div className="flex flex-col gap-1.5">
              <motion.span
                animate={isOpen ? { rotate: 45, y: 6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-brown origin-center"
              />
              <motion.span
                animate={isOpen ? { opacity: 0 } : { opacity: 1 }}
                className="block w-5 h-0.5 bg-brown"
              />
              <motion.span
                animate={isOpen ? { rotate: -45, y: -6 } : { rotate: 0, y: 0 }}
                className="block w-5 h-0.5 bg-brown origin-center"
              />
            </div>
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className="md:hidden mx-4 mt-2"
          >
            <div className="glass-strong rounded-2xl px-4 py-3 shadow-lg shadow-brown/5">
              {navItems.map((item, i) => (
                <motion.div
                  key={item.path}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: i * 0.05 }}
                >
                  <Link
                    to={item.path}
                    onClick={() => setIsOpen(false)}
                    className={`block px-4 py-3 rounded-xl text-base font-medium transition-colors ${
                      location.pathname === item.path
                        ? 'text-rose bg-rose/10'
                        : 'text-light-brown hover:text-brown'
                    }`}
                  >
                    {item.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
}
