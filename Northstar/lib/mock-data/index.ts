import { MOCK_CASE_STUDIES } from "./case-studies";
import { MOCK_BLOG_POSTS } from "./blog-posts";
import { MOCK_SERVICES } from "./services";
import { MOCK_TESTIMONIALS } from "./testimonials";
import { MOCK_STATS } from "./stats";
import { MOCK_TEAM } from "./team";
import { MOCK_PROCESS } from "./process";
import { CaseStudy, BlogPost, Service, Testimonial, Stat, TeamMember, ProcessStep } from "../types";

export * from "./case-studies";
export * from "./blog-posts";
export * from "./services";
export * from "./testimonials";
export * from "./stats";
export * from "./team";
export * from "./process";

// Simulated fetchers (later replaceable by GROQ / sanityFetch calls)
export async function getCaseStudies(): Promise<CaseStudy[]> {
  return MOCK_CASE_STUDIES;
}

export async function getFeaturedCaseStudies(): Promise<CaseStudy[]> {
  return MOCK_CASE_STUDIES.filter((cs) => cs.featured);
}

export async function getCaseStudyBySlug(slug: string): Promise<CaseStudy | undefined> {
  return MOCK_CASE_STUDIES.find((cs) => cs.slug === slug);
}

export async function getBlogPosts(): Promise<BlogPost[]> {
  return MOCK_BLOG_POSTS;
}

export async function getFeaturedBlogPosts(): Promise<BlogPost[]> {
  return MOCK_BLOG_POSTS.filter((post) => post.featured);
}

export async function getBlogPostBySlug(slug: string): Promise<BlogPost | undefined> {
  return MOCK_BLOG_POSTS.find((post) => post.slug === slug);
}

export async function getServices(): Promise<Service[]> {
  return MOCK_SERVICES;
}

export async function getServiceById(id: string): Promise<Service | undefined> {
  return MOCK_SERVICES.find((s) => s.id === id);
}

export async function getTestimonials(): Promise<Testimonial[]> {
  return MOCK_TESTIMONIALS;
}

export async function getStats(): Promise<Stat[]> {
  return MOCK_STATS;
}

export async function getTeam(): Promise<TeamMember[]> {
  return MOCK_TEAM;
}

export async function getProcessSteps(): Promise<ProcessStep[]> {
  return MOCK_PROCESS;
}
