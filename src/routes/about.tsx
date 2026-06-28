import { createFileRoute } from "@tanstack/react-router";
import { ParticleField } from "@/components/ParticleField";
import seedSprout from "@/assets/seed-sprout.jpg";
import process from "@/assets/process-drying.jpg";

export const Route = createFileRoute("/about")({
  component: AboutPage,
});

function AboutPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-24">
        <ParticleField density={60} />
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Who we are</span>
          <h1 className="mt-4 text-display text-[clamp(44px,7vw,120px)] leading-[0.98] text-forest-deep">
            Natural at the <em className="not-italic shimmer-text">source</em>.
            <br />Reliable at scale.
          </h1>
          <p className="mx-auto mt-7 max-w-2xl text-base text-forest-deep/75 leading-relaxed">
            Through Phyto Health Organics, we supply botanical ingredients to businesses that value consistency, transparency, and dependable service.
          </p>
        </div>
      </section>

      <section className="py-20">
        <div className="mx-auto grid max-w-7xl items-center gap-12 px-6 lg:grid-cols-2 lg:px-12">
          <div className="overflow-hidden rounded-[2rem] shadow-soft">
            <img src={seedSprout} alt="Seed sprout representing raw material origins" className="h-full w-full object-cover" loading="lazy" />
          </div>
          <div>
            <h2 className="text-display text-4xl text-forest-deep lg:text-5xl">Quality before the warehouse.</h2>
            <p className="mt-5 text-forest-deep/75 leading-relaxed">
              We believe that quality starts long before a product reaches a warehouse or production facility. It begins with the selection of raw materials, responsible sourcing practices, and careful handling throughout the supply chain.
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
            <h2 className="text-display text-4xl text-forest-deep lg:text-5xl">Integrity, harvest to delivery.</h2>
            <p className="mt-5 text-forest-deep/75 leading-relaxed">
              By working closely with growers, suppliers, and processing partners, we preserve the natural integrity of our ingredients from harvest through delivery. Our focus remains on product quality, traceability, and building long-term relationships based on trust and reliability. Every batch we supply reflects our commitment to providing natural ingredients that customers can confidently incorporate into their products and brands.
            </p>
          </div>
        </div>
      </section>
    </>
  );
}
