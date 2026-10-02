import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Clock } from 'lucide-react';

const REGISTRATION_OPENS_AT = new Date('2026-10-05T00:00:00').getTime();

function getTimeLeft() {
  const now = Date.now();
  const diff = Math.max(0, REGISTRATION_OPENS_AT - now);
  const days = Math.floor(diff / (1000 * 60 * 60 * 24));
  const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
  const minutes = Math.floor((diff / (1000 * 60)) % 60);
  const seconds = Math.floor((diff / 1000) % 60);
  return { days, hours, minutes, seconds, isOpen: diff <= 0 };
}

export const RegistrationLockContext = React.createContext<{
  open: () => void;
}>({ open: () => {} });

export const useRegistrationLock = () => React.useContext(RegistrationLockContext);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);
  return (
    <RegistrationLockContext.Provider value={{ open: () => setShow(true) }}>
      {children}
      <RegistrationLockModal show={show} onClose={() => setShow(false)} />
    </RegistrationLockContext.Provider>
  );
};

const RegistrationLockModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const [timeLeft, setTimeLeft] = useState(getTimeLeft);

  useEffect(() => {
    if (!show) return;
    const interval = setInterval(() => setTimeLeft(getTimeLeft()), 1000);
    return () => clearInterval(interval);
  }, [show]);

  return (
    <AnimatePresence>
      {show && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/70"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-cream border-2 border-ink shadow-card overflow-hidden"
          >
            {/* Header */}
            <div className="relative bg-ink p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 bg-cream/10 hover:bg-cream/20 text-cream/70 hover:text-cream transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-16 h-16 mx-auto mb-4 bg-yellow flex items-center justify-center">
                <Lock className="w-8 h-8 text-ink" />
              </div>
              <h3 className="font-display text-2xl font-black text-cream mb-1">REGISTRATION LOCKED</h3>
              <p className="font-mono text-xs text-cream/80 tracking-wider">PORTAL OPENS OCTOBER 5, 2026</p>
            </div>

            {/* Countdown */}
            <div className="p-8">
              <p className="text-center text-ink-muted text-sm mb-6 font-sans">
                Registration portal opens in:
              </p>
              <div className="grid grid-cols-4 gap-3">
                {[
                  { label: 'DAYS', value: timeLeft.days },
                  { label: 'HRS', value: timeLeft.hours },
                  { label: 'MIN', value: timeLeft.minutes },
                  { label: 'SEC', value: timeLeft.seconds },
                ].map((item) => (
                  <div key={item.label} className="text-center">
                    <div className="bg-ink p-3">
                      <span className="font-display text-3xl font-black text-cream tabular-nums">
                        {String(item.value).padStart(2, '0')}
                      </span>
                    </div>
                    <span className="font-mono text-[10px] text-ink-muted tracking-widest mt-2 block">
                      {item.label}
                    </span>
                  </div>
                ))}
              </div>
              <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-ink-muted">
                <Clock className="w-3.5 h-3.5 text-reddark" />
                <span>OCTOBER 5, 2026 • 12:00 AM</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 bg-yellow text-ink border-2 border-ink shadow-btn font-display text-lg font-black uppercase tracking-wide hover:shadow-[7px_7px_0_#1d1210] transition-shadow"
              >
                GOT IT
              </button>
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
