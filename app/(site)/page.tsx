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
import { getHomepageData } from "@/sanity/lib/fetch";

export const dynamic = "force-dynamic";
export const revalidate = 0;

export default async function HomePage() {
  const {
    heroData,
    logoCloudData,
    featuredWorkData,
    statsData,
    servicesSectionData,
    imageTextData,
    testimonialsSectionData,
    resultsData,
    insightsSectionData,
    ctaData,
  } = await getHomepageData();

  return (
    <>
      <Hero data={heroData} />
      <LogoCloud data={logoCloudData} />
      <FeaturedWork data={featuredWorkData} />
      <Stats data={statsData} />
      <Services data={servicesSectionData} />
      <ImageText data={imageTextData} />
      <Testimonial data={testimonialsSectionData} />
      <Results data={resultsData} />
      <Insights data={insightsSectionData} />
      <CTA data={ctaData} />
    </>
  );
}
