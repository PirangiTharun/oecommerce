"use client";
import { useScroll, useTransform, motion, useMotionValueEvent } from "framer-motion";
import { useRef, useState } from "react";
import { Link } from "@tanstack/react-router";
import { MagneticButton } from "@/components/MagneticButton";
import { ParticleField } from "@/components/ParticleField";
import heroFarm from "@/assets/hero-farm.jpg";
import seedSprout from "@/assets/seed-sprout.jpg";
import powderBurst from "@/assets/powder-burst.jpg";
import processDrying from "@/assets/process-drying.jpg";
import productHero from "@/assets/product-hero.jpg";

/**
 * Hero — cinematic seed → plant → powder journey.
 * Uses scroll-linked Framer transforms over a tall pinned section.
 */
export function HomeHero() {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end end"],
  });

  // Growth stage progress (scroll-linked)
  const growthOpacity = useTransform(scrollYProgress, [0.0, 0.04, 0.55, 0.62], [0, 1, 1, 0]);
  // Seed: drops from above into soil
  const seedDropY = useTransform(scrollYProgress, [0, 0.06, 0.1], [-180, 0, 6]);
  const seedSquish = useTransform(scrollYProgress, [0.06, 0.1, 0.14], [1, 1.15, 1]);
  const seedFade = useTransform(scrollYProgress, [0.18, 0.28], [1, 0]);
  // Roots
  const rootsLen = useTransform(scrollYProgress, [0.1, 0.28], [0, 1]);
  // Stem
  const stemLen = useTransform(scrollYProgress, [0.18, 0.42], [0, 1]);
  // Leaves
  const leafA = useTransform(scrollYProgress, [0.28, 0.4], [0, 1]);
  const leafB = useTransform(scrollYProgress, [0.34, 0.46], [0, 1]);
  const leafC = useTransform(scrollYProgress, [0.4, 0.52], [0, 1]);
  const leafD = useTransform(scrollYProgress, [0.46, 0.56], [0, 1]);
  // Flower bloom
  const bloom = useTransform(scrollYProgress, [0.5, 0.62], [0, 1]);

  const powderOpacity = useTransform(scrollYProgress, [0.62, 0.75], [0, 1]);
  const powderScale = useTransform(scrollYProgress, [0.62, 1], [0.85, 1.05]);

  const farmOpacity = useTransform(scrollYProgress, [0, 0.4, 0.8, 1], [1, 0.6, 0.25, 0.15]);
  const farmScale = useTransform(scrollYProgress, [0, 1], [1.1, 1.25]);

  const titleY = useTransform(scrollYProgress, [0, 0.4], [0, -120]);
  const titleOp = useTransform(scrollYProgress, [0, 0.35], [1, 0]);

  const sunY = useTransform(scrollYProgress, [0, 1], [0, 200]);

  return (
    <section ref={ref} className="relative h-[320vh]">
      <div className="sticky top-0 h-screen w-full overflow-hidden">
        {/* sky/farm parallax */}
        <motion.div
          aria-hidden
          style={{ opacity: farmOpacity, scale: farmScale }}
          className="absolute inset-0"
        >
          <img
            src={heroFarm}
            alt=""
            className="h-full w-full object-cover"
            fetchPriority="high"
          />
          {/* Stronger scrim for legibility of hero text */}
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/30 to-cream" />
          <div className="absolute inset-x-0 top-0 h-[55vh] bg-gradient-to-b from-cream/85 via-cream/40 to-transparent" />
        </motion.div>

        {/* sun */}
        <motion.div
          aria-hidden
          style={{ y: sunY }}
          className="absolute right-[12%] top-[8%] h-[28vmin] w-[28vmin] rounded-full"
        >
          <div className="absolute inset-0 rounded-full"
            style={{ background: "radial-gradient(circle, oklch(0.92 0.16 85 / 0.7), transparent 65%)" }}/>
        </motion.div>

        {/* particles */}
        <ParticleField density={90} className="z-[1]" />

        {/* SEED → PLANT growth (scroll-linked SVG) */}
        <motion.div
          style={{ opacity: growthOpacity }}
          className="absolute inset-0 flex items-end justify-center pb-[8vh]"
          aria-hidden
        >
          <svg viewBox="0 0 400 520" className="h-[78vmin] w-[78vmin] max-h-[88vh]">
            <defs>
              <linearGradient id="soilGrad" x1="0" x2="0" y1="0" y2="1">
                <stop offset="0%" stopColor="oklch(0.42 0.06 55)" />
                <stop offset="60%" stopColor="oklch(0.32 0.05 50)" />
                <stop offset="100%" stopColor="oklch(0.22 0.04 45)" />
              </linearGradient>
              <linearGradient id="stemGrad" x1="0" x2="0" y1="1" y2="0">
                <stop offset="0%" stopColor="oklch(0.4 0.08 150)" />
                <stop offset="100%" stopColor="oklch(0.68 0.13 140)" />
              </linearGradient>
              <radialGradient id="seedGrad" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="oklch(0.78 0.13 75)" />
                <stop offset="100%" stopColor="oklch(0.38 0.09 60)" />
              </radialGradient>
              <radialGradient id="bloomGrad" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="oklch(0.92 0.16 85)" />
                <stop offset="60%" stopColor="oklch(0.78 0.18 55)" />
                <stop offset="100%" stopColor="oklch(0.55 0.16 35)" />
              </radialGradient>
            </defs>

            {/* SOIL — cross-section */}
            <path
              d="M0 360 Q 100 350 200 358 T 400 360 L 400 520 L 0 520 Z"
              fill="url(#soilGrad)"
            />
            {/* soil texture flecks */}
            {Array.from({ length: 40 }).map((_, i) => (
              <circle
                key={i}
                cx={(i * 53) % 400}
                cy={365 + ((i * 17) % 150)}
                r={0.8 + (i % 3) * 0.4}
                fill="oklch(0.55 0.07 60 / 0.4)"
              />
            ))}
            {/* surface highlight */}
            <path
              d="M0 360 Q 100 350 200 358 T 400 360"
              stroke="oklch(0.6 0.08 65 / 0.5)"
              strokeWidth="1.5"
              fill="none"
            />

            {/* SEED falls into soil */}
            <motion.g style={{ y: seedDropY }}>
              <motion.ellipse
                cx="200"
                cy="362"
                rx="11"
                ry="14"
                fill="url(#seedGrad)"
                style={{ scaleY: seedSquish, opacity: seedFade, transformOrigin: "200px 376px" }}
              />
            </motion.g>

            {/* ROOTS grow downward into soil */}
            <motion.g style={{ pathLength: rootsLen, opacity: rootsLen }}>
              <motion.path
                d="M200 370 C 195 395, 178 420, 165 470"
                stroke="oklch(0.5 0.08 55)"
                strokeWidth="2" fill="none" strokeLinecap="round"
                style={{ pathLength: rootsLen }}
              />
              <motion.path
                d="M200 370 C 205 398, 222 425, 238 478"
                stroke="oklch(0.5 0.08 55)"
                strokeWidth="2" fill="none" strokeLinecap="round"
                style={{ pathLength: rootsLen }}
              />
              <motion.path
                d="M200 370 C 200 400, 200 440, 200 490"
                stroke="oklch(0.5 0.08 55)"
                strokeWidth="2.2" fill="none" strokeLinecap="round"
                style={{ pathLength: rootsLen }}
              />
              <motion.path
                d="M200 370 C 188 388, 168 395, 142 405"
                stroke="oklch(0.5 0.08 55)"
                strokeWidth="1.4" fill="none" strokeLinecap="round"
                style={{ pathLength: rootsLen }}
              />
              <motion.path
                d="M200 370 C 212 388, 232 395, 258 402"
                stroke="oklch(0.5 0.08 55)"
                strokeWidth="1.4" fill="none" strokeLinecap="round"
                style={{ pathLength: rootsLen }}
              />
            </motion.g>

            {/* STEM rises from soil */}
            <motion.path
              d="M200 360 C 200 300, 192 240, 200 140"
              stroke="url(#stemGrad)"
              strokeWidth="4.5"
              fill="none"
              strokeLinecap="round"
              style={{ pathLength: stemLen }}
            />

            {/* LEAVES unfold */}
            <motion.path
              d="M198 290 C 158 282, 130 296, 128 318 C 158 326, 188 314, 198 290 Z"
              fill="oklch(0.5 0.13 145)"
              style={{ scale: leafA, opacity: leafA, transformOrigin: "198px 305px" }}
            />
            <motion.path
              d="M199 250 C 240 242, 268 256, 270 278 C 240 286, 210 274, 199 250 Z"
              fill="oklch(0.55 0.14 142)"
              style={{ scale: leafB, opacity: leafB, transformOrigin: "199px 265px" }}
            />
            <motion.path
              d="M198 210 C 162 200, 138 212, 138 232 C 165 240, 192 230, 198 210 Z"
              fill="oklch(0.58 0.13 138)"
              style={{ scale: leafC, opacity: leafC, transformOrigin: "198px 222px" }}
            />
            <motion.path
              d="M200 175 C 232 168, 256 178, 258 196 C 232 204, 208 194, 200 175 Z"
              fill="oklch(0.62 0.13 135)"
              style={{ scale: leafD, opacity: leafD, transformOrigin: "200px 188px" }}
            />

            {/* FLOWER BLOOM at the top */}
            <motion.g style={{ scale: bloom, opacity: bloom, transformOrigin: "200px 130px" }}>
              {Array.from({ length: 8 }).map((_, i) => {
                const a = (i * Math.PI * 2) / 8;
                const cx = 200 + Math.cos(a) * 22;
                const cy = 130 + Math.sin(a) * 22;
                return (
                  <ellipse key={i} cx={cx} cy={cy} rx="14" ry="9"
                    fill="oklch(0.86 0.17 82 / 0.95)"
                    transform={`rotate(${(a * 180) / Math.PI} ${cx} ${cy})`} />
                );
              })}
              <circle cx="200" cy="130" r="12" fill="url(#bloomGrad)" />
            </motion.g>
          </svg>
        </motion.div>

        {/* POWDER stage image */}
        <motion.div
          style={{ opacity: powderOpacity, scale: powderScale }}
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="relative h-[80vmin] w-[80vmin] max-h-[80vh] max-w-[80vh] overflow-hidden rounded-[40%]">
            <img src={powderBurst} alt="" className="h-full w-full object-cover" />
          </div>
        </motion.div>
        <motion.div
          style={{ opacity: powderOpacity, scale: powderScale }}
          className="absolute inset-0 flex items-center justify-center"
          aria-hidden
        >
          <div className="relative h-[80vmin] w-[80vmin] max-h-[80vh] max-w-[80vh] overflow-hidden rounded-[40%]">
            <img src={powderBurst} alt="" className="h-full w-full object-cover" />
          </div>
        </motion.div>

        {/* HEADLINE */}
        <motion.div
          style={{ y: titleY, opacity: titleOp }}
          className="absolute inset-x-0 top-[16vh] z-10 flex flex-col items-center text-center px-6"
        >
          {/* soft cream halo for legibility */}
          <div
            aria-hidden
            className="pointer-events-none absolute left-1/2 top-1/2 -z-10 h-[80vmin] w-[120vmin] -translate-x-1/2 -translate-y-1/2 rounded-full"
            style={{ background: "radial-gradient(ellipse at center, oklch(0.965 0.015 88 / 0.85) 0%, oklch(0.965 0.015 88 / 0.55) 35%, transparent 70%)" }}
          />
          <span className="mb-5 inline-flex items-center gap-2 rounded-full glass px-4 py-1.5 text-[10px] uppercase tracking-[0.4em] text-forest-deep shadow-soft">
            <span className="h-1.5 w-1.5 rounded-full bg-turmeric animate-glow-pulse" />
            Cultivated in India
          </span>
          <h1 className="text-display text-[clamp(46px,9vw,140px)] leading-[0.95] text-forest-deep text-legible">
            Pure Nature.
            <br />
            <span className="shimmer-text italic">Premium Powders.</span>
          </h1>
          <p className="mt-7 max-w-2xl text-base md:text-lg text-forest-deep leading-relaxed text-legible">
            Organic fruit, flower, vegetable and superfood powders — crafted with
            purity, precision and the patience of the seasons.
          </p>
          <div className="mt-10 flex flex-wrap items-center justify-center gap-4">
            <Link to="/products">
              <MagneticButton variant="primary">Explore Products</MagneticButton>
            </Link>
            <Link to="/bulk-order">
              <MagneticButton variant="ghost">Request Bulk Order</MagneticButton>
            </Link>
          </div>
        </motion.div>

        {/* scroll hint */}
        <motion.div
          aria-hidden
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.2 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-[10px] uppercase tracking-[0.4em] text-forest-deep/60"
        >
          <span>Scroll to grow</span>
          <span className="block h-10 w-px bg-gradient-to-b from-forest-deep/0 to-forest-deep/60 animate-breathe" />
        </motion.div>
      </div>
    </section>
  );
}

