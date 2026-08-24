import { client } from "./client";
import { heroQuery } from "./queries";
import { urlForImage } from "./image";

export interface HeroData {
  label: string;
  title: string;
  description: string;
  primaryCtaLabel: string;
  primaryCtaLink: string;
  secondaryCtaLabel: string;
  secondaryCtaLink: string;
  videoUrl: string;
  fallbackImage: string;
  locationLabel: string;
  establishedLabel: string;
}

export const DEFAULT_HERO_DATA: HeroData = {
  label: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
  title: "We build digital experiences that move businesses forward.",
  description:
    "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
  primaryCtaLabel: "View our work",
  primaryCtaLink: "/work",
  secondaryCtaLabel: "Start a conversation",
  secondaryCtaLink: "/contact",
  videoUrl:
    "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
  fallbackImage: "/images/hero-studio.jpg",
  locationLabel: "DESIGN STUDIO / NEW YORK",
  establishedLabel: "EST. 2014",
};

export async function getHeroData(): Promise<HeroData> {
  if (!client) {
    return DEFAULT_HERO_DATA;
  }

  try {
    const data = await client.fetch(heroQuery);
    if (!data) return DEFAULT_HERO_DATA;

    let imageUrl = DEFAULT_HERO_DATA.fallbackImage;
    if (data.fallbackImage) {
      const builtUrl = urlForImage(data.fallbackImage)?.url();
      if (builtUrl) imageUrl = builtUrl;
    }

    return {
      label: data.label || DEFAULT_HERO_DATA.label,
      title: data.title || DEFAULT_HERO_DATA.title,
      description: data.description || DEFAULT_HERO_DATA.description,
      primaryCtaLabel: data.primaryCtaLabel || DEFAULT_HERO_DATA.primaryCtaLabel,
      primaryCtaLink: data.primaryCtaLink || DEFAULT_HERO_DATA.primaryCtaLink,
      secondaryCtaLabel: data.secondaryCtaLabel || DEFAULT_HERO_DATA.secondaryCtaLabel,
      secondaryCtaLink: data.secondaryCtaLink || DEFAULT_HERO_DATA.secondaryCtaLink,
      videoUrl: data.videoUrl || DEFAULT_HERO_DATA.videoUrl,
      fallbackImage: imageUrl,
      locationLabel: data.locationLabel || DEFAULT_HERO_DATA.locationLabel,
      establishedLabel: data.establishedLabel || DEFAULT_HERO_DATA.establishedLabel,
    };
  } catch (error) {
    console.warn("Failed to fetch Sanity Hero data, using default fallback:", error);
    return DEFAULT_HERO_DATA;
  }
}
