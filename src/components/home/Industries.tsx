"use client";
import { motion } from "framer-motion";
import { Link } from "@tanstack/react-router";

const INDUSTRIES = [
  { id: "food", title: "Food & Beverage", icon: "🍵", copy: "Functional foods, instant mixes, premium teas, snack seasonings." },
  { id: "nutra", title: "Nutraceuticals", icon: "💊", copy: "Capsules, tablets, powdered supplements, sports nutrition." },
  { id: "cosmetics", title: "Cosmetics", icon: "🌸", copy: "Face masks, ubtans, hair powders, natural colorants." },
  { id: "herbal", title: "Herbal Medicine", icon: "🌿", copy: "Ayurveda, traditional formulations, churnas, herbal teas." },
  { id: "wellness", title: "Wellness Brands", icon: "🍃", copy: "Adaptogens, calming blends, immunity stacks, beauty-from-within." },
  { id: "retail", title: "Retailers", icon: "🛒", copy: "Private-label retail packs, sachets, jars, gift sets." },
  { id: "bulk", title: "Bulk Manufacturers", icon: "🏭", copy: "B2B grade powders in 25 kg drums and bespoke MOQs." },
];

export function Industries() {
  return (
    <section className="relative py-32 lg:py-40">
      <div className="mx-auto max-w-7xl px-6 lg:px-12">
        <div className="mb-16 flex flex-col items-start gap-3">
          <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric">Made for</span>
          <h2 className="text-display text-[clamp(36px,5vw,72px)] leading-[1.02] text-forest-deep">
            Industries we serve.
          </h2>
        </div>

        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
          {INDUSTRIES.map((it, i) => (
            <motion.div
              key={it.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-50px" }}
              transition={{ delay: i * 0.05, duration: 0.6 }}
              data-cursor="hover"
              className="group relative overflow-hidden rounded-3xl border border-forest/10 bg-cream p-7 transition hover:border-turmeric/40 hover:bg-beige/60"
            >
              <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-turmeric/0 blur-2xl transition group-hover:bg-turmeric/30" />
              <div className="text-4xl">{it.icon}</div>
              <div className="mt-5 text-display text-2xl text-forest-deep">{it.title}</div>
              <p className="mt-2 text-sm text-forest-deep/70 leading-relaxed">{it.copy}</p>
              <Link
                to="/industries"
                className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-forest transition group-hover:text-turmeric"
              >
                Learn more <span className="transition-transform group-hover:translate-x-1">→</span>
              </Link>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
