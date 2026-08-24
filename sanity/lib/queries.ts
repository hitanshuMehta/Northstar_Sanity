import { groq } from "next-sanity";

export const heroQuery = groq`
  *[_type == "hero"][0] {
    _id,
    label,
    title,
    description,
    primaryCtaLabel,
    primaryCtaLink,
    secondaryCtaLabel,
    secondaryCtaLink,
    videoUrl,
    fallbackImage,
    locationLabel,
    establishedLabel
  }
`;
