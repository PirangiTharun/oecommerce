"use client";
import { useRef, type ButtonHTMLAttributes, type ReactNode } from "react";
import { motion, useMotionValue, useSpring, useTransform } from "framer-motion";

type Props = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: "primary" | "ghost" | "gold";
  children: ReactNode;
};

export function MagneticButton({
  variant = "primary",
  children,
  className = "",
  ...rest
}: Props) {
  const ref = useRef<HTMLButtonElement>(null);
  const x = useMotionValue(0);
  const y = useMotionValue(0);
  const sx = useSpring(x, { stiffness: 220, damping: 18, mass: 0.4 });
  const sy = useSpring(y, { stiffness: 220, damping: 18, mass: 0.4 });
  const tx = useTransform(sx, (v) => `${v}px`);
  const ty = useTransform(sy, (v) => `${v}px`);

  const onMove = (e: React.MouseEvent<HTMLButtonElement>) => {
    const r = ref.current!.getBoundingClientRect();
    x.set((e.clientX - (r.left + r.width / 2)) * 0.25);
    y.set((e.clientY - (r.top + r.height / 2)) * 0.25);
  };
  const onLeave = () => { x.set(0); y.set(0); };

  const styles =
    variant === "primary"
      ? "bg-forest text-cream shadow-glow-forest hover:bg-forest-deep"
      : variant === "gold"
      ? "bg-turmeric text-forest-deep shadow-glow-gold hover:brightness-105"
      : "glass border border-forest-deep/30 text-forest-deep hover:bg-forest hover:text-cream hover:border-forest";

  return (
    <motion.button
      ref={ref}
      onMouseMove={onMove}
      onMouseLeave={onLeave}
      style={{ x: tx, y: ty }}
      data-cursor="hover"
      className={`group relative inline-flex items-center gap-2 overflow-hidden rounded-full px-7 py-4 text-[12px] font-medium uppercase tracking-[0.24em] transition-colors duration-500 ${styles} ${className}`}
      {...(rest as object)}
    >
      <span className="absolute inset-0 -z-0 opacity-0 transition group-hover:opacity-100"
        style={{ background: "radial-gradient(circle at center, oklch(0.86 0.17 82 / 0.4), transparent 65%)" }}/>
      <span className="relative">{children}</span>
      <span className="relative transition-transform duration-300 group-hover:translate-x-1">→</span>
    </motion.button>
  );
}
