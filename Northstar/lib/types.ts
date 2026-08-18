export interface CaseStudyStat {
  label: string;
  value: string;
  description?: string;
}

export interface CaseStudyTestimonial {
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar?: string;
}

export interface CaseStudy {
  id: string;
  slug: string;
  title: string;
  client: string;
  category: string;
  year: string;
  summary: string;
  coverImage: string;
  heroImage: string;
  challenge: string;
  approach: string;
  solution: string;
  results: {
    highlightMetric: string;
    highlightLabel: string;
    summary: string;
    stats: CaseStudyStat[];
  };
  galleryImages: string[];
  testimonial?: CaseStudyTestimonial;
  relatedSlugs: string[];
  liveUrl?: string;
  featured?: boolean;
}

export interface Author {
  name: string;
  role: string;
  avatar: string;
  bio?: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  category: string;
  publishedAt: string;
  readTime: string;
  excerpt: string;
  coverImage: string;
  author: Author;
  content: {
    introduction: string;
    headings: {
      id: string;
      title: string;
      content: string;
    }[];
    conclusion: string;
    keyTakeaway?: string;
  };
  relatedSlugs: string[];
  featured?: boolean;
}

export interface ServiceCapability {
  title: string;
  description: string;
}

export interface ServiceDeliverable {
  title: string;
  items: string[];
}

export interface Service {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  description: string;
  capabilities: ServiceCapability[];
  deliverables: ServiceDeliverable[];
  image: string;
  relatedCaseStudies: string[];
}

export interface Testimonial {
  id: string;
  quote: string;
  author: string;
  role: string;
  company: string;
  avatar: string;
  metric?: string;
}

export interface Stat {
  id: string;
  value: string;
  numericValue: number;
  suffix?: string;
  prefix?: string;
  label: string;
  description: string;
}

export interface TeamMember {
  id: string;
  name: string;
  role: string;
  bio: string;
  image: string;
  social: {
    linkedin?: string;
    twitter?: string;
    github?: string;
  };
}

export interface ProcessStep {
  number: string;
  title: string;
  subtitle: string;
  description: string;
  deliverables: string[];
}

export interface ContactFormData {
  name: string;
  email: string;
  company: string;
  projectType: string;
  budget: string;
  message: string;
}
