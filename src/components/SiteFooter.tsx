"use client";
import { Link } from "@tanstack/react-router";
import { Mail, MapPin, Phone } from "lucide-react";
import { imgUrl } from "@/lib/utils";

export const socialLinks = [
  { href: "https://wa.me/917899868441", src: "/images/whatsapp.png", alt: "WhatsApp" },
  { href: "https://instagram.com/phytohealthorganics", src: "/images/instagram.png", alt: "Instagram" },
  { href: "https://twitter.com/phytohealthorg", src: "/images/twitter.png", alt: "Twitter / X" },
  { href: "https://linkedin.com/company/phytohealthorganics", src: "/images/linkedin.png", alt: "LinkedIn" },
];

export function SocialIcons({ className = "" }: { className?: string }) {
  return (
    <div className={`flex items-center gap-3 ${className}`}>
      {socialLinks.map(({ href, src, alt }) => (
        <a key={alt} href={href} target="_blank" rel="noreferrer"
          title={alt}
          className="flex h-13 w-13 items-center justify-center rounded-full border border-cream/20 bg-cream/5 p-2 transition hover:border-turmeric/60 hover:bg-cream/15 hover:scale-110">
          <img src={imgUrl(src)} alt={alt} className="h-full w-full object-contain" />
        </a>
      ))}
    </div>
  );
}

export function SiteFooter() {
  return (
    <footer className="relative mt-32 overflow-hidden bg-forest-grad text-cream">
      <div className="absolute inset-0 opacity-30 mix-blend-overlay"
        style={{ background: "radial-gradient(ellipse at top, oklch(0.86 0.17 82 / 0.5), transparent 60%)" }} />
      <div className="relative mx-auto max-w-7xl px-6 py-20 lg:px-12">
        <div className="grid gap-14 lg:grid-cols-12">

          {/* Brand + tagline + social icons */}
          <div className="lg:col-span-5">
            <div className="text-display text-4xl tracking-[0.18em]">
              <span className="text-[oklch(0.72_0.14_145)]">PHYTO</span>{" "}
              <span className="text-turmeric-glow">HEALTH</span>{" "}
              <span className="text-[oklch(0.72_0.14_145)]">ORGANICS</span>
            </div>
            <p className="mt-2 text-sm text-cream/60 italic">Nurturing Nature, Nurturing Lives</p>
            <p className="mt-5 max-w-md text-cream/80 leading-relaxed text-sm">
              Premium organic fruit, flower, vegetable and superfood powders —
              cultivated, dried and milled with reverence in Telangana, India.
            </p>
            <div className="mt-7">
              <p className="text-[10px] uppercase tracking-[0.3em] text-turmeric-glow mb-3">Follow Us</p>
              <SocialIcons />
            </div>
          </div>

          {/* Navigation */}
          <div className="lg:col-span-3">
            <h4 className="text-xs uppercase tracking-[0.3em] text-turmeric-glow">Explore</h4>
            <ul className="mt-5 space-y-2.5 text-sm text-cream/85">
              <li><Link to="/about" className="hover:text-turmeric transition-colors">About</Link></li>
              <li><Link to="/products" className="hover:text-turmeric transition-colors">Products</Link></li>
              <li><Link to="/we-serve" className="hover:text-turmeric transition-colors">We Serve</Link></li>
              <li><Link to="/our-roots" className="hover:text-turmeric transition-colors">Our Roots</Link></li>
              <li><Link to="/bulk-order" className="hover:text-turmeric transition-colors">Bulk Order</Link></li>
              <li><Link to="/contact" className="hover:text-turmeric transition-colors">Contact</Link></li>
            </ul>
          </div>

          {/* Contact details */}
          <div className="lg:col-span-4">
            <h4 className="text-xs uppercase tracking-[0.3em] text-turmeric-glow">Get in Touch</h4>
            <ul className="mt-5 space-y-3 text-sm text-cream/85">
              <li className="flex items-start gap-2.5">
                <MapPin size={14} className="mt-0.5 shrink-0 text-turmeric/70" />
                <span>Telangana, India</span>
              </li>
              <li>
                <a href="tel:+917899868441"
                  className="flex items-center gap-2.5 hover:text-turmeric transition-colors">
                  <Phone size={14} className="shrink-0 text-turmeric/70" />
                  +91 78998 68441
                </a>
              </li>
              <li>
                <a href="mailto:info@phytohealthorganics.com"
                  className="flex items-center gap-2.5 hover:text-turmeric transition-colors break-all">
                  <Mail size={14} className="shrink-0 text-turmeric/70" />
                  info@phytohealthorganics.com
                </a>
              </li>
            </ul>
            <a href="https://wa.me/917899868441" target="_blank" rel="noreferrer"
              className="mt-6 inline-flex items-center gap-2 rounded-full bg-turmeric px-5 py-2.5 text-sm font-medium uppercase tracking-[0.2em] text-forest-deep shadow-glow-gold transition hover:scale-[1.03]">
              <img src={imgUrl("/images/whatsapp.png")} alt="" className="h-4 w-4 object-contain" />
              Chat on WhatsApp
            </a>
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
