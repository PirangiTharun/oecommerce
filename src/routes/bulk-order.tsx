import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { MagneticButton } from "@/components/MagneticButton";
import { ChevronDown, X } from "lucide-react";

export const Route = createFileRoute("/bulk-order")({
  component: BulkPage,
});

const PACKAGING_OPTIONS = [
  "1 kg bags",
  "5 kg bags",
  "10 kg bags",
  "25 kg drums",
  "50 kg drums",
  "100 kg+ bulk",
  "Custom / OEM packaging",
];

const TIMELINE_OPTIONS = [
  "Within 2 weeks",
  "2 – 4 weeks",
  "4 – 6 weeks",
  "6 – 8 weeks",
  "3 months+",
  "Flexible / To be discussed",
];

function BulkPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const [dropdownOpen, setDropdownOpen] = useState(false);

  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = `Bulk inquiry from ${fd.get("name")}`;
    const body = `Company: ${fd.get("company")}%0D%0AEmail: ${fd.get("email")}%0D%0APhone: ${fd.get("phone")}%0D%0ACountry: ${fd.get("country")}%0D%0A%0D%0AProducts:%0D%0A${selected.join(", ")}%0D%0A%0D%0APackaging & Quantity:%0D%0A${encodeURIComponent(String(fd.get("packaging") ?? ""))}%0D%0A%0D%0ATimeline:%0D%0A${encodeURIComponent(String(fd.get("timeline") ?? ""))}%0D%0A%0D%0ANotes:%0D%0A${encodeURIComponent(String(fd.get("notes") ?? ""))}`;
    window.location.href = `mailto:info@phytohealthorganics.com?subject=${encodeURIComponent(subject)}&body=${body}`;
  };

  return (
    <>
      <section className="pt-40 pb-12">
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Bulk Inquiry</span>
          <h1 className="mt-3 text-display text-[clamp(44px,7vw,110px)] leading-[0.98] text-forest-deep">
            Built to your <em className="not-italic shimmer-text">spec</em>.
          </h1>
          <p className="mx-auto mt-5 max-w-xl text-forest-deep/75">
            Choose the powders, the packaging and the pace. We'll come back with samples and a quote within two business days.
          </p>
        </div>
      </section>

      <section className="pb-24">
        <form onSubmit={onSubmit} className="mx-auto max-w-5xl px-6 lg:px-12 space-y-10">
          {/* Your details */}
          <div className="rounded-3xl glass p-8 lg:p-10">
            <h2 className="text-display text-2xl text-forest-deep">Your details</h2>
            <div className="mt-6 grid gap-5 sm:grid-cols-2">
              <Input name="name" label="Name" required />
              <Input name="company" label="Company / Brand" />
              <Input name="email" label="Email" type="email" required />
              <Input name="phone" label="Phone" />
              <Input name="country" label="Country / City" />
            </div>
          </div>

          {/* Select powders */}
          <div className="rounded-3xl glass p-8 lg:p-10">
            <h2 className="text-display text-2xl text-forest-deep">Select powders</h2>
            <p className="mt-2 text-sm text-forest-deep/70">Choose as many as you like.</p>

            {/* Selected chips */}
            {selected.length > 0 && (
              <div className="mt-4 flex flex-wrap gap-2">
                {selected.map((slug) => {
                  const p = PRODUCTS.find((x) => x.slug === slug)!;
                  return (
                    <span key={slug} className="inline-flex items-center gap-1.5 rounded-full bg-turmeric px-3 py-1 text-xs font-medium text-forest-deep">
                      {p.name}
                      <button type="button" onClick={() => toggle(slug)} className="hover:opacity-70">
                        <X size={12} />
                      </button>
                    </span>
                  );
                })}
              </div>
            )}

            {/* Trigger */}
            <button
              type="button"
              onClick={() => setDropdownOpen((v) => !v)}
              className="mt-4 flex w-full items-center justify-between rounded-2xl bg-cream/70 border border-forest/15 px-4 py-3 text-sm text-forest-deep/70 transition hover:border-turmeric/40"
            >
              <span>{selected.length === 0 ? "Select powders…" : `${selected.length} powder${selected.length > 1 ? "s" : ""} selected`}</span>
              <ChevronDown size={16} className={`shrink-0 transition-transform duration-200 ${dropdownOpen ? "rotate-180" : ""}`} />
            </button>

            {/* Inline expanding list — no absolute positioning avoids z-index clash with glass cards */}
            <AnimatePresence initial={false}>
              {dropdownOpen && (
                <motion.div
                  key="powder-list"
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: "auto", opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
                  className="overflow-hidden"
                >
                  <div className="mt-2 max-h-52 overflow-y-auto rounded-2xl border border-forest/10 bg-cream/80 divide-y divide-forest/5">
                    {PRODUCTS.map((p) => {
                      const on = selected.includes(p.slug);
                      return (
                        <button
                          type="button"
                          key={p.slug}
                          onClick={() => toggle(p.slug)}
                          className={`flex w-full items-center gap-3 px-4 py-3 text-sm text-left transition hover:bg-beige ${on ? "bg-turmeric/10" : ""}`}
                        >
                          <span className={`flex h-4 w-4 shrink-0 items-center justify-center rounded border transition ${on ? "border-turmeric bg-turmeric" : "border-forest/25 bg-transparent"}`}>
                            {on && (
                              <svg viewBox="0 0 16 16" fill="none" className="h-3.5 w-3.5">
                                <path d="M3 8l3.5 3.5L13 5" stroke="oklch(0.24 0.06 158)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                              </svg>
                            )}
                          </span>
                          <span className={on ? "font-medium text-forest-deep" : "text-forest-deep/75"}>{p.name}</span>
                        </button>
                      );
                    })}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>

          {/* Packaging, timeline, notes */}
          <div className="rounded-3xl glass p-8 lg:p-10">
            <div className="grid gap-5 sm:grid-cols-2">
              <SelectField name="packaging" label="Packaging & quantity" options={PACKAGING_OPTIONS} placeholder="Select packaging…" />
              <SelectField name="timeline" label="Timeline" options={TIMELINE_OPTIONS} placeholder="Select timeline…" />
              <div className="sm:col-span-2">
                <Textarea name="notes" label="Other notes" placeholder="Private label, certifications, blends, custom MOQ…" rows={6} showWordCount maxWords={250} />
              </div>
            </div>
          </div>

          <div className="flex justify-center">
            <MagneticButton type="submit" variant="primary">Send Inquiry</MagneticButton>
          </div>
        </form>
      </section>
    </>
  );
}

function Input({ name, label, type = "text", required }: { name: string; label: string; type?: string; required?: boolean }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-forest-deep/70">{label}{required && " *"}</span>
      <input
        name={name}
        type={type}
        required={required}
        className="mt-2 w-full rounded-2xl bg-cream/70 border border-forest/15 px-4 py-3 text-sm outline-none transition focus:border-turmeric focus:ring-4 focus:ring-turmeric/20"
      />
    </label>
  );
}

