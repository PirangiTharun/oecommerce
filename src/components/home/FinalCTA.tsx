"use client";
import { Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { MagneticButton } from "@/components/MagneticButton";
import { ParticleField } from "@/components/ParticleField";

export function FinalCTA() {
  return (
    <section className="relative overflow-hidden bg-earth-grad py-32 text-cream lg:py-44">
      <ParticleField density={120} />
      <div className="absolute inset-0"
        style={{ background: "radial-gradient(ellipse at center, oklch(0.86 0.17 82 / 0.25), transparent 60%)" }}/>
      <div className="relative mx-auto max-w-5xl px-6 text-center lg:px-12">
        <motion.span
          initial={{ opacity: 0, y: 12 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-[10px] uppercase tracking-[0.5em] text-turmeric-glow"
        >
          The invitation
        </motion.span>
        <motion.h2
          initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ delay: 0.1 }}
          className="mt-6 text-display text-[clamp(40px,7vw,110px)] leading-[0.98]"
        >
          Bring nature
          <br />
          <em className="not-italic shimmer-text">into every product.</em>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0 }} whileInView={{ opacity: 1 }}
          viewport={{ once: true }} transition={{ delay: 0.2 }}
          className="mx-auto mt-7 max-w-xl text-cream/80 leading-relaxed"
        >
          Whether you formulate, retail, or build wellness brands — let's craft
          a powder that carries your name and our roots.
        </motion.p>
        <div className="mt-12 flex flex-wrap items-center justify-center gap-4">
          <Link to="/contact"><MagneticButton variant="gold">Contact Us</MagneticButton></Link>
          <Link to="/contact"><MagneticButton variant="ghost" className="!text-cream !border-cream/30 hover:!bg-cream hover:!text-forest-deep">Request Sample</MagneticButton></Link>
          <Link to="/bulk-order"><MagneticButton variant="ghost" className="!text-cream !border-cream/30 hover:!bg-cream hover:!text-forest-deep">Bulk Inquiry</MagneticButton></Link>
        </div>
      </div>
    </section>
  );
}
