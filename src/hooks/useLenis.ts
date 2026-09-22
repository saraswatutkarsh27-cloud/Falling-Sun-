import { useEffect } from 'react';
import Lenis from 'lenis';

export const useLenis = () => {
  useEffect(() => {
    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (prefersReducedMotion) return;

    document.documentElement.classList.add('lenis', 'lenis-smooth');

    const lenis = new Lenis({
      duration: 1.4,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1.0,
      touchMultiplier: 1.8,
      infinite: false,
    });

    // Make lenis globally available
    (window as unknown as { lenis: Lenis }).lenis = lenis;

    // Sync Lenis scroll ticks with standard DOM scroll events so Framer Motion useScroll glides on every subpixel RAF
    lenis.on('scroll', () => {
      window.dispatchEvent(new CustomEvent('lenis-scroll'));
    });

    let animId: number;
    function raf(time: number) {
      lenis.raf(time);
      animId = requestAnimationFrame(raf);
    }

    animId = requestAnimationFrame(raf);

    // Recalculate dimensions on window resize or DOM changes
    const resizeObserver = new ResizeObserver(() => {
      lenis.resize();
    });
    resizeObserver.observe(document.body);

    return () => {
      cancelAnimationFrame(animId);
      resizeObserver.disconnect();
      lenis.destroy();
      document.documentElement.classList.remove('lenis', 'lenis-smooth');
      delete (window as unknown as { lenis?: Lenis }).lenis;
    };
  }, []);
};
