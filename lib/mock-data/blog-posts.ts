import { BlogPost } from "../types";

export const MOCK_BLOG_POSTS: BlogPost[] = [
  {
    id: "why-premium-websites-feel-different",
    slug: "why-premium-websites-feel-different",
    title: "Why premium websites feel different: The physics of digital craftsmanship",
    category: "Design Insights",
    publishedAt: "August 14, 2024",
    readTime: "6 min read",
    excerpt: "The difference between an adequate website and an extraordinary digital experience isn't found in stock illustrations or complex shaders. It's hidden in micro-spacing, typography scales, and motion rhythm.",
    coverImage: "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "Julian Vance",
      role: "Design Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop",
      bio: "Julian oversees editorial and interaction design at Northstar. Formerly lead designer at Pentagram and Studio Archetype."
    },
    content: {
      introduction: "When a user lands on a digital experience designed with true craft, they sense quality within 50 milliseconds. Long before they read the hero headline or parse the navigation menu, their subconscious evaluates baseline grid alignments, typographic contrast, and spatial balance.",
      headings: [
        {
          id: "the-typo-scale",
          title: "1. Intentional Typographic Hierarchy",
          content: "Most modern websites rely on default sans-serif font stacks scaled haphazardly. Premium experiences pair complementary font families — such as an editorial serif for expressive headlines paired with an ultra-legible geometric sans for functional UI elements. The key lies in optical line-height adjustments and strict font-size ratios."
        },
        {
          id: "whitespace-as-feature",
          title: "2. Whitespace as an Active Architectural Element",
          content: "Inferior layouts fear empty screen space, packing margins tightly out of anxiety that the user won't scroll. Premium agency websites view whitespace as luxury. Generous section padding (120px to 160px on desktop) gives content room to breathe, forcing the eye to focus on essential value propositions."
        },
        {
          id: "subtle-motion",
          title: "3. Kinetic Purpose & Motion Physics",
          content: "Gimmicky web animations bounce, spin, and distract. Purposeful motion imitates physical friction and spring physics. A 500ms ease-out reveal creates momentum, while a subtle scale transform on hover communicates tactile responsiveness without fatiguing the eye."
        }
      ],
      conclusion: "Craft is not an additive layer applied at the end of a project. It is the cumulative result of a hundred small, disciplined choices made throughout strategy, design, and frontend execution.",
      keyTakeaway: "True digital luxury lies in restraint. Strip away decorative noise and focus relentless attention on typography, alignment, and fluid physics."
    },
    relatedSlugs: ["building-scalable-content-systems-with-sanity", "what-makes-a-digital-product-memorable"],
    featured: true
  },
  {
    id: "building-scalable-content-systems-with-sanity",
    slug: "building-scalable-content-systems-with-sanity",
    title: "Building scalable content systems with Sanity and Next.js App Router",
    category: "Engineering Architecture",
    publishedAt: "July 28, 2024",
    readTime: "8 min read",
    excerpt: "How to structure modern headless CMS content blocks to empower marketing teams while preserving strict frontend UI systems and TypeScript type safety.",
    coverImage: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "Claire Lin",
      role: "Head of Engineering",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop",
      bio: "Claire leads technical architecture at Northstar, specializing in headless commerce, Next.js App Router performance, and design token integration."
    },
    content: {
      introduction: "The traditional CMS paradigm often forced a compromise: either marketers had rigid templates they couldn't customize, or they had raw rich-text fields that shattered design consistency across mobile viewports.",
      headings: [
        {
          id: "page-builder-pattern",
          title: "The Page Builder Array Pattern",
          content: "Using Sanity GROQ and polymorphic block arrays, we define modular sections in code (Hero, FeatureGrid, TestimonialBlock, ImageText) and expose them as typed building blocks to content editors. This allows marketers to reorder, add, or customize page layouts dynamically."
        },
        {
          id: "type-generation",
          title: "End-to-End GROQ Type Safety",
          content: "By compiling GROQ queries into static TypeScript types using Sanity TypeGen, your Next.js Server Components gain instant autocomplete and compile-time error checking. If a schema field changes in Sanity, your CI pipeline flags broken frontend references before deployment."
        }
      ],
      conclusion: "When engineered correctly, a headless CMS is not just a database — it's an accelerator for product growth that bridges the gap between design systems and content operations.",
      keyTakeaway: "Decouple presentation components from raw CMS query structures by creating clean TypeScript domain models."
    },
    relatedSlugs: ["why-premium-websites-feel-different", "what-makes-a-digital-product-memorable"],
    featured: true
  },
  {
    id: "what-makes-a-digital-product-memorable",
    slug: "what-makes-a-digital-product-memorable",
    title: "What makes a digital product memorable in an era of AI homogenization?",
    category: "Strategy",
    publishedAt: "July 12, 2024",
    readTime: "5 min read",
    excerpt: "As commodity software templates proliferate, distinct human editorial direction and opinionated brand positioning become your strongest competitive advantage.",
    coverImage: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "David Sterling",
      role: "Managing Partner",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=400&auto=format&fit=crop",
      bio: "David guides product strategy for Northstar's enterprise clients. He writes frequently about digital positioning and digital transformation."
    },
    content: {
      introduction: "We live in an age where anyone can generate a clean 12-column SaaS layout in minutes. Yet, despite thousands of new software launches every month, very few products leave a lasting impression on users.",
      headings: [
        {
          id: "opinionated-design",
          title: "The Value of Opinionated Design",
          content: "Memorable products do not attempt to be everything to everyone. They embrace an opinionated aesthetic and workflow. Whether it is Linear's keyboard-driven precision or Stripe's legendary visual polish, distinct design choices build emotional affinity."
        },
        {
          id: "human-storytelling",
          title: "Integrating Editorial Narrative into UX",
          content: "Products shouldn't just be tools; they should convey a narrative about who the user becomes by using them. Elevating product micro-copy, typography, and case study narratives transforms utility into brand prestige."
        }
      ],
      conclusion: "As automated code and design generators commoditize default UI patterns, human taste, editorial nuance, and brand conviction become priceless assets.",
      keyTakeaway: "Stand out by embracing bold typographic choices, distinct color palettes, and opinionated interaction workflows."
    },
    relatedSlugs: ["why-premium-websites-feel-different", "building-scalable-content-systems-with-sanity"],
    featured: true
  },
  {
    id: "the-art-of-digital-editorial-design",
    slug: "the-art-of-digital-editorial-design",
    title: "The art of digital editorial design: Bringing print prestige to the web",
    category: "Design Insights",
    publishedAt: "June 29, 2024",
    readTime: "7 min read",
    excerpt: "How traditional publication design techniques — grid tension, typographic hierarchy, and white space — translate into modern high-conversion web apps.",
    coverImage: "https://images.unsplash.com/photo-1512486130939-2c4f79935e4f?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "Julian Vance",
      role: "Design Director",
      avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=400&auto=format&fit=crop"
    },
    content: {
      introduction: "Print magazines understood something web designers frequently forget: visual pace matters. Flipping through a high-end publication is a choreographed sequence of density and calm.",
      headings: [
        {
          id: "grid-tension",
          title: "Creating Grid Tension",
          content: "Breaking out of strict symmetrical cards creates visual rhythm. Interspersing large full-bleed imagery with asymmetric text columns draws the eye across the viewport naturally."
        }
      ],
      conclusion: "Websites that feel like modern editorial monographs command higher customer trust and premium pricing power."
    },
    relatedSlugs: ["why-premium-websites-feel-different"],
    featured: false
  },
  {
    id: "designing-for-momentum",
    slug: "designing-for-momentum",
    title: "Designing for momentum: How speed and micro-interactions drive conversion",
    category: "Product Growth",
    publishedAt: "June 04, 2024",
    readTime: "5 min read",
    excerpt: "Why perceived performance is just as important as actual latency, and how fluid transitions eliminate conversion friction.",
    coverImage: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1600&auto=format&fit=crop",
    author: {
      name: "Claire Lin",
      role: "Head of Engineering",
      avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=400&auto=format&fit=crop"
    },
    content: {
      introduction: "Momentum is the feeling of effortless progress. When an application responds instantaneously to hover states, click triggers, and route transitions, users enter a flow state.",
      headings: [
        {
          id: "optimistic-ui",
          title: "Optimistic UI and Instant Touch Feedback",
          content: "Immediate visual confirmation of user actions creates a sense of tactile solidity, eliminating hesitation during checkout and lead capture flows."
        }
      ],
      conclusion: "Engineering performance and interaction polish are fundamentally revenue optimization tools."
    },
    relatedSlugs: ["building-scalable-content-systems-with-sanity"],
    featured: false
  }
];
