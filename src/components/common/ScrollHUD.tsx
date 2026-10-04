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
        className="w-7 h-7 bg-cream border-2 border-ink flex items-center justify-center text-brown"
      >
        <Compass className="w-4 h-4 text-brown" />
      </motion.div>

      {/* Vertical Progress Rail */}
      <div className="relative w-[3px] h-36 bg-cream/40 overflow-hidden">
        <motion.div
          className="w-full bg-yellow origin-top"
          style={{ height: '100%', scaleY: smoothProgress }}
        />
      </div>

      {/* Live Percentage Readout */}
      <div className="font-mono text-[10px] font-black text-ink bg-cream px-2 py-0.5 border-2 border-ink">
        {String(percent).padStart(2, '0')}%
      </div>

      {/* Floating Coordinate Tag */}
      <div className="font-mono text-[8px] text-cream font-bold tracking-widest uppercase rotate-90 origin-center mt-6">
        28°32'N
      </div>
    </aside>
  );
};