/** Scroll storytelling band — horizontal-ish chapters of the journey. */
export function HomeStory() {
  const chapters = [
    {
      img: heroFarm,
      kicker: "01 · Field",
      title: "From living soil",
      copy: "Every powder begins in regenerative fields tended without chemical pesticides — the wind moving through the crops, the dew, the patience.",
    },
    {
      img: processDrying,
      kicker: "02 · Drying",
      title: "Sun-dried, slow-cured",
      copy: "Harvests are gently sun-cured on bamboo trays — preserving color, aroma and the delicate phytonutrients that machines often destroy.",
    },
    {
      img: powderBurst,
      kicker: "03 · Mill",
      title: "Stone-milled, micron-fine",
      copy: "Stone milling at controlled temperatures keeps every micron of nutrition alive, transforming the harvest into vibrant, aromatic powder.",
    },
    {
      img: productHero,
      kicker: "04 · Pack",
      title: "Sealed for the world",
      copy: "Hygienically packed, certified for export, ready for your formulation, your shelf, your private label — with the Phyto Health Organics standard inside.",
    },
  ];

  return (
    <section className="relative py-32 lg:py-44">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-20 flex flex-col gap-3 text-center">
          <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric">The Journey</span>
          <h2 className="text-display text-[clamp(36px,5.5vw,80px)] leading-[1.02] text-forest-deep">
            Seed to <em className="not-italic shimmer-text">Powder</em>.
            <br />Slow-made, by intention.
          </h2>
        </div>
        <div className="space-y-32">
          {chapters.map((c, i) => (
            <StoryRow key={c.kicker} chapter={c} reverse={i % 2 === 1} />
          ))}
        </div>
      </div>
    </section>
  );
}

