import { MOCK_CASE_STUDIES } from "./case-studies";
import { MOCK_BLOG_POSTS } from "./blog-posts";
import { MOCK_SERVICES } from "./services";
import { MOCK_TESTIMONIALS } from "./testimonials";
import { MOCK_STATS } from "./stats";
import { MOCK_TEAM } from "./team";
import { MOCK_PROCESS } from "./process";
import { CaseStudy, BlogPost, Service, Testimonial, Stat, TeamMember, ProcessStep } from "../types";
import {
  getSanityCaseStudies,
  getSanityFeaturedCaseStudies,
  getSanityCaseStudyBySlug,
  getSanityBlogPosts,
  getSanityFeaturedBlogPosts,
  getSanityBlogPostBySlug,
  getSanityServices,
  getSanityTestimonials,
  getSanityStats,
} from "@/sanity/lib/fetch";

export * from "./case-studies";
export * from "./blog-posts";
export * from "./services";
export * from "./testimonials";
export * from "./stats";
export * from "./team";
export * from "./process";

export async function getCaseStudies(): Promise<CaseStudy[]> {
  return getSanityCaseStudies();
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return getSanityFeaturedCaseStudies();
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return getSanityCaseStudyBySlug(slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return getSanityBlogPosts();
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return getSanityFeaturedBlogPosts();
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return getSanityBlogPostBySlug(slug);
}

export async function getServices(): Promise<Service[]> {
  return getSanityServices();
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  const services = await getSanityServices();
  return services.find((s) => s.id === id || s.number === id);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return getSanityTestimonials();
}

export async function getStats(): Promise<Stat[]> {
  return getSanityStats();
}

export async function getTeam(): Promise<TeamMember[]> {
  return MOCK_TEAM;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return MOCK_PROCESS;
}
