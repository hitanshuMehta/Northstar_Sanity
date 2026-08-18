import { Hero } from "@/components/sections/Hero";
import { LogoCloud } from "@/components/sections/LogoCloud";
import { FeaturedWork } from "@/components/sections/FeaturedWork";
import { Stats } from "@/components/sections/Stats";
import { Services } from "@/components/sections/Services";
import { ImageText } from "@/components/sections/ImageText";
import { Testimonial } from "@/components/sections/Testimonial";
import { Results } from "@/components/sections/Results";
import { Insights } from "@/components/sections/Insights";
import { CTA } from "@/components/sections/CTA";

export default function HomePage() {
  return (
    <>
      <Hero />
      <LogoCloud />
      <FeaturedWork />
      <Stats />
      <Services />
      <ImageText />
      <Testimonial />
      <Results />
      <Insights />
      <CTA />
    </>
  );
}
