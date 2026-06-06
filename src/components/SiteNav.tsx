"use client";
import { Link } from "@tanstack/react-router";
import { useEffect, useState } from "react";
import { motion } from "framer-motion";
import { Menu, X } from "lucide-react";

const NAV = [
  { to: "/", label: "Home" },
  { to: "/about", label: "About" },
  { to: "/products", label: "Products" },
  { to: "/industries", label: "We Serve" },
  { to: "/sustainability", label: "Our Roots" },
  { to: "/contact", label: "Contact" },
];

export function SiteNav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  return (
    <motion.header
      initial={{ y: -30, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ delay: 0.2, duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled ? "py-2.5" : "py-5"
      }`}
    >
      <div className="mx-auto max-w-7xl px-5 lg:px-10">
        <div
          className={`flex items-center justify-between rounded-full px-5 lg:px-7 py-3 transition-all duration-500 glass shadow-soft ${
            scrolled ? "" : ""
          }`}
        >
          <Link to="/" className="group flex items-center gap-2.5" aria-label="Phyto Health Organics — Home">
            <span className="relative inline-flex h-9 w-9 items-center justify-center rounded-full bg-forest text-cream shadow-glow-forest">
              <Leaf />
            </span>
              <span className="text-display text-lg tracking-[0.22em]">
              <span className="text-forest-deep">PHYTO</span>{" "}
              <span className="text-turmeric">HEALTH</span>{" "}
              <span className="text-forest-deep">ORGANICS</span>
            </span>
          </Link>

          <nav className="hidden items-center gap-1 lg:flex">
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                className="relative rounded-full px-4 py-2 text-[13px] font-medium uppercase tracking-[0.18em] text-forest-deep/70 transition-all duration-200 hover:text-turmeric hover:bg-forest-deep/5"
                activeProps={{ className: "!text-forest-deep bg-forest-deep/8" }}
              >
                {n.label}
              </Link>
            ))}
          </nav>

          <div className="hidden lg:block">
            <Link
              to="/bulk-order"
              className="group inline-flex items-center gap-2 rounded-full bg-forest px-5 py-2.5 text-[12px] font-medium uppercase tracking-[0.2em] text-cream shadow-glow-forest transition hover:bg-turmeric hover:text-forest-deep"
            >
              Bulk Inquiry
              <span className="transition-transform group-hover:translate-x-0.5">→</span>
            </Link>
          </div>

          <button
            aria-label="Toggle menu"
            onClick={() => setOpen((v) => !v)}
            className="lg:hidden rounded-full glass p-2.5"
          >
            {open ? <X size={18} /> : <Menu size={18} />}
          </button>
        </div>

        {open && (
          <motion.div
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            className="mt-2 flex flex-col gap-1 rounded-3xl glass p-4 lg:hidden"
          >
            {NAV.map((n) => (
              <Link
                key={n.to}
                to={n.to}
                onClick={() => setOpen(false)}
                className="rounded-2xl px-4 py-3 text-sm uppercase tracking-[0.2em] text-forest-deep/85 hover:bg-cream"
              >
                {n.label}
              </Link>
            ))}
            <Link
              to="/bulk-order"
              onClick={() => setOpen(false)}
              className="mt-1 rounded-2xl bg-forest px-4 py-3 text-center text-sm uppercase tracking-[0.2em] text-cream"
            >
              Bulk Inquiry
            </Link>
          </motion.div>
        )}
      </div>
    </motion.header>
  );
}

function Leaf() {
  return (
    <svg width="18" height="18" viewBox="0 0 24 24" fill="none">
      <path
        d="M3 21c0-9 7-16 18-18-2 11-9 18-18 18Zm0 0c5-5 9-7 14-9"
        stroke="currentColor"
        strokeWidth="1.7"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
