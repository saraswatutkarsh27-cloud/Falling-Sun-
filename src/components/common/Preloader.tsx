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
    const minimumDuration = 4000;
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
        }, 450);
      }, 120);
    };

    if (!pageLoaded) {
      window.addEventListener('load', handlePageLoad);
    }

    progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const fraction = Math.min(elapsed / minimumDuration, 1);
      setProgress(Math.min(90, Math.max(1, Math.round(fraction * 90))));

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
          className="fixed inset-0 z-[99999] flex items-center justify-center overflow-hidden bg-black text-[#111] select-none"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{
            opacity: 0,
            transition: { duration: 0.6, ease: [0.16, 1, 0.3, 1] },
          }}
          role="status"
          aria-label={`Loading Falling Sun, ${progress}%`}
        >
          <div className="w-[min(480px,82vw)] border border-[#111] bg-[#f1f0ee] px-6 py-[25px] shadow-[9px_9px_0_#ed002d] sm:px-8 sm:pt-[30px]">
            <div className="flex items-center gap-[15px]">
              <div className="h-[2px] flex-1 bg-[#555]" />
              <div className="flex gap-[7px]" aria-hidden="true">
                <span className="block h-3 w-3 border border-[#111] bg-black" />
                <span className="block h-3 w-3 border border-[#111] bg-[#ed002d]" />
                <span className="block h-3 w-3 border border-[#111] bg-white" />
              </div>
            </div>

            <div className="my-[27px] flex items-center justify-between gap-3">
              <strong className="font-display text-[clamp(22px,7vw,32px)] font-black leading-none text-[#111]">
                FALLING SUN
              </strong>
              <strong className="shrink-0 font-mono text-[28px] leading-none text-[#ed002d] tabular-nums">
                {String(progress).padStart(2, '0')}%
              </strong>
            </div>

            <div
              className="h-[25px] w-full overflow-hidden border-2 border-[#111] bg-white"
              role="progressbar"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={progress}
              aria-label="Loading progress"
            >
              <div
                className="h-full bg-[#111] transition-[width] duration-[30ms] linear"
                style={{ width: `${progress}%` }}
              />
            </div>

            <div className="mt-[13px] flex justify-between gap-3 font-mono text-[10px] font-bold tracking-[0.08em] text-[#555] sm:text-[11px] sm:tracking-[1px]">
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