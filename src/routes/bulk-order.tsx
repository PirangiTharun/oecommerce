import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { motion } from "framer-motion";
import { PRODUCTS } from "@/data/products";
import { MagneticButton } from "@/components/MagneticButton";

export const Route = createFileRoute("/bulk-order")({
  component: BulkPage,
});

function BulkPage() {
  const [selected, setSelected] = useState<string[]>([]);
  const toggle = (slug: string) =>
    setSelected((s) => (s.includes(slug) ? s.filter((x) => x !== slug) : [...s, slug]));

  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const fd = new FormData(e.currentTarget);
    const subject = `Bulk inquiry from ${fd.get("name")}`;
    const body = `Company: ${fd.get("company")}%0D%0AEmail: ${fd.get("email")}%0D%0APhone: ${fd.get("phone")}%0D%0ACountry: ${fd.get("country")}%0D%0A%0D%0AProducts:%0D%0A${selected.join(", ")}%0D%0A%0D%0AQuantity / Packaging:%0D%0A${encodeURIComponent(String(fd.get("packaging") ?? ""))}%0D%0A%0D%0ATimeline:%0D%0A${encodeURIComponent(String(fd.get("timeline") ?? ""))}%0D%0A%0D%0ANotes:%0D%0A${encodeURIComponent(String(fd.get("notes") ?? ""))}`;
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

          <div className="rounded-3xl glass p-8 lg:p-10">
            <h2 className="text-display text-2xl text-forest-deep">Select powders</h2>
            <p className="mt-2 text-sm text-forest-deep/70">Tap to select. You can pick as many as you like.</p>
            <div className="mt-6 flex flex-wrap gap-2">
              {PRODUCTS.map((p) => {
                const on = selected.includes(p.slug);
                return (
                  <motion.button
                    type="button"
                    key={p.slug}
                    onClick={() => toggle(p.slug)}
                    whileTap={{ scale: 0.96 }}
                    data-cursor="hover"
                    className={`rounded-full border px-4 py-2 text-xs uppercase tracking-[0.2em] transition ${
                      on ? "border-turmeric bg-turmeric text-forest-deep" : "border-forest/20 hover:bg-beige"
                    }`}
                  >
                    {p.name}
                  </motion.button>
                );
              })}
            </div>
          </div>

          <div className="rounded-3xl glass p-8 lg:p-10 grid gap-5 sm:grid-cols-2">
            <Textarea name="packaging" label="Packaging & quantity" placeholder="e.g. 25 kg drums, 500 kg total" />
            <Textarea name="timeline" label="Timeline" placeholder="e.g. first shipment in 6 weeks" />
            <Textarea name="notes" label="Other notes" placeholder="Private label, certifications, blends..." className="sm:col-span-2" />
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
function Textarea({ name, label, placeholder, className = "" }: { name: string; label: string; placeholder?: string; className?: string }) {
  return (
    <label className={`block ${className}`}>
      <span className="text-[10px] uppercase tracking-[0.3em] text-forest-deep/70">{label}</span>
      <textarea
        name={name}
        rows={3}
        placeholder={placeholder}
        className="mt-2 w-full resize-none rounded-2xl bg-cream/70 border border-forest/15 px-4 py-3 text-sm outline-none transition focus:border-turmeric focus:ring-4 focus:ring-turmeric/20"
      />
    </label>
  );
}
