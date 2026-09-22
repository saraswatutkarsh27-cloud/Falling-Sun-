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
            className="absolute inset-0 bg-black/60 backdrop-blur-sm"
          />
          <motion.div
            initial={{ opacity: 0, scale: 0.9, y: 30 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9, y: 30 }}
            transition={{ duration: 0.35, ease: [0.16, 1, 0.3, 1] }}
            className="relative z-10 w-full max-w-md bg-white rounded-3xl overflow-hidden shadow-2xl border border-black/10"
          >
            {/* Header */}
            <div className="relative bg-gradient-to-br from-ink to-neutral-800 p-8 text-center">
              <button
                onClick={onClose}
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sun/20 flex items-center justify-center">
                <Lock className="w-8 h-8 text-sun" />
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-1">REGISTRATION LOCKED</h3>
              <p className="font-mono text-xs text-white/50 tracking-wider">PORTAL OPENS OCTOBER 5, 2026</p>
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
                    <div className="bg-[#F0EFF4] rounded-xl p-3 border border-black/5">
                      <span className="font-display text-3xl font-black text-ink tabular-nums">
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
                <Clock className="w-3.5 h-3.5 text-sun" />
                <span>OCTOBER 5, 2026 • 12:00 AM</span>
              </div>
              <button
                onClick={onClose}
                className="mt-6 w-full py-3 rounded-xl bg-ink text-white font-mono text-xs font-bold tracking-wider hover:bg-sun hover:text-black transition-colors"
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
