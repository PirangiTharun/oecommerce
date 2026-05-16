"use client";
import { Link } from "@tanstack/react-router";

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-forest-grad text-cream">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ background: "radial-gradient(ellipse at top, oklch(0.86 0.17 82 / 0.5), transparent 60%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">
          <div className="lg:col-span-5">
            <div className="text-display text-4xl tracking-[0.18em]">
              PHYTO HEALTH <span className="text-turmeric-glow">ORGANICS</span>
            </div>
            <p className="mt-5 max-w-md text-cream/80 leading-relaxed">
              Premium organic fruit, flower, vegetable and superfood powders —
              cultivated, dried and milled with reverence in Telangana, India.
            </p>
            <p className="mt-2 text-sm text-cream/60 italic">Nurturing Nature, Nurturing Lives</p>
            <div className="mt-8 flex flex-wrap gap-3">
              <a href="https://wa.me/917899868441" target="_blank" rel="noreferrer"
                className="rounded-full bg-turmeric px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-forest-deep shadow-glow-gold transition hover:scale-[1.03]">
                WhatsApp
              </a>
              <a href="mailto:info@phytohealthorganics.com"
                className="rounded-full border border-cream/30 px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-cream transition hover:bg-cream/10">
                info@phytohealthorganics.com
              </a>
            </div>
          </div>
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] text-turmeric-glow">Explore</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/85">
              <li><Link to="/about" className="hover:text-turmeric">About</Link></li>
              <li><Link to="/products" className="hover:text-turmeric">Products</Link></li>
              <li><Link to="/industries" className="hover:text-turmeric">Industries</Link></li>
              <li><Link to="/sustainability" className="hover:text-turmeric">Sustainability</Link></li>
              <li><Link to="/bulk-order" className="hover:text-turmeric">Bulk Order</Link></li>
              <li><Link to="/contact" className="hover:text-turmeric">Contact</Link></li>
            </ul>
          </div>
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-turmeric-glow">Visit & Reach</h4>
            <address className="mt-5 not-italic text-sm leading-relaxed text-cream/85">
              PHYTO HEALTH ORGANICS<br />
              Telangana, India<br />
              <a href="tel:+917899868441" className="hover:text-turmeric">+91 78998 68441</a><br />
              <a href="mailto:info@phytohealthorganics.com" className="hover:text-turmeric">info@phytohealthorganics.com</a>
            </address>
          </div>
        </div>
        <div className="mt-16 flex flex-col items-start justify-between gap-3 border-t border-cream/15 pt-6 text-xs uppercase tracking-[0.25em] text-cream/55 lg:flex-row">
          <div>© {new Date().getFullYear()} Phyto Health Organics · All rights reserved</div>
          <div>Nurturing Nature, Nurturing Lives</div>
        </div>
      </div>
    </footer>
  );
}
