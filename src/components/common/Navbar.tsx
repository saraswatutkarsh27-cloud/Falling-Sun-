import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { MagneticButton } from './MagneticButton';
import { InteractiveRollText } from './AnimatedText';
import { ArrowUpRight, Menu, X } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';
import { useRegistrationLock } from './RegistrationLockModal';

const navItems = [
  { number: "01", label: "ABOUT", path: "/about" },
  { number: "02", label: "TRACKS", path: "/tracks" },
  { number: "03", label: "SCHEDULE", path: "/schedule" },
  { number: "04", label: "PRIZES", path: "/prizes" },
  { number: "05", label: "TEAM", path: "/team" },
  { number: "06", label: "FAQ", path: "/faq" },
];

const DesktopNavItem: React.FC<{
  item: { number: string; label: string; path: string };
  isActive: boolean;
}> = ({ item, isActive }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <Link
      to={item.path}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="group relative flex items-center gap-1.5 py-1 text-xs tracking-wider transition-colors duration-200"
      data-cursor="link"
    >
      <span className="font-mono text-[10px] text-ink-faint group-hover:text-sun transition-colors">
        {item.number}
      </span>
      <InteractiveRollText
        text={item.label}
        isHovered={isHovered}
        activeColor="text-sun"
        className={`font-mono text-xs font-medium ${
          isActive ? 'text-sun font-bold' : 'text-ink-muted group-hover:text-ink'
        }`}
      />
      {isActive && (
        <motion.div
          layoutId="nav-active-indicator"
          className="absolute -bottom-1 left-0 right-0 h-[2px] bg-sun"
          transition={{ type: 'spring', stiffness: 350, damping: 30 }}
        />
      )}
      {!isActive && (
        <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-ink/40 group-hover:w-full transition-all duration-300" />
      )}
    </Link>
  );
};

export const Navbar: React.FC = () => {
  const location = useLocation();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [brandHovered, setBrandHovered] = useState(false);
  const { open: openRegLock } = useRegistrationLock();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 25);
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  useEffect(() => {
    setMobileMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (mobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileMenuOpen]);

  return (
    <>
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 will-change-transform ${
          isScrolled
            ? 'py-3 bg-white/85 backdrop-blur-md border-b border-black/[0.08] shadow-[0_4px_20px_rgba(0,0,0,0.03)]'
            : 'py-6 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-6 md:px-10 flex items-center justify-between">
          {/* Brand Logo & Name with Interactive Text Roll */}
          <Link
            to="/"
            onMouseEnter={() => setBrandHovered(true)}
            onMouseLeave={() => setBrandHovered(false)}
            className="flex items-center gap-3 group"
            data-cursor="link"
          >
            <motion.div
              className="relative w-8 h-8 md:w-9 md:h-9 transition-transform duration-300 group-hover:scale-110"
              animate={{ rotate: isScrolled ? [0, 4, 0] : brandHovered ? [0, -8, 8, 0] : 0 }}
              transition={{ duration: 0.4 }}
            >
              <img
                src="/logo_transparent.webp"
                alt="Falling Sun Logo"
                className="w-full h-full object-contain filter drop-shadow-[0_4px_10px_rgba(0,0,0,0.08)]"
              />
            </motion.div>
            <div className="flex flex-col">
              <InteractiveRollText
                text="FALLING SUN"
                isHovered={brandHovered}
                activeColor="text-sun"
                className="font-display text-sm md:text-base font-black tracking-wider text-ink"
              />
              <span className="font-mono text-[9px] tracking-widest text-ink-muted uppercase">
                U18 HACKATHON
              </span>
            </div>
          </Link>

          {/* Desktop Navigation Links with Roll Animation */}
          <nav className="hidden lg:flex items-center gap-8">
            {navItems.map((item) => (
              <DesktopNavItem
                key={item.path}
                item={item}
                isActive={location.pathname === item.path}
              />
            ))}
          </nav>

          {/* Desktop Register CTA & Mobile Hamburger */}
          <div className="flex items-center gap-4">
            <div className="hidden sm:inline-flex">
              <MagneticButton
                onClick={openRegLock}
                dataCursor="cta"
                dataCursorLabel="JOIN →"
                text="REGISTER"
                icon={<ArrowUpRight className="w-3.5 h-3.5" />}
                className="px-5 py-2 rounded-full font-mono text-xs font-bold tracking-wider"
                variant="primary"
              />
            </div>

            {/* Mobile Menu Toggle Button */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 text-ink hover:text-sun transition-colors border border-black/10 rounded-full bg-white/80"
              aria-label="Toggle navigation menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>
      </header>

      {/* Full-Screen Mobile Light Animated Drawer */}
      <AnimatePresence>
        {mobileMenuOpen && (
          <motion.div
            initial={{ opacity: 0, y: '-100%' }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: '-100%' }}
            transition={{ duration: 0.45, ease: [0.76, 0, 0.24, 1] }}
            className="fixed inset-0 z-40 bg-[#F0EFF4] flex flex-col justify-between p-8 pt-28 text-ink lg:hidden overflow-y-auto will-change-transform"
          >
            {/* Background grid details */}
            <div className="absolute inset-0 tech-grid opacity-40 pointer-events-none" />

            <div className="relative z-10 space-y-6">
              <div className="font-mono text-xs text-ink-muted tracking-widest uppercase">
                // NAVIGATION DIRECTORY
              </div>

              <div className="space-y-3">
                {navItems.map((item, index) => {
                  const isActive = location.pathname === item.path;
                  return (
                    <motion.div
                      key={item.path}
                      initial={{ opacity: 0, x: -30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.08 + index * 0.04, duration: 0.35 }}
                    >
                      <Link
                        to={item.path}
                        className={`flex items-baseline gap-4 py-2.5 border-b border-black/5 ${
                          isActive ? 'text-sun' : 'text-ink-soft hover:text-ink'
                        }`}
                      >
                        <span className="font-mono text-sm text-sun font-bold">
                          {item.number}
                        </span>
                        <span className="font-display text-3xl font-extrabold tracking-tight">
                          {item.label}
                        </span>
                      </Link>
                    </motion.div>
                  );
                })}
              </div>

              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.35, duration: 0.35 }}
                className="pt-4"
              >
                <button
                  onClick={() => { setMobileMenuOpen(false); openRegLock(); }}
                  className="flex items-center justify-between w-full p-4 rounded-xl bg-ink text-white font-mono font-bold tracking-wider hover:bg-sun hover:text-black transition-colors"
                >
                  <span>REGISTER FOR HACKATHON</span>
                  <ArrowUpRight className="w-5 h-5" />
                </button>
              </motion.div>
            </div>

            {/* Mobile Footer Status */}
            <div className="relative z-10 pt-8 border-t border-black/10 flex flex-col gap-2 font-mono text-xs text-ink-muted">
              <div className="flex items-center justify-between">
                <span className="font-semibold text-ink">{eventConfig.format}</span>
                <span className="text-sun font-bold">{eventConfig.ageGroup}</span>
              </div>
              <div className="flex items-center justify-between text-[11px] text-ink-faint">
                <span>{eventConfig.coordinates}</span>
                <span>© {eventConfig.name}</span>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};
