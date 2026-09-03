import { client } from "./client";
import * as queries from "./queries";
import { urlForImage } from "./image";
import {
  MOCK_CASE_STUDIES,
  MOCK_BLOG_POSTS,
  MOCK_SERVICES,
  MOCK_TESTIMONIALS,
  MOCK_STATS,
  MOCK_TEAM,
  MOCK_PROCESS,
} from "@/lib/mock-data";
import { CaseStudy, BlogPost, Service, Testimonial, Stat } from "@/lib/types";

// Helper to safely convert Sanity image object or fallback string URL
export function formatSanityImage(imageField: any, fallbackUrl: string = ""): string {
  if (!imageField) return fallbackUrl;
  if (typeof imageField === "string" && imageField.trim() !== "") return imageField;
  if (typeof imageField === "object") {
    const built = urlForImage(imageField);
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
// Page-wise Singleton Fetchers
// ----------------------------------------------------

export async function getHomepageData() {
  const [heroData, logoCloudData, imageTextData, resultsData, ctaData] = await Promise.all([
    getHeroData(),
    getLogoCloudData(),
    getImageTextData(),
    getResultsData(),
    getCtaData(),
  ]);

  if (!client) {
    return { heroData, logoCloudData, imageTextData, resultsData, ctaData };
  }

  try {
    const data = await client.fetch(queries.homepageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return { heroData, logoCloudData, imageTextData, resultsData, ctaData };

    return {
      heroData: data.hero
        ? {
            label: data.hero.label || heroData.label,
            title: data.hero.title || heroData.title,
            description: data.hero.description || heroData.description,
            buttons: [
              {
                label: data.hero.primaryCtaLabel || "View our work",
                link: data.hero.primaryCtaLink || "/work",
                variant: "primary" as const,
                showArrow: true,
              },
              {
                label: data.hero.secondaryCtaLabel || "Start a conversation",
                link: data.hero.secondaryCtaLink || "/contact",
                variant: "secondary" as const,
                showArrow: false,
              },
            ],
            fallbackImage: formatSanityImage(data.hero.image, heroData.fallbackImage),
            videoUrl: data.hero.videoUrl || heroData.videoUrl,
          }
        : heroData,
      logoCloudData: data.logoCloud
        ? {
            heading: data.logoCloud.heading || logoCloudData.heading,
            logos: Array.isArray(data.logoCloud.logos) && data.logoCloud.logos.length > 0
              ? data.logoCloud.logos.map((l: any) => ({
                  name: l.name || "",
                  logoImage: formatSanityImage(l.logoImage, ""),
                  svgCode: l.svgCode,
                  link: l.link,
                }))
              : logoCloudData.logos,
          }
        : logoCloudData,
      imageTextData: data.imageText
        ? {
            label: data.imageText.label || imageTextData.label,
            title: data.imageText.title || imageTextData.title,
            paragraphs: Array.isArray(data.imageText.paragraphs) && data.imageText.paragraphs.length > 0
              ? data.imageText.paragraphs
              : imageTextData.paragraphs,
            featureImage: formatSanityImage(data.imageText.featureImage, imageTextData.featureImage),
            quote: data.imageText.quote,
            quoteAuthor: data.imageText.quoteAuthor,
            ctaLabel: data.imageText.ctaLabel,
            ctaLink: data.imageText.ctaLink,
          }
        : imageTextData,
      resultsData: data.resultsSection
        ? {
            label: data.resultsSection.label || resultsData.label,
            title: data.resultsSection.title || resultsData.title,
            description: data.resultsSection.description || resultsData.description,
            highlightMetric: data.resultsSection.highlightMetric || resultsData.highlightMetric,
            highlightLabel: data.resultsSection.highlightLabel || resultsData.highlightLabel,
            metrics: Array.isArray(data.resultsSection.metrics) && data.resultsSection.metrics.length > 0
              ? data.resultsSection.metrics
              : resultsData.metrics,
          }
        : resultsData,
      ctaData: data.cta
        ? {
            label: data.cta.label || ctaData.label,
            title: data.cta.title || ctaData.title,
            description: data.cta.description || ctaData.description,
            primaryButtonLabel: data.cta.primaryButtonLabel || ctaData.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink || ctaData.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel || ctaData.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink || ctaData.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch {
    return { heroData, logoCloudData, imageTextData, resultsData, ctaData };
  }
}

export async function getAboutPageData() {
  const ctaData = await getCtaData();
  const defaultAboutData = {
    hero: {
      label: "ABOUT NORTHSTAR",
      headline: "We are an independent digital agency bridging editorial art direction & software precision.",
      coverImage: "/images/hero-studio.jpg",
    },
    philosophy: {
      headline: "Built on conviction, restraint, and obsessive craft.",
      paragraphs: [
        "Founded in 2014, Northstar was built to offer an alternative to traditional multi-tiered agencies and commodity template factories. We operate as a focused partner for leaders who demand world-class execution.",
        "We believe that software should be beautiful, fast, and human. We don't build disposable marketing sites — we architect enduring digital assets that elevate market positioning and drive measurable business results.",
      ],
    },
    teamMembers: MOCK_TEAM,
    processSteps: MOCK_PROCESS,
    ctaData,
  };

  if (!client) return defaultAboutData;

  try {
    const data = await client.fetch(queries.aboutPageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return defaultAboutData;

    return {
      hero: {
        label: data.hero?.label || defaultAboutData.hero.label,
        headline: data.hero?.headline || defaultAboutData.hero.headline,
        coverImage: formatSanityImage(data.hero?.coverImage, defaultAboutData.hero.coverImage),
      },
      philosophy: {
        headline: data.philosophy?.headline || defaultAboutData.philosophy.headline,
        paragraphs: Array.isArray(data.philosophy?.paragraphs) && data.philosophy.paragraphs.length > 0
          ? data.philosophy.paragraphs
          : defaultAboutData.philosophy.paragraphs,
      },
      teamMembers: Array.isArray(data.teamSection?.members) && data.teamSection.members.length > 0
        ? data.teamSection.members.map((m: any) => ({
            id: m.id || m._id,
            name: m.name || "",
            role: m.role || "",
            bio: m.bio || "",
            image: formatSanityImage(m.image, "/images/avatar-1.jpg"),
            websiteUrl: m.websiteUrl,
            linkedinUrl: m.linkedinUrl,
          }))
        : MOCK_TEAM,
      processSteps: Array.isArray(data.process?.steps) && data.process.steps.length > 0
        ? data.process.steps
        : MOCK_PROCESS,
      ctaData: data.cta
        ? {
            label: data.cta.label || ctaData.label,
            title: data.cta.title || ctaData.title,
            description: data.cta.description || ctaData.description,
            primaryButtonLabel: data.cta.primaryButtonLabel || ctaData.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink || ctaData.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel || ctaData.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink || ctaData.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch {
    return defaultAboutData;
  }
}

export async function getServicesPageData() {
  const ctaData = await getCtaData();
  const services = await getSanityServices();
  const defaultServicesData = {
    hero: {
      label: "SERVICES & CAPABILITIES",
      title: "End-to-end digital product design & engineering.",
      description: "We partner with ambitious teams to turn bold visions into market-defining digital reality. Here is how we help brands design, build, and scale.",
    },
    services,
    processSteps: MOCK_PROCESS,
    ctaData,
  };

  if (!client) return defaultServicesData;

  try {
    const data = await client.fetch(queries.servicesPageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return defaultServicesData;

    return {
      hero: {
        label: data.hero?.label || defaultServicesData.hero.label,
        title: data.hero?.title || defaultServicesData.hero.title,
        description: data.hero?.description || defaultServicesData.hero.description,
      },
      services: Array.isArray(data.servicesSection?.services) && data.servicesSection.services.length > 0
        ? data.servicesSection.services.map((s: any) => ({
            id: s.id || s._id,
            number: s.number || "01",
            title: s.title || "",
            subtitle: s.subtitle || "",
            description: s.description || "",
            image: formatSanityImage(s.image, "/images/hero-studio.jpg"),
            capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
            deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
            relatedCaseStudies: [],
          }))
        : services,
      processSteps: Array.isArray(data.process?.steps) && data.process.steps.length > 0
        ? data.process.steps
        : MOCK_PROCESS,
      ctaData: data.cta
        ? {
            label: data.cta.label || ctaData.label,
            title: data.cta.title || ctaData.title,
            description: data.cta.description || ctaData.description,
            primaryButtonLabel: data.cta.primaryButtonLabel || ctaData.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink || ctaData.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel || ctaData.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink || ctaData.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch {
    return defaultServicesData;
  }
}

export async function getWorkPageData() {
  const ctaData = await getCtaData();
  const caseStudies = await getSanityCaseStudies();
  const defaultWorkData = {
    hero: {
      label: "PORTFOLIO OF WORK",
      title: "Selected case studies & digital product transformations.",
      description: "Explore how we have partnered with ambitious companies across industries to solve complex problems and build products people actually want to use.",
    },
    categories: [
      "All",
      "Fintech Platform",
      "Digital Healthcare",
      "E-Commerce",
      "Developer Tools",
      "Architecture & Design",
      "Cloud Infrastructure",
    ],
    caseStudies,
    ctaData,
  };

  if (!client) return defaultWorkData;

  try {
    const data = await client.fetch(queries.workPageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return defaultWorkData;

    return {
      hero: {
        label: data.hero?.label || defaultWorkData.hero.label,
        title: data.hero?.title || defaultWorkData.hero.title,
        description: data.hero?.description || defaultWorkData.hero.description,
      },
      categories: Array.isArray(data.categoriesSection?.categories) && data.categoriesSection.categories.length > 0
        ? data.categoriesSection.categories
        : defaultWorkData.categories,
      caseStudies,
      ctaData: data.cta
        ? {
            label: data.cta.label || ctaData.label,
            title: data.cta.title || ctaData.title,
            description: data.cta.description || ctaData.description,
            primaryButtonLabel: data.cta.primaryButtonLabel || ctaData.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink || ctaData.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel || ctaData.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink || ctaData.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch {
    return defaultWorkData;
  }
}

export async function getInsightsPageData() {
  const ctaData = await getCtaData();
  const blogPosts = await getSanityBlogPosts();
  const defaultInsightsData = {
    hero: {
      label: "INSIGHTS & ESSAYS",
      title: "Perspectives on digital craft, code and scale.",
      description: "In-depth articles from our design and engineering team on building products that stand out.",
    },
    categories: [
      "All",
      "Design Insights",
      "Engineering Architecture",
      "Strategy",
      "Product Growth",
    ],
    blogPosts,
    ctaData,
  };

  if (!client) return defaultInsightsData;

  try {
    const data = await client.fetch(queries.insightsPageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return defaultInsightsData;

    return {
      hero: {
        label: data.hero?.label || defaultInsightsData.hero.label,
        title: data.hero?.title || defaultInsightsData.hero.title,
        description: data.hero?.description || defaultInsightsData.hero.description,
      },
      categories: Array.isArray(data.categoriesSection?.categories) && data.categoriesSection.categories.length > 0
        ? data.categoriesSection.categories
        : defaultInsightsData.categories,
      blogPosts,
      ctaData: data.cta
        ? {
            label: data.cta.label || ctaData.label,
            title: data.cta.title || ctaData.title,
            description: data.cta.description || ctaData.description,
            primaryButtonLabel: data.cta.primaryButtonLabel || ctaData.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink || ctaData.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel || ctaData.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink || ctaData.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch {
    return defaultInsightsData;
  }
}

export async function getContactPageData() {
  const defaultContactData = {
    hero: {
      label: "START A CONVERSATION",
      title: "Let's build something worth talking about.",
      description: "Have a project in mind or want to learn more about how Northstar can elevate your product? Tell us about your goals.",
    },
    contactInfo: {
      email: "hello@northstar.agency",
      address: "540 Broadway, 4th Floor, New York",
      additionalLocations: "Also in London & Berlin",
    },
    formOptions: {
      projectTypes: [
        "Digital Strategy",
        "Brand Experience",
        "Web Application",
        "E-Commerce Store",
        "Design System",
        "Growth & SEO",
      ],
      budgetRanges: ["$25k – $50k", "$50k – $100k", "$100k – $250k", "$250k+"],
    },
  };

  if (!client) return defaultContactData;

  try {
    const data = await client.fetch(queries.contactPageQuery, {}, { next: { revalidate: 0 } });
    if (!data) return defaultContactData;

    return {
      hero: {
        label: data.hero?.label || defaultContactData.hero.label,
        title: data.hero?.title || defaultContactData.hero.title,
        description: data.hero?.description || defaultContactData.hero.description,
      },
      contactInfo: {
        email: data.contactInfo?.email || defaultContactData.contactInfo.email,
        address: data.contactInfo?.address || defaultContactData.contactInfo.address,
        additionalLocations: data.contactInfo?.additionalLocations || defaultContactData.contactInfo.additionalLocations,
      },
      formOptions: {
        projectTypes: Array.isArray(data.formOptions?.projectTypes) && data.formOptions.projectTypes.length > 0
          ? data.formOptions.projectTypes
          : defaultContactData.formOptions.projectTypes,
        budgetRanges: Array.isArray(data.formOptions?.budgetRanges) && data.formOptions.budgetRanges.length > 0
          ? data.formOptions.budgetRanges
          : defaultContactData.formOptions.budgetRanges,
      },
    };
  } catch {
    return defaultContactData;
  }
}

// ----------------------------------------------------
// Legacy / Collection Async Fetchers
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

// Collections Fetchers
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
