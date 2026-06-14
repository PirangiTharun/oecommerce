import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { findProduct, PRODUCTS } from "@/data/products";
import { ParticleField } from "@/components/ParticleField";
import { MagneticButton } from "@/components/MagneticButton";
import { imgUrl } from "@/lib/utils";

export const Route = createFileRoute("/products/$slug")({
  loader: ({ params }) => {
    const product = findProduct(params.slug);
    if (!product) throw notFound();
    return { product };
  },
  component: ProductDetail,
});

function ProductDetail() {
  const { product: p } = Route.useLoaderData();
  const others = PRODUCTS.filter((x) => x.slug !== p.slug).slice(0, 4);

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-24">
        <div className="absolute inset-0 -z-10"
          style={{ background: `radial-gradient(ellipse at top, ${p.scentColor}, transparent 60%), var(--cream)` }} />
        <ParticleField density={80} />

        <div className="relative mx-auto grid max-w-7xl items-center gap-10 px-6 lg:grid-cols-12 lg:px-12">
          <div className="lg:col-span-7">
            <Link to="/products" className="text-[11px] uppercase tracking-[0.35em] text-forest/70 hover:text-turmeric">
              ← All products
            </Link>
            {/* export badges */}
            <div className="mt-4 flex flex-wrap items-center gap-2">
              <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric">{p.category}</span>
              <span className="rounded-full border border-forest/20 px-3 py-0.5 text-[9px] uppercase tracking-[0.3em] text-forest/60">Export Grade</span>
              <span className="rounded-full border border-forest/20 px-3 py-0.5 text-[9px] uppercase tracking-[0.3em] text-forest/60">Private Label Ready</span>
            </div>
            <h1 className="mt-3 text-display text-[clamp(48px,8vw,132px)] leading-[0.95] text-forest-deep">
              {p.name}
            </h1>
            <p className="mt-5 max-w-lg text-base text-forest-deep/80 leading-relaxed">{p.tagline}</p>
            <p className="mt-2 text-xs uppercase tracking-[0.3em] text-forest/60">Origin · {p.origin}</p>

            {/* export-focused CTAs */}
            <div className="mt-8 flex flex-wrap gap-3">
              <Link to="/contact">
                <MagneticButton variant="primary">Enquire Now</MagneticButton>
              </Link>

              <Link to="/bulk-order">
                <MagneticButton variant="ghost">Bulk / OEM Order</MagneticButton>
              </Link>
            </div>

            {/* quick export specs strip */}
            <div className="mt-8 flex flex-wrap gap-4 text-[11px] uppercase tracking-[0.25em] text-forest-deep/60">
              <span>✓ Chemical-Free</span>
              <span>✓ Hygienically Processed</span>
              <span>✓ MOQ Flexible</span>
              <span>✓ Custom Packaging</span>
            </div>
          </div>

          <div className="relative flex justify-center lg:col-span-5">
            {/* Aroma / scent visualization */}
            <div className="relative h-[60vmin] max-h-[520px] w-[60vmin] max-w-[520px]">
              {/* ambient glow — always shown */}
              <motion.div
                className="absolute inset-0 rounded-full animate-breathe"
                style={{ background: `radial-gradient(circle at 50% 50%, ${p.scentColor}, transparent 65%)`, filter: "blur(4px)" }}
              />
              {p.image ? (
                /* product photo centrepiece */
                <motion.div
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.7, ease: [0.22, 1, 0.36, 1] }}
                  className="absolute inset-[10%] overflow-hidden rounded-full shadow-2xl"
                  style={{ boxShadow: `0 0 80px ${p.scentColor}, 0 0 160px ${p.scentColor}40` }}
                >
                  <img
                    src={imgUrl(p.image)}
                    alt={p.name}
                    className="h-full w-full object-cover"
                  />
                  {/* subtle colour overlay to blend with theme */}
                  <div
                    className="absolute inset-0 rounded-full"
                    style={{ background: `radial-gradient(circle at 70% 20%, ${p.scentColor}30, transparent 55%)` }}
                  />
                </motion.div>
              ) : (
                <>
                  {/* powder orb with emoji — shown when no photo */}
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 30, repeat: Infinity, ease: "linear" }}
                    className="absolute inset-[18%] rounded-full"
                    style={{
                      background: `conic-gradient(from 0deg, ${p.scentColor}, oklch(0.36 0.07 156), ${p.scentColor})`,
                      boxShadow: `0 0 80px ${p.scentColor}, inset 0 0 40px oklch(0 0 0 / 0.2)`,
                    }}
                  />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-[6vmin] drop-shadow-lg" role="img" aria-label={p.name}>{p.emoji}</span>
                  </div>
                </>
              )}
              {/* nutrient particles — always shown */}
              {Array.from({ length: 14 }).map((_, i) => (
                <motion.span
                  key={i}
                  className="absolute left-1/2 top-1/2 h-2 w-2 rounded-full"
                  style={{ background: "oklch(0.96 0.02 88)", boxShadow: `0 0 8px ${p.scentColor}` }}
                  animate={{
                    x: [0, Math.cos(i) * 180, 0],
                    y: [0, Math.sin(i) * 180, 0],
                    opacity: [0.2, 0.9, 0.2],
                  }}
                  transition={{ duration: 6 + (i % 4), repeat: Infinity, ease: "easeInOut", delay: i * 0.2 }}
                />
              ))}
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl gap-6 px-6 sm:grid-cols-2 lg:grid-cols-4 lg:px-12">
          <Block title="Uses" items={p.uses} />
          <Block title="Benefits" items={p.benefits} />
          <Block title="Key Features" items={p.features} />
          <Block title="Industries" items={p.industries} />
        </div>
        <div className="mx-auto mt-6 max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl bg-forest-grad p-8 text-cream lg:p-12">
            <div className="text-[10px] uppercase tracking-[0.4em] text-turmeric-glow">Nutritional highlights</div>
            <div className="mt-4 flex flex-wrap gap-3">
              {p.nutrition.map((n: string) => (
                <span key={n} className="rounded-full border border-cream/20 bg-cream/5 px-4 py-2 text-sm">{n}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Export enquiry CTA */}
      <section className="py-16">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="rounded-3xl glass p-10 lg:p-14">
            <div className="grid items-center gap-8 lg:grid-cols-2">
              <div>
                <div className="text-[10px] uppercase tracking-[0.45em] text-turmeric">Export Enquiry</div>
                <h2 className="mt-3 text-display text-3xl text-forest-deep lg:text-5xl">
                  Interested in <em className="not-italic shimmer-text">{p.name}</em>?
                </h2>
                <p className="mt-4 text-forest-deep/70 leading-relaxed">
                  We supply in bulk and private-label formats with flexible MOQ. Reach out for pricing, certifications, or a free sample.
                </p>
              </div>
              <div className="flex flex-wrap gap-3 lg:justify-end">
                <Link to="/contact">
                  <MagneticButton variant="primary">Enquire Now</MagneticButton>
                </Link>

                <Link to="/bulk-order">
                  <MagneticButton variant="ghost">Bulk / OEM</MagneticButton>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="mb-8 flex items-end justify-between gap-4">
            <h2 className="text-display text-3xl text-forest-deep lg:text-5xl">More from the field</h2>
            <Link to="/products" className="text-xs uppercase tracking-[0.3em] text-forest hover:text-turmeric">View all →</Link>
          </div>
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <Link key={o.slug} to="/products/$slug" params={{ slug: o.slug }}
                className="group overflow-hidden rounded-3xl border border-forest/10 bg-cream transition hover:border-turmeric/40">
                {o.image ? (
                  <div className="overflow-hidden">
                    <img
                      src={imgUrl(o.image)}
                      alt={o.name}
                      className="h-36 w-full object-cover transition duration-500 group-hover:scale-105"
                      loading="lazy"
                    />
                  </div>
                ) : (
                  <div className="flex items-center justify-center h-36"
                    style={{ background: `radial-gradient(circle at 40% 40%, ${o.scentColor}40, transparent 70%)` }}>
                    <div className="h-14 w-14 rounded-full"
                      style={{ background: `radial-gradient(circle at 30% 30%, ${o.scentColor}, transparent 70%)` }} />
                  </div>
                )}
                <div className="p-5">
                  <div className="text-display text-xl text-forest-deep">{o.name}</div>
                  <div className="mt-1 text-xs uppercase tracking-[0.3em] text-forest/60">{o.category}</div>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}

function Block({ title, items }: { title: string; items: string[] }) {
  return (
    <div className="rounded-3xl glass p-7">
      <div className="text-[10px] uppercase tracking-[0.4em] text-turmeric">{title}</div>
      <ul className="mt-4 space-y-2 text-sm text-forest-deep/85">
        {items.map((i) => (
          <li key={i} className="flex gap-2"><span className="text-turmeric">·</span>{i}</li>
        ))}
      </ul>
    </div>
  );
}
