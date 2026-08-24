import { client } from "./client";
import * as queries from "./queries";
import { urlForImage } from "./image";
import {
  MOCK_CASE_STUDIES,
  MOCK_BLOG_POSTS,
  MOCK_SERVICES,
  MOCK_TESTIMONIALS,
  MOCK_STATS,
} from "@/lib/mock-data";
import { CaseStudy, BlogPost, Service, Testimonial, Stat } from "@/lib/types";

// Helper to safely convert Sanity image object or fallback string URL
export function formatSanityImage(imageField: any, fallbackUrl: string = ""): string {
  if (!imageField) return fallbackUrl;
  if (typeof imageField === "string" && imageField.trim() !== "") return imageField;
  if (typeof imageField === "object" && imageField.asset) {
    const built = urlForImage(imageField)?.url();
    if (built) return built;
  }
  return fallbackUrl;
}

// ----------------------------------------------------
// Interfaces & Defaults
// ----------------------------------------------------

export interface NavbarLink {
  label: string;
  href: string;
}

export interface NavbarData {
  logoText: string;
  logoLink: string;
  links: NavbarLink[];
  ctaLabel: string;
  ctaLink: string;
}

export interface HeroButton {
  label: string;
  link: string;
  variant?: "primary" | "secondary";
  showArrow?: boolean;
}

export interface HeroData {
  label: string;
  title: string;
  description: string;
  buttons: HeroButton[];
  primaryCtaLabel?: string;
  primaryCtaLink?: string;
  secondaryCtaLabel?: string;
  secondaryCtaLink?: string;
  videoUrl?: string;
  fallbackImage?: string;
  locationLabel?: string;
  establishedLabel?: string;
}

export interface LogoItem {
  name: string;
  logoImage?: string;
  svgCode?: string;
  link?: string;
}

export interface LogoCloudData {
  heading: string;
  logos: LogoItem[];
}