function SelectField({ name, label, options, placeholder }: { name: string; label: string; options: string[]; placeholder: string }) {
  return (
    <label className="block">
      <span className="text-[10px] uppercase tracking-[0.3em] text-forest-deep/70">{label}</span>
      <select
        name={name}
        defaultValue=""
        className="mt-2 w-full rounded-2xl bg-cream/70 border border-forest/15 px-4 py-3 text-sm text-forest-deep outline-none transition focus:border-turmeric focus:ring-4 focus:ring-turmeric/20"
      >
        <option value="" disabled>{placeholder}</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </label>
  );
}

function Textarea({ name, label, placeholder, rows = 3, className = "", showWordCount, maxWords }: { name: string; label: string; placeholder?: string; rows?: number; className?: string; showWordCount?: boolean; maxWords?: number }) {
  const [text, setText] = useState("");
  const words = text.trim() === "" ? 0 : text.trim().split(/\s+/).length;

  const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const val = e.target.value;
    if (maxWords) {
      const currentWords = val.trim() === "" ? 0 : val.trim().split(/\s+/).length;
      if (currentWords > maxWords) {
        const match = val.match(new RegExp(`^\\s*(?:\\S+\\s+){0,${maxWords - 1}}\\S+\\s*`));
        if (match) {
          if (match[0] === text) {
            e.target.value = text;
          } else {
            setText(match[0]);
          }
        } else {
          e.target.value = text;
        }
        return;
      }
    }
    setText(val);
  };

  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-forest-deep/70">{label}</span>
        <textarea
          name={name}
          rows={rows}
          placeholder={placeholder}
          value={text}
          onChange={handleChange}
          maxLength={3000}
          className="mt-2 w-full resize-none rounded-2xl bg-cream/70 border border-forest/15 px-4 py-3 text-sm outline-none transition focus:border-turmeric focus:ring-4 focus:ring-turmeric/20"
        />
      {showWordCount && (
        <div className="mt-1.5 text-right text-xs text-forest-deep/40">
          {words}{maxWords ? `/${maxWords}` : ''} word{words !== 1 ? 's' : ''}
        </div>
      )}
    </label>
  );
}
