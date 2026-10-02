import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Safely check sessionStorage
    try {
      if (sessionStorage.getItem('fallingsun_preloader_seen')) {
        setIsFinished(true);
        onCompleteRef.current();
        return;
      }
    } catch {
      // Ignore storage restrictions
    }

    const duration = 1200; // 1.2s smooth duration
    const start = Date.now();
    let isDone = false;

    const finish = () => {
      if (isDone) return;
      isDone = true;
      try {
        sessionStorage.setItem('fallingsun_preloader_seen', 'true');
      } catch {
        // Ignore
      }
      setProgress(100);
      setTimeout(() => {
        setIsFinished(true);
        setTimeout(() => {
          onCompleteRef.current();
        }, 400);
      }, 100);
    };

    // Use interval to guarantee progress updates even if tab is unfocused
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.max(1, Math.min(100, Math.round(1 + eased * 99)));
      setProgress(current);

      if (t >= 1) {
        clearInterval(timer);
        finish();
      }
    }, 16);

    // Emergency safety timeout: never get stuck on preloader
    const safetyTimeout = setTimeout(() => {
      clearInterval(timer);
      finish();
    }, 2000);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, []); // Empty dependency array: runs exactly once on mount!

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          className="fixed inset-0 z-[99999] flex flex-col justify-between bg-bg p-8 md:p-14 text-cream overflow-hidden select-none"
          initial={{ opacity: 1 }}
          exit={{
            y: '-100%',
            transition: { duration: 0.6, ease: [0.76, 0, 0.24, 1] },
          }}
        >
          {/* Top metadata */}
          <div className="relative z-10 flex items-center justify-between font-mono text-xs text-cream">
            <span className="flex items-center gap-2">
              <span className="h-2 w-2 bg-yellow animate-ping" />
              <span className="text-cream font-bold tracking-widest uppercase">CALIBRATING SYSTEM</span>
            </span>
            <span className="font-semibold text-ink">28°32'N 77°14'E</span>
          </div>

          {/* Center Logo & Emblem */}
          <div className="relative z-10 flex flex-col items-center justify-center text-center space-y-6">
            <motion.div
              initial={{ scale: 0.85, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-36 h-36 md:w-44 md:h-44"
            >
              <img
                src="/logo_transparent.png"
                alt="Falling Sun Logo"
                className="w-full h-full object-contain"
              />
            </motion.div>

            <motion.div
              initial={{ y: 15, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.6 }}
            >
              <h1 className="font-display text-2xl md:text-3xl font-black tracking-widest text-cream">
                FALLING SUN
              </h1>
              <p className="mt-1 font-mono text-xs tracking-widest text-yellow uppercase font-bold">
                HACKATHON 2026 // 12H + 12H
              </p>
            </motion.div>
          </div>

          {/* Bottom Progress Counter (Guaranteed 01 -> 100) */}
          <div className="relative z-10 space-y-4 max-w-xl mx-auto w-full">
            <div className="flex items-end justify-between font-mono">
              <div className="text-xs text-cream uppercase tracking-wider font-bold">
                INITIALIZING ENVIRONMENT...
              </div>
              <div className="text-4xl md:text-6xl font-black tracking-tighter text-cream font-mono">
                {String(progress).padStart(2, '0')}{' '}
                <span className="text-lg md:text-2xl text-yellow font-normal">/ 100</span>
              </div>
            </div>

            {/* Progress track */}
            <div className="h-[6px] w-full bg-cream/40 overflow-hidden">
              <div
                className="h-full bg-yellow transition-all duration-75"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};
