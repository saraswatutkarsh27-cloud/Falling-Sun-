import React, { useEffect, useState } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'framer-motion';
import { Compass } from 'lucide-react';

export const ScrollHUD: React.FC = () => {
  const { scrollYProgress, scrollY } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 300, damping: 30 });
  const [percent, setPercent] = useState(0);

  // Rotating compass angle on scroll
  const rotateAngle = useTransform(scrollY, [0, 4000], [0, 720]);

  useEffect(() => {
    return scrollYProgress.on('change', (v) => {
      setPercent(Math.round(v * 100));
    });
  }, [scrollYProgress]);

  return (
    <aside aria-label="Scroll telemetry" className="fixed right-4 sm:right-6 top-1/2 -translate-y-1/2 z-40 hidden md:flex flex-col items-center gap-3 pointer-events-none select-none">
      {/* Top Compass / Radar Indicator */}
      <motion.div
        style={{ rotate: rotateAngle }}
        className="w-7 h-7 rounded-full bg-white/90 border border-black/15 flex items-center justify-center shadow-sm text-sun"
      >
        <Compass className="w-4 h-4 text-sun" />
      </motion.div>

      {/* Vertical Hairline Progress Rail */}
      <div className="relative w-[3px] h-36 bg-black/10 rounded-full overflow-hidden">
        <motion.div
          className="w-full bg-gradient-to-b from-sun via-amber-500 to-flame rounded-full origin-top"
          style={{ height: '100%', scaleY: smoothProgress }}
        />
      </div>

      {/* Live Percentage Readout */}
      <div className="font-mono text-[10px] font-bold text-ink-soft bg-white/90 px-2 py-0.5 rounded border border-black/10 shadow-sm">
        {String(percent).padStart(2, '0')}%
      </div>

      {/* Floating Coordinate Tag */}
      <div className="font-mono text-[8px] text-ink-faint tracking-widest uppercase rotate-90 origin-center mt-6">
        28°32'N
      </div>
    </aside>
  );
};

