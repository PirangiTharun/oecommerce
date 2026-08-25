"use client";
import { Link } from "@tanstack/react-router";
import { Leaf, Mail, MapPin, Phone } from "lucide-react";
import { imgUrl } from "@/lib/utils";

export const socialLinks = [
  { href: "https://wa.me/917899868441", src: "/images/whatsapp.png", alt: "WhatsApp" },
  {
    href: "https://instagram.com/phyto.health.organics",
    src: "/images/instagram.png",
    alt: "Instagram",
  },
  { href: "https://twitter.com/phytohealthorg", src: "/images/twitter.png", alt: "Twitter / X" },
  {
    href: "https://linkedin.com/company/phytohealthorganics",
    src: "/images/linkedin.png",
    alt: "LinkedIn",
  },
];

/** Consistent section heading: ——🌿 TITLE 🌿—— with stretching lines */
function SectionHeading({ children }: { children: React.ReactNode }) {
  return (
    <div className="flex w-full items-center gap-2">
      <span className="h-px flex-1 bg-turmeric/40" />
      <Leaf size={10} className="shrink-0 text-turmeric/60" />
      <h4 className="shrink-0 whitespace-nowrap text-[10px] uppercase tracking-[0.3em] text-turmeric-glow">
        {children}
      </h4>
      <Leaf size={10} className="shrink-0 text-turmeric/60" />
      <span className="h-px flex-1 bg-turmeric/40" />
    </div>
  );
}

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ href, src, alt }) => (
        <a
          key={alt}
          href={href}
          target="_blank"
          rel="noreferrer"
          title={alt}
          className="flex h-11 w-11 items-center justify-center rounded-full border border-cream/20 bg-cream/5 p-2 transition hover:scale-110 hover:border-turmeric/60 hover:bg-cream/15"
        >
          <img src={imgUrl(src)} alt={alt} className="h-full w-full object-contain" />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative overflow-hidden bg-forest-grad text-cream">
      <div
        className="pointer-events-none absolute inset-0 opacity-25 mix-blend-overlay"
        style={{
          background: "radial-gradient(ellipse at top, oklch(0.86 0.17 82 / 0.5), transparent 60%)",
        }}
      />

      <div className="relative mx-auto max-w-7xl px-5 py-10 sm:px-8 sm:py-12 lg:px-12">
        {/* ── Main grid ── */}
        <div className="grid grid-cols-1 gap-9 sm:grid-cols-2 lg:grid-cols-12 lg:gap-0">
          {/* Brand */}
          <div className="sm:col-span-2 lg:col-span-5 lg:pr-14">
            <h3 className="text-display whitespace-nowrap leading-none tracking-[0.08em] text-[1.65rem] sm:text-3xl lg:text-4xl">
              <span className="text-[oklch(0.72_0.14_145)]">PHYTO </span>
              <span className="text-turmeric-glow">HEALTH </span>
              <span className="text-[oklch(0.72_0.14_145)]">ORGANICS</span>
            </h3>
            <p className="mt-5 text-sm italic text-cream/55">Nurturing Nature, Nurturing Lives</p>
            <p className="mt-3 max-w-sm text-sm leading-relaxed text-cream/75">
              Premium organic fruit, flower, vegetable and superfood powders — cultivated, dried and
              milled with reverence in Karnataka, India.
            </p>
          </div>

          {/* Explore */}
          <div className="lg:col-span-3 lg:border-l lg:border-cream/10 lg:px-8">
            <SectionHeading>Explore</SectionHeading>
            <ul className="mt-6 w-fit mx-auto space-y-3 text-sm text-cream/80">
              <li>
                <Link to="/products" className="transition-colors hover:text-turmeric">
                  Products
                </Link>
              </li>
              <li>
                <Link to="/we-serve" className="transition-colors hover:text-turmeric">
                  We Serve
                </Link>
              </li>
              <li>
                <Link to="/bulk-order" className="transition-colors hover:text-turmeric">
                  Bulk Order
                </Link>
              </li>
              <li>
                <Link to="/contact" className="transition-colors hover:text-turmeric">
                  Contact
                </Link>
              </li>
            </ul>
          </div>

          {/* Get in Touch */}
          <div className="lg:col-span-4 lg:border-l lg:border-cream/10 lg:px-8">
            <SectionHeading>Get in Touch</SectionHeading>
            <ul className="mt-6 w-fit mx-auto space-y-3 text-sm text-cream/80">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-turmeric/70" />
                <span>Bangalore, Karnataka, India</span>
              </li>
              <li>
                <a
                  href="tel:+917899868441"
                  className="flex items-center gap-2.5 transition-colors hover:text-turmeric"
                >
                  <Phone size={14} className="shrink-0 text-turmeric/70" />
                  +91 78998 68441
                </a>
              </li>
              <li>
                <a
                  href="mailto:info@phytohealthorganics.com"
                  className="flex items-center gap-2.5 break-all transition-colors hover:text-turmeric"
                >
                  <Mail size={14} className="shrink-0 text-turmeric/70" />
                  info@phytohealthorganics.com
                </a>
              </li>
            </ul>
            <div className="mt-7 flex justify-center">
              <a
                href="https://wa.me/917899868441"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 rounded-full bg-turmeric px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-forest-deep shadow-glow-gold transition hover:scale-[1.03]"
              >
                <img
                  src={imgUrl("/images/whatsapp.png")}
                  alt=""
                  className="h-4 w-4 object-contain"
                />
                Chat on WhatsApp
              </a>
            </div>
          </div>
        </div>
        {/* end grid */}

        {/* ── Bottom bar ── */}
        <div className="mt-10 pt-1 sm:mt-12">
          <div className="flex flex-col items-center gap-4">
            <SectionHeading>Follow Us</SectionHeading>
            <SocialIcons />
            <p className="mt-2 text-[10px] uppercase tracking-[0.25em] text-cream/35">
              © {new Date().getFullYear()} Phyto Health Organics · All rights reserved
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
