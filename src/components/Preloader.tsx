"use client";
import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

export function Preloader() {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (typeof window === "undefined") return;
    const seen = sessionStorage.getItem("ayra:loaded");
    if (seen) { setDone(true); return; }
    const t = setTimeout(() => {
      sessionStorage.setItem("ayra:loaded", "1");
      setDone(true);
    }, 4200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          key="preloader"
          className="fixed inset-0 z-[10000] flex items-center justify-center bg-earth-grad overflow-hidden"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.9, ease: [0.22, 1, 0.36, 1] } }}
        >
          {/* warm sun */}
          <motion.div
            className="absolute -top-40 left-1/2 -translate-x-1/2 h-[60vmin] w-[60vmin] rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.92 0.16 85 / 0.55), transparent 65%)" }}
            initial={{ y: -200, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 1.6, duration: 1.4 }}
          />
          {/* soil line */}
          <div className="absolute bottom-[34%] left-0 right-0 h-px bg-gradient-to-r from-transparent via-[oklch(0.86_0.17_82/0.4)] to-transparent" />

          {/* seed -> sprout */}
          <svg viewBox="0 0 200 240" className="relative h-[44vmin] w-[44vmin]" aria-hidden>
            <defs>
              <linearGradient id="stem" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.36 0.07 156)" />
                <stop offset="100%" stopColor="oklch(0.66 0.1 140)" />
              </linearGradient>
              <radialGradient id="seedG" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.86 0.17 82)" />
                <stop offset="100%" stopColor="oklch(0.45 0.1 70)" />
              </radialGradient>
            </defs>

            {/* falling seed */}
            <motion.ellipse
              cx="100" cy="160" rx="9" ry="13"
              fill="url(#seedG)"
              initial={{ cy: -20, opacity: 0 }}
              animate={{ cy: 160, opacity: 1 }}
              transition={{ duration: 0.9, ease: "easeIn" }}
            />

            {/* roots */}
            <motion.path
              d="M100 168 C 90 185, 80 195, 72 218 M100 168 C 110 188, 120 200, 130 222 M100 168 C 100 190, 100 205, 100 226"
              stroke="oklch(0.34 0.05 55)"
              strokeWidth="1.6" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0, opacity: 0 }}
              animate={{ pathLength: 1, opacity: 0.85 }}
              transition={{ delay: 1.0, duration: 1.1, ease: "easeOut" }}
            />

            {/* stem */}
            <motion.path
              d="M100 160 C 100 130, 96 105, 100 70"
              stroke="url(#stem)" strokeWidth="3" fill="none" strokeLinecap="round"
              initial={{ pathLength: 0 }}
              animate={{ pathLength: 1 }}
              transition={{ delay: 1.4, duration: 1.0, ease: [0.22, 1, 0.36, 1] }}
            />

            {/* leaves */}
            <motion.path
              d="M100 110 C 75 100, 60 110, 60 125 C 75 130, 95 122, 100 110 Z"
              fill="oklch(0.5 0.13 145)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 0.95 }}
              style={{ transformOrigin: "100px 115px" }}
              transition={{ delay: 1.9, duration: 0.5, ease: "backOut" }}
            />
            <motion.path
              d="M100 90 C 125 80, 140 92, 140 108 C 125 112, 105 102, 100 90 Z"
              fill="oklch(0.55 0.13 140)"
              initial={{ scale: 0, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              style={{ transformOrigin: "100px 95px" }}
              transition={{ delay: 2.15, duration: 0.5, ease: "backOut" }}
            />

            {/* particles */}
            {Array.from({ length: 18 }).map((_, i) => (
              <motion.circle
                key={i}
                cx={100 + Math.cos(i) * 40}
                cy={70 + Math.sin(i) * 30}
                r={1.2 + (i % 3) * 0.4}
                fill="oklch(0.86 0.17 82)"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: [0, 0.9, 0], y: -30 }}
                transition={{ delay: 2.3 + i * 0.04, duration: 1.4, repeat: 0 }}
              />
            ))}
          </svg>

          {/* wordmark */}
          <motion.div
            className="absolute bottom-[14%] left-1/2 -translate-x-1/2 text-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 2.4, duration: 0.7 }}
          >
            <div className="text-display text-[clamp(28px,4vw,46px)] tracking-[0.32em]">
              <span style={{ color: "oklch(0.72 0.14 145)" }}>PHYTO</span>{" "}
              <span style={{ color: "oklch(0.86 0.17 82)" }}>HEALTH</span>{" "}
              <span style={{ color: "oklch(0.72 0.14 145)" }}>ORGANICS</span>
            </div>
            <div className="mt-2 text-[10px] uppercase tracking-[0.5em] text-[oklch(0.86_0.17_82)]">
              Nurturing Nature, Nurturing Lives
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
