"use client";
import { useEffect, useRef, useState } from "react";

export function OrganicCursor() {
  const dot = useRef<HTMLDivElement>(null);
  const ring = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);
  const [hover, setHover] = useState(false);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const can = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
    setEnabled(can);
    if (!can) return;
    document.documentElement.classList.add("has-cursor");
    let mx = window.innerWidth / 2, my = window.innerHeight / 2;
    let rx = mx, ry = my;
    const move = (e: MouseEvent) => {
      mx = e.clientX; my = e.clientY;
      if (dot.current) {
        dot.current.style.transform = `translate3d(${mx - 4}px, ${my - 4}px, 0)`;
      }
      const t = e.target as HTMLElement | null;
      const interactive = !!t?.closest("a,button,[data-cursor='hover'],input,textarea,select,label");
      setHover(interactive);
    };
    let raf = 0;
    const tick = () => {
      rx += (mx - rx) * 0.15;
      ry += (my - ry) * 0.15;
      if (ring.current) {
        ring.current.style.transform = `translate3d(${rx - 22}px, ${ry - 22}px, 0)`;
      }
      raf = requestAnimationFrame(tick);
    };
    raf = requestAnimationFrame(tick);
    window.addEventListener("mousemove", move);
    return () => {
      cancelAnimationFrame(raf);
      window.removeEventListener("mousemove", move);
      document.documentElement.classList.remove("has-cursor");
    };
  }, []);

  if (!enabled) return null;
  return (
    <>
      <div
        ref={ring}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9998] h-11 w-11 rounded-full transition-[width,height,opacity,background] duration-300"
        style={{
          background: hover
            ? "radial-gradient(circle, oklch(0.86 0.17 82 / 0.35), oklch(0.36 0.07 156 / 0.05) 70%)"
            : "radial-gradient(circle, oklch(0.66 0.06 138 / 0.18), transparent 70%)",
          border: `1px solid ${hover ? "oklch(0.86 0.17 82 / 0.7)" : "oklch(0.36 0.07 156 / 0.35)"}`,
          mixBlendMode: "multiply",
        }}
      />
      <div
        ref={dot}
        aria-hidden
        className="pointer-events-none fixed left-0 top-0 z-[9999] h-2 w-2 rounded-full"
        style={{
          background: "oklch(0.36 0.07 156)",
          boxShadow: "0 0 10px oklch(0.86 0.17 82 / 0.8)",
        }}
      />
    </>
  );
}
