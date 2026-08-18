import { Service } from "../types";

export const MOCK_SERVICES: Service[] = [
  {
    id: "strategy",
    number: "01",
    title: "Strategy",
    subtitle: "Research, positioning and digital strategy",
    description: "We help visionary brands clarify their value proposition, identify high-leverage digital opportunities, and chart a roadmap for market differentiation.",
    capabilities: [
      { title: "Digital Product Strategy", description: "Defining core user value, feature prioritization, and multi-year product roadmaps." },
      { title: "Brand Positioning & Narrative", description: "Crafting editorial brand messaging that resonates with enterprise decision-makers." },
      { title: "UX Audits & Competitor Analysis", description: "Deconstructing category leaders to pinpoint underserved market opportunities." },
      { title: "Content Architecture", description: "Structuring information models for seamless scalability and search visibility." }
    ],
    deliverables: [
      { title: "Strategic Artifacts", items: ["Product Vision Monograph", "Brand Messaging Guide", "UX Benchmark Audit", "Content Taxonomy System"] }
    ],
    image: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200&auto=format&fit=crop",
    relatedCaseStudies: ["orbit-finance", "what-makes-a-digital-product-memorable"]
  },
  {
    id: "design",
    number: "02",
    title: "Design",
    subtitle: "Brand, UX and product experiences",
    description: "We craft bespoke visual systems, web applications, and interactive experiences that command prestige and convert sophisticated users.",
    capabilities: [
      { title: "Interface & Experience Design", description: "Pixel-perfect web and mobile app interfaces tuned for high conversion and low cognitive load." },
      { title: "Design Systems & Token Architecture", description: "Scalable component libraries built with Figma variable tokens and production code mapping." },
      { title: "Editorial Direction & Typography", description: "Bespoke font pairings, custom layout grids, and publication-grade art direction." },
      { title: "Prototyping & Motion Design", description: "Interactive micro-animations and physical spring physics that guide user focus." }
    ],
    deliverables: [
      { title: "Design Systems", items: ["Figma Enterprise Library", "Interactive Motion Guidelines", "Iconography & Asset Suite", "Design Token Specs"] }
    ],
    image: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1200&auto=format&fit=crop",
    relatedCaseStudies: ["noma-health", "form-studio"]
  },
  {
    id: "development",
    number: "03",
    title: "Development",
    subtitle: "High-performance web applications",
    description: "We engineer lightning-fast modern web applications using Next.js App Router, TypeScript, and headless CMS infrastructure.",
    capabilities: [
      { title: "Next.js & React Engineering", description: "Server Components, dynamic edge routing, and sub-second page performance." },
      { title: "Headless CMS Integration", description: "Custom Sanity Studio schemas, GROQ query optimization, and live preview setups." },
      { title: "Front-end Animation & Motion", description: "Framer Motion, WebGL shaders, and smooth scroll physics with full accessibility." },
      { title: "API & Microservice Integration", description: "Robust TypeScript clients connecting custom backends, GraphQL, and payment gateways." }
    ],
    deliverables: [
      { title: "Engineering Assets", items: ["Clean Next.js Codebase", "Sanity Studio Studio CMS", "CI/CD Deployment Pipeline", "Technical Architecture Docs"] }
    ],
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1200&auto=format&fit=crop",
    relatedCaseStudies: ["orbit-finance", "kin-os"]
  },
  {
    id: "growth",
    number: "04",
    title: "Growth",
    subtitle: "SEO, experimentation and optimization",
    description: "We turn web applications into self-sustaining growth engines through technical SEO, conversion rate optimization, and performance telemetry.",
    capabilities: [
      { title: "Technical SEO & Schema Markup", description: "Optimizing Core Web Vitals, dynamic Open Graph metadata, and structured data schemas." },
      { title: "Conversion Rate Optimization (CRO)", description: "Rigorous A/B testing hypotheses, checkout funnel analysis, and CTA optimization." },
      { title: "Performance Telemetry & Analytics", description: "Privacy-compliant event tracking, custom dashboards, and user behavior heatmaps." },
      { title: "Continuous Product Iteration", description: "Bi-weekly design and engineering sprints to continuously elevate metrics." }
    ],
    deliverables: [
      { title: "Growth Engine", items: ["Technical SEO Audit & Fixes", "CRO Experiment Roadmap", "Analytics & Conversion Dashboard", "Monthly Iteration Sprints"] }
    ],
    image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200&auto=format&fit=crop",
    relatedCaseStudies: ["aster-commerce", "luma-cloud"]
  }
];
