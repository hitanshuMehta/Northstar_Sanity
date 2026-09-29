import { client } from "./client";
import { sanityFetch } from "./live";
import * as queries from "./queries";
import { urlForImage } from "./image";
import { CaseStudy, BlogPost, Service, Testimonial, Stat } from "@/lib/types";

// Helper to safely convert Sanity image object or string URL without hardcoded fallback images
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
// Interfaces
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
  label?: string;
  title?: string;
  description?: string;
  buttons?: HeroButton[];
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
  heading?: string;
  logos: LogoItem[];
}

export interface FeaturedWorkSectionData {
  label?: string;
  title?: string;
  description?: string;
  caseStudies: CaseStudy[];
}

export interface StatsSectionData {
  title?: string;
  description?: string;
  stats: Stat[];
}

export interface ServicesSectionData {
  label?: string;
  title?: string;
  description?: string;
  services: Service[];
}

export interface ImageTextData {
  label?: string;
  title?: string;
  paragraphs?: string[];
  featureImage?: string;
  quote?: string;
  quoteAuthor?: string;
  ctaLabel?: string;
  ctaLink?: string;
}

export interface TestimonialsSectionData {
  label?: string;
  title?: string;
  testimonials: Testimonial[];
}

export interface ResultMetric {
  value: string;
  label: string;
  description: string;
}

export interface ResultsData {
  label?: string;
  title?: string;
  description?: string;
  highlightMetric?: string;
  highlightLabel?: string;
  metrics: ResultMetric[];
}

export interface InsightsSectionData {
  label?: string;
  title?: string;
  description?: string;
  posts: BlogPost[];
}

export interface CtaData {
  label?: string;
  title?: string;
  description?: string;
  primaryButtonLabel?: string;
  primaryButtonLink?: string;
  secondaryButtonLabel?: string;
  secondaryButtonLink?: string;
}

export interface SiteSettingsData {
  siteTitle?: string;
  logoText?: string;
  contactEmail?: string;
  navLinks?: { label: string; href: string }[];
  headerCtaLabel?: string;
  headerCtaLink?: string;
  footerCopyright?: string;
}

// ----------------------------------------------------
// Page Fetchers (Direct from Sanity without hardcoding)
// ----------------------------------------------------