function StoryRow({ chapter, reverse }: { chapter: { img: string; kicker: string; title: string; copy: string }; reverse: boolean }) {
  const ref = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({ target: ref, offset: ["start end", "end start"] });
  const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
  const scale = useTransform(scrollYProgress, [0, 0.5, 1], [1.05, 1, 1.05]);
  return (
    <div ref={ref} className={`grid items-center gap-10 lg:grid-cols-12 ${reverse ? "lg:[direction:rtl]" : ""}`}>
      <motion.div style={{ y }} className="lg:col-span-7 lg:[direction:ltr]">
        <div className="relative aspect-[4/3] overflow-hidden rounded-[2rem] shadow-soft">
          <motion.img
            src={chapter.img}
            alt={chapter.title}
            loading="lazy"
            style={{ scale }}
            className="absolute inset-0 h-full w-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-tr from-forest-deep/30 via-transparent to-transparent" />
        </div>
      </motion.div>
      <div className="lg:col-span-5 lg:[direction:ltr]">
        <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric">{chapter.kicker}</span>
        <h3 className="mt-3 text-display text-[clamp(28px,3.5vw,48px)] leading-tight text-forest-deep">
          {chapter.title}
        </h3>
        <p className="mt-5 text-base text-forest-deep/75 leading-relaxed max-w-md">{chapter.copy}</p>
      </div>
    </div>
  );
}
