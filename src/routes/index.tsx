import { createFileRoute } from "@tanstack/react-router";
import { HomeHero, HomeStory } from "@/components/home/HomeHero";
import { RootNetwork } from "@/components/home/RootNetwork";
import { WhyUs } from "@/components/home/WhyUs";
import { Industries } from "@/components/home/Industries";
import { FinalCTA } from "@/components/home/FinalCTA";

export const Route = createFileRoute("/")({
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