export async function getHomepageData() {
  try {
    const res = await sanityFetch({
      query: queries.homepageQuery,
    });
    const data: any = res?.data;

    if (!data) {
      return {
        heroData: undefined,
        logoCloudData: undefined,
        featuredWorkData: undefined,
        statsData: undefined,
        servicesSectionData: undefined,
        imageTextData: undefined,
        testimonialsSectionData: undefined,
        resultsData: undefined,
        insightsSectionData: undefined,
        ctaData: undefined,
      };
    }

    // Map Featured Work case studies directly
    let featuredCaseStudies: CaseStudy[] = [];
    if (Array.isArray(data.featuredWork?.selectedCaseStudies) && data.featuredWork.selectedCaseStudies.length > 0) {
      featuredCaseStudies = data.featuredWork.selectedCaseStudies.map((cs: any) => transformSanityCaseStudy(cs));
    } else {
      featuredCaseStudies = await getSanityFeaturedCaseStudies();
    }

    // Map Stats directly
    let homeStats: Stat[] = [];
    if (Array.isArray(data.stats?.stats) && data.stats.stats.length > 0) {
      homeStats = data.stats.stats.map((s: any, idx: number) => ({
        id: s._key || `stat-${idx}`,
        label: s.label || "",
        value: s.value || "",
        numericValue: s.numericValue,
        prefix: s.prefix,
        suffix: s.suffix,
        description: s.description || "",
      }));
    } else {
      homeStats = await getSanityStats();
    }

    // Map Services directly
    let homeServices: Service[] = [];
    if (Array.isArray(data.servicesSection?.featuredServices) && data.servicesSection.featuredServices.length > 0) {
      homeServices = data.servicesSection.featuredServices.map((s: any) => ({
        id: s.id || s._id,
        number: s.number || "01",
        title: s.title || "",
        subtitle: s.subtitle || "",
        description: s.description || "",
        image: formatSanityImage(s.image, ""),
        capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
        deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
        relatedCaseStudies: [],
      }));
    } else {
      homeServices = await getSanityServices();
    }

    // Map Testimonials directly
    let homeTestimonials: Testimonial[] = [];
    if (Array.isArray(data.testimonialsSection?.selectedTestimonials) && data.testimonialsSection.selectedTestimonials.length > 0) {
      homeTestimonials = data.testimonialsSection.selectedTestimonials.map((t: any) => ({
        id: t.id || t._id,
        quote: t.quote || "",
        author: t.author || "",
        role: t.role || "",
        company: t.company || "",
        avatar: formatSanityImage(t.avatar, ""),
        metric: t.metric,
      }));
    } else {
      homeTestimonials = await getSanityTestimonials();
    }

    // Map Insights posts directly
    let homePosts: BlogPost[] = [];
    if (Array.isArray(data.insightsSection?.selectedPosts) && data.insightsSection.selectedPosts.length > 0) {
      homePosts = data.insightsSection.selectedPosts.map((p: any) => transformSanityBlogPost(p));
    } else {
      homePosts = await getSanityFeaturedBlogPosts();
    }

    // Buttons array or single CTA mapping
    const buttons: HeroButton[] = Array.isArray(data.hero?.buttons) && data.hero.buttons.length > 0
      ? data.hero.buttons.map((b: any) => ({
          label: b.label || "",
          link: b.link || "#",
          variant: b.variant === "secondary" ? "secondary" : "primary",
          showArrow: Boolean(b.showArrow),
        }))
      : [];

    return {
      heroData: data.hero
        ? {
            label: data.hero.label,
            title: data.hero.title,
            description: data.hero.description,
            buttons,
            primaryCtaLabel: data.hero.primaryCtaLabel,
            primaryCtaLink: data.hero.primaryCtaLink,
            secondaryCtaLabel: data.hero.secondaryCtaLabel,
            secondaryCtaLink: data.hero.secondaryCtaLink,
            videoUrl: data.hero.videoUrl,
            fallbackImage: formatSanityImage(data.hero.image, ""),
          }
        : undefined,

      logoCloudData: data.logoCloud
        ? {
            heading: data.logoCloud.heading,
            logos: Array.isArray(data.logoCloud.logos)
              ? data.logoCloud.logos.map((l: any) => ({
                  name: l.name || "",
                  logoImage: formatSanityImage(l.logoImage, ""),
                  svgCode: l.svgCode,
                  link: l.link,
                }))
              : [],
          }
        : undefined,

      featuredWorkData: {
        label: data.featuredWork?.label,
        title: data.featuredWork?.title,
        description: data.featuredWork?.description,
        caseStudies: featuredCaseStudies,
      },

      statsData: {
        title: data.stats?.title,
        description: data.stats?.description,
        stats: homeStats,
      },

      servicesSectionData: {
        label: data.servicesSection?.label,
        title: data.servicesSection?.title,
        description: data.servicesSection?.description,
        services: homeServices,
      },

      imageTextData: data.imageText
        ? {
            label: data.imageText.label,
            title: data.imageText.title,
            paragraphs: Array.isArray(data.imageText.paragraphs) ? data.imageText.paragraphs : [],
            featureImage: formatSanityImage(data.imageText.featureImage, ""),
            quote: data.imageText.quote,
            quoteAuthor: data.imageText.quoteAuthor,
            ctaLabel: data.imageText.ctaLabel,
            ctaLink: data.imageText.ctaLink,
          }
        : undefined,

      testimonialsSectionData: {
        label: data.testimonialsSection?.label,
        title: data.testimonialsSection?.title,
        testimonials: homeTestimonials,
      },

      resultsData: data.resultsSection
        ? {
            label: data.resultsSection.label,
            title: data.resultsSection.title,
            description: data.resultsSection.description,
            highlightMetric: data.resultsSection.highlightMetric,
            highlightLabel: data.resultsSection.highlightLabel,
            metrics: Array.isArray(data.resultsSection.metrics) ? data.resultsSection.metrics : [],
          }
        : undefined,

      insightsSectionData: {
        label: data.insightsSection?.label,
        title: data.insightsSection?.title,
        description: data.insightsSection?.description,
        posts: homePosts,
      },

      ctaData: data.cta
        ? {
            label: data.cta.label,
            title: data.cta.title,
            description: data.cta.description,
            primaryButtonLabel: data.cta.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink,
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching homepage data:", error);
    return {
      heroData: undefined,
      logoCloudData: undefined,
      featuredWorkData: undefined,
      statsData: undefined,
      servicesSectionData: undefined,
      imageTextData: undefined,
      testimonialsSectionData: undefined,
      resultsData: undefined,
      insightsSectionData: undefined,
      ctaData: undefined,
    };
  }
}

export async function getAboutPageData() {
  const ctaData = await getCtaData();

  try {
    const res = await sanityFetch({ query: queries.aboutPageQuery });
    const data: any = res?.data;

    if (!data) {
      return {
        hero: undefined,
        philosophy: undefined,
        statsData: undefined,
        teamMembers: [],
        processSteps: [],
        ctaData,
      };
    }

    let statsList: Stat[] = [];
    if (Array.isArray(data.stats?.stats) && data.stats.stats.length > 0) {
      statsList = data.stats.stats.map((s: any, idx: number) => ({
        id: s._key || `stat-${idx}`,
        label: s.label || "",
        value: s.value || "",
        numericValue: s.numericValue,
        prefix: s.prefix,
        suffix: s.suffix,
        description: s.description || "",
      }));
    } else {
      statsList = await getSanityStats();
    }

    return {
      hero: data.hero
        ? {
            label: data.hero.label,
            headline: data.hero.headline,
            coverImage: formatSanityImage(data.hero.coverImage, ""),
          }
        : undefined,
      philosophy: data.philosophy
        ? {
            headline: data.philosophy.headline,
            paragraphs: Array.isArray(data.philosophy.paragraphs) ? data.philosophy.paragraphs : [],
          }
        : undefined,
      statsData: {
        title: data.stats?.title,
        description: data.stats?.description,
        stats: statsList,
      },
      teamMembers: Array.isArray(data.teamSection?.members)
        ? data.teamSection.members.map((m: any) => ({
            id: m.id || m._id,
            name: m.name || "",
            role: m.role || "",
            bio: m.bio || "",
            image: formatSanityImage(m.image, ""),
            websiteUrl: m.websiteUrl,
            linkedinUrl: m.linkedinUrl,
          }))
        : [],
      processSteps: Array.isArray(data.process?.steps) ? data.process.steps : [],
      ctaData: data.cta
        ? {
            label: data.cta.label,
            title: data.cta.title,
            description: data.cta.description,
            primaryButtonLabel: data.cta.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch (error) {
    console.error("Error fetching about page data:", error);
    return {
      hero: undefined,
      philosophy: undefined,
      statsData: undefined,
      teamMembers: [],
      processSteps: [],
      ctaData,
    };
  }
}

export async function getServicesPageData() {
  const ctaData = await getCtaData();

  try {
    const res = await sanityFetch({ query: queries.servicesPageQuery });
    const data: any = res?.data;

    const fetchedServices = Array.isArray(data?.servicesSection?.services) && data.servicesSection.services.length > 0
      ? data.servicesSection.services.map((s: any) => ({
          id: s.id || s._id,
          number: s.number || "01",
          title: s.title || "",
          subtitle: s.subtitle || "",
          description: s.description || "",
          image: formatSanityImage(s.image, ""),
          capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
          deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
          relatedCaseStudies: [],
        }))
      : await getSanityServices();

    return {
      hero: data?.hero
        ? {
            label: data.hero.label,
            title: data.hero.title,
            description: data.hero.description,
          }
        : undefined,
      services: fetchedServices,
      processSteps: Array.isArray(data?.process?.steps) ? data.process.steps : [],
      ctaData: data?.cta
        ? {
            label: data.cta.label,
            title: data.cta.title,
            description: data.cta.description,
            primaryButtonLabel: data.cta.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch (error) {
    console.error("Error fetching services page data:", error);
    return {
      hero: undefined,
      services: [],
      processSteps: [],
      ctaData,
    };
  }
}

export async function getWorkPageData() {
  const ctaData = await getCtaData();

  try {
    const res = await sanityFetch({ query: queries.workPageQuery });
    const data: any = res?.data;
    const caseStudies = await getSanityCaseStudies();

    return {
      hero: data?.hero
        ? {
            label: data.hero.label,
            title: data.hero.title,
            description: data.hero.description,
          }
        : undefined,
      categories: Array.isArray(data?.categoriesSection?.categories) && data.categoriesSection.categories.length > 0
        ? data.categoriesSection.categories
        : ["All"],
      caseStudies,
      ctaData: data?.cta
        ? {
            label: data.cta.label,
            title: data.cta.title,
            description: data.cta.description,
            primaryButtonLabel: data.cta.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch (error) {
    console.error("Error fetching work page data:", error);
    return {
      hero: undefined,
      categories: ["All"],
      caseStudies: [],
      ctaData,
    };
  }
}

export async function getInsightsPageData() {
  const ctaData = await getCtaData();

  try {
    const res = await sanityFetch({ query: queries.insightsPageQuery });
    const data: any = res?.data;
    const blogPosts = await getSanityBlogPosts();

    return {
      hero: data?.hero
        ? {
            label: data.hero.label,
            title: data.hero.title,
            description: data.hero.description,
          }
        : undefined,
      categories: Array.isArray(data?.categoriesSection?.categories) && data.categoriesSection.categories.length > 0
        ? data.categoriesSection.categories
        : ["All"],
      blogPosts,
      ctaData: data?.cta
        ? {
            label: data.cta.label,
            title: data.cta.title,
            description: data.cta.description,
            primaryButtonLabel: data.cta.primaryButtonLabel,
            primaryButtonLink: data.cta.primaryButtonLink,
            secondaryButtonLabel: data.cta.secondaryButtonLabel,
            secondaryButtonLink: data.cta.secondaryButtonLink,
          }
        : ctaData,
    };
  } catch (error) {
    console.error("Error fetching insights page data:", error);
    return {
      hero: undefined,
      categories: ["All"],
      blogPosts: [],
      ctaData,
    };
  }
}

export async function getContactPageData() {
  try {
    const res = await sanityFetch({ query: queries.contactPageQuery });
    const data: any = res?.data;
    if (!data) {
      return {
        hero: undefined,
        contactInfo: undefined,
        formOptions: undefined,
      };
    }

    return {
      hero: data.hero
        ? {
            label: data.hero.label,
            title: data.hero.title,
            description: data.hero.description,
          }
        : undefined,
      contactInfo: data.contactInfo
        ? {
            email: data.contactInfo.email,
            address: data.contactInfo.address,
            additionalLocations: data.contactInfo.additionalLocations,
          }
        : undefined,
      formOptions: data.formOptions
        ? {
            projectTypes: Array.isArray(data.formOptions.projectTypes) ? data.formOptions.projectTypes : [],
            budgetRanges: Array.isArray(data.formOptions.budgetRanges) ? data.formOptions.budgetRanges : [],
          }
        : undefined,
    };
  } catch (error) {
    console.error("Error fetching contact page data:", error);
    return {
      hero: undefined,
      contactInfo: undefined,
      formOptions: undefined,
    };
  }
}

// ----------------------------------------------------
// Collections & Individual Fetchers
// ----------------------------------------------------

export async function getSanityCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await sanityFetch({ query: queries.caseStudiesQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((item: any) => transformSanityCaseStudy(item));
  } catch {
    return [];
  }
}

export async function getSanityFeaturedCaseStudies(): Promise<CaseStudy[]> {
  try {
    const res = await sanityFetch({ query: queries.featuredCaseStudiesQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((item: any) => transformSanityCaseStudy(item));
  } catch {
    return [];
  }
}

export async function getSanityCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  try {
    const res = await sanityFetch({
      query: queries.caseStudyBySlugQuery,
      params: { slug },
    });
    const data: any = res?.data;
    if (!data) return undefined;
    return transformSanityCaseStudy(data);
  } catch {
    return undefined;
  }
}

export async function getSanityStats(): Promise<Stat[]> {
  try {
    const res = await sanityFetch({ query: queries.statsQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((s: any, idx: number) => ({
      id: s.id || s._id || `stat-${idx}`,
      label: s.label || "",
      value: s.value || "",
      numericValue: s.numericValue,
      prefix: s.prefix,
      suffix: s.suffix,
      description: s.description || "",
    }));
  } catch {
    return [];
  }
}

export async function getSanityServices(): Promise<Service[]> {
  try {
    const res = await sanityFetch({ query: queries.servicesQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((s: any) => ({
      id: s.id || s._id,
      number: s.number || "01",
      title: s.title || "",
      subtitle: s.subtitle || "",
      description: s.description || "",
      image: formatSanityImage(s.image, s.imageUrl || ""),
      capabilities: Array.isArray(s.capabilities) ? s.capabilities : [],
      deliverables: Array.isArray(s.deliverables) ? s.deliverables : [],
      relatedCaseStudies: Array.isArray(s.relatedCaseStudies) ? s.relatedCaseStudies : [],
    }));
  } catch {
    return [];
  }
}

export async function getSanityTestimonials(): Promise<Testimonial[]> {
  try {
    const res = await sanityFetch({ query: queries.testimonialsQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((t: any) => ({
      id: t.id || t._id,
      quote: t.quote || "",
      author: t.author || "",
      role: t.role || "",
      company: t.company || "",
      avatar: formatSanityImage(t.avatar, t.avatarUrl || ""),
      metric: t.metric,
    }));
  } catch {
    return [];
  }
}

export async function getSanityBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await sanityFetch({ query: queries.blogPostsQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((p: any) => transformSanityBlogPost(p));
  } catch {
    return [];
  }
}

export async function getSanityFeaturedBlogPosts(): Promise<BlogPost[]> {
  try {
    const res = await sanityFetch({ query: queries.featuredBlogPostsQuery });
    const data: any = res?.data;
    if (!Array.isArray(data)) return [];
    return data.map((p: any) => transformSanityBlogPost(p));
  } catch {
    return [];
  }
}

export async function getSanityBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  try {
    const res = await sanityFetch({
      query: queries.blogPostBySlugQuery,
      params: { slug },
    });
    const data: any = res?.data;
    if (!data) return undefined;
    return transformSanityBlogPost(data);
  } catch {
    return undefined;
  }
}

export async function getNavbarData(): Promise<NavbarData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.navbarQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    return {
      logoText: data.logoText || "",
      logoLink: data.logoLink || "/",
      links: Array.isArray(data.links) ? data.links : [],
      ctaLabel: data.ctaLabel || "",
      ctaLink: data.ctaLink || "/contact",
    };
  } catch {
    return undefined;
  }
}

export async function getHeroData(): Promise<HeroData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.heroQuery });
    const data: any = res?.data;
    if (!data) return undefined;

    const imageUrl = formatSanityImage(data.fallbackImage, "");
    let buttonsList: HeroButton[] = [];
    if (Array.isArray(data.buttons) && data.buttons.length > 0) {
      buttonsList = data.buttons.map((b: any) => ({
        label: b.label || "",
        link: b.link || "#",
        variant: b.variant === "secondary" ? "secondary" : "primary",
        showArrow: Boolean(b.showArrow),
      }));
    }

    return {
      label: data.label,
      title: data.title,
      description: data.description,
      buttons: buttonsList,
      videoUrl: data.videoUrl,
      fallbackImage: imageUrl,
      locationLabel: data.locationLabel,
      establishedLabel: data.establishedLabel,
    };
  } catch {
    return undefined;
  }
}

export async function getLogoCloudData(): Promise<LogoCloudData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.logoCloudQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    const logos = Array.isArray(data.logos)
      ? data.logos.map((item: any) => ({
          name: item.name || "",
          logoImage: formatSanityImage(item.logoImage, ""),
          svgCode: item.svgCode,
          link: item.link,
        }))
      : [];

    return {
      heading: data.heading,
      logos,
    };
  } catch {
    return undefined;
  }
}

export async function getImageTextData(): Promise<ImageTextData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.imageTextQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    return {
      label: data.label,
      title: data.title,
      paragraphs: Array.isArray(data.paragraphs) ? data.paragraphs : [],
      featureImage: formatSanityImage(data.featureImage, data.featureImageUrl || ""),
      quote: data.quote,
      quoteAuthor: data.quoteAuthor,
      ctaLabel: data.ctaLabel,
      ctaLink: data.ctaLink,
    };
  } catch {
    return undefined;
  }
}

export async function getResultsData(): Promise<ResultsData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.resultsQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    return {
      label: data.label,
      title: data.title,
      description: data.description,
      highlightMetric: data.highlightMetric,
      highlightLabel: data.highlightLabel,
      metrics: Array.isArray(data.metrics) ? data.metrics : [],
    };
  } catch {
    return undefined;
  }
}

export async function getCtaData(): Promise<CtaData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.ctaQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    return {
      label: data.label,
      title: data.title,
      description: data.description,
      primaryButtonLabel: data.primaryButtonLabel,
      primaryButtonLink: data.primaryButtonLink,
      secondaryButtonLabel: data.secondaryButtonLabel,
      secondaryButtonLink: data.secondaryButtonLink,
    };
  } catch {
    return undefined;
  }
}

export async function getSiteSettingsData(): Promise<SiteSettingsData | undefined> {
  try {
    const res = await sanityFetch({ query: queries.siteSettingsQuery });
    const data: any = res?.data;
    if (!data) return undefined;
    return {
      siteTitle: data.siteTitle,
      logoText: data.logoText,
      contactEmail: data.contactEmail,
      navLinks: Array.isArray(data.navLinks) ? data.navLinks : [],
      headerCtaLabel: data.headerCtaLabel,
      headerCtaLink: data.headerCtaLink,
      footerCopyright: data.footerCopyright,
    };
  } catch {
    return undefined;
  }
}

// ----------------------------------------------------
// Transformers
// ----------------------------------------------------

function transformSanityCaseStudy(item: any): CaseStudy {
  const gallery = Array.isArray(item?.galleryImages)
    ? item.galleryImages.map((img: any) => formatSanityImage(img, "")).filter(Boolean)
    : [];

  const rawStats = Array.isArray(item?.stats) ? item.stats : [];
  const statsList = rawStats.map((s: any) => ({
    value: s.value || "",
    label: s.label || "",
    description: s.description || "",
  }));

  return {
    id: item.id || item._id,
    slug: item.slug || "",
    title: item.title || "",
    client: item.client || "",
    category: item.category || "",
    year: item.year || "",
    summary: item.summary || "",
    coverImage: formatSanityImage(item.coverImage, item.coverImageUrl || ""),
    heroImage: formatSanityImage(item.heroImage, item.heroImageUrl || ""),
    videoUrl: item.videoUrl,
    challenge: item.challenge || "",
    approach: item.approach || "",
    solution: item.solution || "",
    results: {
      highlightMetric: "",
      highlightLabel: "",
      summary: item.resultsSummary || "",
      stats: statsList,
    },
    galleryImages: gallery,
    testimonial: item.testimonialQuote
      ? {
          quote: item.testimonialQuote,
          author: item.testimonialAuthor || "",
          role: item.testimonialRole || "",
          company: item.testimonialCompany || "",
        }
      : undefined,
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : [],
    liveUrl: item.liveUrl,
    featured: Boolean(item.featured),
  };
}

function transformSanityBlogPost(item: any): BlogPost {
  return {
    id: item.id || item._id,
    slug: item.slug || "",
    title: item.title || "",
    category: item.category || "",
    publishedAt: item.publishedAt || "",
    readTime: item.readTime || "",
    excerpt: item.excerpt || "",
    coverImage: formatSanityImage(item.coverImage, item.coverImageUrl || ""),
    author: {
      name: item.authorName || "",
      role: item.authorRole || "",
      avatar: formatSanityImage(item.authorAvatar, item.authorAvatarUrl || ""),
      bio: item.authorBio || "",
    },
    content: {
      introduction: item.introduction || "",
      headings: Array.isArray(item.headings) ? item.headings : [],
      conclusion: item.conclusion || "",
      keyTakeaway: item.keyTakeaway,
    },
    relatedSlugs: Array.isArray(item.relatedSlugs) ? item.relatedSlugs : [],
    featured: Boolean(item.featured),
  };
}
