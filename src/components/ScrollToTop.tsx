"use client";
import { useEffect, useState } from "react";
import { useRouterState } from "@tanstack/react-router";
import { motion, AnimatePresence } from "framer-motion";

/** Scrolls window to top on every route change */
function useScrollToTopOnNav() {
  const pathname = useRouterState({ select: (s) => s.location.pathname });
  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "instant" });
  }, [pathname]);
}

/** Floating scroll-to-top button — appears after scrolling 300px */
export function ScrollToTop() {
  useScrollToTopOnNav();

  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.button
          key="scroll-top"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.3, ease: [0.22, 1, 0.36, 1] }}
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          aria-label="Scroll to top"
          className="fixed bottom-8 right-8 z-50 group flex h-11 w-11 items-center justify-center rounded-full bg-forest-deep text-cream shadow-[0_4px_24px_oklch(0.2_0.06_158/0.45)] transition-all duration-200 hover:bg-turmeric hover:text-forest-deep hover:shadow-glow-gold"
        >
          <svg viewBox="0 0 16 16" fill="none" className="h-4 w-4 transition-transform duration-200 group-hover:-translate-y-0.5" aria-hidden>
            <path d="M8 12V4M4 7l4-4 4 4" stroke="currentColor" strokeWidth="1.8" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          {/* Tooltip */}
        </motion.button>
      )}
    </AnimatePresence>
  );
}
