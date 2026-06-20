import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { useMemo, useState } from "react";
import { PRODUCTS, CATEGORIES, type Category } from "@/data/products";
import { ParticleField } from "@/components/ParticleField";
import { imgUrl } from "@/lib/utils";
import productHero from "@/assets/product-hero.jpg";

export const Route = createFileRoute("/products/")({
  component: ProductsPage,
});

function ProductsPage() {
  const [filter, setFilter] = useState<Category | "all">("all");
  const list = useMemo(
    () => (filter === "all" ? PRODUCTS : PRODUCTS.filter((p) => p.category === filter)),
    [filter],
  );

  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20 lg:pt-52">
        <div className="absolute inset-0 -z-0">
          <img src={productHero} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/60 via-cream/80 to-cream" />
        </div>
        <ParticleField density={70} />
        <div className="relative mx-auto max-w-7xl px-6 lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.45em] text-turmeric">18 Powders · 4 Families</span>
          <h1 className="mt-3 text-display text-[clamp(44px,7vw,110px)] leading-[0.98] text-forest-deep">
            The <em className="not-italic shimmer-text">collection</em>.
          </h1>
          <p className="mt-6 max-w-xl text-forest-deep/75 leading-relaxed">
            Each powder is single-origin, slow-cured and stone-milled to preserve aroma, color and the nutrients of the harvest.
          </p>

          <div className="mt-10 flex flex-wrap gap-2">
            {([{ id: "all" as const, label: "All" }, ...CATEGORIES] as { id: Category | "all"; label: string }[]).map((c) => (
              <button
                key={c.id}
                onClick={() => setFilter(c.id)}
                data-cursor="hover"
                className={`rounded-full px-5 py-2 text-[11px] uppercase tracking-[0.25em] transition ${
                  filter === c.id ? "bg-forest text-cream" : "border border-forest/20 text-forest-deep hover:bg-beige"
                }`}
              >
                {c.label}
              </button>
            ))}
          </div>
        </div>
      </section>

      <section className="relative pb-32">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {list.map((p, i) => (
              <motion.div
                key={p.slug}
                initial={{ opacity: 0, y: 24 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: (i % 6) * 0.05, duration: 0.55 }}
              >
                <Link
                  to="/products/$slug"
                  params={{ slug: p.slug }}
                  data-cursor="hover"
                  className="group relative block overflow-hidden rounded-3xl border border-forest/10 bg-cream p-7 transition hover:-translate-y-1 hover:shadow-soft"
                >
                  <div
                    className="absolute -right-12 -top-12 h-44 w-44 rounded-full opacity-30 blur-2xl transition group-hover:opacity-90"
                    style={{ background: p.scentColor }}
                  />
                  <div className="text-[10px] uppercase tracking-[0.35em] text-turmeric">{p.category}</div>
                  <div className="mt-3 text-display text-3xl text-forest-deep">{p.name}</div>
                  <p className="mt-2 text-sm text-forest-deep/70 leading-relaxed">{p.tagline}</p>
                  {p.image ? (
                    <div className="relative mt-6 overflow-hidden rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 60% 30%, ${p.scentColor}35, ${p.scentColor}08 70%)` }}>
                      <img
                        src={imgUrl(p.image)}
                        alt={p.name}
                        className="w-full h-auto block transition duration-500 group-hover:scale-105"
                        loading="lazy"
                      />
                      <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-cream via-cream/50 to-transparent" />
                    </div>
                  ) : (
                    <div
                      className="mt-6 aspect-[4/3] flex items-center justify-center rounded-2xl"
                      style={{ background: `radial-gradient(ellipse at 60% 30%, ${p.scentColor}40, ${p.scentColor}10 70%)` }}
                    >
                      <span className="text-7xl drop-shadow-md" role="img" aria-label={p.name}>{p.emoji}</span>
                    </div>
                  )}
                  <div className="mt-6 inline-flex items-center gap-2 text-xs uppercase tracking-[0.25em] text-forest">
                    View Details <span className="transition-transform group-hover:translate-x-1">→</span>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
