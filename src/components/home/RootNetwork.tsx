"use client";
import { motion } from "framer-motion";
import { useState } from "react";

const BRANCHES = [
  { id: "organic", label: "Organic Farming", angle: -70, len: 220, copy: "Regenerative practices, no synthetic pesticides, soil-first cultivation." },
  { id: "hygiene", label: "Hygienic Production", angle: -45, len: 250, copy: "Stainless-steel facility, cleanroom protocols, lab-tested batches." },
  { id: "nutrient", label: "Nutrient Preservation", angle: -15, len: 270, copy: "Low-temperature drying & stone milling protect vitamins and aromatics." },
  { id: "export", label: "Export Quality", angle: 15, len: 270, copy: "FSSAI, ISO & export-grade packaging — globally compliant." },
  { id: "sustain", label: "Sustainability", angle: 45, len: 250, copy: "Solar drying, water recycling, zero-waste milling, biodegradable packs." },
  { id: "label", label: "Private Labelling", angle: 70, len: 220, copy: "Your brand, our craft — custom blends, packaging and certifications." },
];

export function RootNetwork() {
  const [active, setActive] = useState<string | null>(null);

  return (
    <section className="relative overflow-hidden bg-forest-grad py-32 text-cream lg:py-44">
      <div className="absolute inset-0 opacity-25 mix-blend-overlay"
        style={{ background: "radial-gradient(ellipse at top, oklch(0.86 0.17 82 / 0.6), transparent 60%)" }}/>
      <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5 flex flex-col justify-between">
            <div>
              <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric-glow">Roots that hold</span>
              <h2 className="mt-3 text-display text-[clamp(36px,5vw,72px)] leading-[1.02]">
                An ecosystem
                <br /><em className="not-italic shimmer-text">grown together</em>.
              </h2>
              <p className="mt-6 max-w-md text-cream/80 leading-relaxed">
                Every branch of Phyto Health Organics feeds the same root — a commitment to
                purity, to people and to the planet that holds it all.
              </p>
            </div>
            <ul className="mt-8 grid grid-cols-2 gap-2 text-sm text-cream/85">
              {BRANCHES.map((b) => (
                <li
                  key={b.id}
                  onMouseEnter={() => setActive(b.id)}
                  onMouseLeave={() => setActive(null)}
                  data-cursor="hover"
                  className={`cursor-pointer rounded-full border border-cream/15 px-4 py-2 transition ${
                    active === b.id ? "bg-turmeric/20 border-turmeric/40 text-cream" : "hover:border-cream/40"
                  }`}
                >
                  · {b.label}
                </li>
              ))}
            </ul>
          </div>

          <div className="relative lg:col-span-7">
            <div className="relative mx-auto aspect-square w-full max-w-[560px]">
              <svg viewBox="-300 -50 600 500" className="h-full w-full">
                <defs>
                  <radialGradient id="trunkGlow" cx="50%" cy="0%" r="60%">
                    <stop offset="0%" stopColor="oklch(0.86 0.17 82 / 0.8)" />
                    <stop offset="100%" stopColor="oklch(0.86 0.17 82 / 0)" />
                  </radialGradient>
                  <linearGradient id="branchG" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="oklch(0.86 0.17 82)" />
                    <stop offset="100%" stopColor="oklch(0.36 0.07 156)" />
                  </linearGradient>
                </defs>

                {/* glow */}
                <ellipse cx="0" cy="0" rx="240" ry="60" fill="url(#trunkGlow)" />

                {/* trunk */}
                <motion.line
                  x1="0" y1="0" x2="0" y2="40"
                  stroke="oklch(0.86 0.17 82)" strokeWidth="3" strokeLinecap="round"
                  initial={{ pathLength: 0 }} whileInView={{ pathLength: 1 }} viewport={{ once: true }}
                  transition={{ duration: 0.8 }}
                />

                {/* root branches */}
                {BRANCHES.map((b, i) => {
                  const rad = (b.angle * Math.PI) / 180;
                  const ex = Math.sin(rad) * b.len;
                  const ey = 40 + Math.cos(rad) * b.len;
                  const cx = Math.sin(rad) * (b.len * 0.45);
                  const cy = 40 + Math.cos(rad) * (b.len * 0.7);
                  const isActive = active === b.id;
                  return (
                    <g key={b.id}>
                      <motion.path
                        d={`M0 40 Q ${cx} ${cy} ${ex} ${ey}`}
                        stroke={isActive ? "oklch(0.86 0.17 82)" : "url(#branchG)"}
                        strokeWidth={isActive ? 2.4 : 1.6}
                        fill="none" strokeLinecap="round"
                        initial={{ pathLength: 0, opacity: 0 }}
                        whileInView={{ pathLength: 1, opacity: 1 }}
                        viewport={{ once: true }}
                        transition={{ duration: 1.1, delay: 0.2 + i * 0.08 }}
                        style={{ filter: isActive ? "drop-shadow(0 0 8px oklch(0.86 0.17 82 / 0.7))" : "none" }}
                      />
                      <motion.circle
                        cx={ex} cy={ey} r={isActive ? 7 : 4.5}
                        fill="oklch(0.86 0.17 82)"
                        initial={{ scale: 0 }}
                        whileInView={{ scale: 1 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.6 + i * 0.08 }}
                      />
                    </g>
                  );
                })}
              </svg>

              {/* active card */}
              <motion.div
                key={active ?? "idle"}
                initial={{ opacity: 0, y: 8 }}
                animate={{ opacity: 1, y: 0 }}
                className="absolute left-1/2 bottom-0 w-[260px] -translate-x-1/2 rounded-2xl glass-dark p-5 text-center"
              >
                {active ? (
                  <>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-turmeric-glow">Branch</div>
                    <div className="mt-1 text-display text-xl text-cream">
                      {BRANCHES.find((b) => b.id === active)!.label}
                    </div>
                    <p className="mt-3 text-sm text-cream/80 leading-relaxed">
                      {BRANCHES.find((b) => b.id === active)!.copy}
                    </p>
                  </>
                ) : (
                  <>
                    <div className="text-[10px] uppercase tracking-[0.35em] text-turmeric-glow">Hover</div>
                    <div className="mt-1 text-display text-xl text-cream">
                      Six roots, one promise.
                    </div>
                    <p className="mt-3 text-sm text-cream/70 leading-relaxed">
                      Move across the branches to feel each pillar of the Phyto Health Organics standard.
                    </p>
                  </>
                )}
              </motion.div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
