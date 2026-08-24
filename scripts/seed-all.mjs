import { createClient } from "@sanity/client";
import fs from "fs";
import path from "path";

if (fs.existsSync(".env.local")) {
  const envConfig = fs.readFileSync(".env.local", "utf8");
  envConfig.split("\n").forEach((line) => {
    const trimmed = line.trim();
    if (trimmed && !trimmed.startsWith("#") && trimmed.includes("=")) {
      const [key, ...valParts] = trimmed.split("=");
      const val = valParts.join("=").replace(/^["']|["']$/g, "").trim();
      if (key && !process.env[key.trim()]) {
        process.env[key.trim()] = val;
      }
    }
  });
}

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID;
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || "production";
const token = process.env.SANITY_API_WRITE_TOKEN;

if (!projectId || !token) {
  console.error(
    "❌ Error: Please ensure NEXT_PUBLIC_SANITY_PROJECT_ID and SANITY_API_WRITE_TOKEN are set in .env.local"
  );
  process.exit(1);
}

const client = createClient({
  projectId,
  dataset,
  apiVersion: "2024-03-01",
  token,
  useCdn: false,
});

async function uploadImageAsset(filePath) {
  if (fs.existsSync(filePath)) {
    try {
      console.log(`  📸 Uploading image asset: ${path.basename(filePath)}...`);
      const asset = await client.assets.upload("image", fs.createReadStream(filePath), {
        filename: path.basename(filePath),
      });
      return {
        _type: "image",
        asset: {
          _type: "reference",
          _ref: asset._id,
        },
      };
    } catch (e) {
      console.warn(`  ⚠️ Failed to upload image asset ${filePath}:`, e.message);
    }
  }
  return null;
}

async function seedAll() {
  console.log("🚀 Starting complete Sanity dataset & asset seeding...");

  // Upload shared assets
  const heroStudioAsset = await uploadImageAsset("public/images/hero-studio.jpg");
  const craftPhilosophyAsset = await uploadImageAsset("public/images/craft-philosophy.jpg");
  const orbitFinanceAsset = await uploadImageAsset("public/images/orbit-finance.jpg");
  const nomaHealthAsset = await uploadImageAsset("public/images/noma-health.jpg");
  const designSystemAsset = await uploadImageAsset("public/images/design-system.jpg");

  // 1. Header Navigation
  console.log("-> Seeding Header Navigation...");
  await client.createOrReplace({
    _type: "navigation",
    _id: "header-navigation",
    logoText: "NORTHSTAR",
    logoLink: "/",
    links: [
      { _key: "link-1", label: "Work", href: "/work" },
      { _key: "link-2", label: "Services", href: "/services" },
      { _key: "link-3", label: "About", href: "/about" },
      { _key: "link-4", label: "Insights", href: "/insights" },
    ],
    ctaLabel: "Let's talk",
    ctaLink: "/contact",
  });

  // 2. Landing Hero Section
  console.log("-> Seeding Landing Hero Section...");
  const heroDoc = {
    _type: "hero",
    _id: "landing-page-hero",
    label: "DIGITAL PRODUCTS / STRATEGY / EXPERIENCE",
    title: "We build digital experiences that move businesses forward.",
    description:
      "Northstar partners with ambitious companies to design, build and scale digital products that people actually want to use.",
    buttons: [
      { _key: "btn-1", label: "View our work", link: "/work", variant: "primary", showArrow: true },
      { _key: "btn-2", label: "Start a conversation", link: "/contact", variant: "secondary", showArrow: false },
    ],
    videoUrl:
      "https://assets.mixkit.co/videos/preview/mixkit-digital-animation-of-screens-and-data-41539-large.mp4",
    locationLabel: "DESIGN STUDIO / NEW YORK",
    establishedLabel: "EST. 2014",
  };
  if (heroStudioAsset) {
    heroDoc.fallbackImage = heroStudioAsset;
  }
  await client.createOrReplace(heroDoc);

  // 3. Logo Cloud
  console.log("-> Seeding Logo Cloud...");
  await client.createOrReplace({
    _type: "logoCloud",
    _id: "landing-logo-cloud",
    heading: "TRUSTED BY INNOVATIVE TEAMS AT LEADING COMPANIES",
    logos: [
      { _key: "logo-1", name: "Vercel" },
      { _key: "logo-2", name: "Stripe" },
      { _key: "logo-3", name: "Linear" },
      { _key: "logo-4", name: "Figma" },
      { _key: "logo-5", name: "Raycast" },
      { _key: "logo-6", name: "Supabase" },
    ],
  });

  // 4. Image Text Section
  console.log("-> Seeding Editorial Image Text...");
  const imageTextDoc = {
    _type: "imageText",
    _id: "landing-image-text",
    label: "OUR PHILOSOPHY",
    title: "Bridging strategic vision and technical craftsmanship.",
    paragraphs: [
      "We believe that exceptional digital products require both editorial restraint and robust software architecture.",
      "Our multidisciplinary teams partner closely with founders and executive leaders from initial product strategy through post-launch scale.",
    ],
    quote: "Good digital products are felt before they're understood.",
    quoteAuthor: "Northstar Design Philosophy",
    ctaLabel: "Learn about our approach",
    ctaLink: "/about",
  };
  if (craftPhilosophyAsset) {
    imageTextDoc.featureImage = craftPhilosophyAsset;
  }
  await client.createOrReplace(imageTextDoc);

  // 5. Results Section
  console.log("-> Seeding Results & Impact Section...");
  await client.createOrReplace({
    _type: "resultSection",
    _id: "landing-results",
    label: "FEATURED RESULT / ORBIT FINANCE",
    title: "Conversion rate uplift after redesigning the entire institutional customer journey.",
    description:
      "By pairing real-time WebGL data visualizations with an editorial visual identity, Orbit unlocked $1.2B in new assets under management within 90 days.",
    highlightMetric: "+84%",
    highlightLabel: "Conversion Rate Uplift",
    metrics: [
      {
        _key: "m-1",
        value: "$1.2B",
        label: "New Assets Managed",
        description: "Institutional capital onboarded in 90 days.",
      },
      {
        _key: "m-2",
        value: "99.99%",
        label: "Uptime Reliability",
        description: "Zero downtime during peak trading volume.",
      },
      {
        _key: "m-3",
        value: "60%",
        label: "Faster Onboarding Velocity",
        description: "Streamlined KYC and institutional verification.",
      },
    ],
  });

  // 6. CTA Banner
  console.log("-> Seeding CTA Banner...");
  await client.createOrReplace({
    _type: "ctaBanner",
    _id: "landing-cta-banner",
    label: "WORK WITH NORTHSTAR",
    title: "Have a difficult problem worth solving?",
    description:
      "Let's build something meaningful together. We are currently accepting select partnerships for Q3 and Q4.",
    primaryButtonLabel: "Start a conversation",
    primaryButtonLink: "/contact",
    secondaryButtonLabel: "Explore our work",
    secondaryButtonLink: "/work",
  });

  // 7. Statistics
  console.log("-> Seeding Key Statistics...");
  const statsData = [
    {
      _id: "stat-1",
      _type: "stat",
      label: "Capital Raised by Clients",
      value: "$2.4B+",
      numericValue: 2.4,
      prefix: "$",
      suffix: "B+",
      description: "Total venture and institutional capital raised by partner portfolio companies.",
      order: 1,
    },
    {
      _id: "stat-2",
      _type: "stat",
      label: "Products Launched",
      value: "140+",
      numericValue: 140,
      suffix: "+",
      description: "High-scale web platforms, mobile apps, and design systems built & launched.",
      order: 2,
    },
    {
      _id: "stat-3",
      _type: "stat",
      label: "Design Awards Received",
      value: "38",
      numericValue: 38,
      description: "Recognized globally across Awwwards, FWA, Red Dot, and Webby Awards.",
      order: 3,
    },
    {
      _id: "stat-4",
      _type: "stat",
      label: "Average Conversion Uplift",
      value: "64%",
      numericValue: 64,
      suffix: "%",
      description: "Average user activation and conversion uplift post-redesign.",
      order: 4,
    },
  ];
  for (const s of statsData) {
    await client.createOrReplace(s);
  }

  // 8. Services
  console.log("-> Seeding Services Showcase...");
  const servicesData = [
    {
      _id: "service-1",
      _type: "service",
      number: "01",
      title: "Digital Product Strategy",
      subtitle: "Positioning & Product Vision",
      description: "We define core product architectures, user mental models, and go-to-market strategies.",
      image: heroStudioAsset || undefined,
      capabilities: [
        { _key: "c1", title: "Product Discovery & Audit", description: "In-depth heuristic audits and user research." },
        { _key: "c2", title: "UX Architecture", description: "Information architecture and user journey mapping." },
      ],
    },
    {
      _id: "service-2",
      _type: "service",
      number: "02",
      title: "Editorial Design & Identity",
      subtitle: "Visual Excellence & Systems",
      description: "Bespoke digital design systems, motion guidelines, and high-end editorial UI design.",
      image: designSystemAsset || undefined,
      capabilities: [
        { _key: "c3", title: "Design Systems", description: "Scalable Figma & React component libraries." },
        { _key: "c4", title: "Interaction Design", description: "Framer Motion physics and micro-interactions." },
      ],
    },
    {
      _id: "service-3",
      _type: "service",
      number: "03",
      title: "Engineering & Headless CMS",
      subtitle: "Next.js & Sanity Architecture",
      description: "Sub-second web performance, clean TypeScript codebases, and tailored Sanity Studio CMS.",
      image: craftPhilosophyAsset || undefined,
      capabilities: [
        { _key: "c5", title: "Next.js App Router", description: "Turbopack optimized React 19 architecture." },
        { _key: "c6", title: "Sanity CMS Integration", description: "Custom schemas, GROQ queries, and live preview." },
      ],
    },
  ];
  for (const s of servicesData) {
    await client.createOrReplace(s);
  }

  // 9. Client Testimonials
  console.log("-> Seeding Client Testimonials...");
  const testimonialsData = [
    {
      _id: "testimonial-1",
      _type: "testimonial",
      quote: "Northstar transformed our product visual identity and engineering velocity. They operate like true co-founders.",
      author: "Marcus Vance",
      role: "CEO & Co-Founder",
      company: "Orbit Financial Labs",
      metric: "+$1.2B AUM",
      featured: true,
    },
    {
      _id: "testimonial-2",
      _type: "testimonial",
      quote: "The restraint and technical rigor Northstar brought to our platform exceeded all expectations.",
      author: "Dr. Sarah Chen",
      role: "Chief Product Officer",
      company: "Noma Health",
      metric: "250k+ Patients",
      featured: true,
    },
  ];
  for (const t of testimonialsData) {
    await client.createOrReplace(t);
  }

  // 10. Case Studies
  console.log("-> Seeding Case Studies...");
  const caseStudiesData = [
    {
      _id: "cs-orbit-finance",
      _type: "caseStudy",
      title: "Orbit Finance",
      slug: { _type: "slug", current: "orbit-finance" },
      client: "Orbit Financial Labs",
      category: "Fintech Platform",
      year: "2024",
      summary: "Redesigning institutional web trading infrastructure for high-frequency crypto traders.",
      challenge: "Legacy financial dashboards lacked clarity, speed, and real-time visualization capabilities.",
      approach: "Built custom WebGL chart primitives coupled with next-gen Next.js streaming architecture.",
      solution: "A high-performance trading terminal delivering sub-10ms data feeds and seamless execution.",
      coverImage: orbitFinanceAsset || undefined,
      heroImage: orbitFinanceAsset || undefined,
      featured: true,
      resultsSummary: "Unlocked $1.2B in new assets under management within 90 days of launch.",
      liveUrl: "https://google.com",
    },
    {
      _id: "cs-noma-health",
      _type: "caseStudy",
      title: "Noma Health",
      slug: { _type: "slug", current: "noma-health" },
      client: "Noma Health",
      category: "Digital Healthcare",
      year: "2024",
      summary: "Patient-first telehealth mobile & web platform simplifying prescription delivery.",
      challenge: "Complex regulatory compliance and disjointed patient communication channels.",
      approach: "Designed HIPAA-compliant portal with intuitive prescription management and instant telehealth video.",
      solution: "Unified digital healthcare platform serving 250,000+ active patients.",
      coverImage: nomaHealthAsset || undefined,
      heroImage: nomaHealthAsset || undefined,
      featured: true,
      liveUrl: "https://google.com",
    },
    {
      _id: "cs-aster-commerce",
      _type: "caseStudy",
      title: "Aster Commerce",
      slug: { _type: "slug", current: "aster-commerce" },
      client: "Aster Goods",
      category: "E-Commerce",
      year: "2023",
      summary: "Headless Shopify storefront for an architectural home & lifestyle brand.",
      challenge: "Standard Shopify templates failed to communicate brand prestige and slowed load times.",
      approach: "Constructed headless storefront with Next.js App Router, Framer Motion, and Sanity CMS.",
      solution: "Sub-second load times and 140% increase in mobile conversion rates.",
      coverImage: designSystemAsset || undefined,
      heroImage: designSystemAsset || undefined,
      featured: true,
      liveUrl: "https://google.com",
    },
  ];
  for (const cs of caseStudiesData) {
    await client.createOrReplace(cs);
  }

  // 11. Blog Posts / Insights
  console.log("-> Seeding Insights & Blog Posts...");
  const blogPostsData = [
    {
      _id: "post-1",
      _type: "blogPost",
      title: "Why Premium Websites Feel Different: The Nuance of Micro-Interactions",
      slug: { _type: "slug", current: "why-premium-websites-feel-different" },
      category: "Design Insights",
      publishedAt: "Oct 14, 2024",
      readTime: "5 min read",
      excerpt: "Exploring how subtle easing curves, spring physics, and typography hierarchy separate good products from memorable ones.",
      coverImage: heroStudioAsset || undefined,
      authorName: "Alex Morgan",
      authorRole: "Design Director",
      featured: true,
      introduction: "In modern software design, speed is expected, but craft is remembered.",
      conclusion: "Restraint is the ultimate form of luxury in digital design.",
    },
    {
      _id: "post-2",
      _type: "blogPost",
      title: "Building Scalable Content Systems with Sanity & Next.js App Router",
      slug: { _type: "slug", current: "building-scalable-content-systems-with-sanity" },
      category: "Engineering Architecture",
      publishedAt: "Sep 28, 2024",
      readTime: "8 min read",
      excerpt: "A deep dive into GROQ query optimization, type-safe schema definitions, and instant revalidation pipelines.",
      coverImage: craftPhilosophyAsset || undefined,
      authorName: "Elena Rostova",
      authorRole: "Head of Engineering",
      featured: true,
      introduction: "Headless CMS architecture allows editorial teams to move fast without compromising site performance.",
      conclusion: "Structured content paired with Next.js delivers unparalleled speed and flexibility.",
    },
  ];
  for (const post of blogPostsData) {
    await client.createOrReplace(post);
  }

  console.log("✅ COMPLETE SANITY SEEDING WITH REAL IMAGE ASSETS FINISHED SUCCESSFULLY!");
}

seedAll();
