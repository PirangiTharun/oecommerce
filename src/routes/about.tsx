import { createFileRoute } from "@tanstack/react-router";
import { ParticleField } from "@/components/ParticleField";
import roots from "@/assets/roots-network.jpg";
import process from "@/assets/process-drying.jpg";

export const Route = createFileRoute("/about")({
  head: () => ({
    meta: [
      { title: "About — Phyto Health Organics" },
      { name: "description", content: "Born in Telangana — Phyto Health Organics crafts premium organic powders with reverence for soil, science and craft." },
      { property: "og:title", content: "About Phyto Health Organics" },
      { property: "og:description", content: "Our story, our roots, our promise." },
    ],
  }),
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-24">
        <ParticleField density={60} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Our story</span>
          <h1 className="mt-4 text-display text-[clamp(44px,7vw,120px)] leading-[0.98] text-forest-deep">
            Rooted in <em className="not-italic shimmer-text">Telangana</em>.
            <br />Made for the world.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base text-forest-deep/75 leading-relaxed">
            Phyto Health Organics began as a quiet promise to the farmlands of Telangana — that what grows here would carry its purity all the way into the jar, the capsule, the cup.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img src={roots} alt="Soil and root network" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-display text-4xl text-forest-deep lg:text-5xl">Soil first. Always.</h2>
            <p className="mt-5 text-forest-deep/75 leading-relaxed">
              We believe nutrition is grown, not engineered. Our regenerative practices feed the soil microbiome — the invisible network that turns sunlight into the vivid color, aroma and density of every powder we make.
            </p>
          </div>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="lg:order-2 overflow-hidden rounded-[2rem] shadow-soft">
            <img src={process} alt="Sun-drying process" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-display text-4xl text-forest-deep lg:text-5xl">Slow, on purpose.</h2>
            <p className="mt-5 text-forest-deep/75 leading-relaxed">
              Sun-curing on bamboo, low-temperature stone milling, hand-sorted batches and lab-tested releases. Industrial speed strips nutrients. Our pace protects them.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
