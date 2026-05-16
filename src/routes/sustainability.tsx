import { createFileRoute } from "@tanstack/react-router";
import { RootNetwork } from "@/components/home/RootNetwork";
import roots from "@/assets/roots-network.jpg";

const REGIONS = [
  { x: "32%", y: "62%", label: "Telangana — Turmeric, Hibiscus, Tomato" },
  { x: "30%", y: "70%", label: "Tamil Nadu — Pumpkin, Banana" },
  { x: "44%", y: "60%", label: "Maharashtra — Pomegranate, Onion" },
  { x: "55%", y: "20%", label: "Himachal — Apple, Chamomile" },
  { x: "48%", y: "10%", label: "Kashmir — Lavender, Saffron" },
  { x: "50%", y: "32%", label: "MP — Garlic" },
];

export const Route = createFileRoute("/sustainability")({
  component: SustainabilityPage,
});

function SustainabilityPage() {
  return (
    <>
      <section className="relative overflow-hidden pt-40 pb-20">
        <div className="absolute inset-0 -z-10">
          <img src={roots} alt="" className="h-full w-full object-cover opacity-40" />
          <div className="absolute inset-0 bg-gradient-to-b from-cream/70 via-cream/85 to-cream" />
        </div>
        <div className="mx-auto max-w-5xl px-6 text-center lg:px-12">
          <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Sustainability</span>
          <h1 className="mt-4 text-display text-[clamp(44px,7vw,120px)] leading-[0.98] text-forest-deep">
            A promise to the <em className="not-italic shimmer-text">soil</em>.
          </h1>
          <p className="mx-auto mt-6 max-w-2xl text-forest-deep/75 leading-relaxed">
            Every choice — from seed to shipment — is weighed against one question: does it leave the land richer than we found it?
          </p>
        </div>
      </section>

      <RootNetwork />

      <section className="py-24">
        <div className="mx-auto max-w-7xl px-6 lg:px-12">
          <h2 className="text-display text-4xl text-forest-deep lg:text-5xl">Sourced across India.</h2>
          <p className="mt-4 max-w-xl text-forest-deep/70">From Telangana's turmeric to Kashmir's lavender — every ingredient comes from its rightful terroir.</p>
          <div className="mt-12 relative mx-auto aspect-[3/4] w-full max-w-[480px] rounded-[2rem] bg-beige/60 border border-forest/15 overflow-hidden">
            {/* stylized india outline */}
            <svg viewBox="0 0 300 400" className="absolute inset-0 h-full w-full">
              <path
                d="M150 10 C 200 30, 240 60, 250 110 C 260 160, 230 190, 220 230 C 215 280, 190 330, 150 380 C 110 330, 80 280, 75 230 C 70 190, 50 160, 55 110 C 65 60, 100 30, 150 10 Z"
                fill="oklch(0.55 0.13 145 / 0.15)"
                stroke="oklch(0.36 0.07 156 / 0.4)"
                strokeWidth="1.5"
              />
            </svg>
            {REGIONS.map((r) => (
              <div key={r.label} className="absolute -translate-x-1/2 -translate-y-1/2 group" style={{ left: r.x, top: r.y }}>
                <div className="h-3 w-3 rounded-full bg-turmeric animate-glow-pulse" />
                <div className="pointer-events-none absolute left-4 top-0 whitespace-nowrap rounded-full bg-forest text-cream text-[10px] uppercase tracking-[0.2em] px-3 py-1 opacity-0 group-hover:opacity-100 transition">
                  {r.label}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
