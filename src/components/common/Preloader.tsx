import React, { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  useEffect(() => {
    const minimumDuration = 4200;
    const start = Date.now();
    let isDone = false;
    let pageLoaded = document.readyState === 'complete';
    let progressTimer: ReturnType<typeof setInterval> | undefined;
    let safetyTimer: ReturnType<typeof setTimeout> | undefined;
    let hideTimer: ReturnType<typeof setTimeout> | undefined;
    let completeTimer: ReturnType<typeof setTimeout> | undefined;

    const handlePageLoad = () => {
      pageLoaded = true;
    };

    const finish = () => {
      if (isDone) return;
      isDone = true;

      if (progressTimer) clearInterval(progressTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      window.removeEventListener('load', handlePageLoad);

      setProgress(100);

      hideTimer = setTimeout(() => {
        setIsFinished(true);
        completeTimer = setTimeout(() => {
          onCompleteRef.current();
        }, 420);
      }, 160);
    };

    if (!pageLoaded) {
      window.addEventListener('load', handlePageLoad);
    }

    progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const fraction = Math.min(elapsed / minimumDuration, 1);
      const next = Math.min(90, Math.max(1, Math.round(fraction * 90)));
      setProgress(next);

      if (fraction >= 1 && pageLoaded) {
        finish();
      }
    }, 40);

    safetyTimer = setTimeout(finish, 12000);

    return () => {
      if (progressTimer) clearInterval(progressTimer);
      if (safetyTimer) clearTimeout(safetyTimer);
      if (hideTimer) clearTimeout(hideTimer);
      if (completeTimer) clearTimeout(completeTimer);
      window.removeEventListener('load', handlePageLoad);
    };
  }, []);

  return (
    <AnimatePresence>
      {!isFinished && (
        <motion.div
          key="preloader-overlay"
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-[#050505] text-[#111111] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          role="status"
          aria-label={`Loading Falling Sun, ${progress}%`}
        >
          <div className="relative w-[min(500px,82vw)] border border-[#111111] bg-[#f3efe9] px-5 py-5 shadow-[10px_10px_0_#ed002d] sm:px-7 sm:py-6">
            <div className="absolute inset-x-0 top-0 h-[2px] bg-[#111111]/20" />

            <div className="flex items-center gap-4">
              <div className="h-[2px] flex-1 bg-[#555]" />
              <div className="flex items-center gap-2" aria-hidden="true">
                <span className="block h-3 w-3 border border-[#111111] bg-[#111111]" />
                <span className="block h-3 w-3 border border-[#111111] bg-[#ed002d]" />
                <span className="block h-3 w-3 border border-[#111111] bg-[#f8f5f1]" />
              </div>
            </div>

            <div className="mt-7 flex items-end justify-between gap-4">
              <strong className="font-[FamilyName:var(--font-display)] text-[clamp(1.9rem,5vw,2.3rem)] leading-none tracking-[-0.08em] text-[#111111] uppercase">
                FALLING SUN
              </strong>

              <strong className="font-mono text-[clamp(1.4rem,4vw,2rem)] leading-none tracking-[-0.04em] text-[#ed002d] tabular-nums">
                {String(progress).padStart(2, '0')}%
              </strong>
            </div>

            <div
              className="mt-6 h-[26px] w-full overflow-hidden border-2 border-[#111111] bg-[#ffffff]"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Loading progress"
            >
              <motion.div
                className="h-full bg-[#111111]"
                animate={{ width: `${progress}%` }}
                transition={{ duration: 0.12, ease: 'linear' }}
              />
            </div>

            <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] font-bold uppercase tracking-[0.16em] text-[#555555]">
              <span>HACKATHON 2026</span>
              <span>INITIALIZING...</span>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;