export interface ImageTextData {
  label: string;
  title: string;
  paragraphs: string[];
  featureImage: string;
  quote?: string;
  quoteAuthor?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface ResultMetric {
  value: string;
  label: string;
  description: string;
}

export interface ResultsData {
  label: string;
  title: string;
  description: string;
  highlightMetric: string;
  highlightLabel: string;
  metrics: ResultMetric[];
}

export interface CtaData {
  label: string;
  title: string;
  description: string;
  primaryButtonLabel: string;
  primaryButtonLink: string;
  secondaryButtonLabel: string;
  secondaryButtonLink: string;
}

// Defaults
export const DEFAULT_NAVBAR_DATA: NavbarData = {
  logoText: "NORTHSTAR",
  logoLink: "/",
  links: [
    { label: "Work", href: "/work" },
    { label: "Services", href: "/services" },
    { label: "About", href: "/about" },
    { label: "Insights", href: "/insights" },
  ],
  ctaLabel: "Let's talk",
  ctaLink: "/contact",
};

export const DEFAULT_HERO_DATA: HeroData = {
  label: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
  title: "We build digital experiences that move businesses forward.",
  description:
    "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
  buttons: [
    { label: "View our work", link: "/work", variant: "primary", showArrow: true },
    { label: "Start a conversation", link: "/contact", variant: "secondary", showArrow: false },
  ],
  videoUrl:
    "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
  fallbackImage: "/images/hero-studio.jpg",
  locationLabel: "DESIGN STUDIO / NEW YORK",
  establishedLabel: "EST. 2014",
};

export const DEFAULT_LOGO_CLOUD_DATA: LogoCloudData = {
  heading: "TRUSTED BY INNOVATIVE TEAMS AT LEADING COMPANIES",
  logos: [
    { name: "Vercel" },
    { name: "Stripe" },
    { name: "Linear" },
    { name: "Figma" },
    { name: "Raycast" },
    { name: "Supabase" },
  ],
};

export const DEFAULT_IMAGE_TEXT_DATA: ImageTextData = {
  label: "OUR PHILOSOPHY",
  title: "Bridging strategic vision and technical craftsmanship.",
  paragraphs: [
    "We believe that exceptional digital products require both editorial restraint and robust software architecture.",
    "Our multidisciplinary teams partner closely with founders and executive leaders from initial product strategy through post-launch scale.",
  ],
  featureImage: "/images/hero-studio.jpg",
  quote: "Design is not just what it looks like. Design is how it works.",
  quoteAuthor: "Northstar Design Philosophy",
  ctaLabel: "Learn more about us",
  ctaLink: "/about",
};

export const DEFAULT_RESULTS_DATA: ResultsData = {
  label: "MEASURABLE IMPACT",
  title: "Proven results across high-growth product transformations.",
  description:
    "We track tangible outcome metrics across user engagement, conversion rates, and engineering velocity.",
  highlightMetric: "3.4x",
  highlightLabel: "Average Revenue Growth in 12 Months",
  metrics: [
    {
      value: "99.99%",
      label: "Uptime Reliability",
      description: "Architected on cloud-native infrastructure for zero downtime.",
    },
    {
      value: "+210%",
      label: "User Engagement",
      description: "Editorial UI polish that increases session duration and adoption.",
    },
    {
      value: "60%",
      label: "Faster Time to Market",
      description: "Structured design systems and clean React architecture.",
    },
  ],
};

export const DEFAULT_CTA_DATA: CtaData = {
  label: "START A PROJECT",
  title: "Ready to build something extraordinary?",
  description:
    "Let's partner to transform your product vision into a world-class digital experience.",
  primaryButtonLabel: "Start a conversation",
  primaryButtonLink: "/contact",
  secondaryButtonLabel: "Explore our work",
  secondaryButtonLink: "/work",
};

// ----------------------------------------------------
// Async Fetchers with Instant Revalidation
// ----------------------------------------------------

export async function getNavbarData(): Promise<NavbarData> {
  if (!client) return DEFAULT_NAVBAR_DATA;
  try {
    const data = await client.fetch(queries.navbarQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_NAVBAR_DATA;
    return {
      logoText: data.logoText || DEFAULT_NAVBAR_DATA.logoText,
      logoLink: data.logoLink || DEFAULT_NAVBAR_DATA.logoLink,
      links: Array.isArray(data.links) && data.links.length > 0 ? data.links : DEFAULT_NAVBAR_DATA.links,
      ctaLabel: data.ctaLabel || DEFAULT_NAVBAR_DATA.ctaLabel,
      ctaLink: data.ctaLink || DEFAULT_NAVBAR_DATA.ctaLink,
    };
  } catch {
    return DEFAULT_NAVBAR_DATA;
  }
}

export async function getHeroData(): Promise<HeroData> {
  if (!client) return DEFAULT_HERO_DATA;
  try {
    const data = await client.fetch(queries.heroQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_HERO_DATA;

    const imageUrl = formatSanityImage(data.fallbackImage, DEFAULT_HERO_DATA.fallbackImage);
    let buttonsList: HeroButton[] = [];
    if (Array.isArray(data.buttons) && data.buttons.length > 0) {
      buttonsList = data.buttons.map((b: any) => ({
        label: b.label || "",
        link: b.link || "#",
        variant: b.variant === "secondary" ? "secondary" : "primary",
        showArrow: Boolean(b.showArrow),
      }));
    } else {
      buttonsList = DEFAULT_HERO_DATA.buttons;
    }

    return {
      label: data.label !== undefined ? data.label : DEFAULT_HERO_DATA.label,
      title: data.title || DEFAULT_HERO_DATA.title,
      description: data.description !== undefined ? data.description : DEFAULT_HERO_DATA.description,
      buttons: buttonsList,
      videoUrl: data.videoUrl !== undefined ? data.videoUrl : DEFAULT_HERO_DATA.videoUrl,
      fallbackImage: imageUrl,
      locationLabel: data.locationLabel,
      establishedLabel: data.establishedLabel,
    };
  } catch {
    return DEFAULT_HERO_DATA;
  }
}

export async function getLogoCloudData(): Promise<LogoCloudData> {
  if (!client) return DEFAULT_LOGO_CLOUD_DATA;
  try {
    const data = await client.fetch(queries.logoCloudQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_LOGO_CLOUD_DATA;
    const logos = Array.isArray(data.logos) && data.logos.length > 0
      ? data.logos.map((item: any) => ({
          name: item.name || "",
          logoImage: formatSanityImage(item.logoImage, ""),
          svgCode: item.svgCode,
          link: item.link,
        }))
      : DEFAULT_LOGO_CLOUD_DATA.logos;

    return {
      heading: data.heading || DEFAULT_LOGO_CLOUD_DATA.heading,
      logos,
    };
  } catch {
    return DEFAULT_LOGO_CLOUD_DATA;
  }
}

export async function getImageTextData(): Promise<ImageTextData> {
  if (!client) return DEFAULT_IMAGE_TEXT_DATA;
  try {
    const data = await client.fetch(queries.imageTextQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_IMAGE_TEXT_DATA;
    return {
      label: data.label !== undefined ? data.label : DEFAULT_IMAGE_TEXT_DATA.label,
      title: data.title || DEFAULT_IMAGE_TEXT_DATA.title,
      paragraphs: Array.isArray(data.paragraphs) && data.paragraphs.length > 0 ? data.paragraphs : DEFAULT_IMAGE_TEXT_DATA.paragraphs,
      featureImage: formatSanityImage(data.featureImage, data.featureImageUrl || DEFAULT_IMAGE_TEXT_DATA.featureImage),
      quote: data.quote,
      quoteAuthor: data.quoteAuthor,
      ctaLabel: data.ctaLabel,
      ctaLink: data.ctaLink,
    };
  } catch {
    return DEFAULT_IMAGE_TEXT_DATA;
  }
}

export async function getResultsData(): Promise<ResultsData> {
  if (!client) return DEFAULT_RESULTS_DATA;
  try {
    const data = await client.fetch(queries.resultsQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_RESULTS_DATA;
    return {
      label: data.label || DEFAULT_RESULTS_DATA.label,
      title: data.title || DEFAULT_RESULTS_DATA.title,
      description: data.description || DEFAULT_RESULTS_DATA.description,
      highlightMetric: data.highlightMetric || DEFAULT_RESULTS_DATA.highlightMetric,
      highlightLabel: data.highlightLabel || DEFAULT_RESULTS_DATA.highlightLabel,
      metrics: Array.isArray(data.metrics) && data.metrics.length > 0 ? data.metrics : DEFAULT_RESULTS_DATA.metrics,
    };
  } catch {
    return DEFAULT_RESULTS_DATA;
  }
}

export async function getCtaData(): Promise<CtaData> {
  if (!client) return DEFAULT_CTA_DATA;
  try {
    const data = await client.fetch(queries.ctaQuery, {}, { next: { revalidate: 0 } });
    if (!data) return DEFAULT_CTA_DATA;
    return {
      label: data.label || DEFAULT_CTA_DATA.label,
      title: data.title || DEFAULT_CTA_DATA.title,
      description: data.description || DEFAULT_CTA_DATA.description,
      primaryButtonLabel: data.primaryButtonLabel || DEFAULT_CTA_DATA.primaryButtonLabel,
      primaryButtonLink: data.primaryButtonLink || DEFAULT_CTA_DATA.primaryButtonLink,
      secondaryButtonLabel: data.secondaryButtonLabel || DEFAULT_CTA_DATA.secondaryButtonLabel,
      secondaryButtonLink: data.secondaryButtonLink || DEFAULT_CTA_DATA.secondaryButtonLink,
    };
  } catch {
    return DEFAULT_CTA_DATA;
  }
}

// ----------------------------------------------------
// Collections Fetchers with Mock Fallbacks
// ----------------------------------------------------

export async function getSanityCaseStudies(): Promise<CaseStudy[]> {
  if (!client) return MOCK_CASE_STUDIES;
  try {
    const data = await client.fetch(queries.caseStudiesQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_CASE_STUDIES;
    return data.map((item: any) => transformSanityCaseStudy(item));
  } catch {
    return MOCK_CASE_STUDIES;
  }
}

export async function getSanityFeaturedCaseStudies(): Promise<CaseStudy[]> {
  if (!client) return MOCK_CASE_STUDIES.filter((cs) => cs.featured);
  try {
    const data = await client.fetch(queries.featuredCaseStudiesQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_CASE_STUDIES.filter((cs) => cs.featured);
    return data.map((item: any) => transformSanityCaseStudy(item));
  } catch {
    return MOCK_CASE_STUDIES.filter((cs) => cs.featured);
  }
}

export async function getSanityCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  if (!client) return MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
  try {
    const data = await client.fetch(queries.caseStudyBySlugQuery, { slug }, { next: { revalidate: 0 } });
    if (!data) return MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
    return transformSanityCaseStudy(data);
  } catch {
    return MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
  }
}

export async function getSanityStats(): Promise<Stat[]> {
  if (!client) return MOCK_STATS;
  try {
    const data = await client.fetch(queries.statsQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_STATS;
    return data;
  } catch {
    return MOCK_STATS;
  }
}

export async function getSanityServices(): Promise<Service[]> {
  if (!client) return MOCK_SERVICES;
  try {
    const data = await client.fetch(queries.servicesQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_SERVICES;
    return data.map((s: any) => ({
      id: s.id || s._id,
      number: s.number || "01",
      title: s.title || "",
      subtitle: s.subtitle || "",
      description: s.description || "",
      image: formatSanityImage(s.image, s.imageUrl || "/images/hero-studio.jpg"),
      capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
      deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
      relatedCaseStudies: Array.isArray(s.relatedCaseStudies) ? s.relatedCaseStudies : [],
    }));
  } catch {
    return MOCK_SERVICES;
  }
}

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  if (!client) return MOCK_TESTIMONIALS;
  try {
    const data = await client.fetch(queries.testimonialsQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_TESTIMONIALS;
    return data.map((t: any) => ({
      id: t.id || t._id,
      quote: t.quote || "",
      author: t.author || "",
      role: t.role || "",
      company: t.company || "",
      avatar: formatSanityImage(t.avatar, t.avatarUrl || "/images/avatar-1.jpg"),
      metric: t.metric,
    }));
  } catch {
    return MOCK_TESTIMONIALS;
  }
}

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  if (!client) return MOCK_BLOG_POSTS;
  try {
    const data = await client.fetch(queries.blogPostsQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_BLOG_POSTS;
    return data.map((p: any) => transformSanityBlogPost(p));
  } catch {
    return MOCK_BLOG_POSTS;
  }
}

export async function getSanityFeaturedBlogPosts(): Promise<BlogPost[]> {
  if (!client) return MOCK_BLOG_POSTS.filter((p) => p.featured);
  try {
    const data = await client.fetch(queries.featuredBlogPostsQuery, {}, { next: { revalidate: 0 } });
    if (!Array.isArray(data) || data.length === 0) return MOCK_BLOG_POSTS.filter((p) => p.featured);
    return data.map((p: any) => transformSanityBlogPost(p));
  } catch {
    return MOCK_BLOG_POSTS.filter((p) => p.featured);
  }
}

export async function getSanityBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  if (!client) return MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  try {
    const data = await client.fetch(queries.blogPostBySlugQuery, { slug }, { next: { revalidate: 0 } });
    if (!data) return MOCK_BLOG_POSTS.find((p) => p.slug === slug);
    return transformSanityBlogPost(data);
  } catch {
    return MOCK_BLOG_POSTS.find((p) => p.slug === slug);
  }
}

// ----------------------------------------------------
// Transformers
// ----------------------------------------------------

function transformSanityCaseStudy(item: any): CaseStudy {
  const fallback = MOCK_CASE_STUDIES[0];
  const gallery = Array.isArray(item.galleryImages)
    ? item.galleryImages.map((img: any) => formatSanityImage(img, ""))
    : fallback.galleryImages;

  return {
    id: item.id || item._id,
    slug: item.slug || fallback.slug,
    title: item.title || fallback.title,
    client: item.client || fallback.client,
    category: item.category || fallback.category,
    year: item.year || fallback.year,
    summary: item.summary || fallback.summary,
    coverImage: formatSanityImage(item.coverImage, item.coverImageUrl || fallback.coverImage),
    heroImage: formatSanityImage(item.heroImage, item.heroImageUrl || fallback.heroImage),
    videoUrl: item.videoUrl,
    challenge: item.challenge || fallback.challenge,
    approach: item.approach || fallback.approach,
    solution: item.solution || fallback.solution,
    results: {
      highlightMetric: item.resultsSummary ? "" : fallback.results.highlightMetric,
      highlightLabel: fallback.results.highlightLabel,
      summary: item.resultsSummary || fallback.results.summary,
      stats: Array.isArray(item.stats) && item.stats.length > 0 ? item.stats : fallback.results.stats,
    },
    galleryImages: gallery.filter(Boolean),
    testimonial: item.testimonialQuote
      ? {
          quote: item.testimonialQuote,
          author: item.testimonialAuthor || "",
          role: item.testimonialRole || "",
          company: item.testimonialCompany || "",
        }
      : fallback.testimonial,
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : fallback.relatedSlugs,
    liveUrl: item.liveUrl,
    featured: Boolean(item.featured),
  };
}

function transformSanityBlogPost(item: any): BlogPost {
  const fallback = MOCK_BLOG_POSTS[0];
  return {
    id: item.id || item._id,
    slug: item.slug || fallback.slug,
    title: item.title || fallback.title,
    category: item.category || fallback.category,
    publishedAt: item.publishedAt || fallback.publishedAt,
    readTime: item.readTime || fallback.readTime,
    excerpt: item.excerpt || fallback.excerpt,
    coverImage: formatSanityImage(item.coverImage, item.coverImageUrl || fallback.coverImage),
    author: {
      name: item.authorName || fallback.author.name,
      role: item.authorRole || fallback.author.role,
      avatar: formatSanityImage(item.authorAvatar, item.authorAvatarUrl || fallback.author.avatar),
      bio: item.authorBio || fallback.author.bio,
    },
    content: {
      introduction: item.introduction || fallback.content.introduction,
      headings: Array.isArray(item.headings) && item.headings.length > 0 ? item.headings : fallback.content.headings,
      conclusion: item.conclusion || fallback.content.conclusion,
      keyTakeaway: item.keyTakeaway || fallback.content.keyTakeaway,
    },
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : fallback.relatedSlugs,
    featured: Boolean(item.featured),
  };
}
