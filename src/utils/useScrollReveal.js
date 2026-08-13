import { useEffect, useRef } from "react";

/**
 * Intersection Observer hook that adds 'reveal--visible' class
 * when elements scroll into view (mirrors framer-motion whileInView).
 *
 * Takes primitives rather than an options object so the effect deps stay
 * stable across renders.
 */
export default function useScrollReveal({ threshold = 0.1, rootMargin } = {}) {
  const ref = useRef(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    // Respect reduced-motion: reveal immediately, skip the observer entirely.
    if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
      el.classList.add("reveal--visible");
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("reveal--visible");
          observer.unobserve(entry.target);
        }
      },
      { threshold, rootMargin }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, rootMargin]);

  return ref;
}
