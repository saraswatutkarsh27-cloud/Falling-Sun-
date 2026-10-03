import React, { useEffect, useMemo, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';

interface PreloaderProps {
  onComplete: () => void;
}

/* ------------------------------------------------------------------ */
/* Boot log: lines appear as progress crosses each threshold           */
/* ------------------------------------------------------------------ */
const BOOT_LINES: { at: number; text: string }[] = [
  { at: 1, text: 'Waking up the servers' },
  { at: 12, text: 'Brewing 240 cups of coffee' },
  { at: 26, text: 'Pairing teams with teammates' },
  { at: 40, text: 'Hiding bugs in the codebase' },
  { at: 55, text: 'Stocking the snack table' },
  { at: 70, text: 'Setting the 24-hour clock' },
  { at: 84, text: 'Lowering the sun' },
  { at: 100, text: 'Ready. Start building' },
];

const SEGMENTS = 24; // 12H + 12H
const GLYPHS = '!<>-_\\/[]{}=+*^?#01';

/* Decodes text from random glyphs into the real word. */
function useScramble(text: string, delayMs: number, durationMs: number, enabled: boolean) {
  const [output, setOutput] = useState(enabled ? '' : text);

  useEffect(() => {
    if (!enabled) {
      setOutput(text);
      return;
    }
    let raf = 0;
    let startAt = 0;
    const timeout = setTimeout(() => {
      const tick = (now: number) => {
        if (!startAt) startAt = now;
        const t = Math.min((now - startAt) / durationMs, 1);
        const reveal = Math.floor(t * text.length);
        let next = '';
        for (let i = 0; i < text.length; i++) {
          if (text[i] === ' ') next += ' ';
          else if (i < reveal) next += text[i];
          else next += GLYPHS[Math.floor(Math.random() * GLYPHS.length)];
        }
        setOutput(next);
        if (t < 1) raf = requestAnimationFrame(tick);
        else setOutput(text);
      };
      raf = requestAnimationFrame(tick);
    }, delayMs);

    return () => {
      clearTimeout(timeout);
      cancelAnimationFrame(raf);
    };
  }, [text, delayMs, durationMs, enabled]);

  return output;
}

export const Preloader: React.FC<PreloaderProps> = ({ onComplete }) => {
  const [progress, setProgress] = useState(1);
  const [isFinished, setIsFinished] = useState(false);
  const [flash, setFlash] = useState(false);
  const onCompleteRef = useRef(onComplete);
  onCompleteRef.current = onComplete;

  const reduceMotion = useReducedMotion();
  const animate = !reduceMotion;
  const title = useScramble('Falling Sun', 250, 1100, animate);

  /* ---------------------------- timing ----------------------------- */
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
      setFlash(true); // sunset flash

      hideTimer = setTimeout(() => {
        setIsFinished(true);
        completeTimer = setTimeout(() => {
          onCompleteRef.current();
        }, 520);
      }, 420);
    };

    if (!pageLoaded) {
      window.addEventListener('load', handlePageLoad);
    }

    progressTimer = setInterval(() => {
      const elapsed = Date.now() - start;
      const fraction = Math.min(elapsed / minimumDuration, 1);
      // Ease-out so it feels fast at first, then tense near the end.
      const eased = 1 - Math.pow(1 - fraction, 1.5);
      const next = Math.min(90, Math.max(1, Math.round(eased * 90)));
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

  /* ------------------------- derived values ------------------------ */
  const visibleLines = useMemo(
    () => BOOT_LINES.filter((l) => progress >= l.at),
    [progress],
  );
  const lastThree = visibleLines.slice(-3);
  const currentIndex = visibleLines.length - 1;
  const filledSegments = Math.floor((progress / 100) * SEGMENTS);
  const phase = progress < 50 ? 'BUILD' : progress < 100 ? 'BREAK' : 'CREATE';

  // Sun descends from the top of the sky strip to the horizon.
  const sunY = -34 + (progress / 100) * 62;
  const sunScale = 1 + (progress / 100) * 0.12;

  const stars = useMemo(
    () =>
      Array.from({ length: 14 }, (_, i) => ({
        id: i,
        left: `${(i * 37 + 11) % 96}%`,
        top: `${(i * 23 + 7) % 60}%`,
        delay: (i % 5) * 0.4,
      })),
    [],
  );

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
            clipPath: 'inset(50% 0% 50% 0%)', // closes like a shutter
            transition: { duration: 0.55, ease: [0.76, 0, 0.24, 1] },
          }}
          role="status"
          aria-label={`Loading Falling Sun, ${progress}%`}
        >
          {/* Warm glow that rises as the sun falls */}
          <motion.div
            aria-hidden="true"
            className="pointer-events-none absolute inset-x-0 bottom-0 h-[60vh]"
            style={{
              background:
                'radial-gradient(ellipse at 50% 100%, rgba(255,196,0,0.35), transparent 65%)',
            }}
            animate={{ opacity: 0.15 + (progress / 100) * 0.85 }}
            transition={{ duration: 0.3 }}
          />

          {/* Sunset flash on completion */}
          <AnimatePresence>
            {flash && (
              <motion.div
                key="flash"
                aria-hidden="true"
                className="pointer-events-none absolute inset-0 bg-yellow"
                initial={{ opacity: 0 }}
                animate={{ opacity: [0, 0.55, 0] }}
                transition={{ duration: 0.45, times: [0, 0.3, 1] }}
              />
            )}
          </AnimatePresence>

          <motion.div
            className="stamp relative w-[min(480px,100%)]"
            initial={animate ? { y: 24, opacity: 0, scale: 0.97 } : false}
            animate={{ y: 0, opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="eng min-h-[310px] justify-between gap-6 p-6 sm:min-h-[350px] sm:p-9">
              {/* Header */}
              <div className="flex items-center justify-between gap-3 font-mono text-[10px] font-bold tracking-[0.18em] text-cream/75 uppercase sm:text-xs">
                <span className="flex items-center gap-2">
                  <motion.span
                    aria-hidden="true"
                    className="inline-block h-2 w-2 rounded-full bg-yellow"
                    animate={animate ? { opacity: [1, 0.2, 1] } : undefined}
                    transition={{ duration: 1, repeat: Infinity }}
                  />
                  FALLING SUN // SYSTEM
                </span>
                <span className="text-yellow">2026</span>
              </div>

              {/* Hero: the sun falling toward the horizon */}
              <div className="flex flex-col items-center text-center">
                <div
                  className="relative mb-4 h-24 w-full overflow-hidden"
                  aria-hidden="true"
                >
                  {stars.map((s) => (
                    <motion.span
                      key={s.id}
                      className="absolute h-[2px] w-[2px] bg-cream"
                      style={{ left: s.left, top: s.top }}
                      animate={animate ? { opacity: [0.15, 0.9, 0.15] } : { opacity: 0.5 }}
                      transition={{
                        duration: 2.4,
                        repeat: Infinity,
                        delay: s.delay,
                      }}
                    />
                  ))}

                  <motion.img
                    src="/logo_transparent.png"
                    alt=""
                    className="absolute top-1/2 left-1/2 h-16 w-16 -translate-x-1/2 -translate-y-1/2 object-contain sm:h-20 sm:w-20"
                    animate={{
                      y: sunY,
                      scale: sunScale,
                      rotate: animate ? [0, 8, -8, 0] : 0,
                    }}
                    transition={{
                      y: { duration: 0.2, ease: 'linear' },
                      scale: { duration: 0.2, ease: 'linear' },
                      rotate: { duration: 3, repeat: Infinity, ease: 'easeInOut' },
                    }}
                  />

                  {/* Horizon */}
                  <div className="absolute inset-x-0 bottom-0 h-[3px] bg-cream/80" />
                  <div className="absolute inset-x-0 bottom-0 h-6 bg-gradient-to-t from-bg to-transparent" />
                </div>

                <strong
                  className="relative font-display text-[clamp(2.4rem,10vw,4rem)] leading-[0.85] tracking-wide text-cream uppercase"
                  aria-label="Falling Sun"
                >
                  <span aria-hidden="true">{title || '\u00A0'}</span>
                  {animate && (
                    <>
                      {/* Quick RGB glitch ghosts that trigger every few seconds */}
                      <motion.span
                        aria-hidden="true"
                        className="pointer-events-none absolute inset-0 text-yellow mix-blend-screen"
                        animate={{ x: [0, 0, -3, 3, 0, 0], opacity: [0, 0, 0.8, 0.8, 0, 0] }}
                        transition={{
                          duration: 0.35,
                          repeat: Infinity,
                          repeatDelay: 1.9,
                          delay: 1.6,
                        }}
                      >
                        {title}
                      </motion.span>
                    </>
                  )}
                </strong>

                <motion.span
                  key={phase}
                  className="mt-3 font-mono text-[10px] font-bold tracking-[0.2em] text-yellow uppercase sm:text-xs"
                  initial={animate ? { opacity: 0, y: 6 } : false}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.25 }}
                >
                  {phase === 'BUILD' && 'BUILD · break · create'}
                  {phase === 'BREAK' && 'build · BREAK · create'}
                  {phase === 'CREATE' && 'build · break · CREATE'}
                </motion.span>
              </div>

              {/* Progress */}
              <div>
                <div className="mb-2 flex items-end justify-between gap-4">
                  <span className="font-mono text-[10px] font-bold tracking-[0.16em] text-cream/75 uppercase">
                    Loading experience
                  </span>
                  <strong className="font-display text-2xl leading-none text-yellow tabular-nums sm:text-3xl">
                    {String(progress).padStart(2, '0')}%
                  </strong>
                </div>

                {/* 24 segments = 12H + 12H */}
                <div
                  className="flex h-5 w-full gap-[2px] border-2 border-ink bg-cream p-[3px]"
                  role="progressbar"
                  aria-valuemin={0}
                  aria-valuemax={100}
                  aria-valuenow={progress}
                  aria-label="Loading progress"
                >
                  {Array.from({ length: SEGMENTS }, (_, i) => {
                    const on = i < filledSegments;
                    const isHead = i === filledSegments - 1 && progress < 100;
                    return (
                      <motion.span
                        key={i}
                        className={`h-full flex-1 ${i === 11 ? 'mr-[3px]' : ''}`}
                        initial={false}
                        animate={{
                          backgroundColor: on ? '#FFC400' : 'rgba(0,0,0,0.12)',
                          scaleY: isHead && animate ? [1, 1.35, 1] : 1,
                        }}
                        transition={{ duration: 0.18 }}
                      />
                    );
                  })}
                </div>

                <div className="mt-1 flex justify-between font-mono text-[8px] font-bold tracking-[0.14em] text-cream/50 uppercase">
                  <span>12H</span>
                  <span>12H</span>
                </div>

                {/* Live boot log */}
                <div className="mt-3 min-h-[3.6rem] font-mono text-[9px] font-bold tracking-[0.12em] uppercase">
                  <AnimatePresence initial={false} mode="popLayout">
                    {lastThree.map((line) => {
                      const idx = visibleLines.indexOf(line);
                      const isCurrent = idx === currentIndex;
                      return (
                        <motion.div
                          key={line.at}
                          layout={animate}
                          className={`flex items-center justify-between gap-4 py-[1px] ${
                            isCurrent ? 'text-cream' : 'text-cream/45'
                          }`}
                          initial={animate ? { opacity: 0, x: -10 } : false}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, y: -6 }}
                          transition={{ duration: 0.22 }}
                        >
                          <span>
                            <span className="mr-2 text-yellow">{isCurrent ? '>' : '✓'}</span>
                            {line.text}
                            {isCurrent && progress < 100 && animate && (
                              <motion.span
                                aria-hidden="true"
                                className="ml-1 inline-block"
                                animate={{ opacity: [1, 0, 1] }}
                                transition={{ duration: 0.8, repeat: Infinity }}
                              >
                                _
                              </motion.span>
                            )}
                          </span>
                          {!isCurrent && <span className="text-yellow/70">OK</span>}
                        </motion.div>
                      );
                    })}
                  </AnimatePresence>
                </div>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default Preloader;
