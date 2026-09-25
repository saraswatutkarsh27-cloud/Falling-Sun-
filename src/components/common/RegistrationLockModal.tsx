import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lock, X, Clock, PartyPopper, ArrowUpRight } from 'lucide-react';
import { eventConfig } from '../../config/eventConfig';
import { isRegistrationOpen, getRegistrationTarget } from '../../utils/registration';
import { useCountdown, CountdownGrid } from './CountdownTimer';

export const RegistrationLockContext = React.createContext<{
  open: () => void;
}>({ open: () => {} });

export const useRegistrationLock = () => React.useContext(RegistrationLockContext);

export const RegistrationProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [show, setShow] = useState(false);

  const open = () => {
    if (isRegistrationOpen() && eventConfig.registrationUrl) {
      window.open(eventConfig.registrationUrl, '_blank', 'noopener,noreferrer');
      return;
    }
    setShow(true);
  };

  return (
    <RegistrationLockContext.Provider value={{ open }}>
      {children}
      <RegistrationLockModal show={show} onClose={() => setShow(false)} />
    </RegistrationLockContext.Provider>
  );
};

const RegistrationLockModal: React.FC<{ show: boolean; onClose: () => void }> = ({ show, onClose }) => {
  const timeLeft = useCountdown();
  const registrationOpen = isRegistrationOpen();
  const opensLabel = new Date(eventConfig.registrationOpensAt).toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric',
  });

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
                aria-label="Close"
                className="absolute top-4 right-4 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white/70 hover:text-white transition-colors"
              >
                <X className="w-4 h-4" />
              </button>
              <div className="w-16 h-16 mx-auto mb-4 rounded-2xl bg-sun/20 flex items-center justify-center">
                {registrationOpen ? (
                  <PartyPopper className="w-8 h-8 text-sun" />
                ) : (
                  <Lock className="w-8 h-8 text-sun" />
                )}
              </div>
              <h3 className="font-display text-2xl font-black text-white mb-1">
                {registrationOpen ? 'REGISTRATION IS OPEN' : 'REGISTRATION LOCKED'}
              </h3>
              <p className="font-mono text-xs text-white/50 tracking-wider">
                {registrationOpen ? 'THE PORTAL IS LIVE — APPLY NOW' : `PORTAL OPENS ${opensLabel.toUpperCase()}`}
              </p>
            </div>

            {/* Body */}
            <div className="p-8">
              {registrationOpen ? (
                <>
                  <p className="text-center text-ink-muted text-sm mb-6 font-sans">
                    Applications are now open. Submit your application before the deadline — solo or teams of up to 4.
                  </p>
                  <a
                    href={getRegistrationTarget()}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-ink text-white font-mono text-xs font-bold tracking-wider hover:bg-sun hover:text-black transition-colors"
                  >
                    <span>START REGISTRATION</span>
                    <ArrowUpRight className="w-4 h-4" />
                  </a>
                </>
              ) : (
                <>
                  <p className="text-center text-ink-muted text-sm mb-6 font-sans">
                    Registration portal opens in:
                  </p>
                  <CountdownGrid timeLeft={timeLeft} variant="light" />
                  <div className="mt-6 flex items-center justify-center gap-2 font-mono text-xs text-ink-muted">
                    <Clock className="w-3.5 h-3.5 text-sun" />
                    <span>{opensLabel.toUpperCase()} • 12:00 AM</span>
                  </div>
                  <a
                    href={eventConfig.whatsappUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={onClose}
                    className="mt-4 w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-white border border-black/10 text-ink font-mono text-xs font-bold tracking-wider hover:border-sun transition-colors"
                  >
                    <span>GET NOTIFIED ON WHATSAPP</span>
                    <ArrowUpRight className="w-4 h-4 text-sun" />
                  </a>
                  <button
                    onClick={onClose}
                    className="mt-3 w-full py-3 rounded-xl bg-ink text-white font-mono text-xs font-bold tracking-wider hover:bg-sun hover:text-black transition-colors"
                  >
                    GOT IT
                  </button>
                </>
              )}
            </div>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};
