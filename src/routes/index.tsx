import { createFileRoute } from "@tanstack/react-router";
import { HomeHero, HomeStory } from "@/components/home/HomeHero";
import { RootNetwork } from "@/components/home/RootNetwork";
import { WhyUs } from "@/components/home/WhyUs";
import { Industries } from "@/components/home/Industries";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Phyto Health Organics — Pure Nature, Premium Powders" },
      {
        name: "description",
        content:
          "Premium organic fruit, flower, vegetable & superfood powders from Telangana, India. Export-grade, hygienic, private-label ready.",
      },
      { property: "og:title", content: "Phyto Health Organics — Pure Nature, Premium Powders" },
      { property: "og:description", content: "Nurturing Nature, Nurturing Lives. Discover 18 powders crafted with reverence." },
    ],
  }),
  component: Index,
});

function Index() {
  return (
    <>
      <HomeHero />
      <HomeStory />
      <RootNetwork />
      <WhyUs />
      <Industries />
      <FinalCTA />
    </>
  );
}
