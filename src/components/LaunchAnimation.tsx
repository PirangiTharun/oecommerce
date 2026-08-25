"use client";

import { AnimatePresence, motion } from "framer-motion";
import { useEffect, useState } from "react";
import logo from "@/assets/logo.png";

export const SHOW_LAUNCH_ANIMATION = false;

const LAUNCH_STORAGE_KEY = "websiteLaunchSeen";
const COUNTDOWN_STEP_MS = 1000;
const LIVE_HOLD_MS = 1000;
const countdownSteps = ["5", "4", "3", "2", "1", "WE'RE LIVE!"] as const;

function shouldShowLaunch() {
  if (!SHOW_LAUNCH_ANIMATION || typeof window === "undefined") return false;

  try {
    return localStorage.getItem(LAUNCH_STORAGE_KEY) !== "true";
  } catch {
    return true;
  }
}

function markLaunchSeen() {
  try {
    localStorage.setItem(LAUNCH_STORAGE_KEY, "true");
  } catch {
    // Private browsing or strict storage settings can block localStorage.
  }
}

export function LaunchAnimation() {
  const [isVisible, setIsVisible] = useState(shouldShowLaunch);
  const [step, setStep] = useState(0);

  useEffect(() => {
    if (!isVisible) return;

    const countdownTimers = countdownSteps
      .slice(1, -1)
      .map((_, index) =>
        window.setTimeout(() => setStep(index + 1), COUNTDOWN_STEP_MS * (index + 1)),
      );

    const timers = [
      ...countdownTimers,
      window.setTimeout(
        () => setStep(countdownSteps.length - 1),
        COUNTDOWN_STEP_MS * (countdownSteps.length - 1),
      ),
      window.setTimeout(
        () => {
          markLaunchSeen();
          setIsVisible(false);
        },
        COUNTDOWN_STEP_MS * (countdownSteps.length - 1) + LIVE_HOLD_MS,
      ),
    ];

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    return () => {
      timers.forEach(window.clearTimeout);
      document.body.style.overflow = previousOverflow;
    };
  }, [isVisible]);

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          key="launch-animation"
          className="fixed inset-0 z-[10000] flex min-h-screen items-center justify-center overflow-hidden bg-sunrise px-6 text-forest-deep"
          initial={{ opacity: 1 }}
          exit={{
            opacity: 0,
            scale: 1.015,
            transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] },
          }}
        >
          <motion.div
            className="absolute -top-24 right-[-12vmin] h-[54vmin] w-[54vmin] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.86 0.17 82 / 0.35), transparent 65%)",
            }}
            animate={{ scale: [1, 1.06, 1], opacity: [0.75, 1, 0.75] }}
            transition={{ duration: 5, repeat: Infinity, ease: "easeInOut" }}
          />
          <motion.div
            className="absolute bottom-[-20vmin] left-[-12vmin] h-[48vmin] w-[48vmin] rounded-full"
            style={{
              background: "radial-gradient(circle, oklch(0.55 0.13 145 / 0.22), transparent 68%)",
            }}
            animate={{ scale: [1, 1.08, 1], opacity: [0.8, 1, 0.8] }}
            transition={{ duration: 6, repeat: Infinity, ease: "easeInOut" }}
          />

          <div className="relative z-10 flex w-full max-w-xl flex-col items-center text-center">
            <motion.img
              src={logo}
              alt="Phyto Health Organics"
              className="h-20 w-20 object-contain sm:h-24 sm:w-24"
              initial={{ opacity: 0, y: 10, scale: 0.94 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.div
              className="mt-7 text-[10px] font-medium uppercase tracking-[0.45em] text-turmeric sm:text-xs"
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.15, duration: 0.6 }}
            >
              Going Live In
            </motion.div>

            <div className="mt-5 flex min-h-[120px] items-center justify-center sm:min-h-[150px]">
              <AnimatePresence mode="wait">
                <motion.div
                  key={countdownSteps[step]}
                  className={
                    step === countdownSteps.length - 1
                      ? "text-display text-[clamp(42px,9vw,86px)] leading-none text-forest-deep"
                      : "text-display text-[clamp(76px,18vw,156px)] leading-none text-forest-deep"
                  }
                  initial={{ opacity: 0, scale: 0.86, y: 16 }}
                  animate={{ opacity: 1, scale: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 1.08, y: -16 }}
                  transition={{ duration: 0.42, ease: [0.22, 1, 0.36, 1] }}
                >
                  {countdownSteps[step]}
                </motion.div>
              </AnimatePresence>
            </div>

            <motion.div
              className="mt-2 h-px w-44 bg-gradient-to-r from-transparent via-turmeric/60 to-transparent sm:w-64"
              initial={{ scaleX: 0, opacity: 0 }}
              animate={{ scaleX: 1, opacity: 1 }}
              transition={{ delay: 0.35, duration: 0.8, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.p
              className="mt-5 max-w-sm text-xs uppercase tracking-[0.32em] text-forest-deep/55 sm:text-sm"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.45, duration: 0.8 }}
            >
              Phyto Health Organics
            </motion.p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
