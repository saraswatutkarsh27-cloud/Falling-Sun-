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
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-bg px-5 text-cream select-none"
          style={{
            backgroundImage:
              'repeating-linear-gradient(0deg, rgba(243,223,198,0.12) 0 1px, transparent 1px 5px)',
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          role="status"
          aria-label={`Loading Falling Sun, ${progress}%`}
        >
          <div className="stamp w-[min(480px,100%)]">
            <div className="eng min-h-[310px] justify-between gap-8 p-6 sm:min-h-[350px] sm:p-9">
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold tracking-[0.18em] text-cream/75 uppercase sm:text-xs">
                <span>FALLING SUN // SYSTEM</span>
                <span className="text-yellow">2026</span>
              </div>

              <div className="flex flex-col items-center text-center">
                <motion.img
                  src="/logo_transparent.png"
                  alt=""
                  aria-hidden="true"
                  className="mb-4 h-16 w-16 object-contain sm:h-20 sm:w-20"
                  animate={{ rotate: [0, 8, -8, 0], scale: [1, 1.04, 1] }}
                  transition={{ duration: 3, repeat: Infinity, ease: 'easeInOut' }}
                />
                <strong className="font-display text-[clamp(2.4rem,10vw,4rem)] leading-[0.85] tracking-wide text-cream uppercase">
                  Falling Sun
                </strong>
                <span className="mt-3 font-mono text-[10px] font-bold tracking-[0.2em] text-yellow uppercase sm:text-xs">
                  BUILD · BREAK · CREATE
                </span>
              </div>

              <div>
                <div className="mb-2 flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-cream/75 uppercase">
                    Loading experience
                  </span>
                  <strong className="font-display text-2xl leading-none text-yellow tabular-nums sm:text-3xl">
                    {String(progress).padStart(2, '0')}%
                  </strong>
                </div>

                <div
                  className="h-5 w-full overflow-hidden border-2 border-ink bg-cream p-[3px]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label="Loading progress"
                >
                  <motion.div
                    className="h-full bg-yellow"
                    animate={{ width: `${progress}%` }}
                    transition={{ duration: 0.12, ease: 'linear' }}
                  />
                </div>

                <div className="mt-3 flex items-center justify-between gap-4 font-mono text-[9px] font-bold tracking-[0.14em] text-cream/65 uppercase">
                  <span>HACKATHON · 12H + 12H</span>
                  <span>INITIALIZING...</span>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;