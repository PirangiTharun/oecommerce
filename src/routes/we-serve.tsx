import { createFileRoute } from "@tanstack/react-router";
import { Industries } from "@/components/home/Industries";

export const Route = createFileRoute("/we-serve")({
  component: () => (
    <div className="pt-32">
      <div className="mx-auto max-w-5xl px-6 pt-12 text-center lg:px-12">
        <span className="text-[10px] uppercase tracking-[0.5em] text-turmeric">Applications</span>
        <h1 className="mt-3 text-display text-[clamp(44px,7vw,110px)] leading-[0.98] text-forest-deep">
          Made for every <em className="not-italic shimmer-text">shelf</em>.
        </h1>
      </div>
      <Industries />
    </div>
  ),
});
