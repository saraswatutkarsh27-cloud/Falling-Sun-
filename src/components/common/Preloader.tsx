import React, { useEffect, useState, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(0);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    // Skip preloader on repeat visits
    try {
      if (sessionStorage.getItem('fallingsun_preloader_seen')) {
        setIsFinished(true);
        onCompleteRef.current();
        return;
      }
    } catch {
      // Ignore storage restrictions
    }

    const duration = 1400; // 1.4s smooth duration
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
        }, 450);
      }, 120);
    };

    // Use interval to guarantee progress updates even if tab is unfocused
    const timer = setInterval(() => {
      const elapsed = Date.now() - start;
      const t = Math.min(elapsed / duration, 1);
      // Cubic ease-out
      const eased = 1 - Math.pow(1 - t, 3);
      const current = Math.round(eased * 100);
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
    }, 3000);

    return () => {
      clearInterval(timer);
      clearTimeout(safetyTimeout);
    };
  }, []); // Empty dependency array: runs exactly once on mount!

  // Pipeline stages that advance as progress crosses thresholds
  const pipelineStage = Math.min(
    3,
    Math.floor(progress / 25) + (progress % 25 > 0 ? 1 : 0)
  );

  const stageLabels = ['BOOTING', 'CALIBRATING', 'SYNCING', 'READY'];
  const stageIcons = ['⟳', '◈', '◈', '●'];

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          className="fixed inset-0 z-[99999] flex flex-col bg-bg text-cream select-none overflow-hidden"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.5, ease: [0.16, 1, 0.3, 1] },
          }}
        >
          {/* Background scan lines vignette */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,_rgba(243,223,198,0.03)_0%,_transparent_70%)] pointer-events-none" />
          <div className="absolute inset-0 bg-[linear-gradient(to_bottom,rgba(243,223,198,0.04)_0%,transparent_50%,transparent_100%)] pointer-events-none" />

          {/* Top bar: system status */}
          <div className="relative z-20 flex items-center justify-between px-6 md:px-10 py-5 font-mono text-[11px] text-cream/80 tracking-[0.15em] uppercase border-b border-cream/8">
            <div className="flex items-center gap-3">
              <div className="flex items-center gap-1.5">
                <span className="w-2 h-2 rounded-full bg-reddark animate-pulse" style={{ height: `${3 + progress / 20}px` }} />
                <span className="text-cream/80 tracking-widest">
                  FALLING SUN <span className="text-yellow">// 2026</span>
                </span>
              </div>
            </div>
            <div className="flex items-center gap-4">
              <span className="text-cream/60">
                {stageLabels[Math.min(3, pipelineStage)]}
                <span className="ml-2 font-bold text-cream">
                  {String(progress).padStart(2, '0')}%
                </span>
              </span>
            </div>
          </div>

          {/* Center: emblem panel with animated pulse rings */}
          <div className="relative z-20 flex flex-col items-center justify-center py-10 md:py-16 px-4">
            {/* Outer glow rings */}
            <motion.div
              animate={{
                scale: 1 + Math.sin(progress * 6) * 0.04,
                opacity: 0.3 + Math.sin(progress * 4 + 1) * 0.12,
              }}
              transition={{ duration: 0.8, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-[280px] h-[280px] md:w-[340px] md:h-[340px] rounded-full border border-cream/10"
            />
            <motion.div
              animate={{
                scale: 1.15 + Math.sin(progress * 5 + 0.5) * 0.06,
                opacity: 0.15 + Math.sin(progress * 3 + 2) * 0.08,
              }}
              transition={{ duration: 0.6, repeat: Infinity, ease: 'easeInOut' }}
              className="absolute w-40 h-40 md:w-48 md:h-48 rounded-full border border-cream/05"
            />

            <motion.div
              initial={{ scale: 0.7, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
              className="relative w-28 h-28 md:w-36 md:w-40"
            >
              <img
                src="/logo_transparent.png"
                alt="Falling Sun logo"
                className="w-24 h-24 md:w-32 md:h-32 object-contain"
              />
            </motion.div>

            {/* Headline */}
            <motion.h1
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.6 }}
              className="font-display text-3xl md:text-4xl font-black tracking-[0.12em] text-cream uppercase mt-5"
            >
              FALLING SUN
            </motion.h1>

            <motion.p
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.5 }}
              className="font-mono text-[11px] text-yellow tracking-[0.2em] uppercase mt-1"
            >
              HACKATHON · 2026
            </motion.p>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.5 }}
              className="flex items-center gap-2 font-mono text-[10px] text-cream/60 tracking-[0.1em] mt-4"
            >
              <span className="w-2 h-2 rounded-full bg-reddark" />
              <span>EVENT DATES: 24–25 OCTOBER 2026</span>
            </motion.div>

            {/* Stage indicator dots */}
            <div className="flex items-center gap-2 mt-6">
              {stageIcons.map((_, i) => (
                <motion.span
                  key={i}
                  className="w-2 h-2 rounded-full transition-colors duration-300"
                  style={{
                    backgroundColor:
                      i < pipelineStage ? '#ffc50f' : i < 3 ? '#3a3a3a' : '#1d1210',
                  }}
                  animate={{ scale: i < pipelineStage ? [1, 1.4, 1] : 1 }}
                  transition={{
                    duration: 0.6,
                    repeat: Infinity,
                    delay: i * 0.2,
                    ease: 'easeInOut',
                  }}
                />
              ))}
            </div>
          </div>

          {/* Bottom: progress ring + exact event dates */}
          <div className="relative z-20 px-6 md:px-10 pb-8 space-y-4 w-full max-w-xl mx-auto">
            {/* Progress ring */}
            <div className="relative w-[96px] h-[96px] md:w-[120px] md:h-[120px] mx-auto">
              <svg className="w-full h-full -rotate-90" viewBox="0 0 100 100">
                <circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="rgba(243,223,198,0.08)"
                  strokeWidth="6"
                />
                <motion.circle
                  cx="50"
                  cy="50"
                  r="42"
                  fill="none"
                  stroke="url(#progressGradient)"
                  strokeWidth="6"
                  strokeLinecap="round"
                  strokeDasharray="263.89"
                  strokeDashoffset={263.89 - (263.89 * progress) / 100}
                  initial={{ stroke: '#ffc50f' }}
                  animate={{ stroke: '#1f9a4a' }}
                  transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
                />
                <defs>
                  <linearGradient id="progressGradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="#ffc50f" />
                    <stop offset="100%" stopColor="#1f9a4a" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex flex-col items-center justify-center">
                <span className="font-mono text-lg md:text-2xl font-black text-cream tabular-nums">
                  {String(Math.round(progress)).padStart(2, '0')}%
                </span>
                <span className="font-mono text-[9px] text-cream/60 tracking-[0.15em] uppercase">
                  BOOT
                </span>
              </div>
            </div>

            {/* Exact event dates */}
            <div className="flex items-center justify-center gap-3 font-mono text-xs">
              <span className="px-3 py-1 bg-yellow border-2 border-ink font-bold text-ink tracking-widest uppercase">
                DAY 01 — 24 OCTOBER 2026
              </span>
              <span className="text-cream/40">→</span>
              <span className="px-3 py-1 bg-cream text-bg border-2 border-ink font-bold text-ink tracking-widest uppercase">
                DAY 02 — 25 OCTOBER 2026
              </span>
            </div>

            <div className="h-[3px] w-full bg-cream/8 overflow-hidden">
              <motion.div
                className="h-full bg-gradient-to-r from-yellow via-green to-green"
                style={{ width: `${progress}%` }}
                initial={{ width: 0 }}
                transition={{ duration: 0.1, ease: 'easeInOut' }}
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
