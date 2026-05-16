"use client";
import { useEffect, useRef } from "react";

type Particle = {
  x: number; y: number; vx: number; vy: number;
  r: number; hue: number; alpha: number; life: number;
};

const PALETTE = [
  // turmeric, sage, lavender, cream, rose
  [42, 80, 60],
  [120, 28, 60],
  [285, 35, 70],
  [60, 30, 92],
  [10, 60, 65],
];

export function ParticleField({
  density = 70,
  speed = 0.25,
  className = "",
}: {
  density?: number;
  speed?: number;
  className?: string;
}) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const mouse = useRef({ x: -9999, y: -9999 });
  const rafRef = useRef(0);

  useEffect(() => {
    if (typeof window === "undefined") return;
    const canvas = canvasRef.current!;
    const ctx = canvas.getContext("2d", { alpha: true })!;
    const dpr = Math.min(window.devicePixelRatio || 1, 2);
    let w = 0, h = 0;
    let particles: Particle[] = [];
    const isMobile = window.matchMedia("(max-width: 768px)").matches;
    const reduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    const count = reduced ? 0 : Math.round(density * (isMobile ? 0.4 : 1));

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      w = rect.width; h = rect.height;
      canvas.width = w * dpr;
      canvas.height = h * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const seed = () => {
      particles = Array.from({ length: count }, () => makeParticle(true));
    };

    const makeParticle = (initial = false): Particle => {
      const c = PALETTE[Math.floor(Math.random() * PALETTE.length)];
      return {
        x: Math.random() * w,
        y: initial ? Math.random() * h : -10,
        vx: (Math.random() - 0.5) * speed,
        vy: speed * (0.4 + Math.random() * 0.8),
        r: 0.8 + Math.random() * 2.4,
        hue: c[0] + (Math.random() - 0.5) * 8,
        alpha: 0.18 + Math.random() * 0.5,
        life: 0,
      };
    };

    const onMouse = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      mouse.current.x = e.clientX - rect.left;
      mouse.current.y = e.clientY - rect.top;
    };
    const onLeave = () => { mouse.current.x = -9999; mouse.current.y = -9999; };

    const tick = () => {
      ctx.clearRect(0, 0, w, h);
      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];
        // cursor repel
        const dx = p.x - mouse.current.x;
        const dy = p.y - mouse.current.y;
        const d2 = dx * dx + dy * dy;
        if (d2 < 14000) {
          const f = (14000 - d2) / 14000 * 0.9;
          p.vx += (dx / Math.sqrt(d2 + 0.01)) * f * 0.4;
          p.vy += (dy / Math.sqrt(d2 + 0.01)) * f * 0.4;
        }
        p.vx *= 0.985;
        p.vy = p.vy * 0.99 + 0.005;
        p.x += p.vx;
        p.y += p.vy;
        p.life++;
        if (p.y > h + 12 || p.x < -12 || p.x > w + 12 || p.life > 1200) {
          particles[i] = makeParticle();
          continue;
        }
        ctx.beginPath();
        const c = PALETTE.find((p2) => Math.abs(p2[0] - p.hue) < 12) ?? PALETTE[0];
        ctx.fillStyle = `oklch(${c[2] / 100} ${c[1] / 200} ${p.hue} / ${p.alpha})`;
        ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
        ctx.fill();
      }
      rafRef.current = requestAnimationFrame(tick);
    };

    resize();
    seed();
    window.addEventListener("resize", resize);
    window.addEventListener("mousemove", onMouse);
    window.addEventListener("mouseleave", onLeave);
    rafRef.current = requestAnimationFrame(tick);
    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener("resize", resize);
      window.removeEventListener("mousemove", onMouse);
      window.removeEventListener("mouseleave", onLeave);
    };
  }, [density, speed]);

  return (
    <canvas
      ref={canvasRef}
      aria-hidden
      className={`pointer-events-none absolute inset-0 h-full w-full ${className}`}
    />
  );
}
